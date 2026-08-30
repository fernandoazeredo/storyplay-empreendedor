# Reteste final — Eventos CEO

Branch: `evolucao-pos-producao-2026-08-28`

Objetivo: validar exclusivamente os ajustes finais da seção `#eventos-empresariais` antes da promoção para `main`. Não alterar código durante o teste.

## 1. Acesso direto pela âncora

Abrir uma nova aba/janela, preferencialmente sem cache, diretamente em:

`http://localhost:8080/#eventos-empresariais`

Validar:
- a seção `#eventos-empresariais` é criada normalmente;
- após o carregamento dos módulos, a página termina posicionada na seção de Eventos CEO;
- o cabeçalho `Modo CEO · Eventos do mês` / `Nem todo mês sai como planejado` fica visível;
- não permanece definitivamente no hero/topo;
- repetir 5 vezes e registrar 5/5 ou falhas;
- repetir ao menos uma vez em 390×844.

## 2. Menu

Em desktop e mobile:
- confirmar item `Eventos CEO` no menu;
- confirmar que aponta para `#eventos-empresariais`;
- clicar nele e confirmar navegação correta;
- no mobile, confirmar fechamento automático do drawer após a seleção.

## 3. Texto de simulação / limite mensal

Na seção Eventos CEO, confirmar que existe indicação explícita de que `Novo evento do mês` é uma simulação educacional nesta versão e que não há limite mensal rígido de geração de cenários.

O botão deve continuar funcional e gerar novo cenário normalmente.

## 4. Persistência local

Confirmar que a seção informa explicitamente que o histórico/decisões ficam salvos neste navegador.

Executar uma decisão e confirmar:
- entrada aparece em `Histórico de decisões`;
- F5 preserva o histórico;
- nenhuma persistência remota deve ser presumida.

## 5. Regressão funcional rápida

Com Empresa Virtual existente:
- gerar novo evento;
- escolher uma opção;
- feedback qualitativo aparece;
- impacto simulado aparece quando aplicável;
- histórico recebe o evento;
- Ranking Eventos CEO continua carregando;
- novo evento pode ser gerado depois;
- nenhuma duplicação visual do módulo.

## 6. Tema e responsividade

Testar em:
- 1366×900;
- 390×844.

Confirmar:
- modo claro OK;
- modo escuro OK;
- sem contraste quebrado;
- `scrollWidth == clientWidth`;
- nenhum overflow horizontal.

## 7. Console / rede / estabilidade

Durante toda a bateria registrar:
- erros JavaScript;
- requisições 404/5xx;
- `unhandledrejection`;
- reload automático;
- loops;
- congelamentos.

Critério esperado: todos iguais a zero.

## 8. Resultado esperado

Se todos os itens acima passarem, concluir exatamente:

`RETESTE FINAL EVENTOS CEO — APROVADO`

E acrescentar:

`Pode promover para main.`

Se houver falha, informar o passo exato, viewport, comportamento esperado, comportamento observado e erro de console/rede associado, sem alterar o código.
