# StoryPlay Empreendedor — Roteiro de apresentação para segunda-feira

## Objetivo
Apresentar a versão estável publicada do StoryPlay Empreendedor com foco na jornada do usuário, no aprendizado prático e nos simuladores de gestão, evitando alterações de última hora na produção.

## Ordem recomendada da demonstração

1. **Home e proposta do produto**
   - Mostrar identidade visual, navegação e alternância claro/escuro.
   - Explicar que o aplicativo ensina empreendedorismo por decisões, simulações e evolução prática.

2. **Meu Perfil**
   - Abrir `Meu Progresso > Meu Perfil`.
   - Mostrar nome, perfil, objetivo e possibilidade de edição.
   - Evitar refazer o onboarding durante a apresentação se o perfil já estiver configurado.

3. **StoryPlay / Episódios**
   - Abrir um episódio já disponível.
   - Responder uma decisão e mostrar feedback, XP e evolução.
   - Destacar que o conteúdo é situacional: o usuário aprende tomando decisões.

4. **Empresa Virtual**
   - Mostrar criação/edição da empresa.
   - Apresentar indicadores de receita, caixa, clientes, reputação e demais métricas.
   - Explicar que decisões dos módulos podem afetar a Empresa Virtual.

5. **Laboratórios e Comparador Tributário**
   - Mostrar os laboratórios empresariais.
   - Abrir o comparador educacional entre Simples Nacional, Lucro Presumido e Lucro Real.
   - Reforçar que é ferramenta educacional, não consultoria tributária.

6. **Módulos Avançados**
   - Finanças: resultado, margem e capital de giro.
   - Logística: giro, nível de serviço, frete e estoque parado.
   - Administração: priorização gerencial e metas.
   - Pessoas: contratação e feedback.
   - Marketing e Vendas: funil, CAC, ROAS, recompra e proposta de valor.

7. **Eventos CEO**
   - Gerar um novo evento.
   - Escolher uma decisão estratégica.
   - Mostrar feedback e impacto simulado.

8. **Ranking CEO**
   - Abrir o ranking imediatamente após o Evento CEO.
   - Mostrar Índice CEO, classificação e ranking por tipo de desafio.
   - Destacar que o ranking lê decisões já registradas e não cria XP adicional.

9. **Progresso e Relatório**
   - Mostrar XP, nível, decisões, atividades práticas e reputação.
   - Abrir Relatório Individual e opções de atualização/impressão.

10. **Área do Educador e Turma**
    - Mostrar roteiro pedagógico.
    - Abrir Painel de Turma.
    - Explicar acompanhamento de alunos/turmas e uso educacional.

11. **Planos / visão comercial**
    - Mostrar Explorador, Empreendedor e Escolas & Turmas.
    - Explicar que a versão atual demonstra a estrutura comercial; cobrança real só deve ser apresentada como futura evolução se ainda não estiver integrada.

## Demonstração curta — 5 minutos

Se o tempo for limitado, usar esta sequência:

1. Home
2. StoryPlay / decisão
3. Empresa Virtual
4. Comparador Tributário
5. Evento CEO
6. Ranking CEO
7. Progresso
8. Área do Educador / Turma

## Verificação antes da apresentação

- Abrir `https://storyplay-empreendedor.web.app`.
- Fazer F5.
- Confirmar que o perfil abre corretamente.
- Confirmar tema claro/escuro.
- Confirmar menu desktop ou hambúrguer conforme a resolução.
- Abrir Painel de Turma e verificar ausência de scroll horizontal da página.
- Gerar um Evento CEO e conferir atualização do Ranking CEO.
- Confirmar que console do navegador não apresenta erro relevante, caso esteja sendo monitorado.
- Não fazer deploy na manhã da apresentação sem necessidade real.

## Plano de contingência

### Se algum dado de teste estiver estranho
- Não limpar localStorage durante a apresentação.
- Use F5 primeiro.
- Navegue para outra seção e retorne.

### Se o navegador estiver com cache antigo
- Use `Ctrl + F5`.
- Reabra o endereço oficial.

### Se houver indisponibilidade local de internet
- Manter uma captura de tela ou vídeo curto da jornada principal como apoio de apresentação.

### Se surgir bug não bloqueador
- Não tentar corrigir ao vivo.
- Registrar o ponto e seguir para outro módulo.

### Se surgir bug bloqueador antes de segunda-feira
- Corrigir apenas na branch de evolução.
- Fazer teste focado.
- Promover para `main` somente se aprovado.
- Manter `producao-estavel-2026-08-28` como referência de rollback.

## Regra de entrega

Até a apresentação de segunda-feira:

- `main` = produção aprovada.
- Firebase = produção aprovada.
- `producao-estavel-2026-08-28` = rollback da entrega.
- `evolucao-pos-producao-2026-08-28` = desenvolvimento futuro.
- Refatorações de CSS, breakpoints e hotfixes históricos ficam para depois da entrega, salvo se causarem bug real e bloqueador.
