# Manifesto da Versão de Entrega — StoryPlay Empreendedor

Data de referência: 28/08/2026
Prazo de entrega: segunda-feira, 31/08/2026

## Versão oficial em produção

- Repositório: fernandoazeredo/storyplay-empreendedor
- Branch de produção: main
- Commit publicado e homologado: 07d37ebe9358fbef04c0c26dfe2dacf59d656e2d
- Firebase Hosting: storyplay-empreendedor
- URL oficial: https://storyplay-empreendedor.web.app

## Branches de segurança e evolução

- producao-estavel-2026-08-28 — referência congelada da versão publicada
- versao-segura-2026-08-28 — baseline histórica de rollback anterior
- evolucao-pos-producao-2026-08-28 — desenvolvimento pós-produção; não deve ser promovido antes da entrega sem nova homologação

## Homologação concluída

A versão publicada passou por homologação funcional e smoke test em produção, incluindo:

- carregamento geral e estabilidade
- menu desktop e menu hambúrguer
- modo claro/escuro com persistência
- StoryPlay e XP
- Empresa Virtual
- Meu Perfil
- comparador tributário educacional
- módulos avançados de Finanças, Logística, Administração, Pessoas e Marketing/Vendas
- Laboratórios, Gestão, Mês a Mês, Desempenho, Progresso, Relatório e Piloto
- Conta e Planos
- Área do Educador e Painel de Turma
- Eventos CEO
- Ranking CEO
- persistência após F5

Smoke test de produção registrou zero erros JavaScript, zero 404, zero Promises rejeitadas e nenhum reload automático ou loop.

## Ponto conhecido não bloqueante

Há uma inconsistência histórica de breakpoint: alguns CSS ativam o menu recolhido em max-width:1280px, enquanto o styles.css original usa max-width:980px. O comportamento em 1280px foi testado e funciona corretamente. Este item é somente de manutenção/refatoração e não bloqueia a entrega.

## Regra de congelamento até a entrega

Até a apresentação/entrega de segunda-feira:

1. Não alterar main sem necessidade real.
2. Não fazer novo deploy por ajustes cosméticos, documentação ou refatoração.
3. Corrigir apenas defeitos bloqueadores, sempre em branch separada e com reteste focado.
4. Não fazer deploy na manhã da apresentação salvo necessidade crítica comprovada.
5. Manter as branches de rollback intactas.

## Critério de versão entregue

Se nenhuma correção crítica surgir até segunda-feira, a versão oficial a ser apresentada e entregue é exatamente o commit 07d37ebe9358fbef04c0c26dfe2dacf59d656e2d atualmente publicado em https://storyplay-empreendedor.web.app.
