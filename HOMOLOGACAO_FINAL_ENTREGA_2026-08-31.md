# Homologação Final — StoryPlay Empreendedor

Branch: `evolucao-pos-producao-2026-08-28`
Base estável atual em produção: `07d37ebe9358fbef04c0c26dfe2dacf59d656e2d`
Objetivo: validar a candidata final de entrega antes de promoção para `main` e deploy no Firebase.

## Regra desta rodada

Não alterar código durante o teste. Se qualquer falha for encontrada, registrar evidência e interromper a promoção. Não fazer deploy.

## 1. Sanidade técnica

- Confirmar que a branch testada é `evolucao-pos-producao-2026-08-28`.
- Confirmar carregamento normal em servidor HTTP local.
- Monitorar `console.error`, `pageerror`, `unhandledrejection`, 404 e 5xx.
- Confirmar ausência de reload automático, loop, congelamento ou crescimento anormal de eventos.

## 2. Responsividade e breakpoint

Testar: 1366×900, 1280×800, 1181×800, 1180×800, 1024×768, 768×1024, 390×844 e 360×800.

Para cada viewport:
- `scrollWidth == clientWidth`.
- 1181px e acima: navegação desktop.
- 1180px e abaixo: hambúrguer.
- Nenhum corte de texto, botão ou card crítico.

Teste ainda resize dinâmico 1180→1181→1180, sem reload, por 3 ciclos. O drawer deve fechar ao passar para desktop e retornar fechado ao mobile.

## 3. Menu e teclado

Desktop e mobile:
- Abrir/fechar menu.
- Fechar por X, clique fora, seleção, Esc e resize quando aplicável.
- `aria-expanded` correto no hambúrguer.
- Apenas um submenu aberto por vez.
- Summaries com `aria-expanded` sincronizado.
- Tab alcança controles relevantes.
- Foco visível.
- Esc fecha submenu sem erro.

## 4. Tema claro/escuro — validação final da última alteração

Testar em 1366×900 e 390×844.

Estado claro:
- `body.dark` ausente.
- `#themeToggle[aria-pressed="false"]`.
- `aria-label="Modo claro ativo. Ativar modo escuro"`.
- `title="Ativar modo escuro"`.

Após ativar escuro:
- `body.dark` presente.
- `#themeToggle[aria-pressed="true"]`.
- `aria-label="Modo escuro ativo. Ativar modo claro"`.
- `title="Ativar modo claro"`.

Após F5:
- tema persistido.
- `aria-pressed`, `aria-label` e `title` permanecem coerentes com o tema real.

Depois alternar novamente para claro e repetir a checagem.

## 5. Skip link e reduced motion

- Primeiro Tab útil revela `Pular para o conteúdo`.
- Enter transfere foco para `#conteudo-principal`.
- Nenhum conteúdo visível fica escondido pelo header.
- Com `prefers-reduced-motion: reduce`: scroll suave desativado, transições neutralizadas e hero-card sem inclinação decorativa.
- Menu e tema continuam funcionais com reduced motion.

## 6. Progressbar acessível

- `role="progressbar"`.
- `aria-valuemin="0"`.
- `aria-valuemax="100"`.
- `aria-valuenow` igual ao percentual visual.
- `aria-valuetext` coerente.
- Após ganho real de XP, atualizar uma vez e sem loop.
- Teto em 100.

## 7. Aria-live / feedback dinâmico

Validar em pelo menos:
- uma decisão StoryPlay;
- laboratório de Finanças;
- laboratório de Logística;
- laboratório de Marketing;
- `#companyStatus` com erro de validação e com salvamento válido.

Esperado nos contêineres:
- `role="status"`;
- `aria-live="polite"`;
- `aria-atomic="true"`.

Confirmar que repetição de laboratório não duplica XP.

## 8. Meu Perfil

- Abrir Meu Perfil.
- Dados existentes aparecem sem onboarding indevido.
- Alterar um campo permitido e salvar.
- Visualização reflete alteração imediatamente, sem F5.
- Recarregar e confirmar persistência.

## 9. Empresa Virtual

- Criar/editar empresa com nome, segmento e capital válidos.
- Dashboard reflete os dados.
- Validação inválida apresenta mensagem correta.
- Não resetar progresso geral durante o teste.

## 10. Episódios / decisões

- Episódio 1: responder q1 e q2 em perfil limpo de teste ou estado controlado.
- Feedback correto.
- XP exatamente conforme `data-score`.
- Repetição não duplica XP.
- Episódio 2: confirmar q4–q7 disponíveis e feedbacks funcionando.

## 11. Laboratórios

Validar abertura e cálculo/resultado de:
- Finanças;
- Tributação;
- Logística;
- Marketing e Vendas;
- Pessoas;
- Administração.

Confirmar que cálculos aparecem, nenhum botão fica inoperante e XP não duplica na repetição.

## 12. Eventos CEO e Ranking CEO

- Registrar pelo menos uma decisão de Evento CEO.
- Ranking atualiza na mesma aba sem reload.
- Nota/nível coerentes com a decisão.
- F5 mantém o resultado.
- Nenhum XP ou estado é alterado apenas por abrir o Ranking.

## 13. Área do Educador / Turma

Desktop e mobile:
- Abrir Área do Educador > Turma.
- Conteúdo carrega.
- Sem overflow horizontal.
- Navegação de retorno/menu continua funcional.

## 14. Comercial / Planos

- Abrir Planos.
- Conteúdo comercial carrega sem duplicação aparente.
- Navegação funciona em desktop/mobile.
- Sem erro de console.

## 15. Persistência

Após gerar estado de teste controlado:
- F5 mantém tema.
- F5 mantém Empresa Virtual.
- F5 mantém decisões já salvas.
- F5 mantém Ranking/Eventos conforme comportamento previsto.
- Nenhum dado some apenas por navegar entre seções.

## 16. Teste de regressão final — desktop e mobile

Percorrer nesta ordem:
Home → Meu Perfil → Empresa Virtual → Episódio 1 → Episódio 2 → Laboratórios → Eventos CEO → Ranking CEO → Área do Educador/Turma → Planos → Home.

Em cada etapa:
- conteúdo visível;
- menu utilizável;
- tema utilizável;
- sem overflow;
- sem erro JS.

## 17. Critérios de aprovação

Só marcar APROVADO se:
- 0 erros JavaScript;
- 0 falhas 404/5xx;
- 0 Promises rejeitadas;
- 0 loops/reloads automáticos;
- 0 overflow horizontal nas 8 resoluções;
- breakpoint 1180/1181 correto;
- tema e semântica acessível coerentes após F5;
- menu/teclado/skip link/progressbar/aria-live funcionando;
- módulos principais funcionando sem regressão;
- XP não duplica onde há proteção de chave;
- Ranking/Eventos persistem e atualizam corretamente;
- nenhuma alteração em `main` ou Firebase durante a homologação.

## Saída esperada do relatório

Registrar no topo uma destas conclusões:

`HOMOLOGAÇÃO FINAL DE ENTREGA — APROVADO`

ou

`HOMOLOGAÇÃO FINAL DE ENTREGA — REPROVADO`

Em caso de reprovação, listar cada falha com severidade (BLOQUEANTE / ALTA / MÉDIA / BAIXA), viewport, passos para reproduzir, resultado esperado, resultado obtido e evidência.

Se aprovado, finalizar com a frase: `Pode promover para main e realizar o deploy final.`
