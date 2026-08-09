export type Category = {
  slug: string;
  icon: string;
  title: string;
  desc: string;
};

export type Product = {
  name: string;
  desc: string;
  price: string;
};

export type MenuSection = {
  slug: string;
  icon: string;
  title: string;
  items: Product[];
};

export const categories: Category[] = [
  {
    slug: "cervejas",
    icon: "🍺",
    title: "Cervejas",
    desc: "Long neck, lata e garrafa 600ml das principais marcas.",
  },
  {
    slug: "refrigerantes",
    icon: "🥤",
    title: "Refrigerantes",
    desc: "Lata, 1L e 2L pra qualquer ocasião.",
  },
  {
    slug: "aguas-isotonicos",
    icon: "💧",
    title: "Águas e Isotônicos",
    desc: "Com e sem gás, e isotônicos pra reposição.",
  },
  {
    slug: "energeticos",
    icon: "⚡",
    title: "Energéticos",
    desc: "Pra dar aquele gás na balada ou no dia a dia.",
  },
  {
    slug: "destilados",
    icon: "🥃",
    title: "Destilados",
    desc: "Whisky, vodka, gin e rum das marcas mais pedidas.",
  },
  {
    slug: "vinhos-espumantes",
    icon: "🍷",
    title: "Vinhos e Espumantes",
    desc: "Pra brindar em qualquer comemoração.",
  },
  {
    slug: "gelo",
    icon: "🧊",
    title: "Gelo",
    desc: "Pacote de gelo em cubo, sempre disponível.",
  },
];

export const menu: MenuSection[] = [
  {
    slug: "cervejas",
    icon: "🍺",
    title: "Cervejas",
    items: [
      { name: "Skol Lata 350ml", desc: "Pack com 12 unidades", price: "R$ 42,00" },
      { name: "Brahma Long Neck 355ml", desc: "Pack com 12 unidades", price: "R$ 54,00" },
      { name: "Heineken Long Neck 330ml", desc: "Pack com 12 unidades", price: "R$ 72,00" },
      { name: "Original 600ml", desc: "Unidade", price: "R$ 9,50" },
      { name: "Stella Artois Lata 350ml", desc: "Pack com 12 unidades", price: "R$ 58,00" },
    ],
  },
  {
    slug: "refrigerantes",
    icon: "🥤",
    title: "Refrigerantes",
    items: [
      { name: "Coca-Cola 2L", desc: "Unidade", price: "R$ 11,00" },
      { name: "Guaraná Antarctica 2L", desc: "Unidade", price: "R$ 10,00" },
      { name: "Fanta Laranja 2L", desc: "Unidade", price: "R$ 10,00" },
      { name: "Coca-Cola Lata 350ml", desc: "Pack com 12 unidades", price: "R$ 45,00" },
    ],
  },
  {
    slug: "aguas-isotonicos",
    icon: "💧",
    title: "Águas e Isotônicos",
    items: [
      { name: "Água Mineral 500ml", desc: "Pack com 12 unidades", price: "R$ 22,00" },
      { name: "Água com Gás 500ml", desc: "Pack com 12 unidades", price: "R$ 26,00" },
      { name: "Gatorade 500ml", desc: "Unidade", price: "R$ 7,50" },
    ],
  },
  {
    slug: "energeticos",
    icon: "⚡",
    title: "Energéticos",
    items: [
      { name: "Red Bull 250ml", desc: "Unidade", price: "R$ 10,00" },
      { name: "Monster Energy 473ml", desc: "Unidade", price: "R$ 12,00" },
      { name: "TNT Energy Drink 269ml", desc: "Pack com 6 unidades", price: "R$ 24,00" },
    ],
  },
  {
    slug: "destilados",
    icon: "🥃",
    title: "Destilados",
    items: [
      { name: "Vodka Smirnoff 998ml", desc: "Unidade", price: "R$ 45,00" },
      { name: "Whisky Red Label 1L", desc: "Unidade", price: "R$ 110,00" },
      { name: "Gin Tanqueray 750ml", desc: "Unidade", price: "R$ 130,00" },
      { name: "Rum Bacardi 980ml", desc: "Unidade", price: "R$ 55,00" },
    ],
  },
  {
    slug: "vinhos-espumantes",
    icon: "🍷",
    title: "Vinhos e Espumantes",
    items: [
      { name: "Vinho Tinto Seco 750ml", desc: "Unidade", price: "R$ 35,00" },
      { name: "Espumante Brut 750ml", desc: "Unidade", price: "R$ 40,00" },
      { name: "Vinho Branco Suave 750ml", desc: "Unidade", price: "R$ 32,00" },
    ],
  },
  {
    slug: "gelo",
    icon: "🧊",
    title: "Gelo",
    items: [
      { name: "Pacote de Gelo 2kg", desc: "Gelo em cubo", price: "R$ 8,00" },
      { name: "Pacote de Gelo 5kg", desc: "Gelo em cubo", price: "R$ 15,00" },
    ],
  },
];