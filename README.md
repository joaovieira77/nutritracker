# Diário — Tracking de Saúde (Next.js + TypeScript)

App pessoal de registo diário de alimentação, exercício, sono, água e peso, com relatório
semanal exportável para partilhar com a nutricionista. Porto direto do protótipo HTML,
agora como app Next.js (App Router) com TypeScript e Tailwind CSS.

## Arrancar em desenvolvimento

```bash
npm install
npm run dev
```

Abre http://localhost:3000.

## Build de produção

```bash
npm run build
npm run start
```

## Estrutura

```
app/
  layout.tsx        # fontes (Space Grotesk, Inter, JetBrains Mono) e metadata
  page.tsx           # orquestra os 3 separadores (Hoje / Peso / Relatório)
  globals.css        # Tailwind + regras de impressão do relatório
components/
  TodayTab.tsx        # refeições, água, exercício, sono, peso do dia
  WeightTab.tsx        # histórico + gráfico de peso
  ReportTab.tsx        # relatório semanal + exportação/impressão
  WeightChart.tsx       # gráfico SVG leve, sem dependências extra
  BottomNav.tsx
  Modal.tsx + modals/    # modais de registo (comida, água, exercício, sono, peso)
lib/
  types.ts       # tipos partilhados
  foods.ts       # base de dados de alimentos embutida (~60 itens, kcal/macros por 100g)
  date.ts        # helpers de datas
  storage.ts     # camada de persistência (localStorage do browser)
```

## Persistência de dados

Os dados ficam guardados em `localStorage`, por dia (`day:YYYY-MM-DD`), no browser onde a
app corre. Sem login, sem sincronização entre dispositivos — exatamente como no PRD original.
Se mais tarde quiseres sincronização multi-dispositivo, troca `lib/storage.ts` por chamadas a
uma API/base de dados, mantendo o mesmo contrato de funções (`getDay`, `saveDay`, `listAllDayDates`).

## Próximos passos sugeridos

- Ligar a uma base de dados de alimentos real (Open Food Facts / USDA FoodData Central) em
  vez da lista embutida em `lib/foods.ts`.
- Categorias de refeição editáveis (atualmente fixas em `lib/types.ts`).
- Exportar o relatório como imagem/PDF gerado no servidor, em vez de `window.print()`.
- Scanner de código de barras, backup/exportação de dados, metas nutricionais.
