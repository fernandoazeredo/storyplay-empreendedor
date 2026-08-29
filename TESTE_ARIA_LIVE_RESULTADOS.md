# Homologação — aria-live em feedbacks e resultados dinâmicos

Branch a testar: `evolucao-pos-producao-2026-08-28`

Objetivo: validar a nova camada de acessibilidade que aplica `role="status"`, `aria-live="polite"` e `aria-atomic="true"` em feedbacks e resultados dinâmicos sem alterar comportamento funcional.

## 1. Ambiente

- Servir localmente a pasta `public` da branch.
- Não usar Firebase.
- Não alterar código durante o teste.
- Testar em 1366×900 e 390×844.

## 2. Atributos ARIA estáticos

Após o carregamento, confirmar que os seguintes elementos, quando existentes, recebem:

- `role="status"`
- `aria-live="polite"`
- `aria-atomic="true"`

Seletores mínimos:

- `.feedback`
- `.lab-result`
- `#companyStatus`

Registrar quantos elementos receberam os atributos e confirmar que não existem duplicações estranhas ou atributos conflitantes.

## 3. Feedback de decisão StoryPlay

Em uma decisão ainda não respondida:

1. clicar em uma opção;
2. confirmar que o texto de feedback aparece normalmente;
3. confirmar que o contêiner mantém `role=status`, `aria-live=polite` e `aria-atomic=true`;
4. confirmar que XP/pontuação segue exatamente a regra existente;
5. confirmar que não ocorre anúncio/atualização repetitiva em loop no DOM.

## 4. Laboratórios empresariais

Testar pelo menos 3 resultados:

- Finanças;
- Logística;
- Marketing e Vendas.

Para cada laboratório:

1. executar o cálculo;
2. confirmar que o resultado visual aparece correto;
3. confirmar atributos ARIA no `.lab-result` correspondente;
4. confirmar que o resultado é atualizado uma única vez por ação;
5. confirmar que XP não é duplicado ao repetir a mesma atividade;
6. confirmar que não houve alteração indevida nas métricas existentes.

## 5. Empresa Virtual

Testar `#companyStatus` em dois cenários:

- validação inválida, se possível sem destruir dados relevantes;
- salvamento/atualização válida.

Confirmar:

- texto visual correto;
- `role=status`;
- `aria-live=polite`;
- `aria-atomic=true`;
- nenhuma duplicação de mensagem;
- nenhuma mudança funcional além do que já existia.

## 6. Elementos inseridos depois do carregamento

Confirmar que elementos `.feedback` ou `.lab-result` criados/inseridos após o carregamento também recebem os atributos automaticamente.

Verificar que o mecanismo de observação:

- não cria novos observers indefinidamente;
- não altera o conteúdo dos elementos;
- não gera mutação contínua;
- não causa consumo crescente de CPU ou loop perceptível.

## 7. Regressão mínima

Em desktop e mobile, verificar:

- menu abre/fecha;
- tema Claro/Escuro;
- Meu Perfil;
- Empresa Virtual;
- Eventos CEO;
- Ranking CEO;
- Turma;
- Planos;
- skip link continua funcionando;
- breakpoint 1180 continua correto;
- sem overflow horizontal.

## 8. Console e rede

Durante toda a bateria, registrar:

- erros JavaScript;
- `unhandledrejection`;
- 404/5xx;
- reloads automáticos;
- loops ou congelamentos.

Critério: zero erros novos.

## 9. Critério de aprovação

Aprovar somente se:

- os atributos ARIA forem aplicados corretamente;
- feedbacks/resultados continuarem visualmente e funcionalmente iguais;
- não houver duplicação de XP ou alteração de cálculos;
- não houver loops/observers problemáticos;
- não houver regressão em menu, tema, navegação, Perfil, Empresa, Eventos CEO, Ranking, Turma ou Planos;
- console/rede/Promises permanecerem limpos.

## 10. Formato do relatório

Começar com uma destas linhas:

`HOMOLOGAÇÃO ARIA-LIVE — APROVADO`

ou

`HOMOLOGAÇÃO ARIA-LIVE — REPROVADO`

Depois informar:

- branch e commit testado;
- ambiente;
- tabela dos elementos/atributos;
- resultados dos testes funcionais;
- erros encontrados;
- conclusão final clara: `Pode promover` ou `Não promover`.
