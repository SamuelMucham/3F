import type { Metadata } from "next";
import { menu } from "@/lib/menu-data";
import ProductList from "@/components/ProductList";
import DeliveryInfo from "@/components/DeliveryInfo";

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

      <ProductList />

      <DeliveryInfo />
    </>
  );
}
