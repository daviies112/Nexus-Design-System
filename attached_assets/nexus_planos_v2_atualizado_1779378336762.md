
# NEXUS INTELLIGENCE — ATUALIZAÇÃO DE PLANOS v2
### Documento de Refinamento Estratégico
**Baseado em:** Análise de conformidade entre metodologia documentada e comportamento real da plataforma  
**Data:** Maio 2026  
**Status:** Para revisão e aprovação

---

## POR QUE ESTE DOCUMENTO EXISTE

A estrutura geral dos três planos está correta. A progressão de preços, a lógica de dor por plano e as margens de uso avulso estão bem calibradas. Este documento não redesenha o produto — ele corrige **4 inconsistências específicas** que, se mantidas, podem gerar reclamações de clientes Start, prejudicar a conversão Start→Pro e enfraquecer o argumento comercial.

---

## MUDANÇA 1 — MALETA NO START: RESOLVER A MEIA-IMPLEMENTAÇÃO

### O problema atual
O Start inclui "criação manual de maleta" e "geração de etiqueta manual". Mas sem confirmação de recebimento (PIX automático) e sem fila de expedição, o cliente Start monta a maleta, gera a etiqueta, envia — e depois fica **sem saber se a revendedora recebeu**, sem rastreio integrado, sem follow-up automático. A maleta no Start está incompleta de uma forma que vai gerar suporte.

### A correção
**Incluir rastreio básico no Start.** A revendedora recebe uma mensagem automática com o código de rastreio quando a etiqueta é gerada. Só isso. Sem automação de fila, sem confirmação via PIX, sem rolagem automática de peças.

**O que fica exclusivo do Pro/Max:**
- Fila de expedição automática
- Confirmação de recebimento via PIX
- Rolagem automática de peças ao fim do ciclo
- Declaração de sinistro automática
- RMA com análise de foto por IA

**O que o Start ganha:**
- Notificação de rastreio via WhatsApp (texto simples com código dos Correios/Melhor Envio)
- Histórico de maletas enviadas por revendedora

### Impacto na comunicação do plano
> **Antes:** "Geração de etiqueta de envio (geração manual)"  
> **Depois:** "Gestão de maletas com rastreio integrado — você monta, o sistema notifica e rastreia"

---

## MUDANÇA 2 — GAMIFICAÇÃO NO START: CLAREZA SOBRE O CICLO FINANCEIRO

### O problema atual
O Start inclui ranking, badges, indicações e bônus. Mas sem PIX automático, quando uma revendedora ganha um bônus de indicação, **o pagamento é manual**. O sistema gamifica mas não fecha o loop. Isso cria expectativa que o produto não entrega automaticamente.

### A correção
Manter gamificação no Start **com ressalva clara** na comunicação: o sistema registra e calcula os bônus, mas o pagamento é processado manualmente pelo operador ou embutido no próximo acerto de repasse (que no Start também é manual).

No Pro e Max, o bônus de indicação é automaticamente embutido na cobrança de repasse via PIX.

### Mudança na tabela de funcionalidades

| Funcionalidade | Start | Pro | Max |
|---|---|---|---|
| Ranking e gamificação (visual + pontos) | SIM | SIM | SIM |
| Bônus de indicação (registro automático) | SIM | SIM | SIM |
| Pagamento automático de bônus via repasse PIX | NÃO | SIM | SIM |

### Texto de comunicação sugerido para a página de preços (Start)
> "Sistema de ranking e indicações: suas revendedoras competem, se indicam e acumulam pontos. Os bônus são calculados automaticamente e você decide quando e como pagar — no Start, o pagamento é feito manualmente ou no próximo acerto."

---

## MUDANÇA 3 — ANTI-CHURN: INCLUIR D+3 NO START

### O problema atual
Anti-churn (D+3/D+10/D+20) é exclusivo do Pro/Max. Isso significa que uma revendedora do cliente Start recebe a maleta e nunca recebe um follow-up automático do sistema. O relacionamento pós-entrega fica 100% dependente do operador humano. Resultado: churn de revendedoras mais alto, que o cliente vai culpar no produto.

### A correção
**Incluir apenas o D+3 no Start** — a mensagem de boas-vindas pós-entrega da maleta.

**Por quê só o D+3:**
- É a mensagem mais importante do relacionamento. Define o tom.
- Não tem custo de API externo — é só texto via WhatsApp.
- Cria o hábito da revendedora de interagir com o número da empresa.
- Não entrega o diferencial do Pro (que é a régua D+10 e D+20 de urgência e estratégia de vendas).

### Tabela atualizada de anti-churn

| Mensagem | Start | Pro | Max |
|---|---|---|---|
| D+3: Boas-vindas + dica de stories | ✅ SIM | ✅ SIM | ✅ SIM |
| D+10: Follow-up com sugestão de foto de produto | ❌ NÃO | ✅ SIM | ✅ SIM |
| D+20: Mensagem de urgência + estratégia de vendas | ❌ NÃO | ✅ SIM | ✅ SIM |

### Impacto comercial
O D+3 no Start aumenta a satisfação das revendedoras do cliente Start, o que reduz o churn delas, o que faz o cliente Nexus crescer mais rápido e sentir a dor do limite de leads mais cedo — acelerando o upgrade para Pro.

---

## MUDANÇA 4 — LIMITE DE REVENDEDORAS ATIVAS NO START

### O problema atual
O Start limita apenas leads por mês (30). Um cliente pode ficar com 60 revendedoras ativas sem nunca ultrapassar o limite de leads — especialmente se cresceu no mês anterior e agora está estável. Isso significa que ele pode ficar confortável no Start por meses sem sentir nenhuma pressão de upgrade.

### A correção
**Adicionar limite de revendedoras ativas cadastradas no Start: até 40.**

Lógica:
- Com 30 leads/mês de entrada e alguma taxa de churn natural, o cliente Start vai bater 40 revendedoras ativas em 2-3 meses de operação consistente.
- Quando bater o limite, ele não consegue cadastrar novas revendedoras (que assinaram contrato) sem fazer upgrade.
- Isso cria uma dor concreta, mensurável e urgente — diferente da dor abstrata da cobrança manual.

### Tabela de limites atualizada

| Limite | Start | Pro | Max |
|---|---|---|---|
| Leads únicos/mês pelo WhatsApp | 30 | 70 | Ilimitado |
| Revendedoras ativas cadastradas | 40 | Ilimitado | Ilimitado |
| Usuários administradores | 2 | 5 | Ilimitado |

> **Nota:** O limite de admins (2 no Start) é um acréscimo sugerido. Uma empresa que cresce além de 40 revendedoras normalmente já tem equipe, e precisar de mais acessos administrativos cria mais um vetor de upgrade orgânico.

---

## MUDANÇA 5 — REPOSICIONAR A COMUNICAÇÃO DO LIMITE DE LEADS

### O problema atual
"Até 30 leads únicos por mês" soa como um produto pequeno. O comprador ouve "30" e pensa que o produto é limitado — não que ele é suficiente para a fase atual do negócio.

### A correção
Mudar o enquadramento de **capacidade** para **velocidade de crescimento**.

**Antes:**
> "Start: até 30 leads únicos/mês pelo WhatsApp"

**Depois:**
> "Start: automatize a entrada de até 30 novas candidatas por mês — o ritmo ideal para quem está estruturando o processo pela primeira vez"

**Na página de preços, abaixo do Start:**
> *"Para quem quer organizar o processo, qualificar bem e crescer com controle. O sistema faz o trabalho pesado da prospecção enquanto você foca em atender bem as revendedoras que chegam."*

**Argumento de venda para o upgrade:**
> "Você está batendo 24 leads esse mês. Quando chegar em 30, o sistema vai pausar automaticamente a entrada de novas candidatas. Se a operação está crescendo assim, você já está pronto para o Pro."

---

## RESUMO DAS MUDANÇAS

| # | Mudança | Impacto Principal |
|---|---|---|
| 1 | Rastreio básico de maleta no Start | Elimina suporte desnecessário, entrega expectativa correta |
| 2 | Gamificação com ressalva de pagamento manual | Elimina frustração com promessa não cumprida |
| 3 | D+3 anti-churn no Start | Reduz churn de revendedoras, acelera upgrade do cliente |
| 4 | Limite de 40 revendedoras ativas no Start | Cria dor concreta e mensurável que força o upgrade |
| 5 | Reposicionamento da comunicação de limites | Aumenta percepção de valor do Start, reduz objeção de preço |

---

## O QUE NÃO MUDA

- Preços: R$ 649 / R$ 997 / R$ 1.449 ✅
- CPF em todos os planos ✅
- PIX automático exclusivo Pro/Max ✅
- NF-e exclusiva Pro/Max ✅
- Follow-up de inadimplência D+5/D+10/D+15 exclusivo Pro/Max ✅
- Serasa D+17 exclusivo Max ✅
- Plano de ação IA exclusivo Max ✅
- Margens de uso avulso ✅
- Billing D1 (mensalidade) e D5 (uso avulso) ✅
- Funcionalidades bloqueadas com cadeado visível na UI ✅

---

## PRÓXIMOS PASSOS SUGERIDOS

1. **Revisar e aprovar** este documento internamente
2. **Atualizar** `nexus_intelligence_planos_pagamento_restricoes.txt` com as mudanças aprovadas
3. **Atualizar** `nexus_intelligence_metodologia_implementacao.txt` com os novos limites (40 revendedoras, D+3 no Start)
4. **Implementar** o motor de restrições por plano no código (prioridade técnica #1)
5. **Atualizar** a página de preços pública com o novo texto de comunicação

---

*Nexus Intelligence — Automação que devolve tempo para quem importa.*
