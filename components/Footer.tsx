import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h5>3F Bebidas</h5>
            <p>Cervejas, refrigerantes, destilados, vinhos e gelo, sempre geladinhos e entregues rápido.</p>
          </div>
          <div>
            <h5>Navegação</h5>
            <ul>
              <li><Link href="/">Início</Link></li>
              <li><Link href="/produtos">Produtos</Link></li>
              <li><Link href="/sobre">Sobre</Link></li>
              <li><Link href="/contato">Contato</Link></li>
            </ul>
          </div>
          <div>
            <h5>Horário</h5>
            <p>Todos os dias</p>
            <p>10h às 23h</p>
          </div>
        </div>
        <p className="footer-disclaimer">
          <strong>Venda de bebidas alcoólicas proibida para menores de 18 anos.</strong> Beba com moderação.
        </p>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} 3F Bebidas</span>
          <span>Sempre gelada, sempre rápida</span>
        </div>
      </div>
    </footer>
  );
}