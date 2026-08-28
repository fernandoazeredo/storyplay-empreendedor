# Homologação focada — breakpoint responsivo 1180px

Branch obrigatória: `evolucao-pos-producao-2026-08-28`

Objetivo: validar a nova regra única de responsividade do cabeçalho/menu, sem alterar `main` e sem deploy no Firebase.

## Preparação

```powershell
Set-Location "D:\APLICATIVOS - DEPLOY\storyplay-empreendedor-main"
git fetch origin
git checkout evolucao-pos-producao-2026-08-28
git pull origin evolucao-pos-producao-2026-08-28
git status
```

Servir localmente:

```powershell
Set-Location "D:\APLICATIVOS - DEPLOY\storyplay-empreendedor-main\public"
python -m http.server 8080
```

Abrir `http://localhost:8080`.

## Matriz obrigatória

### 1. Desktop 1366×900
- menu horizontal visível;
- botão hambúrguer oculto;
- tema visível;
- sem scroll horizontal;
- submenus totalmente acessíveis.

### 2. Notebook 1280×800
- menu horizontal visível;
- botão hambúrguer oculto;
- tema visível;
- sem scroll horizontal;
- todos os grupos do menu acessíveis.

### 3. Limite superior 1181px
- comportamento desktop;
- hambúrguer oculto;
- sem overflow.

### 4. Breakpoint exato 1180px
- comportamento responsivo/hambúrguer;
- menu abre e fecha;
- botão de tema permanece visível fora do drawer;
- sem overflow horizontal.

### 5. Tablet 1024×768
- hambúrguer visível;
- menu abre;
- fecha pelo botão;
- fecha clicando fora;
- fecha ao escolher um item;
- tema funciona e persiste;
- sem overflow horizontal.

### 6. Tablet retrato 768×1024
Mesmos critérios do item 5.

### 7. Celular 390×844
- logo, tema e hambúrguer cabem no cabeçalho;
- drawer cabe na viewport;
- navegação por grupos e subitens funciona;
- fechamento automático após selecionar item;
- sem overflow horizontal.

### 8. Celular 360×800
Mesmos critérios do item 7.

## Regressão mínima obrigatória

Em pelo menos uma resolução desktop e uma mobile:
- abrir Meu Perfil;
- abrir Eventos CEO;
- abrir Ranking CEO;
- abrir Área do Educador > Turma;
- alternar Claro/Escuro;
- confirmar que nenhuma navegação foi afetada.

## Observabilidade

Durante toda a bateria registrar:
- erros JavaScript no console;
- 404s/5xx;
- Promises rejeitadas;
- reload automático;
- loops de abertura/fechamento do menu;
- `document.documentElement.scrollWidth` versus `clientWidth` em cada viewport.

## Resultado exigido

Responder exatamente com:

```text
HOMOLOGAÇÃO BREAKPOINT 1180 — APROVADO
```

ou

```text
HOMOLOGAÇÃO BREAKPOINT 1180 — REPROVADO
```

E informar:
1. resultado de cada viewport;
2. `clientWidth` e `scrollWidth`;
3. estado do menu (desktop ou hambúrguer);
4. resultado do botão de tema;
5. console JS;
6. 404/5xx;
7. Promises rejeitadas;
8. regressão mínima;
9. declaração: `Nenhuma alteração foi feita em main ou Firebase`;
10. conclusão: `Pode promover` ou `Não pode promover`.

Não fazer deploy durante este teste.
