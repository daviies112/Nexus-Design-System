# Nexus Intelligence — Design System Completo
> Documento técnico e exaustivo para replicar, manter e expandir a identidade visual e o sistema de design da plataforma. Versão exportada em 2026-05-19.

---

## 1. Visão Geral da Marca

**Nexus Intelligence** é uma plataforma B2B SaaS brasileira de automação para o mercado de semijoias. O produto automatiza cobrança, estoque, emissão fiscal e comunicação com revendedoras via WhatsApp, tudo orquestrado pela IA central chamada **Amanda AI**.

### Personalidade da Marca
- **Bold, direto, sem corporativismo** — fala com empreendedoras que estão sobrecarregadas
- **Não é fintech/banco** — é uma ferramenta poderosa para quem vende semijoias
- **Energia laranja dominante** — o laranja não é só um acento, é a cor de ação e emoção
- **Verde como confirmação** — transmite inteligência, sucesso e conexão
- **Escuro como base** — profissionalismo sem frieza

### Tom de Voz
- Direto ao ponto, sem rodeios
- Imperativo: "Sua semijoia fatura sozinha" (não "Solução para automação")
- Usa a dor real: "Você vira escrava da operação"
- Promessa concreta: "R$ 200/mês. Tudo incluso. Sem taxas escondidas."

---

## 2. Paleta de Cores (Tokens Exatos)

### Cores Primárias — Regra 60/30/10

| Token | Hex | HSL | Papel |
|-------|-----|-----|-------|
| `bg / background` | `#060F0A` | `147 43% 4%` | Fundo de todas as telas (60%) |
| `card / surface` | `#0C1A12` | `146 37% 7%` | Cards, painéis, seções alternadas (30%) |
| `primary` | `#FF5A1F` | `16 100% 56%` | CTA, ação, destaques, seções laranja (10%) |

### Cores de Superfície

| Token | Hex | Uso |
|-------|-----|-----|
| `surface2` | `#122018` | Hover states, inputs |
| `border` | `#1E3828` | Bordas de cards, divisores |
| `surface-raised` | `#1A2F22` | Chat bubbles, estados elevados |

### Cores de Texto

| Token | Hex | Uso |
|-------|-----|-----|
| `textPrimary` | `#F0FAF4` | Títulos, texto em destaque |
| `textBody` | `#C4DDD0` | Corpo de texto principal |
| `textSecondary` | `#7AA88E` | Subtítulos, labels |
| `textMuted` | `#4A6A58` | Timestamps, metadados |

### Cores de Estado

| Token | Hex | Papel |
|-------|-----|-------|
| `accent / green` | `#00CC7A` | Sucesso, ativo, confirmação, nós de conexão da logo |
| `destructive` | `#EF4444` | Erros, preço riscado |
| `amber` | (não usar) | — reservado para versões monocromáticas |

### Uso em Seções de Fundo Laranja
Quando o fundo for `#FF5A1F`:
- Texto principal: `#1A0500` (quase preto quente)
- Texto secundário: `#5C1A00`
- Texto muted: `#1A0500` a 50% de opacidade
- Ícones: `#1A0500` ou `#060F0A`

### CSS Custom Properties (index.css)
```css
:root {
  --background: 147 43% 4%;
  --foreground: 144 33% 96%;
  --border: 143 30% 17%;
  --card: 146 37% 7%;
  --primary: 16 100% 56%;
  --primary-foreground: 16 100% 10%;
  --secondary: 146 28% 10%;
  --muted-foreground: 146 18% 35%;
  --accent: 156 100% 40%;
}
```

---

## 3. Tipografia

### Fonte 1 — Syne (Display / Headlines)
- **Família:** Syne (Google Fonts)
- **Pesos usados:** 600, 700, 800 (ExtraBold é o principal)
- **Uso:** H1, H2, H3, nome da marca, números grandes
- **Letter-spacing:** `-0.03em` a `0.05em` (tight para headlines grandes)
- **CSS:** `font-family: 'Syne', sans-serif`

### Fonte 2 — Inter (Body / UI / Dados)
- **Família:** Inter (Google Fonts)
- **Pesos usados:** 400, 500, 600
- **Uso:** Corpo de texto, labels, badges, dados, UI geral
- **CSS:** `font-family: 'Inter', sans-serif`

### Escala Tipográfica (Tailwind)
| Classe | Tamanho | Uso |
|--------|---------|-----|
| `text-8xl` | ~96px | Hero principal (landing) |
| `text-6xl` | ~60px | Números de destaque (stats laranja) |
| `text-5xl` | ~48px | H1 de páginas internas |
| `text-4xl` | ~36px | H2, seções de features |
| `text-3xl` | ~30px | Métricas, números grandes |
| `text-xl` | ~20px | Subtítulo hero, corpo destacado |
| `text-lg` | ~18px | Corpo de seção |
| `text-sm` | ~14px` | Labels, listas |
| `text-xs` | ~12px` | Badges, metadados |
| `text-[10px]` | 10px | Etiquetas de seção, tracking alto |

### Padrão de Headline Hero
```
font-syne font-extrabold tracking-tight leading-[0.95]
text-6xl md:text-8xl
```

### Padrão de Eyebrow Label
```
text-primary text-[10px] font-bold tracking-[0.18em] uppercase font-inter
```

---

## 4. Logo — Símbolo "N" (Nexus)

### Anatomia do Símbolo
O logo é um "N" geométrico construído com **nós de conexão e linhas estruturais**, representando a plataforma que une sistemas fragmentados.

#### ViewBox: `0 0 112 80` (não quadrado — proporção 1.4:1)
Para usar o símbolo quadrado, use `width={size}` e `height={(size * 80) / 112}`.

#### Elementos e Coordenadas SVG

**Pilares verticais (laranja):**
```svg
<line x1="28" y1="16" x2="28" y2="64" stroke="#FF5A1F" strokeWidth="3.5" />
<line x1="84" y1="16" x2="84" y2="64" stroke="#FF5A1F" strokeWidth="3.5" />
```

**Diagonais que formam o N (laranja com gradiente):**
```svg
<!-- Diagonal esquerda: do meio-esquerdo (28,40) até o topo-centro (56,16) -->
<line x1="28" y1="40" x2="56" y2="16" stroke="url(#grad)" strokeWidth="4" />
<!-- Vertical central: do topo-centro (56,16) até base-centro (56,64) -->
<line x1="56" y1="16" x2="56" y2="64" stroke="url(#grad)" strokeWidth="4" />
<!-- Diagonal direita: do base-centro (56,64) até meio-direito (84,40) -->
<line x1="56" y1="64" x2="84" y2="40" stroke="url(#grad)" strokeWidth="4" />
```

**Gradiente das diagonais:**
```svg
<linearGradient id="grad" x1="56" y1="16" x2="56" y2="64">
  <stop offset="0%" stopColor="#FF5A1F" />
  <stop offset="100%" stopColor="#FF5A1F" stopOpacity="0.65" />
</linearGradient>
```

**Nós de ação — laranja:**
```svg
<!-- Todos os nós de conexão usam a mesma cor laranja -->
<circle cx="28" cy="40" r="5.5" fill="#FF5A1F" />
<circle cx="84" cy="40" r="5.5" fill="#FF5A1F" />
```

**Nós estruturais — laranja:**
```svg
<circle cx="56" cy="16" r="4" fill="#FF5A1F" />
<circle cx="56" cy="64" r="4" fill="#FF5A1F" />
<circle cx="28" cy="16" r="4" fill="#FF5A1F" opacity="0.6" />
<circle cx="28" cy="64" r="4" fill="#FF5A1F" opacity="0.6" />
<circle cx="84" cy="16" r="4" fill="#FF5A1F" opacity="0.6" />
<circle cx="84" cy="64" r="4" fill="#FF5A1F" opacity="0.6" />
```

**Arco orbital (versão grande apenas):**
```svg
<circle cx="56" cy="40" r="38" stroke="#FF5A1F" strokeWidth="0.75" strokeDasharray="3 7" opacity="0.4" fill="none" />
```

### Logo Monocromática — Todo Laranja
O símbolo é **100% laranja** (`#FF5A1F`) em todas as partes: pilares, diagonais e nós. Isso cria uma leitura limpa, forte e inequivocamente da marca.

**Props padrão do componente (sem necessidade de passar nada):**
```tsx
<NexusIcon />              // todo laranja, fundo escuro
<NexusIconSm size={44} />  // todo laranja, navbar/footer
```

> Regra: nunca misture branco ou verde no símbolo isolado. A cor única é a força da logo.

### Variações do Logo

#### Versão Principal (Fundo Escuro) — **padrão**
- stroke (diagonais): `#FF5A1F`
- white (pilares): `#FF5A1F`
- nodeColor (nós): `#FF5A1F`
- Fundo: `#060F0A`

#### Versão Fundo Laranja — Monocromática Escura
- stroke: `#1A0500`
- white: `#1A0500`
- nodeColor: `#1A0500`
- Fundo: `#FF5A1F`

#### Versão Fundo Branco — Monocromática Escura
- stroke: `#060F0A`
- white: `#060F0A`
- nodeColor: `#060F0A`
- Fundo: `#FFFFFF`

### Tamanhos de Uso
| Contexto | Size prop | Resultado (px) |
|----------|-----------|----------------|
| Navbar (desktop) | 44 | 44×31px |
| Footer | 40 | 40×28px |
| Instagram small | 20 | 20×14px |
| Hero CTA section | 96 | 96×68px |
| Brand Kit display | 120 | 120×85px |
| Card avatar | 20 | 20×14px |

### Wordmark
```
nexus intelligence
↑ font-syne font-bold text-xl
↑ "nexus" = text-white
↑ "intelligence" = text-primary (#FF5A1F)
```

---

## 5. Componente NexusIcon (React/TypeScript)

```tsx
// Arquivo: src/components/NexusIcon.tsx

// Props disponíveis:
// size: number (width em px; height calculada automaticamente = size * 80/112)
// stroke: string (cor das diagonais do N — padrão: #FF5A1F)
// white: string (cor dos pilares e nós estruturais — padrão: #F0FAF4)
// nodeColor: string (cor dos nós de ação — padrão: #00CC7A)
// className: string

// NexusIcon = versão completa com arco orbital (para tamanhos >= 60px)
// NexusIconSm = versão sem orbital (para tamanhos menores, navbar, etc.)
```

---

## 6. Layout e Estrutura de Páginas

### Navbar (sticky, backdrop-blur)
- Height: `h-20` (80px)
- Background: `bg-background/80 backdrop-blur-md`
- Border bottom: `border-b border-border`
- Container: `max-w-7xl mx-auto px-6`
- Logo: NexusIconSm size=44 + wordmark
- Nav links: `text-sm font-medium`, active = `text-primary`, inactive = `text-muted-foreground hover:text-white`
- CTA button: `bg-primary text-[#1A0500] font-semibold px-5 py-2.5 rounded-lg`

### Containers Padrão
```
max-w-7xl mx-auto px-6   ← container principal
max-w-5xl mx-auto px-6   ← conteúdo centrado (pricing, CTA)
max-w-4xl mx-auto px-6   ← texto longo, hero
```

### Espaçamento de Seções
- Seções grandes: `py-24 md:py-32`
- Seções médias: `py-16`
- Seções de destaque (stats laranja, CTA): `py-14` a `py-28`

### Border Radius
- Cards: `rounded-2xl` (16px)
- Botões: `rounded-xl` (12px)
- Badges: `rounded` (4px) ou `rounded-md` (6px)
- Botões pill (labels): `rounded-full`

---

## 7. Estrutura da Landing Page (/)

### Seção 1 — Hero
- Fundo: `#060F0A` com radial gradient laranja sutil no centro
- Badge: pill laranja com ponto pulsante + "Fila de espera aberta"
- H1: Syne ExtraBold, `text-6xl md:text-8xl`, branco + laranja
- Subtítulo: `text-xl md:text-2xl text-[#7AA88E]`
- 2 botões: Primário laranja + Secundário ghost escuro

### Seção 2 — Stats Bar (FUNDO LARANJA)
- Fundo: `bg-[#FF5A1F]` — full-bleed laranja
- 4 métricas em grid: 93%, R$200, Zero, 21
- Números: Syne ExtraBold `text-4xl md:text-5xl text-[#1A0500]`
- Labels: `text-[#5C1A00] text-sm font-semibold`
- Divisores verticais: `divide-x divide-[#1A0500]/20`

### Seção 3 — O Problema
- Fundo: `bg-[#060F0A]`
- Eyebrow com borda esquerda laranja: `border-l-4 border-[#FF5A1F] pl-8`
- H2 grande: branco + `text-[#7AA88E]`
- 3 pain-point cards em grid: bg `#0C1A12` border `#1E3828`
- Cada card: número laranja grande + descrição cinza

### Seção 4 — Amanda AI (Feature)
- Fundo: `bg-[#0C1A12]` com borda topo
- Grid 2 colunas: texto + mockup de chat
- Badge inline laranja: `bg-[#FF5A1F] text-[#1A0500]`
- Checkmarks: ícone verde `#00CC7A` em box com `bg-[#00CC7A]/20`
- Chat mockup: bg `#060F0A`, mensagens em `#0C1A12`, tags verdes e laranjas

### Seção 5 — Módulos (Grid)
- Fundo: `bg-[#060F0A]`
- 6 cards em grid 3 colunas
- Hover: `hover:border-[#FF5A1F]/40 hover:bg-[#111f17]`
- Hover no título: `group-hover:text-[#FF5A1F] transition-colors`

### Seção 6 — Pricing (Split Container)
- Fundo: `bg-[#0C1A12]`
- Container com 2 colunas lado a lado
- Esquerda: fundo `#060F0A`, preço riscado, lista de custos
- **Direita: fundo `#FF5A1F`** — preço Nexus, texto escuro

### Seção 7 — CTA Final (FUNDO LARANJA TOTAL)
- Fundo: `bg-[#FF5A1F]` full-bleed com grid pattern sutil
- Logo N grande (size=96) em `stroke="#1A0500" white="#1A0500" nodeColor="#1A0500"`
- H2: `text-[#1A0500]`, `text-5xl md:text-7xl`
- Botão final: `bg-[#1A0500] text-[#FF5A1F]`

---

## 8. Brand Kit (/brand)

### Estrutura das Seções
```
01 — Paleta de Cores & Tokens
     ├─ Bloco 3 colunas: Deep Emerald / Midnight Forest / Vivid Tangerine
     └─ Grid 4 cores: Forest Raised / Electric Green / Border Subtle / Text Body

02 — Tipografia
     ├─ Syne (display): amostras em 800/700/600
     └─ Inter (body): amostras em 400/500/600

03 — Componentes UI
     ├─ Botões: Primário / Secundário / Ghost
     ├─ Badges & Status: Ativo / Processando / Pendente / Amanda AI
     └─ Cards de Módulo: ativo/aviso state

04 — Logo & Símbolo — Variações
     ├─ Wordmark principal (fundo escuro, 3 cores)
     ├─ Fundo laranja + N escuro (monocromático)
     ├─ Fundo laranja + grid sutil
     ├─ Fundo branco + nós laranja
     └─ Escala: 28px → 40 → 56 → 80 → 120px
```

---

## 9. Templates Instagram (/instagram)

### Sistema de 3 Variações de Cor

| Variação | Fundo | Texto Principal | Logo |
|----------|-------|-----------------|------|
| Fundo Escuro | `#060F0A` / `#0C1A12` | `#F0FAF4` branco | N padrão (laranja+verde) |
| Fundo Laranja | `#FF5A1F` | `#1A0500` escuro | N escuro monocromático |
| Fundo Verde | `#060F0A` c/ acento verde | `#F0FAF4` | N padrão |

### Templates Existentes (9 total)
1. **93% de Margem** — Fundo Escuro / Métrica / número laranja gigante
2. **Manifesto** — Fundo Laranja / Quote / texto escuro `font-extrabold`
3. **Zero Intervenção Humana** — Fundo Escuro / Feature / título em `text-4xl`
4. **R$ 200/mês** — Fundo Laranja / Métrica / grid pattern sutil
5. **Cobrança Elegante (Amanda)** — Fundo Verde / Chat mockup
6. **Logo N Laranja** — Fundo Escuro / Logo Mark
7. **Logo N Preto** — Fundo Laranja / Logo Mark / `stroke="#1A0500"`
8. **Logo N Verde** — Fundo Laranja + grid / Logo Mark / `stroke="#060F0A"`
9. **Manifesto Bold** — Fundo Verde / Quote / headline split laranja

### Regras de Composição dos Posts
- Aspect ratio: `aspect-square` (1:1)
- Padding interno: `p-10` (40px)
- Logo no canto: `absolute bottom-6 left-6` ou `top-6 left-6`
- Badge de categoria: `bg-[#FF5A1F] text-[#1A0500] text-[9px] font-extrabold uppercase`
- Overlay download: `group-hover:opacity-100` bg black/60 backdrop-blur

---

## 10. Componentes de UI Reutilizáveis

### Botão Primário
```tsx
<button className="bg-[#FF5A1F] text-[#1A0500] font-extrabold px-10 py-4 rounded-xl text-lg hover:bg-[#FF5A1F]/90 hover:scale-[1.02] transition-all">
  Texto do botão
</button>
```

### Botão Secundário Ghost
```tsx
<button className="bg-transparent border border-[#1E3828] text-[#C4DDD0] font-medium px-8 py-4 rounded-xl text-lg hover:bg-[#0C1A12] transition-all">
  Texto
</button>
```

### Eyebrow Label (Seção)
```tsx
<div className="border-l-4 border-[#FF5A1F] pl-8 mb-12">
  <span className="text-[#FF5A1F] text-xs font-bold tracking-[0.2em] uppercase">Categoria</span>
</div>
```

### Badge Inline (Novo / Módulo)
```tsx
<div className="inline-block bg-[#FF5A1F] text-[#1A0500] text-[10px] font-extrabold tracking-[0.15em] uppercase px-3 py-1.5 rounded">
  Novo Módulo
</div>
```

### Card de Feature (Módulos)
```tsx
<div className="group bg-[#0C1A12] border border-[#1E3828] rounded-2xl p-8 hover:border-[#FF5A1F]/40 hover:bg-[#111f17] transition-all">
  <div className="text-3xl mb-5">{icon}</div>
  <h3 className="text-white text-xl font-syne font-bold mb-2 group-hover:text-[#FF5A1F] transition-colors">{title}</h3>
  <p className="text-[#7AA88E] text-sm leading-relaxed">{desc}</p>
</div>
```

### Pain-Point Card
```tsx
<div className="bg-[#0C1A12] border border-[#1E3828] rounded-2xl p-8">
  <div className="text-3xl font-syne font-extrabold text-[#FF5A1F] mb-3">{metric}</div>
  <p className="text-[#7AA88E] text-sm leading-relaxed">{desc}</p>
</div>
```

### Seção Split Preço
- Container: `rounded-3xl overflow-hidden border border-[#1E3828]`
- Esquerda (problema): `bg-[#060F0A] p-12`
- Direita (Nexus): `bg-[#FF5A1F] p-12`

### Seção Stats Laranja
```tsx
<section className="bg-[#FF5A1F] py-14">
  <div className="max-w-6xl mx-auto px-6">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-[#1A0500]/20">
      {stats.map(stat => (
        <div className="text-center px-6 py-2">
          <div className="text-4xl md:text-5xl font-syne font-extrabold text-[#1A0500]">{stat.n}</div>
          <div className="text-[#5C1A00] text-sm font-semibold">{stat.l}</div>
        </div>
      ))}
    </div>
  </div>
</section>
```

---

## 11. Princípios de Design

### Contraste de Seções (Ritmo Visual)
A landing page alterna fundos para criar ritmo e separação clara:
```
Hero        → #060F0A (escuro)
Stats       → #FF5A1F (LARANJA — impacto)
Problema    → #060F0A (escuro)
Amanda AI   → #0C1A12 (verde escuro)
Módulos     → #060F0A (escuro)
Pricing     → #0C1A12 (verde escuro / metade laranja)
CTA Final   → #FF5A1F (LARANJA — impacto máximo)
```
Nunca usar dois fundos laranja seguidos. Nunca usar mais de 3 seções escuras seguidas.

### Grid Pattern Sutil (Backgrounds Laranja)
Quando usar em fundo laranja para adicionar textura profissional:
```css
backgroundImage: "linear-gradient(rgba(26,5,0,0.05-0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(26,5,0,0.05-0.08) 1px, transparent 1px)"
backgroundSize: "40px 40px"
```

### Radial Gradient (Backgrounds Escuros)
Para adicionar brilho focal sutil:
```css
background: radial-gradient(ellipse at 50% 0%, rgba(255,90,31,0.12) 0%, transparent 60%)
```

### Animações (Framer Motion)
Padrão de entrada padrão:
```tsx
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.5, delay: i * 0.08 }}
```

### Hover States
- Botão primário: `hover:bg-primary/90 hover:scale-[1.02]`
- Botão CTA grande: `hover:-translate-y-1`
- Card de feature: `hover:border-[#FF5A1F]/40 hover:bg-[#111f17]`
- Link de nav: `hover:text-white`

---

## 12. Stack Técnica

```
Framework:    React + Vite (TypeScript)
Routing:      Wouter
Styling:      Tailwind CSS v4 + CSS custom properties
Animations:   Framer Motion
Fonts:        Google Fonts (Syne + Inter)
Icons:        SVG custom (NexusIcon component)
Monorepo:     pnpm workspace
Port:         19252 (dev)
Preview path: /
```

### Estrutura de Arquivos
```
artifacts/nexus-intelligence/src/
├── App.tsx                          # Router principal
├── index.css                        # Tokens de cor + Tailwind
├── main.tsx                         # Entry point
├── components/
│   ├── Layout.tsx                   # Navbar + Footer (sticky nav, h-20)
│   └── NexusIcon.tsx                # Símbolo N (NexusIcon + NexusIconSm)
└── pages/
    ├── LandingPage.tsx              # / (7 seções)
    ├── BrandKit.tsx                 # /brand (4 seções)
    └── InstagramTemplates.tsx       # /instagram (9 templates)
```

---

## 13. Regras de Consistência

### O que SEMPRE manter
- O "N" da logo: diagonais laranjas + nós verdes + pilares brancos (fundo escuro)
- Seções laranja para stats e CTA final — nunca só decorativo
- Syne ExtraBold para todos os números grandes e headlines impactantes
- Inter para todo texto de interface, labels, dados
- Espaçamento generoso (`py-24 md:py-32`) para respiração

### O que NUNCA fazer
- Usar apenas fundos escuros sem quebrar com laranja (fica monotonamente verde)
- Usar verde (#00CC7A) como CTA — ele é reservado para sucesso/confirmação
- Usar laranja para texto longo (legibilidade ruim em quantidade)
- Usar a logo em tamanhos menores que 40px (o N fica ilegível)
- Misturar fontes: Syne para display, Inter para tudo mais

### Hierarquia de Cores para Ação
```
Laranja (#FF5A1F) → Ação principal, CTAs, destaque
Verde (#00CC7A)   → Sucesso, confirmação, ativo
Branco (#F0FAF4)  → Texto principal, estrutura
Verde-corpo (#7AA88E) → Texto secundário, labels
```

---

## 14. Copy e Messaging

### Taglines Aprovadas
- "Sua semijoia fatura sozinha."
- "Pare de gerenciar. Comece a escalar."
- "Automatize. Cresça. Domine."
- "A IA cobra, emite a NF e atualiza o estoque. Sozinha."

### Diferenciais Centrais (para uso em copy)
- R$ 200/mês tudo incluso
- 21 módulos integrados
- Zero intervenção humana
- 93% de margem por cliente
- Do marketing à nota fiscal — automático

### Amanda AI — Personalidade
- Não é um chatbot burro
- Monitora maletas, cobra com educação, emite NF, paga comissões
- "Cobrança elegante, pelo WhatsApp, sem você tocar"

---

*Fim do documento. Versão 1.0 — Nexus Intelligence Design System.*
