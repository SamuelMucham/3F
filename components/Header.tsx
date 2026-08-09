import Link from "next/link";

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="logo">
          3F<span>Bebidas</span>
        </Link>
        <nav className="main-nav">
          <Link href="/">Início</Link>
          <Link href="/produtos">Produtos</Link>
          <Link href="/sobre">Sobre</Link>
          <Link href="/contato">Contato</Link>
        </nav>
        
          <a className="cta-button"
          href="https://wa.me/5500000000000"
          target="_blank"
          rel="noopener noreferrer"
        >
          Peça no WhatsApp
        </a>
      </div>
    </header>
  );
}