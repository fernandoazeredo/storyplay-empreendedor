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
- Finanças, margem, caixa, DRE e capital de giro
- Compras, estoque e logística
- Gestão de pessoas
- Marketing, vendas e atendimento
- Risco, segurança e cibersegurança
- Empresa Virtual e desafios de gestão
- Simulação mensal de desempenho empresarial
- Eventos empresariais e decisões de CEO
- Desempenho estratégico e desafios de médio prazo
- Onboarding e recomendação personalizada de trilha

## V1 funcional

A versão atual já contém:

- Home com navegação por âncoras
- Menu hambúrguer responsivo em tablet e celular, com fechamento por item, Esc, overlay, pointer e toque fora
- Modo claro/escuro persistente
- Onboarding inicial em 4 etapas
- Nome opcional do usuário para personalização local
- Escolha de perfil: jovem estudante, universitário/jovem empreendedor, empreendedor em planejamento, gestor/profissional ou professor/escola
- Escolha do objetivo principal de aprendizagem
- Recomendação automática de trilha e primeira missão
- Saudação personalizada na Home
- Item “Meu Perfil” para rever e alterar escolhas do onboarding
- Episódio 1: validação da ideia
- Episódio 2: fundamentos da abertura da empresa
- Quizzes situacionais com feedback
- Restauração visual das respostas após recarregar a página
- Sistema de XP, conhecimento e níveis, incluindo CEO Estratégico
- Persistência local das respostas e do progresso
- Empresa Virtual com nome, segmento e capital inicial
- Contador de caracteres do nome empresarial
- Lista ampliada de segmentos tradicionais, digitais e tecnológicos
- Dashboard inicial da Empresa Virtual
- Painel Meu Progresso com nível, decisões, atividades práticas, reputação, missão e conquistas
- Botão para reiniciar a jornada mantendo perfil de entrada e preferência de tema
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
- DRE simplificada com receita, custos, despesas, tributos e resultado
- Formação de preço por custo, despesas/tributos e margem desejada
- Estimativa educacional de capital de giro pelo ciclo financeiro
- Fechamento mensal da Empresa Virtual com faturamento, resultado, novos clientes e caixa final
- Histórico local dos últimos meses simulados
- Eventos CEO mensais com impacto em faturamento, lucro, caixa, clientes, reputação e estoque
- Histórico local dos eventos empresariais
- Índice estratégico de 0 a 100
- Perfil de gestão por Financeiro, Mercado, Operação, Pessoas e Risco
- Ranking pessoal contra marcos da própria jornada
- Desafios de 3, 6 e 12 meses
- Conquistas específicas para os desafios de médio prazo
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
