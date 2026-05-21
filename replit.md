# Nexus Intelligence

Plataforma B2B SaaS brasileira de automação para o mercado de semijoias — landing page, brand kit e templates de Instagram.

## Run & Operate

- `pnpm --filter @workspace/nexus-intelligence run dev` — run the frontend (port 19252)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React 19 + Vite + Tailwind CSS v4
- Routing: Wouter
- Animations: Framer Motion
- Fonts: Syne (display) + Inter (body) from Google Fonts
- API: Express 5

## Where things live

- `artifacts/nexus-intelligence/src/` — React frontend
  - `pages/LandingPage.tsx` — landing page com 7 seções
  - `pages/BrandKit.tsx` — brand kit (/brand)
  - `pages/InstagramTemplates.tsx` — 9 templates Instagram (/instagram)
  - `components/Layout.tsx` — navbar sticky + footer
  - `components/NexusIcon.tsx` — logo N em SVG (NexusIcon + NexusIconSm)
  - `index.css` — tokens de cor Nexus + tipografia
- `artifacts/api-server/src/` — Express API
- `lib/api-spec/openapi.yaml` — API contract (OpenAPI 3.1)

## Architecture decisions

- App é totalmente dark-mode por padrão — paleta verde escuro + laranja primário
- Logo N é SVG inline puro com gradiente e nós configuráveis via props
- Seções laranja (Stats, CTA) são full-bleed sem container, criando ritmo visual
- Grid pattern sutil aplicado nos fundos laranja para textura profissional

## Product

Nexus Intelligence automatiza cobrança, estoque, emissão fiscal e comunicação com revendedoras de semijoias via WhatsApp, orquestrado pela Amanda AI. R$200/mês tudo incluso.

## User preferences

- Projeto em Português Brasileiro
- Design system documentado em `attached_assets/NEXUS_DESIGN_SYSTEM_1779359298353.md`
- Site de referência: https://brand-intelligence-nexus--daviemericko06.replit.app

## Gotchas

- Google Fonts `@import url(...)` DEVE ser a primeira linha de `index.css` (antes de `@import "tailwindcss"`)
- CSS custom properties usam valores HSL separados por espaço sem `hsl()` wrapper
- NexusIcon: height calculada automaticamente como `size * 80/112` (viewBox não é quadrado)

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
