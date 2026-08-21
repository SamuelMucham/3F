export type Product = {
  id: string;
  name: string;
  desc: string;
  price: string;
};

export type MenuSection = {
  slug: string;
  icon: string;
  title: string;
  categoryDesc: string;
  items: Product[];
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Usado nos Server Components (home, produtos) pra buscar o cardápio
// público direto do backend, sem precisar de token.
export async function fetchMenu(): Promise<MenuSection[]> {
  const res = await fetch(`${API_URL}/menu`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Não foi possível carregar o cardápio da API.");
  }
  return res.json();
}

export async function fetchCategories() {
  const menu = await fetchMenu();
  return menu.map(({ slug, icon, title, categoryDesc }) => ({
    slug,
    icon,
    title,
    desc: categoryDesc,
  }));
}
