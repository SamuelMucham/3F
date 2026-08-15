"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";

const WHATSAPP_NUMBER = "554197214733";

const PAYMENT_OPTIONS = ["Pix", "Cartão na entrega", "Dinheiro"];

// Chave Pix (NG Cash)
const PIX_KEY = "46602971000102";
const PIX_HOLDER = "3F Bebidas";

// Coordenadas da 3F Bebidas (R. Sebastião Penteado Darcanchy, 313 - Campo de Santana, Curitiba - PR)
const STORE_LAT = -25.592687;
const STORE_LNG = -49.3314627;
const RATE_PER_KM = 3; // R$ por KM de distância

function parsePrice(price: string): number {
  const digits = price.replace(/[^\d,]/g, "").replace(",", ".");
  return parseFloat(digits) || 0;
}

function formatTotal(value: number): string {
  return value.toFixed(2).replace(".", ",");
}

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

// Distância em linha reta (fórmula de Haversine), em KM
function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

async function geocodeAddress(address: string): Promise<{ lat: number; lng: number } | null> {
  const query = `${address}, Curitiba, PR, Brasil`;
  const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(
    query
  )}`;

  const res = await fetch(url, {
    headers: { "Accept-Language": "pt-BR" },
  });

  if (!res.ok) return null;

  const data = await res.json();
  if (!Array.isArray(data) || data.length === 0) return null;

  return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
}

type FreteStatus = "idle" | "loading" | "ok" | "error";

export default function CartWidget() {
  const { items, removeItem, updateQuantity, clearCart, totalItems } = useCart();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [reference, setReference] = useState("");
  const [payment, setPayment] = useState(PAYMENT_OPTIONS[0]);
  const [needsChange, setNeedsChange] = useState<"sim" | "nao" | "">("");
  const [changeFor, setChangeFor] = useState("");
  const [pixCopied, setPixCopied] = useState(false);
  const [touched, setTouched] = useState(false);

  const [freteStatus, setFreteStatus] = useState<FreteStatus>("idle");
  const [freteError, setFreteError] = useState("");
  const [distanceKm, setDistanceKm] = useState<number | null>(null);
  const [deliveryFee, setDeliveryFee] = useState<number | null>(null);

  const subtotal = items.reduce(
    (sum, item) => sum + parsePrice(item.price) * item.quantity,
    0
  );

  const grandTotal = subtotal + (deliveryFee ?? 0);

  const addressValid =
    street.trim().length > 0 && number.trim().length > 0 && neighborhood.trim().length > 0;

  const fullAddress = `${street.trim()}, ${number.trim()} - ${neighborhood.trim()}`;

  const deliveryValid = name.trim().length > 0 && addressValid && freteStatus === "ok";

  // qualquer alteração em rua/número/bairro invalida o frete calculado anteriormente
  function resetFrete() {
    if (freteStatus !== "idle") {
      setFreteStatus("idle");
      setDistanceKm(null);
      setDeliveryFee(null);
      setFreteError("");
    }
  }

  function resetPix() {
    setPixCopied(false);
  }

  function handlePaymentChange(option: string) {
    setPayment(option);
    if (option !== "Dinheiro") {
      setNeedsChange("");
      setChangeFor("");
    }
    if (option !== "Pix") {
      resetPix();
    }
  }

  async function handleCopyPix() {
    try {
      await navigator.clipboard.writeText(PIX_KEY);
      setPixCopied(true);
      setTimeout(() => setPixCopied(false), 2500);
    } catch {
      setPixCopied(false);
    }
  }

  function handleStreetChange(value: string) {
    setStreet(value);
    resetFrete();
  }

  function handleNumberChange(value: string) {
    setNumber(value);
    resetFrete();
  }

  function handleNeighborhoodChange(value: string) {
    setNeighborhood(value);
    resetFrete();
  }

  async function handleCalcularFrete() {
    if (!addressValid) {
      setTouched(true);
      return;
    }

    setFreteStatus("loading");
    setFreteError("");

    try {
      const coords = await geocodeAddress(fullAddress);

      if (!coords) {
        setFreteStatus("error");
        setFreteError("Não encontramos esse endereço. Inclua rua, número e bairro.");
        setDistanceKm(null);
        setDeliveryFee(null);
        return;
      }

      const km = haversineKm(STORE_LAT, STORE_LNG, coords.lat, coords.lng);
      const fee = km * RATE_PER_KM;

      setDistanceKm(km);
      setDeliveryFee(fee);
      setFreteStatus("ok");
    } catch {
      setFreteStatus("error");
      setFreteError("Erro ao calcular o frete. Tente novamente.");
      setDistanceKm(null);
      setDeliveryFee(null);
    }
  }

  function handleCheckout() {
    if (items.length === 0) return;

    if (!deliveryValid) {
      setTouched(true);
      if (freteStatus !== "ok" && addressValid) {
        handleCalcularFrete();
      }
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
      `Subtotal produtos: R$ ${formatTotal(subtotal)}`,
      `Taxa de entrega (${distanceKm ? distanceKm.toFixed(1) : "0"} km): R$ ${formatTotal(
        deliveryFee ?? 0
      )}`,
      `Total do pedido: R$ ${formatTotal(grandTotal)}`,
      "",
      "--- Dados para entrega ---",
      `Nome: ${name}`,
      `Endereço: ${fullAddress}`,
      reference ? `Referência: ${reference}` : null,
      `Pagamento: ${payment}`,
      payment === "Pix"
        ? "⚠️ Envie o comprovante do Pix aqui pra confirmarmos o pedido."
        : null,
      payment === "Dinheiro" && needsChange === "sim" && changeFor.trim()
        ? `Troco para R$ ${changeFor.trim()}: R$ ${formatTotal(
            Math.max(parsePrice(changeFor) - grandTotal, 0)
          )}`
        : null,
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
                  <span>Subtotal produtos</span>
                  <strong>R$ {formatTotal(subtotal)}</strong>
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
                    <label htmlFor="cart-street">Rua</label>
                    <input
                      id="cart-street"
                      type="text"
                      value={street}
                      onChange={(e) => handleStreetChange(e.target.value)}
                      placeholder="Nome da rua"
                    />
                    {touched && !street.trim() && (
                      <span className="delivery-error">Preencha a rua</span>
                    )}
                  </div>

                  <div className="delivery-field">
                    <label htmlFor="cart-number">Número</label>
                    <input
                      id="cart-number"
                      type="text"
                      value={number}
                      onChange={(e) => handleNumberChange(e.target.value)}
                      placeholder="Número"
                    />
                    {touched && !number.trim() && (
                      <span className="delivery-error">Preencha o número</span>
                    )}
                  </div>

                  <div className="delivery-field">
                    <label htmlFor="cart-neighborhood">Bairro</label>
                    <input
                      id="cart-neighborhood"
                      type="text"
                      value={neighborhood}
                      onChange={(e) => handleNeighborhoodChange(e.target.value)}
                      placeholder="Bairro"
                    />
                    {touched && !neighborhood.trim() && (
                      <span className="delivery-error">Preencha o bairro</span>
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

                  <div className="frete-box">
                    <button
                      type="button"
                      className="frete-calc-btn"
                      onClick={handleCalcularFrete}
                      disabled={freteStatus === "loading"}
                    >
                      {freteStatus === "loading"
                        ? "Calculando..."
                        : freteStatus === "ok"
                        ? "Recalcular frete"
                        : "Calcular frete"}
                    </button>

                    {freteStatus === "ok" && distanceKm !== null && deliveryFee !== null && (
                      <div className="frete-result">
                        <span>
                          Distância aprox.: <strong>{distanceKm.toFixed(1)} km</strong>
                        </span>
                        <span>
                          Taxa de entrega: <strong>R$ {formatTotal(deliveryFee)}</strong>
                        </span>
                      </div>
                    )}

                    {freteStatus === "error" && (
                      <span className="delivery-error">{freteError}</span>
                    )}
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
                            onChange={() => handlePaymentChange(option)}
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </div>

                  {payment === "Pix" && (
                    <div className="delivery-field pix-field">
                      <label>Chave Pix</label>
                      <div className="pix-box">
                        <div className="pix-info">
                          <span className="pix-key">{PIX_KEY}</span>
                          <span className="pix-holder">{PIX_HOLDER}</span>
                        </div>
                        <button type="button" className="pix-copy-btn" onClick={handleCopyPix}>
                          {pixCopied ? "Copiado!" : "Copiar"}
                        </button>
                      </div>
                      <span className="pix-note">
                        Depois de pagar, envie o comprovante aqui no WhatsApp junto com o
                        pedido.
                      </span>
                    </div>
                  )}

                  {payment === "Dinheiro" && (
                    <div className="delivery-field change-field">
                      <label>Vai precisar de troco?</label>
                      <div className="delivery-payment-options">
                        <label className="delivery-payment-option">
                          <input
                            type="radio"
                            name="needsChange"
                            checked={needsChange === "sim"}
                            onChange={() => setNeedsChange("sim")}
                          />
                          Sim
                        </label>
                        <label className="delivery-payment-option">
                          <input
                            type="radio"
                            name="needsChange"
                            checked={needsChange === "nao"}
                            onChange={() => {
                              setNeedsChange("nao");
                              setChangeFor("");
                            }}
                          />
                          Não
                        </label>
                      </div>

                      {needsChange === "sim" && (
                        <div className="change-amount">
                          <label htmlFor="cart-change-for">Troco para quanto?</label>
                          <input
                            id="cart-change-for"
                            type="text"
                            inputMode="numeric"
                            value={changeFor}
                            onChange={(e) => setChangeFor(e.target.value)}
                            placeholder="Ex: 100"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="cart-total cart-total-final">
                  <span>Total com entrega</span>
                  <strong>R$ {formatTotal(grandTotal)}</strong>
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