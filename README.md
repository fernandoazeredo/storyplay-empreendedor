# StoryPlay Empreendedor

**Abra Sua Empresa**

Plataforma educacional interativa para jovens empreendedores aprenderem, por histórias, desafios, quizzes e simuladores, como criar, formalizar e administrar uma empresa.

## Conceito

O StoryPlay Empreendedor combina educação empresarial com experiência gamificada. O aluno aprende tomando decisões, recebendo feedback e observando consequências.

Áreas do produto:

- Empreendedorismo e modelo de negócio
- Abertura e formalização de empresa
- Tributação e leitura do perfil econômico
- Administração e organização empresarial
- Finanças, margem, caixa e ponto de equilíbrio
- Compras, estoque e logística
- Gestão de pessoas
- Marketing, vendas e atendimento
- Risco, segurança e cibersegurança
- Empresa Virtual e desafios de gestão

## V1 funcional

A versão atual já contém:

- Home com navegação por âncoras
- Menu hambúrguer responsivo em tablet e celular, com fechamento por item, Esc, overlay, pointer e toque fora
- Modo claro/escuro persistente
- Episódio 1: validação da ideia
- Episódio 2: fundamentos da abertura da empresa
- Quizzes situacionais com feedback
- Restauração visual das respostas após recarregar a página
- Sistema de XP, conhecimento e níveis
- Persistência local das respostas e do progresso
- Empresa Virtual com nome, segmento e capital inicial
- Contador de caracteres do nome empresarial
- Lista ampliada de segmentos tradicionais, digitais e tecnológicos
- Dashboard inicial da Empresa Virtual
- Painel Meu Progresso com nível, decisões, atividades práticas, reputação, missão e conquistas
- Botão para reiniciar a jornada
- Laboratório Financeiro: faturamento, margem, lucro e ponto de equilíbrio
- Diagnóstico Tributário Educacional: faturamento projetado, margem e relação folha/faturamento
- Laboratório de Estoque e Logística: consumo médio, cobertura e ponto de reposição
- Laboratório de Marketing e Vendas: conversão, CAC e ROAS
- Cenário de Gestão de Pessoas
- Cenário de Administração e Priorização
- Painel de Saúde Empresarial com nota educacional por área
- Metas mensais de faturamento e clientes
- Fluxo de Caixa simplificado com reserva mínima
- Desafio de Risco e Cibersegurança
- Integração dos laboratórios com faturamento, lucro, clientes, estoque, reputação e última atividade da Empresa Virtual
- XP integrado às atividades práticas, sem pontuação duplicada por atividade
- Interface responsiva em desktop, notebook, tablet e celular

## Identidade visual

- Azul Confiança: `#0D47A1`
- Ciano Energia: `#00B8D9`
- Verde Crescimento: `#22C55E`
- Laranja Energia: `#FF7A00`
- Amarelo Ouro: `#FFC107`
- Roxo Criatividade: `#7C3AED`

## Infraestrutura

- GitHub: `fernandoazeredo/storyplay-empreendedor`
- Firebase Project ID: `storyplay-empreendedor`
- Firebase Hosting: `https://storyplay-empreendedor.web.app`
- Diretório publicado: `public/`

## Deploy

Pasta local adotada:

`D:\APLICATIVOS - DEPLOY\storyplay-empreendedor-main`

Fluxo:

```powershell
cd "D:\APLICATIVOS - DEPLOY\storyplay-empreendedor-main"
git pull
Unblock-File .\DEPLOY_FIREBASE.ps1
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force
.\DEPLOY_FIREBASE.ps1 -FirebaseProjectId "storyplay-empreendedor"
```

## Diretrizes de UX

- Responsivo em desktop, notebook, tablet e celular
- Menu hambúrguer em tablet/celular, com fechamento automático
- Modo claro/escuro com persistência
- Linguagem simples, jovem e didática, sem infantilização
- Visual colorido e orientado a cards
- StoryPlay + quizzes situacionais + simuladores + Empresa Virtual

## Observação educacional

Conteúdos tributários, cadastrais, trabalhistas, financeiros e legais têm finalidade educacional. Uma abertura ou decisão empresarial real deve sempre considerar atividade, localidade, regras vigentes e orientação profissional apropriada.
