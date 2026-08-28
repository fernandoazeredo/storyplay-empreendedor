# Homologação focada — acessibilidade do menu e breakpoint dinâmico

Branch: `evolucao-pos-producao-2026-08-28`

Objetivo: validar as últimas melhorias do menu sem tocar em `main` nem no Firebase.

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

Abrir: `http://localhost:8080`

## Testes obrigatórios

### 1. Breakpoint dinâmico 1180 ↔ 1181

Começar em 1180px com hambúrguer visível e menu fechado.

Sem recarregar a página:
- redimensionar para 1181px;
- confirmar que o menu mobile é fechado automaticamente;
- confirmar que o menu desktop aparece horizontalmente;
- confirmar `body.menu-open` removido;
- confirmar overlay oculto;
- confirmar `aria-expanded="false"` no botão do menu.

Depois voltar para 1180px, abrir o hambúrguer e confirmar funcionamento normal.

Repetir pelo menos 5 vezes 1180↔1181, procurando estado residual, overlay preso ou menu duplicado.

### 2. Escape no hambúrguer

Em 1024x768 e 390x844:
- abrir menu;
- confirmar `aria-expanded="true"`;
- pressionar `Esc`;
- menu deve fechar;
- `aria-expanded` deve voltar a `false`;
- overlay deve sumir;
- foco não pode ficar preso.

### 3. Escape nos submenus desktop

Em 1366x900:
- abrir `Aprender`;
- confirmar `aria-expanded="true"` no `summary`;
- pressionar `Esc`;
- submenu deve fechar;
- `aria-expanded` deve virar `false`.

Repetir com `Minha Empresa`, `Meu Progresso`, `Conta e Planos` e `Área do Educador`.

### 4. Apenas um submenu por vez

Em desktop:
- abrir `Aprender`;
- abrir `Minha Empresa`;
- confirmar que `Aprender` fechou automaticamente;
- repetir entre todos os grupos.

### 5. aria-expanded sincronizado

Para cada grupo desktop:
- fechado = `aria-expanded="false"`;
- aberto = `aria-expanded="true"`;
- após `Esc` = `false`.

Para o hambúrguer:
- fechado = `false`;
- aberto = `true`;
- após seleção, clique fora, `Esc` ou resize >1180 = `false`.

### 6. Navegação por Tab e foco visível

Em 1366x900 e 390x844, navegar usando apenas teclado.

Confirmar foco visual perceptível em:
- botão Claro/Escuro;
- botão hambúrguer em mobile;
- links principais;
- summaries dos grupos;
- links de submenu.

O foco não pode desaparecer visualmente nem exigir mouse para acessar itens principais.

### 7. Tema

Alternar Claro/Escuro por teclado (Tab + Enter/Space) em desktop e mobile.

Confirmar:
- troca visual correta;
- persistência após F5;
- nenhum erro de console.

### 8. Fechamentos mobile

Em 1024x768 e 390x844 testar separadamente:
- botão X;
- clique fora;
- seleção de item;
- `Esc`;
- resize de 1180 para 1181.

Todos devem fechar o drawer e zerar `aria-expanded`.

### 9. Overflow

Medir `clientWidth` e `scrollWidth` em:
- 1366x900
- 1280x800
- 1181x800
- 1180x800
- 1024x768
- 768x1024
- 390x844
- 360x800

Critério: `scrollWidth == clientWidth` em todas.

### 10. Regressão funcional mínima

Em 1366x900 e 390x844 confirmar navegação para:
- Meu Perfil;
- Empresa Virtual;
- Eventos CEO;
- Ranking CEO;
- Área do Educador > Turma;
- Planos.

Não executar mudanças destrutivas nem reset geral.

### 11. Console e rede

Durante toda a bateria:
- 0 erros JavaScript;
- 0 404/5xx;
- 0 Promises rejeitadas;
- nenhum loop/reload automático.

## Relatório obrigatório

Entregar exatamente:

1. `HOMOLOGAÇÃO ACESSIBILIDADE MENU — APROVADO` ou `REPROVADO`.
2. Resultado por viewport.
3. Resultado do resize 1180↔1181 em tempo real.
4. Resultado do `Esc` para drawer e submenus.
5. Tabela de `aria-expanded`.
6. Resultado de Tab/foco visível.
7. Erros JS.
8. 404/5xx.
9. Promises rejeitadas.
10. Regressão mínima.
11. Declaração: `Nenhuma alteração foi feita em main ou Firebase`.
12. Conclusão: `Pode promover` ou `Não pode promover`.

Não alterar código durante o teste. Se encontrar defeito, apenas documentar com passos de reprodução e evidência.
