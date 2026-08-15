import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contato | 3F Bebidas",
};

export default function Contato() {
  return (
    <section className="container contact-wrap">
      <div className="contact-block">
        <span className="eyebrow">Fala com a gente</span>
        <h1 className="display">Contato</h1>
        <p>Chama no WhatsApp pra pedir, tirar dúvida ou combinar a entrega.</p>

        <div className="info-row">
          <span className="icon">📍</span>
          <div>
            <h4>Endereço</h4>
            <p>R. Sebastião Penteado Darcanchy, 313 - Campo de Santana, Curitiba - PR</p>
          </div>
        </div>
        <div className="info-row">
          <span className="icon">📞</span>
          <div>
            <h4>WhatsApp</h4>
            <a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer">
              (41) 997214733
            </a>
          </div>
        </div>
        <div className="info-row">
          <span className="icon">🕒</span>
          <div>
            <h4>Horário</h4>
            <p>Todos os dias, 10h às 23h</p>
          </div>
        </div>

        <div className="social-row">
          <a href="https://instagram.com/3fbebidas" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </div>

      <iframe
        className="map-panel"
        src="https://www.google.com/maps?q=3F+Distribuidora+de+Bebidas,+R.+Sebasti%C3%A3o+Penteado+Darcanchy,+313,+Curitiba+-+PR&ll=-25.592687,-49.3314627&z=17&output=embed"
        title="Localização da 3F Bebidas"
        height={360}
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />
    </section>
  );
}