# Reteste focado — 3 correções antes do deploy

Branch obrigatória: `desenvolvimento-pos-versao-segura`

Não alterar `main`, não fazer merge e não fazer deploy no Firebase durante este teste.

## Objetivo

Validar somente os três defeitos encontrados na homologação anterior, mantendo console e rede limpos.

## Preparação

No repositório local:

```powershell
git fetch origin
git switch desenvolvimento-pos-versao-segura
git pull --ff-only origin desenvolvimento-pos-versao-segura
python -m http.server 8080 --directory public
```

Abrir `http://localhost:8080`.

## Teste 1 — Menu desktop sem overflow

Testar separadamente em:
- 1366×900
- 1920×1080
- 1280×800

Critérios de aprovação:
- `document.documentElement.scrollWidth <= document.documentElement.clientWidth`
- nenhum scroll horizontal na página
- menu principal visível e utilizável
- submenus abrem corretamente
- nenhuma opção fica inacessível

Registrar para cada resolução:
- `clientWidth`
- `scrollWidth`
- PASSOU/REPROVOU

## Teste 2 — Painel de Turma responsivo

Testar em:
- 1024×768
- 768×1024
- 390×844
- 360×800

Navegar até `#painel-turma`.

Critérios de aprovação:
- página sem scroll horizontal
- formulário inteiro dentro da viewport
- inputs não extrapolam o card
- em celular, campos empilhados corretamente
- tabela pode ter rolagem própria dentro de `.classroom-table-wrap`, mas não pode ampliar a largura da página
- botões permanecem acessíveis por toque

Registrar em cada resolução:
- `clientWidth`
- `scrollWidth`
- largura computada de `.classroom-form`
- PASSOU/REPROVOU

## Teste 3 — Meu Perfil atualiza sem F5

1. Abrir `Meu Perfil` pelo menu.
2. Anotar o nome atual exibido.
3. Clicar `Editar meu perfil`.
4. Trocar o nome para `QA Perfil Atualizado`.
5. Avançar normalmente até `Começar minha jornada`.
6. Não recarregar a página.
7. Voltar/rolar até `Meu Perfil`.

Critérios de aprovação:
- `localStorage['storyplay-onboarding']` contém `QA Perfil Atualizado`
- `#profileViewName` mostra imediatamente `QA Perfil Atualizado`
- não exige F5
- `Meu Perfil` não reabre onboarding do zero ao ser acessado pelo menu

## Segurança regressiva mínima

Durante os três testes, monitorar continuamente:
- console JavaScript
- 404s/network failures
- Promises rejeitadas
- recarregamento automático
- loop/travamento

Critério obrigatório: zero erros JS não tratados, zero 404 de módulos necessários, zero Promise rejeitada, zero reload automático.

## Resultado obrigatório

Responder neste formato:

```text
RETESTE 3 CORREÇÕES — APROVADO ou REPROVADO

1. Menu desktop: PASSOU/REPROVOU
1366×900: clientWidth=..., scrollWidth=...
1920×1080: clientWidth=..., scrollWidth=...
1280×800: clientWidth=..., scrollWidth=...

2. Painel de Turma: PASSOU/REPROVOU
1024×768: ...
768×1024: ...
390×844: ...
360×800: ...

3. Meu Perfil sem F5: PASSOU/REPROVOU
Nome salvo: ...
Nome exibido imediatamente: ...

Console JS: ...
404s: ...
Promises rejeitadas: ...
Reload/loop: ...

CONCLUSÃO: PODE / NÃO PODE seguir para deploy.
```

Se qualquer um dos três itens reprovar, não liberar deploy e informar exatamente o seletor/arquivo envolvido e os valores medidos.
