import { Food } from "./types";

// [nome, kcal, proteína, hidratos, gordura] por 100g
const RAW: [string, number, number, number, number][] = [
  ["Arroz branco cozido", 130, 2.7, 28, 0.3],
  ["Arroz integral cozido", 123, 2.6, 25, 1],
  ["Massa cozida", 131, 5, 25, 1.1],
  ["Massa integral cozida", 124, 5, 25, 1],
  ["Pão de trigo", 265, 9, 49, 3.2],
  ["Pão integral", 247, 13, 41, 3.4],
  ["Pão de forma", 265, 8.5, 49, 3.3],
  ["Batata cozida", 87, 1.9, 20, 0.1],
  ["Batata frita", 312, 3.4, 41, 15],
  ["Batata-doce cozida", 90, 2, 21, 0.1],
  ["Puré de batata", 113, 2, 17, 4],
  ["Peito de frango grelhado", 165, 31, 0, 3.6],
  ["Coxa de frango", 209, 26, 0, 10.9],
  ["Carne de vaca magra grelhada", 217, 26, 0, 12],
  ["Bife de vaca", 250, 26, 0, 15],
  ["Peixe (pescada) cozido", 90, 18, 0, 1.3],
  ["Salmão grelhado", 208, 20, 0, 13],
  ["Atum em água (escorrido)", 116, 26, 0, 1],
  ["Bacalhau cozido", 105, 23, 0, 0.7],
  ["Ovo cozido", 155, 13, 1.1, 11],
  ["Ovo estrelado", 196, 14, 0.4, 15],
  ["Iogurte natural", 61, 3.5, 4.7, 3.3],
  ["Iogurte magro", 56, 4.8, 6.8, 0.5],
  ["Iogurte grego natural", 97, 9, 4, 5],
  ["Leite meio-gordo", 47, 3.4, 4.9, 1.6],
  ["Queijo fresco", 98, 12, 3.4, 4],
  ["Queijo flamengo", 356, 25, 0, 28],
  ["Feijão cozido", 127, 8.7, 22, 0.5],
  ["Grão-de-bico cozido", 164, 8.9, 27, 2.6],
  ["Lentilhas cozidas", 116, 9, 20, 0.4],
  ["Húmus", 166, 7.9, 14, 9.6],
  ["Quinoa cozida", 120, 4.4, 21, 1.9],
  ["Brócolos cozidos", 35, 2.4, 7, 0.4],
  ["Espinafres cozidos", 23, 2.9, 3.6, 0.4],
  ["Cenoura crua", 41, 0.9, 10, 0.2],
  ["Tomate", 18, 0.9, 3.9, 0.2],
  ["Alface", 15, 1.4, 2.9, 0.2],
  ["Cebola", 40, 1.1, 9.3, 0.1],
  ["Courgette", 17, 1.2, 3.1, 0.3],
  ["Sopa de legumes", 35, 1.5, 6, 0.5],
  ["Banana", 89, 1.1, 23, 0.3],
  ["Maçã", 52, 0.3, 14, 0.2],
  ["Laranja", 47, 0.9, 12, 0.1],
  ["Uvas", 69, 0.7, 18, 0.2],
  ["Morangos", 32, 0.7, 7.7, 0.3],
  ["Melancia", 30, 0.6, 8, 0.2],
  ["Abacate", 160, 2, 8.5, 15],
  ["Azeite", 884, 0, 0, 100],
  ["Manteiga", 717, 0.9, 0.1, 81],
  ["Amêndoas", 579, 21, 22, 50],
  ["Nozes", 654, 15, 14, 65],
  ["Amendoim", 567, 26, 16, 49],
  ["Cereais integrais", 379, 13, 68, 4],
  ["Aveia", 389, 17, 66, 7],
  ["Açúcar", 387, 0, 100, 0],
  ["Mel", 304, 0.3, 82, 0],
  ["Chocolate preto 70%", 598, 7.8, 46, 43],
  ["Chocolate de leite", 535, 7.6, 59, 30],
  ["Bolachas Maria", 435, 7, 75, 12],
  ["Presunto", 145, 22, 1, 6],
  ["Fiambre de peru", 104, 17, 2, 3],
  ["Salsicha", 301, 12, 3, 27],
  ["Chouriço", 455, 24, 2, 38],
  // Líquidos e bebidas (valores por 100ml)
  ["Café (bica/expresso)", 2, 0.1, 0.3, 0],
  ["Galão", 38, 1.9, 3, 1.5],
  ["Meia de leite", 30, 1.6, 2.4, 0.8],
  ["Chá (infusão simples)", 1, 0, 0.2, 0],
  ["Leite gordo", 61, 3.2, 4.8, 3.6],
  ["Leite magro/desnatado", 35, 3.4, 5, 0.1],
  ["Iogurte líquido natural", 62, 3.2, 4.7, 3.4],
  ["Iogurte líquido aromatizado", 65, 2.8, 10, 1.5],
  ["Refrigerante tipo cola", 42, 0, 10.6, 0],
  ["Sumo de laranja natural", 45, 0.7, 10, 0.2],
  ["Cerveja", 43, 0.5, 3.6, 0],
  ["Vinho tinto", 85, 0.1, 2.6, 0],
  ["Água de coco", 19, 0.7, 3.7, 0.2],
  ["Chocolate quente (leite + cacau)", 85, 3.4, 10, 3.5],
];

function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}

export const FOOD_DB: Food[] = RAW.map(([name, kcal, p, c, f]) => ({
  id: uid(),
  name,
  kcal,
  p,
  c,
  f,
}));

export function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function searchFoods(query: string, limit = 20): Food[] {
  const nq = normalize(query);
  if (!nq.trim()) return [];
  return FOOD_DB.filter((f) => normalize(f.name).includes(nq)).slice(0, limit);
}
