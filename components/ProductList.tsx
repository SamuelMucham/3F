"use client";

import { menu } from "@/lib/menu-data";
import { useCart } from "@/lib/cart-context";

export default function ProductList() {
  const { addItem } = useCart();

  return (
    <>
      {menu.map((section) => (
        <section key={section.slug} id={section.slug} className="menu-section">
          <div className="container">
            <div className="menu-section-head">
              <span className="icon">{section.icon}</span>
              <h2 className="display">{section.title}</h2>
            </div>
            <div className="menu-list">
              {section.items.map((item) => (
                <div key={item.name} className="menu-item">
                  <span className="menu-item-name">
                    {item.name}
                    <span className="menu-item-desc">{item.desc}</span>
                  </span>
                  <div className="menu-item-right">
                    <span className="menu-item-price">{item.price}</span>
                    <button
                      type="button"
                      className="menu-item-add"
                      onClick={() => addItem(item.name, item.price)}
                    >
                      Adicionar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
