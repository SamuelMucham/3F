import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre | 3F Bebidas",
};

export default function Sobre() {
  return (
    <>
      <section className="about-hero">
        <div className="container">
          <span className="eyebrow">Quem entrega até você</span>
          <h1 className="display">Sobre a 3F Bebidas</h1>
        </div>
      </section>

      <section className="diff-list">
        <div className="container">
          <div className="diff-item">
            <span className="num">01</span>
            <div>
              <h3 className="display">Mix completo</h3>
              <p>De cerveja a espumante, com gelo pra fechar o pedido — sem precisar ir a outro lugar.</p>
            </div>
          </div>
          <div className="diff-item">
            <span className="num">02</span>
            <div>
              <h3 className="display">Sempre geladas</h3>
              <p>Estoque refrigerado o dia todo, pronto pra sair na hora do pedido.</p>
            </div>
          </div>
          <div className="diff-item">
            <span className="num">03</span>
            <div>
              <h3 className="display">Atendimento direto</h3>
              <p>Pedido, dúvida e combinação de entrega, tudo pelo WhatsApp.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}