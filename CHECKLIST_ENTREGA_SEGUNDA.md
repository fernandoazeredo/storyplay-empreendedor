# Checklist final de entrega — segunda-feira

## Objetivo
Garantir que a versão publicada do StoryPlay Empreendedor permaneça estável e pronta para apresentação/entrega, sem alterações de última hora desnecessárias.

## Domingo à noite
- Abrir https://storyplay-empreendedor.web.app em janela anônima.
- Confirmar carregamento da Home sem erro visual.
- Abrir menu e navegar para Meu Perfil, Empresa Virtual, Eventos CEO, Ranking CEO, Progresso, Área do Educador/Turma e Planos.
- Alternar modo claro/escuro e confirmar persistência após F5.
- Executar um Evento CEO e conferir atualização do Ranking CEO.
- Confirmar que o Painel de Turma não cria rolagem horizontal na página.
- Não fazer deploy se tudo estiver funcionando.

## Segunda-feira antes da apresentação
- Usar conexão estável e manter uma segunda conexão disponível (hotspot) como contingência.
- Abrir previamente o site e deixar a Home carregada.
- Fechar abas e programas desnecessários.
- Confirmar nível de zoom do navegador em 100%.
- Fazer um único F5 e confirmar que a página carrega normalmente.
- Não limpar localStorage, cache ou dados de demonstração sem necessidade.
- Não executar git pull, merge, reset ou deploy antes da apresentação se a produção estiver normal.

## Fluxo recomendado da demo
1. Home e proposta do StoryPlay Empreendedor.
2. Meu Perfil.
3. Episódio / decisão StoryPlay.
4. Empresa Virtual.
5. Laboratórios e comparador tributário educacional.
6. Finanças, Logística, Administração, Pessoas, Marketing e Vendas.
7. Eventos CEO.
8. Ranking CEO.
9. Progresso / Relatório.
10. Área do Educador e Turma.
11. Conta e Planos.

## Critérios de pronto para entrega
- Site público carregando normalmente.
- Navegação funcional.
- Sem overflow horizontal nas telas críticas.
- Tema claro/escuro funcional.
- Meu Perfil funcional.
- Eventos CEO e Ranking CEO funcionais e persistentes.
- Sem erros JavaScript visíveis.
- Sem 404 de módulos necessários.
- Sem loops ou reloads automáticos.

## Regra de mudança até a entrega
Só promover nova alteração para main/Firebase se houver bug real, reproduzível e bloqueador. Toda correção deve ser testada na branch de evolução antes da promoção.

## Rollback
Referência estável preservada: branch `producao-estavel-2026-08-28`.
Produção homologada: commit `07d37ebe9358fbef04c0c26dfe2dacf59d656e2d`.
