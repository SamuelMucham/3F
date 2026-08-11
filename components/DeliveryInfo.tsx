export default function DeliveryInfo() {
  return (
    <section className="delivery-info">
      <div className="container delivery-info-grid">
        <div>
          <span className="eyebrow">Delivery</span>
          <h2 className="display">Como funciona a entrega</h2>
          <p>
            Depois de montar seu pedido no carrinho, é só finalizar no WhatsApp.
            A gente confirma os itens, o valor e o prazo antes de sair pra entrega.
          </p>
        </div>
        <div className="delivery-info-cards">
          <div className="delivery-card">
            <span className="icon">🕒</span>
            <h4>Horário de entrega</h4>
            <p>Todos os dias, das 10h às 23h</p>
          </div>
          <div className="delivery-card">
            <span className="icon">⏱️</span>
            <h4>Tempo médio</h4>
            <p>30 a 60 minutos, dependendo da região</p>
          </div>
          <div className="delivery-card">
            <span className="icon">💳</span>
            <h4>Formas de pagamento</h4>
            <p>Pix, cartão de crédito/débito na entrega ou dinheiro</p>
          </div>
          <div className="delivery-card">
            <span className="icon">📦</span>
            <h4>Como pedir</h4>
            <p>Adicione os produtos no carrinho e finalize pelo WhatsApp</p>
          </div>
        </div>
      </div>
    </section>
  );
}
