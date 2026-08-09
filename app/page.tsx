import Link from "next/link";
import { categories } from "@/lib/menu-data";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">Entrega todos os dias · 10h às 23h</span>
            <h1 className="display">
              Bebida <em>gelada</em>,<br />na sua porta
            </h1>
            <p className="hero-sub">
              Cerveja, refrigerante, destilado, vinho e gelo. Tudo num só pedido,
              direto no WhatsApp.
            </p>
            <div className="hero-actions">
              <Link href="/produtos" className="cta-button">Ver Catálogo Completo</Link>
              
                <a className="cta-button"
          href="https://wa.me/5500000000000"
          target="_blank"
          rel="noopener noreferrer">
                Peça no WhatsApp
              </a>
            </div>
          </div>
          <div className="neck-tag">
            <span className="eyebrow">Catálogo</span>
            <strong>7 categorias</strong>
            <p>De cerveja a espumante, com gelo pra fechar o pedido.</p>
          </div>
        </div>
      </section>

      <section className="categories">
        <div className="container">
          <div className="section-head">
            <h2 className="display">O que temos</h2>
          </div>
          <div className="category-grid">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/produtos#${cat.slug}`}
                className="category-card tag-card"
              >
                <span className="icon">{cat.icon}</span>
                <h3>{cat.title}</h3>
                <p>{cat.desc}</p>
                <span className="see-more">Ver itens →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="how-to">
        <div className="container how-to-grid">
          <div>
            <span className="num">01</span>
            <h4 className="display">Chama no Whats</h4>
            <p>Manda sua lista de bebidas pelo WhatsApp.</p>
          </div>
          <div>
            <span className="num">02</span>
            <h4 className="display">Confirma o pedido</h4>
            <p>A gente confirma itens, valor e forma de pagamento.</p>
          </div>
          <div>
            <span className="num">03</span>
            <h4 className="display">Recebe gelado</h4>
            <p>Pix, cartão ou dinheiro na entrega.</p>
          </div>
        </div>
      </section>

      <section className="home-cta">
        <div className="container">
          <h2 className="display">Vai ter reunião hoje?</h2>
          <p>Dá uma olhada no catálogo completo e monta seu pedido.</p>
          <Link href="/produtos" className="cta-button">Ver Catálogo</Link>
        </div>
      </section>
    </>
  );
}