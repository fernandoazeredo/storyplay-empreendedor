# Homologação focada — skip link e reduced motion

Branch: `evolucao-pos-producao-2026-08-28`

Objetivo: validar a nova camada de acessibilidade estrutural sem alterar `main` ou Firebase.

## Preparação

```powershell
Set-Location "D:\APLICATIVOS - DEPLOY\storyplay-empreendedor-main"
git fetch origin
git checkout evolucao-pos-producao-2026-08-28
git pull origin evolucao-pos-producao-2026-08-28
git status
git log -1 --oneline
```

Servidor local:

```powershell
Set-Location "D:\APLICATIVOS - DEPLOY\storyplay-empreendedor-main\public"
python -m http.server 8080
```

Abrir `http://localhost:8080`.

## Testes obrigatórios

### 1. Skip link — desktop 1366×900
1. Recarregar a página e não clicar com o mouse.
2. Pressionar `Tab` uma vez.
3. Confirmar que aparece visualmente o link `Pular para o conteúdo`.
4. Confirmar que ele tem foco visível.
5. Pressionar `Enter`.
6. Confirmar que o foco passa para o elemento `<main>`.
7. Confirmar que a página não gera overflow horizontal nem salto incorreto sob o header sticky.

### 2. Skip link — celular 390×844
Repetir o teste acima e confirmar o mesmo comportamento em mobile.

### 3. Ordem de tabulação
Em desktop e mobile, confirmar que:
- `Pular para o conteúdo` é a primeira parada útil de Tab;
- após o uso do skip link, continuar com `Tab` alcança elementos do conteúdo;
- menu, tema e demais controles continuam navegáveis por teclado;
- nenhum foco fica preso.

### 4. `prefers-reduced-motion`
Criar um contexto/navegador com `prefers-reduced-motion: reduce` e validar:
- `html` não usa rolagem suave perceptível;
- animações e transições ficam efetivamente reduzidas/minimizadas;
- hover/foco e layout continuam funcionais;
- não há elementos invisíveis ou presos por causa da redução de movimento.

Depois repetir em contexto normal (`no-preference`) e confirmar que a experiência visual padrão continua ativa.

### 5. Regressão de navegação
Em 1366×900 e 390×844:
- abrir/fechar menu;
- alternar tema claro/escuro;
- abrir `Meu Perfil`;
- navegar até `Eventos CEO`;
- navegar até `Ranking CEO`;
- navegar até `Turma`;
- navegar até `Planos`.

Tudo deve permanecer funcional.

### 6. Responsividade
Verificar pelo menos:
- 1366×900
- 1280×800
- 1181×800
- 1180×800
- 1024×768
- 768×1024
- 390×844
- 360×800

Critério: `scrollWidth == clientWidth`, sem overflow horizontal.

### 7. Qualidade técnica
Durante toda a bateria registrar:
- erros JavaScript de console;
- 404/5xx;
- Promises rejeitadas;
- loops/reloads inesperados.

Esperado: zero em todos.

## Relatório final obrigatório

Entregar exatamente:

`HOMOLOGAÇÃO SKIP LINK / REDUCED MOTION — APROVADO` ou `REPROVADO`.

Incluir:
1. resultado desktop e mobile do skip link;
2. evidência de foco no `<main>` após Enter;
3. resultado de `prefers-reduced-motion: reduce`;
4. resultado em `no-preference`;
5. tabela das 8 viewports e overflow;
6. regressão menu/tema/Perfil/Eventos/Ranking/Turma/Planos;
7. lista explícita de erros JS;
8. lista explícita de 404/5xx;
9. lista explícita de Promises rejeitadas;
10. declaração: `Nenhuma alteração foi feita em main ou Firebase`;
11. conclusão: `Pode promover` ou `Não pode promover`.

Não alterar código durante o teste.
