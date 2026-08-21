import type { Metadata } from "next";
import { fetchMenu } from "@/lib/menu-api";
import ProdutosClient from "@/components/ProdutosClient";
import DeliveryInfo from "@/components/DeliveryInfo";

export const metadata: Metadata = {
  title: "Produtos | 3F Bebidas",
};

export default async function Produtos() {
  const menu = await fetchMenu();

  return (
    <>
      <section className="menu-header">
        <div className="container">
          <span className="eyebrow">Catálogo completo</span>
          <h1 className="display">Produtos</h1>
        </div>
      </section>

      <ProdutosClient menu={menu} />

      <DeliveryInfo />
    </>
  );
}
