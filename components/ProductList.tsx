"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { getToken } from "@/lib/auth-client";
import type { MenuSection } from "@/lib/menu-api";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type Draft = { name: string; desc: string; price: string; sectionSlug: string };
const emptyDraft = (sectionSlug: string): Draft => ({
  name: "",
  desc: "",
  price: "",
  sectionSlug,
});

export default function ProductList({
  menu: initialMenu,
  isAdmin,
  onAuthError,
}: {
  menu: MenuSection[];
  isAdmin: boolean;
  onAuthError: () => void;
}) {
  const { addItem } = useCart();
  const [menu, setMenu] = useState(initialMenu);
  const [error, setError] = useState("");

  const [openAddFor, setOpenAddFor] = useState<string | null>(null);
  const [addDraft, setAddDraft] = useState<Draft>(emptyDraft(""));

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState("");

  const [busyId, setBusyId] = useState<string | null>(null);

  async function authFetch(path: string, options: RequestInit): Promise<Response | null> {
    const token = getToken();
    if (!token) {
      onAuthError();
      setError("Sessão expirada. Faça login de novo.");
      return null;
    }
    const res = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...(options.headers || {}),
      },
    });
    if (res.status === 401) {
      onAuthError();
      setError("Sessão expirada. Faça login de novo.");
      return null;
    }
    return res;
  }

  async function applyResponse(res: Response | null): Promise<boolean> {
    if (!res) return false;
    if (res.ok) {
      setMenu(await res.json());
      setError("");
      return true;
    }
    const data = await res.json().catch(() => ({}));
    setError(data.error || "Erro ao salvar.");
    return false;
  }

  async function handleAddProduct() {
    if (!addDraft.name.trim() || !addDraft.price.trim()) {
      setError("Preencha nome e preço do produto.");
      return;
    }
    const res = await authFetch("/menu/items", {
      method: "POST",
      body: JSON.stringify(addDraft),
    });
    const ok = await applyResponse(res);
    if (ok) {
      setOpenAddFor(null);
    }
  }

  async function handleSavePrice(itemId: string) {
    if (!editPrice.trim()) {
      setError("Informe um preço.");
      return;
    }
    setBusyId(itemId);
    const res = await authFetch(`/menu/items/${itemId}`, {
      method: "PATCH",
      body: JSON.stringify({ price: editPrice.trim() }),
    });
    setBusyId(null);
    const ok = await applyResponse(res);
    if (ok) setEditingId(null);
  }

  async function handleRemove(itemId: string, name: string) {
    if (!confirm(`Remover "${name}" do cardápio?`)) return;
    setBusyId(itemId);
    const res = await authFetch(`/menu/items/${itemId}`, { method: "DELETE" });
    setBusyId(null);
    await applyResponse(res);
  }

  return (
    <>
      {isAdmin && error && (
        <div className="container">
          <div className="admin-error-banner">{error}</div>
        </div>
      )}

      {menu.map((section) => (
        <section key={section.slug} id={section.slug} className="menu-section">
          <div className="container">
            <div className="menu-section-head">
              <span className="icon">{section.icon}</span>
              <h2 className="display">{section.title}</h2>

              {isAdmin && (
                <button
                  type="button"
                  className="admin-inline-add-toggle"
                  onClick={() => {
                    if (openAddFor === section.slug) {
                      setOpenAddFor(null);
                    } else {
                      setAddDraft(emptyDraft(section.slug));
                      setOpenAddFor(section.slug);
                    }
                  }}
                >
                  {openAddFor === section.slug ? "Cancelar" : "+ Adicionar produto"}
                </button>
              )}
            </div>

            {isAdmin && openAddFor === section.slug && (
              <div className="admin-inline-add-form">
                <select
                  value={addDraft.sectionSlug}
                  onChange={(e) => setAddDraft({ ...addDraft, sectionSlug: e.target.value })}
                >
                  {menu.map((s) => (
                    <option key={s.slug} value={s.slug}>
                      {s.icon} {s.title}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Nome do produto"
                  value={addDraft.name}
                  onChange={(e) => setAddDraft({ ...addDraft, name: e.target.value })}
                  autoFocus
                />
                <input
                  type="text"
                  placeholder="Descrição (ex: pack com 12 unidades)"
                  value={addDraft.desc}
                  onChange={(e) => setAddDraft({ ...addDraft, desc: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="R$ 0,00"
                  value={addDraft.price}
                  onChange={(e) => setAddDraft({ ...addDraft, price: e.target.value })}
                />
                <button type="button" className="cta-button" onClick={handleAddProduct}>
                  Salvar
                </button>
              </div>
            )}

            <div className="menu-list">
              {section.items.map((item) => (
                <div key={item.id} className="menu-item">
                  <span className="menu-item-name">
                    {item.name}
                    <span className="menu-item-desc">{item.desc}</span>
                  </span>

                  <div className="menu-item-right" style={{ flexWrap: "wrap" }}>
                    {editingId === item.id ? (
                      <div className="menu-item-edit-form">
                        <input
                          type="text"
                          value={editPrice}
                          onChange={(e) => setEditPrice(e.target.value)}
                          autoFocus
                        />
                        <button
                          type="button"
                          className="menu-item-edit-save"
                          disabled={busyId === item.id}
                          onClick={() => handleSavePrice(item.id)}
                        >
                          Salvar
                        </button>
                        <button
                          type="button"
                          className="menu-item-edit-cancel"
                          onClick={() => setEditingId(null)}
                        >
                          Cancelar
                        </button>
                      </div>
                    ) : (
                      <>
                        <span className="menu-item-price">{item.price}</span>
                        <button
                          type="button"
                          className="menu-item-add"
                          onClick={() => addItem(item.name, item.price)}
                        >
                          Adicionar
                        </button>
                      </>
                    )}

                    {isAdmin && editingId !== item.id && (
                      <div className="menu-item-admin-actions">
                        <button
                          type="button"
                          className="menu-item-edit-btn"
                          disabled={busyId === item.id}
                          onClick={() => {
                            setEditingId(item.id);
                            setEditPrice(item.price);
                          }}
                        >
                          Mudar preço
                        </button>
                        <button
                          type="button"
                          className="menu-item-remove-btn"
                          disabled={busyId === item.id}
                          onClick={() => handleRemove(item.id, item.name)}
                        >
                          Remover
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {section.items.length === 0 && (
                <p className="admin-empty">Nenhum item nessa categoria ainda.</p>
              )}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
