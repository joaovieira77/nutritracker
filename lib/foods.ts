import { Food } from "./types";

// [nome, kcal, proteína, hidratos, gordura] por 100g
const RAW: [string, number, number, number, number][] = [
  // Cereais, massas e pão
  ["Arroz branco cozido", 130, 2.7, 28, 0.3],
  ["Arroz integral cozido", 123, 2.6, 25, 1],
  ["Massa cozida", 131, 5, 25, 1.1],
  ["Massa integral cozida", 124, 5, 25, 1],
  ["Pão de trigo", 265, 9, 49, 3.2],
  ["Pão integral", 247, 13, 41, 3.4],
  ["Pão de forma", 265, 8.5, 49, 3.3],
  ["Pão de leite", 280, 9, 50, 5],
  ["Broa de milho", 250, 6, 50, 3],
  ["Bulgur cozido", 83, 3, 19, 0.2],
  ["Cuscuz cozido", 112, 3.8, 23, 0.2],
  ["Quinoa cozida", 120, 4.4, 21, 1.9],
  ["Arroz de cenoura", 135, 2.5, 24, 3.2],

  // Batatas
  ["Batata cozida", 87, 1.9, 20, 0.1],
  ["Batata frita", 312, 3.4, 41, 15],
  ["Batata-doce cozida", 90, 2, 21, 0.1],
  ["Puré de batata", 113, 2, 17, 4],

  // Carnes
  ["Peito de frango grelhado", 165, 31, 0, 3.6],
  ["Coxa de frango", 209, 26, 0, 10.9],
  ["Carne de vaca magra grelhada", 217, 26, 0, 12],
  ["Bife de vaca", 250, 26, 0, 15],
  ["Carne picada de vaca (magra) cozinhada", 215, 26, 0, 12],
  ["Hambúrguer de vaca grelhado", 254, 25, 0, 17],
  ["Perna de porco assada", 242, 27, 0, 14],
  ["Lombo de porco grelhado", 173, 27, 0, 7],
  ["Costeletas de porco", 231, 25, 0, 14],
  ["Febras de porco grelhadas", 178, 28, 0, 7],
  ["Borrego grelhado", 258, 25, 0, 17],
  ["Peito de peru grelhado", 135, 29, 0, 1.7],
  ["Vitela grelhada", 172, 29, 0, 5.4],
  ["Presunto", 145, 22, 1, 6],
  ["Fiambre de peru", 104, 17, 2, 3],
  ["Salsicha", 301, 12, 3, 27],
  ["Chouriço", 455, 24, 2, 38],
  
// Mais frango e peru
  ["Bife de frango grelhado", 165, 31, 0, 3.6],
  ["Escalope de frango grelhado", 155, 30, 0, 3.5],
  ["Frango grelhado com pele", 215, 27, 0, 11],
  ["Frango assado com pele", 239, 27, 0, 14],
  ["Frango panado/à milanesa", 250, 20, 15, 13],
  ["Frango de churrasco (piri-piri)", 220, 27, 1, 12],
  ["Asas de frango grelhadas", 203, 30, 0, 8],
  ["Asas de frango fritas", 290, 27, 10, 18],
  ["Nuggets de frango", 280, 15, 17, 17],
  ["Hambúrguer de frango", 220, 20, 8, 12],
  ["Fiambre de frango", 100, 17, 1.5, 3],
  ["Bife de peru grelhado", 148, 29, 0, 2.7],
  ["Escalope de peru grelhado", 148, 29, 0, 2.7],
  ["Peru assado (sem pele)", 135, 30, 0, 1],
  ["Peru assado (com pele)", 170, 28, 0, 6],
  ["Hambúrguer de peru", 180, 21, 2, 10],
  ["Salsicha de frango/peru", 180, 13, 3, 13],
  ["Perna de frango estufada (no tacho)", 195, 22, 3, 10],
  // Peixe e marisco
  ["Peixe (pescada) cozido", 90, 18, 0, 1.3],
  ["Salmão grelhado", 208, 20, 0, 13],
  ["Atum em água (escorrido)", 116, 26, 0, 1],
  ["Bacalhau cozido", 105, 23, 0, 0.7],
  ["Dourada grelhada", 121, 20, 0, 4],
  ["Robalo grelhado", 97, 18, 0, 2.5],
  ["Sardinha assada", 208, 21, 0, 14],
  ["Sardinha em lata (com óleo)", 208, 17, 0, 15],
  ["Cavala grelhada", 205, 19, 0, 14],
  ["Polvo cozido", 92, 18, 2.2, 1],
  ["Camarão cozido", 99, 21, 0.2, 1.5],
  ["Lulas grelhadas", 92, 16, 3, 1.4],
  ["Mexilhão cozido", 86, 12, 3.7, 2.2],
  ["Amêijoas cozidas", 74, 12.8, 2.6, 1],

  // Ovos e laticínios
  ["Ovo cozido", 155, 13, 1.1, 11],
  ["Ovo estrelado", 196, 14, 0.4, 15],
  ["Iogurte natural", 61, 3.5, 4.7, 3.3],
  ["Iogurte magro", 56, 4.8, 6.8, 0.5],
  ["Iogurte grego natural", 97, 9, 4, 5],
  ["Leite meio-gordo", 47, 3.4, 4.9, 1.6],
  ["Queijo fresco", 98, 12, 3.4, 4],
  ["Queijo flamengo", 356, 25, 0, 28],
  ["Queijo mozzarella", 280, 18, 3, 22],
  ["Queijo cottage", 98, 11, 3.4, 4.3],
  ["Requeijão", 174, 11, 4, 13],
  ["Natas (culinárias)", 292, 2.2, 3, 30],

  // Leguminosas
  ["Feijão cozido", 127, 8.7, 22, 0.5],
  ["Grão-de-bico cozido", 164, 8.9, 27, 2.6],
  ["Lentilhas cozidas", 116, 9, 20, 0.4],
  ["Húmus", 166, 7.9, 14, 9.6],
  ["Ervilhas cozidas", 84, 5.4, 14, 0.4],
  ["Favas cozidas", 88, 7.6, 17, 0.6],

  // Vegetais
  ["Brócolos cozidos", 35, 2.4, 7, 0.4],
  ["Espinafres cozidos", 23, 2.9, 3.6, 0.4],
  ["Cenoura crua", 41, 0.9, 10, 0.2],
  ["Tomate", 18, 0.9, 3.9, 0.2],
  ["Alface", 15, 1.4, 2.9, 0.2],
  ["Cebola", 40, 1.1, 9.3, 0.1],
  ["Courgette", 17, 1.2, 3.1, 0.3],
  ["Pepino", 15, 0.7, 3.6, 0.1],
  ["Pimento", 31, 1, 6, 0.3],
  ["Couve-flor cozida", 25, 1.9, 5, 0.3],
  ["Couve portuguesa cozida", 27, 2, 4, 0.4],
  ["Grelos cozidos", 30, 3, 3, 0.5],
  ["Feijão verde cozido", 31, 1.8, 7, 0.2],
  ["Cogumelos", 22, 3.1, 3.3, 0.3],
  ["Beterraba cozida", 44, 1.7, 10, 0.2],
  ["Alho-francês", 61, 1.5, 14, 0.3],
  ["Nabo cozido", 22, 0.9, 4.9, 0.1],
  ["Rabanete", 16, 0.7, 3.4, 0.1],
  ["Espargos cozidos", 22, 2.4, 4, 0.2],
  ["Milho cozido", 96, 3.4, 21, 1.5],

  // Sopas
  ["Sopa de legumes", 35, 1.5, 6, 0.5],
  ["Caldo verde", 45, 1.5, 6, 1.8],
  ["Canja de galinha", 40, 3, 5, 1],
  ["Creme de cenoura", 38, 1, 7, 0.6],
  ["Creme de abóbora", 40, 1, 7, 0.9],
  ["Sopa de feijão", 55, 3, 8, 1.2],
  ["Gaspacho", 25, 0.9, 4, 0.8],

  // Fruta
  ["Banana", 89, 1.1, 23, 0.3],
  ["Maçã", 52, 0.3, 14, 0.2],
  ["Laranja", 47, 0.9, 12, 0.1],
  ["Uvas", 69, 0.7, 18, 0.2],
  ["Morangos", 32, 0.7, 7.7, 0.3],
  ["Melancia", 30, 0.6, 8, 0.2],
  ["Abacate", 160, 2, 8.5, 15],
  ["Pêra", 57, 0.4, 15, 0.1],
  ["Pêssego", 39, 0.9, 10, 0.3],
  ["Ananás", 50, 0.5, 13, 0.1],
  ["Manga", 60, 0.8, 15, 0.4],
  ["Kiwi", 61, 1.1, 15, 0.5],
  ["Ameixa", 46, 0.7, 11, 0.3],
  ["Cereja", 63, 1.1, 16, 0.2],
  ["Framboesa", 52, 1.2, 12, 0.7],
  ["Mirtilo", 57, 0.7, 14, 0.3],
  ["Romã", 83, 1.7, 19, 1.2],
  ["Papaia", 43, 0.5, 11, 0.3],
  ["Meloa", 34, 0.8, 8, 0.2],
  ["Tangerina", 53, 0.8, 13, 0.3],
  ["Figo", 74, 0.8, 19, 0.3],
  ["Dióspiro", 70, 0.6, 18, 0.2],
  ["Nectarina", 44, 1.1, 10, 0.3],

  // Gorduras e frutos secos
  ["Azeite", 884, 0, 0, 100],
  ["Manteiga", 717, 0.9, 0.1, 81],
  ["Amêndoas", 579, 21, 22, 50],
  ["Nozes", 654, 15, 14, 65],
  ["Amendoim", 567, 26, 16, 49],

  // Cereais de pequeno-almoço e afins
  ["Cereais integrais", 379, 13, 68, 4],
  ["Aveia", 389, 17, 66, 7],

  // Doces, snacks e pastelaria
  ["Açúcar", 387, 0, 100, 0],
  ["Mel", 304, 0.3, 82, 0],
  ["Chocolate preto 70%", 598, 7.8, 46, 43],
  ["Chocolate de leite", 535, 7.6, 59, 30],
  ["Bolachas Maria", 435, 7, 75, 12],
  ["Croissant", 406, 8, 45, 21],
  ["Pastel de nata", 320, 6, 32, 20],
  ["Bolo simples (pão-de-ló)", 297, 6, 55, 6],
  ["Tosta mista", 260, 13, 28, 10],
  ["Panqueca", 227, 6, 28, 10],
  ["Batatas fritas de pacote (chips)", 536, 7, 53, 35],
  ["Pipocas (simples)", 387, 13, 78, 4.5],
  ["Barra de cereais", 400, 7, 65, 12],
  ["Gelado (baunilha)", 207, 3.5, 24, 11],

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
    // Pudins proteicos Milbona (Lidl)
  ["Pudim proteico Milbona (baunilha)", 75, 10, 5.2, 1.6],
  ["Pudim proteico Milbona (caramelo)", 75, 10, 5.2, 1.6],
  ["Pudim proteico Milbona (avelã)", 75, 10, 5.2, 1.6],
  ["Pudim proteico Milbona (chocolate)", 76, 10, 5.2, 1.6],
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
