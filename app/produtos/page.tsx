import type { Metadata } from "next";
import { menu } from "@/lib/menu-data";

export const metadata: Metadata = {
  title: "Produtos | 3F Bebidas",
};

export default function Produtos() {
  return (
    <>
      <section className="menu-header">
        <div className="container">
          <span className="eyebrow">Catálogo completo</span>
          <h1 className="display">Produtos</h1>
        </div>
      </section>

      <nav className="menu-nav">
        <div className="menu-nav-inner">
          {menu.map((section) => (
            <a key={section.slug} href={`#${section.slug}`}>
              {section.icon} {section.title}
            </a>
          ))}
        </div>
      </nav>

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
                  <span className="menu-item-price">{item.price}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}