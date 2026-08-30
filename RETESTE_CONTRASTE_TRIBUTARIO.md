# Reteste focado — Contraste do módulo Melhor Regime Tributário

Branch obrigatória: `monetizacao-controle-acesso-2026-08-30`
Commit mínimo com correção: `e42e5b7c40f691683be10b01e2c17fa75ad2ce0d`

Objetivo: validar exclusivamente a correção de contraste em `public/tax-choice.css`, sem alterar código e sem deploy de Hosting.

## 1. Confirmação estática
- Verificar em `public/tax-choice.css` que `.tax-choice-card` usa `background: var(--surface,#fff)` e `border: 1px solid var(--line,#dbe3ef)`.
- Verificar que não restam usos de `--card` nem `--border` nesse arquivo.
- Confirmar que `--surface` e `--line` existem e têm valores distintos para claro/escuro no tema global.

## 2. Modo claro — desktop 1366x900
Abrir `#melhor-regime-tributario` e validar:
- título da seção legível;
- títulos dos dois cards legíveis;
- todos os labels legíveis;
- aviso "Importante" legível;
- placeholder/estado vazio "Preencha o perfil e clique em Comparar regimes." legível;
- inputs e selects continuam legíveis;
- bordas e fundos coerentes com o restante do tema;
- sem overflow horizontal.

## 3. Modo escuro — desktop 1366x900
Repetir todos os itens acima. Critério principal: os dois cards devem usar fundo escuro compatível com `--surface`, com texto claro e contraste visual normal. Não pode existir texto quase branco sobre fundo branco.

## 4. Resultado da comparação
Preencher valores válidos e clicar em `Comparar regimes` nos dois temas. Validar:
- resultado aparece;
- headline, resumo, lista de regimes, badges/textos e notas são legíveis;
- nenhum elemento herda cor inadequada;
- nenhum cálculo ou interação foi afetado pela correção CSS.

## 5. Mobile 390x844
Repetir claro e escuro:
- cards em uma coluna;
- labels, notas e resultados legíveis;
- inputs/selects sem corte;
- sem overflow horizontal;
- alternância de tema continua funcional.

## 6. Regressão mínima
- menu/hambúrguer continua funcionando;
- modal de Conta e administração continua responsivo;
- Planos continua exibindo Explorador grátis, Empreendedor mensal/anual e Escolas sob consulta;
- 0 erros JavaScript da aplicação;
- 0 404/5xx de arquivos do app;
- 0 Promises rejeitadas;
- sem loop/reload/congelamento.

## Conclusão obrigatória
Responder exatamente uma das opções:

`RETESTE CONTRASTE TRIBUTÁRIO — APROVADO`

`Pode seguir para teste controlado de login/admin.`

ou

`RETESTE CONTRASTE TRIBUTÁRIO — REPROVADO`

informando o item exato que falhou.
