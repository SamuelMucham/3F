"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn, clearToken } from "@/lib/auth-client";
import ProductList from "./ProductList";
import type { MenuSection } from "@/lib/menu-api";

export default function ProdutosClient({ menu }: { menu: MenuSection[] }) {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(isLoggedIn());
  }, []);

  function handleLogout() {
    clearToken();
    setIsAdmin(false);
    router.refresh();
  }

  return (
    <>
      {isAdmin && (
        <div className="container admin-bar">
          <span className="admin-bar-tag">Modo admin ativo</span>
          <button type="button" className="admin-logout-btn" onClick={handleLogout}>
            Sair
          </button>
        </div>
      )}

      <nav className="menu-nav">
        <div className="menu-nav-inner">
          {menu.map((section) => (
            <a key={section.slug} href={`#${section.slug}`}>
              {section.icon} {section.title}
            </a>
          ))}
        </div>
      </nav>

      <ProductList menu={menu} isAdmin={isAdmin} onAuthError={handleLogout} />
    </>
  );
}
