# Homologação — desenvolvimento-pos-versao-segura

Base segura: `8e8c142d0a9447ce2f202703b33c18f672464e18`

Objetivo: validar a branch de desenvolvimento antes de qualquer merge em `main` ou deploy em produção.

## Regras do teste

- Não alterar `main` nem `versao-segura-2026-08-28` durante a homologação.
- Abrir o console do navegador e manter visíveis erros JavaScript, 404, promises rejeitadas e loops.
- Manter a aplicação aberta por pelo menos 5 minutos após navegar pelos módulos para verificar ausência de reload, travamento ou ciclo de renderização.
- Testar com estado novo e também após recarregar a página para validar persistência.

## Matriz funcional

### Base já homologada
- [ ] Home, Jornada e navegação principal.
- [ ] Episódio 1: decisões, feedback e XP sem duplicação.
- [ ] Episódio 2: formalização completa.
- [ ] Empresa Virtual: criação, edição e persistência.
- [ ] Laboratórios empresariais.
- [ ] Gestão mensal e fechamento mês a mês.
- [ ] Eventos CEO: gerar evento, escolher resposta, impactos e histórico.
- [ ] Desempenho estratégico.
- [ ] Progresso e conquistas.
- [ ] Relatório de aprendizagem.
- [ ] Piloto/Avaliação.
- [ ] Conta e Planos.
- [ ] Área do Educador e Turma.

### Recuperações desta branch
- [ ] Meu Perfil abre a tela real de perfil e não reabre onboarding indevidamente.
- [ ] Comparador Tributário calcula, mostra alertas educacionais, persiste o fluxo normal e concede XP uma única vez.
- [ ] Finanças Avançadas calcula resultado, margem, capital de giro e cenário +10%; XP uma única vez.
- [ ] Logística Avançada calcula giro, nível de serviço, frete/pedido e estoque parado; XP uma única vez.
- [ ] Administração Avançada: prioridade gerencial e meta mensal; persistência e XP sem duplicação.
- [ ] Pessoas: custo de contratação e feedback; persistência e XP sem duplicação.
- [ ] Marketing/Vendas: funil, CAC, ROAS, recompra e proposta de valor; persistência e XP sem duplicação.
- [ ] Educador carrega diretamente `classroom-v2.js`; confirmar ausência de painel duplicado.
- [ ] Comercial/Planos usa somente `commercial.js`; confirmar ausência de seção Planos duplicada.
- [ ] Tema claro/escuro permanece acessível ao lado da logo/menu em tablet e celular e persiste após recarregar.
- [ ] Ranking Eventos CEO aparece após Eventos CEO, lê somente o histórico e não altera XP, métricas ou Empresa Virtual.
- [ ] Ranking atualiza na mesma aba logo após concluir uma decisão de Evento CEO.

## Responsividade

Testar pelo menos:

- [ ] Desktop ≥ 1281 px.
- [ ] Notebook 1024–1280 px.
- [ ] Tablet 768–980 px.
- [ ] Celular 360–620 px.

Em tablet/celular confirmar:

- [ ] Menu hambúrguer abre e fecha corretamente.
- [ ] Menu fecha após selecionar uma opção.
- [ ] Overlay fecha o menu.
- [ ] Botão Claro/Escuro permanece visível sem abrir o menu.
- [ ] Logo, botão de tema e hambúrguer não se sobrepõem.
- [ ] Cards, formulários e rankings não causam rolagem horizontal indevida.

## Persistência

Após usar os módulos, recarregar a página e conferir:

- [ ] Empresa Virtual preservada.
- [ ] Perfil preservado.
- [ ] Tema preservado.
- [ ] Planos preservados.
- [ ] Observações do Educador preservadas.
- [ ] Dados dos módulos avançados preservados.
- [ ] Histórico de Eventos CEO preservado.
- [ ] Ranking reconstruído corretamente a partir do histórico.

## Segurança contra regressão

Confirmar no console:

- [ ] 0 erros JavaScript não tratados.
- [ ] 0 arquivos novos retornando 404.
- [ ] 0 promises rejeitadas sem tratamento.
- [ ] 0 reloads automáticos.
- [ ] 0 crescimento contínuo de eventos/renderizações em repouso.
- [ ] Nenhum `storyplay:statechange` causando recursão.
- [ ] Nenhum XP repetido ao clicar novamente em atividade já concluída.

## Critério para aprovação

Somente considerar a branch pronta para promoção quando todos os itens críticos acima estiverem aprovados em navegador real. Até lá, manter produção, `main` e `versao-segura-2026-08-28` inalterados.
