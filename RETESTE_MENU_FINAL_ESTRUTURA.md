# Reteste — Estrutura final do menu hambúrguer

Branch: `monetizacao-controle-acesso-2026-08-30`

## Objetivo
Validar a estrutura final do cabeçalho e do menu hambúrguer em todas as resoluções, sem alterar código e sem deploy de Hosting.

## 1. Cabeçalho — elementos fixos fora do menu
Confirmar em desktop, notebook, tablet e mobile:
- Logotipo StoryPlay visível.
- Botão `Entrar` quando deslogado e `Minha conta` quando autenticado.
- Alternador Claro/Escuro visível fora do menu.
- Botão hambúrguer visível fora do menu.
- Nenhum link de navegação solto horizontalmente no cabeçalho.

## 2. Menu hambúrguer — estrutura exata
Abrir o menu e confirmar somente estes quatro grupos e itens:

### Início e Aprendizado
- Home
- Jornada
- Aprender

### Gestão do Negócio
- Minha Empresa (Visão Geral)
- Administração
- Finanças
- Logística
- Marketing e Vendas
- Pessoas
- Melhor Regime?

### Desempenho
- Meu Progresso
- Ranking CEO

### Conta e Educação
- Conta e Planos
- Área do Educador

Não devem aparecer itens extras antigos como links independentes (StoryPlay, Trilhas, Laboratórios, Desafios, Eventos CEO, Gestão, Mês a mês, Desempenho, Meu Perfil, Relatório, Piloto, Conta, Planos, Educador, Turma).

## 3. Comportamento
- Apenas um grupo aberto por vez.
- `aria-expanded` acompanha abrir/fechar.
- Escape fecha grupo/menu sem travar foco.
- Clique em qualquer item navega para a seção correta e fecha o drawer.
- Clique fora fecha o drawer.
- Tema continua funcionando com menu aberto ou fechado.
- `Entrar/Minha conta` continua abrindo o modal correto.

## 4. Viewports
Testar pelo menos:
- 1366x900
- 1280x800
- 1024x768
- 768x1024
- 390x844
- 360x800

Em todos:
- hambúrguer visível;
- navegação vertical;
- sem overflow horizontal;
- drawer dentro da viewport;
- cabeçalho sem colisão entre logo, conta, tema e hambúrguer.

## 5. Regressão técnica
- 0 erros JavaScript da aplicação.
- 0 404/5xx dos arquivos locais do app.
- 0 Promises rejeitadas.
- sem loop/reload/congelamento.
- claro/escuro persiste após F5.

## Conclusão esperada
`RETESTE MENU FINAL — APROVADO`

`Estrutura do cabeçalho e menu hambúrguer conforme especificação final.`
