# Homologação completa — StoryPlay Empreendedor

## Branch obrigatória

Testar EXCLUSIVAMENTE:

`desenvolvimento-pos-versao-segura`

Não testar `main` como se fosse a versão nova.
Não alterar `main`.
Não fazer deploy no Firebase durante o teste.
Não apagar nem alterar `versao-segura-2026-08-28`.

## Preparação local real

No PowerShell, dentro da pasta local do projeto:

```powershell
Set-Location "D:\APLICATIVOS - DEPLOY\storyplay-empreendedor-main"
git fetch origin
git checkout desenvolvimento-pos-versao-segura
git pull origin desenvolvimento-pos-versao-segura
git status
git log -1 --oneline
```

Confirmar que a branch exibida é `desenvolvimento-pos-versao-segura`.

O projeto é estático e o Firebase publica a pasta `public`. Não há build obrigatório.

Para servir localmente, usar uma destas opções:

```powershell
Set-Location "D:\APLICATIVOS - DEPLOY\storyplay-empreendedor-main\public"
python -m http.server 8080
```

Abrir:

`http://localhost:8080`

Se `python` não estiver disponível, usar o servidor HTTP local já disponível no ambiente, sempre apontando para a pasta `public`.

## Regras do teste

1. Não corrigir silenciosamente durante a homologação inicial.
2. Primeiro registrar todos os defeitos encontrados.
3. Separar defeitos CRÍTICOS, ALTOS, MÉDIOS e BAIXOS.
4. Não considerar um item aprovado apenas porque o elemento aparece; testar clique, resultado, persistência e regressão.
5. Monitorar Console e Network durante todo o teste.
6. Não considerar homologado se houver loop, reload automático, travamento, erro JS não tratado, 404 de módulo necessário ou Promise rejeitada.
7. Deixar o app aberto e em uso por pelo menos 5 minutos ao final, navegando entre módulos, para procurar loops ou degradação.

# MATRIZ DE TESTES

## 1. Inicialização

- Abrir em janela anônima/estado limpo.
- Confirmar carregamento completo.
- Confirmar ausência de loop de recarregamento.
- Console: nenhum erro JavaScript.
- Network: nenhum 404 dos arquivos JS/CSS ativos.
- Nenhuma Promise rejeitada.

## 2. Navegação desktop

Testar todos os grupos/links existentes no menu.
Confirmar que cada item leva à seção correta.
Confirmar ausência de itens duplicados.
Confirmar que o menu não cria overflow horizontal.

Itens novos que devem existir e funcionar:
- Meu Perfil
- Melhor Regime?
- Finanças
- Logística
- Administração
- Pessoas
- Marketing e Vendas
- Educador
- Planos
- Eventos CEO
- Ranking CEO

## 3. Tablet e celular

Testar pelo menos:
- 1024×768
- 768×1024
- 390×844
- 360×800

Validar:
- menu hambúrguer abre;
- fecha pelo X;
- fecha ao clicar fora;
- fecha após selecionar item;
- sem barra horizontal;
- cards e formulários não vazam da tela;
- botões têm área de toque adequada;
- logo não é esmagada;
- botão de tema permanece visível ao lado do hambúrguer;
- botão de tema NÃO depende de abrir o menu.

## 4. Tema claro/escuro

- Alternar tema no desktop.
- Alternar no tablet.
- Alternar no celular.
- Confirmar legibilidade de textos/cards/inputs/resultados nos dois temas.
- Recarregar a página e confirmar persistência.
- Confirmar que continua sendo um único `themeToggle` funcional.

## 5. Episódios e XP base

- Testar Episódio 1 e Episódio 2.
- Confirmar feedback real nas respostas.
- Confirmar XP apenas uma vez por decisão.
- Recarregar e confirmar persistência.
- Confirmar que respostas já concluídas não concedem XP novamente.

## 6. Empresa Virtual

- Criar empresa.
- Editar empresa.
- Confirmar dashboard.
- Confirmar persistência após reload.
- Confirmar que módulos novos não apagam empresa nem métricas.

## 7. Meu Perfil

- Abrir Meu Perfil pelo menu.
- Confirmar que abre a tela real de perfil.
- Confirmar que NÃO reabre onboarding automaticamente.
- Editar perfil pelo fluxo apropriado.
- Salvar e recarregar.
- Confirmar persistência e integração com Planos.

## 8. Comparador Tributário

- Informar faturamento válido.
- Testar Simples/Lucro Presumido/Lucro Real pela heurística.
- Validar aviso educacional.
- Confirmar XP `tax-regime-comparison` apenas uma vez.
- Alterar valores e recalcular: resultado deve mudar, XP não deve duplicar.
- Faturamento zero deve exibir validação.

## 9. Finanças Avançadas

Testar:
- receita;
- custos variáveis;
- custos fixos;
- prazo de recebimento;
- prazo de pagamento;
- estoque.

Validar saída:
- resultado mensal;
- margem;
- capital de giro estimado;
- resultado com +10% de vendas.

Confirmar persistência e XP único.

## 10. Logística Avançada

Testar e validar:
- giro mensal de estoque;
- nível de serviço;
- frete por pedido;
- estoque parado;
- diagnóstico exibido;
- persistência;
- XP único.

## 11. Administração Avançada

### Prioridade
Selecionar as quatro alternativas em cenários independentes/estado limpo quando necessário.
Confirmar que `Resolver risco de caixa para pagar fornecedores` é tratada como melhor escolha.
Confirmar XP não duplicado.

### Meta
Validar atingimento percentual e gap.
Confirmar persistência.

## 12. Pessoas Avançado

### Contratação
Validar:
- custo mensal estimado;
- receita adicional;
- contribuição após custo;
- produtividade.

### Liderança
Confirmar que a alternativa de feedback específico + entendimento da causa + plano de correção é a melhor.
Confirmar persistência e XP único.

## 13. Marketing e Vendas Avançado

Validar:
- visitante → lead;
- lead → venda;
- recompra;
- CAC;
- ROAS;
- persistência.

Na proposta de valor, confirmar que a alternativa que define público, problema e benefício concreto é a melhor.
Confirmar XP não duplicado.

## 14. Gestão mensal / Laboratórios / Desempenho

Reexecutar testes já aprovados na versão segura para detectar regressão:
- Laboratórios;
- Gestão mês a mês;
- Eventos CEO;
- Desempenho estratégico;
- Progresso;
- Relatório;
- Piloto.

Nenhum módulo novo pode quebrar os anteriores.

## 15. Educador / Turma

- Abrir Área do Educador.
- Testar roteiros 45/90/120 minutos.
- Marcar checklist.
- Salvar observações.
- Recarregar e confirmar persistência.
- Testar impressão/print sem erro JS.
- Confirmar Painel de Turma usando `classroom-v2.js`.
- Confirmar que `classroom.js` legado não é necessário para funcionamento.
- Verificar ausência de tela duplicada de turma.

## 16. Comercial / Planos

Confirmar apenas UMA seção `#planos`.
Confirmar que `commercial-v2.js` não é necessário nem carregado como módulo concorrente.

Testar:
- Explorador;
- Empreendedor;
- Escolas & Turmas.

Validar:
- destaque do plano selecionado;
- texto do botão selecionado;
- persistência;
- perfil e objetivo do onboarding/perfil;
- interesse institucional;
- nenhuma cobrança real/checkout indevido.

## 17. Eventos CEO

Gerar múltiplos eventos e testar escolhas good/mid/bad.
Confirmar:
- efeito em métricas;
- XP do evento apenas uma vez por ID;
- histórico salvo;
- feedback e impacto simulados;
- nenhum loop de statechange;
- nenhum travamento após várias decisões.

## 18. Ranking Eventos CEO — CRÍTICO

O Ranking deve ser SOMENTE LEITURA.

Confirmar:
- aparece após Eventos CEO;
- lê o histórico existente;
- atualiza após uma nova decisão na MESMA aba sem reload;
- atualiza após reload;
- calcula total de decisões;
- conta good/mid/bad;
- calcula Índice CEO;
- organiza ranking por tipo de desafio;
- não concede XP;
- não altera métricas;
- não cria achievement;
- não altera Empresa Virtual;
- não dispara loop;
- não fica rerenderizando continuamente.

Regra esperada do índice:
- good = 100
- mid = 60
- bad = 20
- índice geral = média arredondada das decisões registradas.

Classificações esperadas:
- >=90: CEO Estratégico
- >=75: Gestor Consistente
- >=60: Gestor em Evolução
- abaixo de 60: Gestor em Desenvolvimento

## 19. Persistência geral

Após usar vários módulos, recarregar a página.
Confirmar que permanecem quando aplicável:
- Empresa Virtual;
- respostas;
- XP;
- perfil;
- tema;
- dados dos módulos avançados;
- observações do Educador;
- Plano selecionado;
- Eventos CEO;
- Ranking derivado do histórico.

## 20. Reset de progresso

Testar somente depois de documentar o estado anterior.
Confirmar que o reset apaga o que deve apagar e preserva tema/perfil conforme regra existente.
Confirmar que não deixa módulos em estado inconsistente.

## 21. Estabilidade prolongada

Por pelo menos 5 minutos:
- navegar entre Empresa, Eventos, Ranking, módulos avançados, Educador e Planos;
- alternar tema;
- abrir/fechar menu;
- realizar algumas simulações.

Reprovar se houver:
- reload automático;
- crescimento contínuo de elementos duplicados;
- congelamento;
- uso anormal evidente de CPU;
- erros recorrentes no console;
- chamadas repetitivas anormais;
- XP crescendo sem ação do usuário.

# FORMATO OBRIGATÓRIO DO RELATÓRIO FINAL

Entregar:

1. `RESULTADO GERAL: APROVADO` ou `REPROVADO`.
2. Quantidade total de testes executados.
3. Quantidade aprovada / reprovada / não testada.
4. Tabela de defeitos com:
   - severidade;
   - módulo;
   - passos para reproduzir;
   - resultado atual;
   - resultado esperado;
   - evidência do console/network quando houver.
5. Lista explícita de erros JS.
6. Lista explícita de 404s.
7. Lista explícita de Promises rejeitadas.
8. Resultado do teste de 5 minutos contra loops.
9. Resultado separado para desktop, tablet e celular.
10. Declaração explícita: `Nenhuma alteração foi feita em main ou Firebase`.
11. Recomendação final: `Pode promover para produção` ou `Não pode promover para produção`.

Não usar expressões genéricas como “parece funcionar”. Cada aprovação deve corresponder a um teste executado.
