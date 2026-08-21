"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="logo-wrap">
          <Link href="/" className="logo" onClick={() => setOpen(false)}>
            3F<span>Bebidas</span>
          </Link>
          <Link href="/admin/login" className="admin-header-link" onClick={() => setOpen(false)}>
            Admin
          </Link>
        </div>

        <nav className="main-nav">
          <Link href="/">Início</Link>
          <Link href="/produtos">Produtos</Link>
          <Link href="/sobre">Sobre</Link>
          <Link href="/contato">Contato</Link>
        </nav>

        <div className="header-actions">
          <a
            className="cta-button cta-button-desktop"
            href="https://wa.me/554197214733"
            target="_blank"
            rel="noopener noreferrer"
          >
            Peça no WhatsApp
          </a>

          <button
            type="button"
            className={`menu-toggle${open ? " is-open" : ""}`}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" className="mobile-nav" aria-label="Menu principal">
          <Link href="/" onClick={() => setOpen(false)}>
            Início
          </Link>
          <Link href="/produtos" onClick={() => setOpen(false)}>
            Produtos
          </Link>
          <Link href="/sobre" onClick={() => setOpen(false)}>
            Sobre
          </Link>
          <Link href="/contato" onClick={() => setOpen(false)}>
            Contato
          </Link>
          <a
            className="cta-button"
            href="https://wa.me/554197214733"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
          >
            Peça no WhatsApp
          </a>
        </nav>
      )}
    </header>
  );
}