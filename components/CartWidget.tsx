"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";

const WHATSAPP_NUMBER = "554197214733";

const PAYMENT_OPTIONS = ["Pix", "Cartão na entrega", "Dinheiro"];

function parsePrice(price: string): number {
  const digits = price.replace(/[^\d,]/g, "").replace(",", ".");
  return parseFloat(digits) || 0;
}

function formatTotal(value: number): string {
  return value.toFixed(2).replace(".", ",");
}

export default function CartWidget() {
  const { items, removeItem, updateQuantity, clearCart, totalItems } = useCart();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [reference, setReference] = useState("");
  const [payment, setPayment] = useState(PAYMENT_OPTIONS[0]);
  const [touched, setTouched] = useState(false);

  const total = items.reduce(
    (sum, item) => sum + parsePrice(item.price) * item.quantity,
    0
  );

  const deliveryValid = name.trim().length > 0 && address.trim().length > 0;

  function handleCheckout() {
    if (items.length === 0) return;

    if (!deliveryValid) {
      setTouched(true);
      return;
    }

    const lines = items.map(
      (item) => `• ${item.quantity}x ${item.name} — ${item.price}`
    );

    const message = [
      "Olá! Quero fazer um pedido na 3F Bebidas:",
      "",
      ...lines,
      "",
      `Total estimado: R$ ${formatTotal(total)}`,
      "",
      "--- Dados para entrega ---",
      `Nome: ${name}`,
      `Endereço: ${address}`,
      reference ? `Referência: ${reference}` : null,
      `Pagamento: ${payment}`,
    ]
      .filter(Boolean)
      .join("\n");

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <>
      <button
        type="button"
        className="cart-fab"
        onClick={() => setOpen(true)}
        aria-label="Abrir carrinho de compras"
      >
        🛒
        {totalItems > 0 && <span className="cart-fab-badge">{totalItems}</span>}
      </button>

      {open && (
        <div className="cart-overlay" onClick={() => setOpen(false)}>
          <div
            className="cart-drawer"
            role="dialog"
            aria-label="Carrinho de compras"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cart-drawer-head">
              <h3 className="display">Seu Pedido</h3>
              <button
                type="button"
                className="cart-close"
                onClick={() => setOpen(false)}
                aria-label="Fechar carrinho"
              >
                ✕
              </button>
            </div>

            {items.length === 0 ? (
              <p className="cart-empty">
                Seu carrinho está vazio. Adicione produtos lá no catálogo.
              </p>
            ) : (
              <>
                <div className="cart-items">
                  {items.map((item) => (
                    <div key={item.name} className="cart-item">
                      <div className="cart-item-info">
                        <span className="cart-item-name">{item.name}</span>
                        <span className="cart-item-price">{item.price}</span>
                      </div>
                      <div className="cart-item-controls">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.name, item.quantity - 1)}
                          aria-label={`Diminuir quantidade de ${item.name}`}
                        >
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.name, item.quantity + 1)}
                          aria-label={`Aumentar quantidade de ${item.name}`}
                        >
                          +
                        </button>
                        <button
                          type="button"
                          className="cart-remove"
                          onClick={() => removeItem(item.name)}
                          aria-label={`Remover ${item.name}`}
                        >
                          🗑
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cart-total">
                  <span>Total estimado</span>
                  <strong>R$ {formatTotal(total)}</strong>
                </div>

                <div className="delivery-form">
                  <h4>Dados para entrega</h4>

                  <div className="delivery-field">
                    <label htmlFor="cart-name">Nome</label>
                    <input
                      id="cart-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Seu nome"
                    />
                    {touched && !name.trim() && (
                      <span className="delivery-error">Preencha seu nome</span>
                    )}
                  </div>

                  <div className="delivery-field">
                    <label htmlFor="cart-address">Endereço completo</label>
                    <input
                      id="cart-address"
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Rua, número, bairro"
                    />
                    {touched && !address.trim() && (
                      <span className="delivery-error">Preencha o endereço</span>
                    )}
                  </div>

                  <div className="delivery-field">
                    <label htmlFor="cart-reference">Ponto de referência (opcional)</label>
                    <input
                      id="cart-reference"
                      type="text"
                      value={reference}
                      onChange={(e) => setReference(e.target.value)}
                      placeholder="Ex: portão azul, perto do mercado"
                    />
                  </div>

                  <div className="delivery-field">
                    <label>Forma de pagamento</label>
                    <div className="delivery-payment-options">
                      {PAYMENT_OPTIONS.map((option) => (
                        <label key={option} className="delivery-payment-option">
                          <input
                            type="radio"
                            name="payment"
                            value={option}
                            checked={payment === option}
                            onChange={() => setPayment(option)}
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <button type="button" className="cta-button cart-checkout" onClick={handleCheckout}>
                  Finalizar no WhatsApp
                </button>
                <button type="button" className="cart-clear" onClick={clearCart}>
                  Esvaziar carrinho
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
