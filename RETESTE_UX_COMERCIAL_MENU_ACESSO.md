# Reteste focado — UX Comercial, Menu e Acesso Institucional

Branch: `monetizacao-controle-acesso-2026-08-30`
Commit alvo mínimo: `967940a`

## 1. Plano Empreendedor
- Confirmar mensal: `Assinar mensal · R$ 29,90` em azul.
- Confirmar anual: `Assinar anual · R$ 299,00` em verde.
- Confirmar nota: `Melhor custo-benefício · economize no plano anual.`
- Confirmar links Ton/Stone corretos e abertura em nova aba.

## 2. Acesso institucional sem login
- Abrir Área do Educador/Turma deslogado.
- Overlay deve dizer que é plano Escolas & Turmas sob consulta.
- Botões: `Ver planos` e `Entrar`.
- Não deve existir texto/botão `Entrar / validar acesso`.
- `Entrar` abre o modal de autenticação.

## 3. Acesso institucional logado sem permissão
- Usar conta comum autenticada sem acesso school/trial.
- Overlay deve informar: conta autenticada, sem acesso institucional.
- Botões: `Ver planos` e `Solicitar acesso`.
- Não mostrar botão `Entrar` nem `Entrar / validar acesso`.

## 4. Admin / acesso institucional autorizado
- Admin ou trial/school autorizado não deve ver overlay institucional.
- Área deve abrir normalmente.

## 5. Cabeçalho — todas as resoluções
Testar 1920, 1366, 1180, 1024, 768, 390.
- Cabeçalho deve ficar compacto.
- Navegação completa não pode ficar espalhada horizontalmente.
- Deve existir botão `Entrar`/`Minha conta`, tema e hambúrguer.
- Hambúrguer deve aparecer também em desktop/notebook.
- Ao abrir, menu deve surgir verticalmente em drawer/card lateral superior direito.
- Grupos e submenus devem continuar acessíveis.
- Clique em link deve fechar menu.
- Overlay, Escape e botão fechar devem funcionar.
- Sem overflow horizontal.

## 6. Regressão
- Tema claro/escuro.
- Modal Conta/Admin.
- Melhor Regime Tributário contraste corrigido.
- Planos.
- Menu por teclado.
- 0 erros JS reais.
- 0 404/5xx do app.
- 0 Promises rejeitadas.
- Sem loop/reload/congelamento.

## Conclusão esperada
`RETESTE UX COMERCIAL/MENU/ACESSO — APROVADO`

`Pode seguir para teste controlado final e futura promoção.`
