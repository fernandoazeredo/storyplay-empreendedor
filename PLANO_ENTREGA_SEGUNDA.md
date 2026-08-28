# Plano de entrega — prazo até segunda-feira

## Estado atual
- Produção publicada e homologada no commit `07d37eb`.
- Branch de produção congelada: `producao-estavel-2026-08-28`.
- Branch de evolução: `evolucao-pos-producao-2026-08-28`.
- Smoke test de produção aprovado: navegação, tema, perfil, turma, Eventos CEO, Ranking CEO, persistência, console e rede.

## Regra até a entrega
1. Não alterar `main` diretamente.
2. Não fazer deploy de evolução sem homologação focada.
3. Priorizar somente bugs bloqueadores, regressões ou ajustes de apresentação necessários para a entrega.
4. Adiar refatorações estruturais e limpezas de CSS que não impactem o funcionamento atual.
5. Preservar `producao-estavel-2026-08-28` como rollback.

## Itens adiados para depois da entrega
- Unificação dos breakpoints de menu entre 980px e 1280px.
- Limpeza de regras duplicadas em `account.css`, `qa-hotfix.css` e `qa-phase4.css`.
- Refatoração de loaders/hotfixes históricos.

## Checklist final antes da entrega
- Site abre normalmente em produção.
- Menu desktop/hambúrguer acessível.
- Tema claro/escuro funciona e persiste.
- Meu Perfil abre e atualiza sem F5.
- Painel de Turma sem overflow.
- Empresa Virtual persiste.
- Eventos CEO executam e registram histórico.
- Ranking CEO atualiza e persiste.
- Console sem erros críticos.
- Rede sem 404 de assets essenciais.
- Nenhum loop/reload automático.

## Critério de liberação
A versão de produção atual permanece a versão de entrega, salvo surgimento de bug bloqueador confirmado e reproduzível.
