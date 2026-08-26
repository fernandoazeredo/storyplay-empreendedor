# Roteiro de Testes — StoryPlay Empreendedor V1

## 1. Navegação e responsividade

- Testar desktop, notebook, tablet vertical/horizontal e celular.
- Confirmar ausência de rolagem horizontal indevida.
- Validar Home, Jornada, StoryPlay, Trilhas, Laboratórios, Desafios e Empresa Virtual.
- Confirmar que âncoras não ficam escondidas sob o cabeçalho.
- No tablet/celular: abrir menu hambúrguer e fechar por:
  - toque no mesmo botão;
  - toque em item do menu;
  - toque fora da caixa do menu;
  - overlay;
  - tecla Esc quando disponível.
- Confirmar que o menu não permanece aberto ao voltar ao desktop.

## 2. Tema

- Alternar claro/escuro.
- Atualizar a página.
- Fechar e reabrir navegador.
- Confirmar persistência.
- Verificar contraste de cards, campos, textos e botões em ambos os temas.

## 3. Episódios e quizzes

- Responder q1, q2, q4, q5 e desafio q3.
- Testar respostas ótimas, intermediárias e ruins.
- Confirmar feedback correto.
- Confirmar XP apenas na primeira resposta de cada pergunta.
- Atualizar a página e confirmar:
  - alternativa selecionada destacada;
  - feedback restaurado;
  - XP preservado;
  - pergunta não pontua novamente.

## 4. Progresso

- Conferir XP, conhecimento e nível após cada atividade.
- Confirmar que conhecimento nunca passa de 100%.
- Confirmar mudança de próxima missão.
- Confirmar conquistas na Empresa Virtual.

## 5. Empresa Virtual

- Estado inicial deve mostrar nenhuma empresa criada.
- Nome deve iniciar vazio.
- Capital deve iniciar sem valor real cadastrado.
- Testar nome com menos de 2 caracteres.
- Testar contador de caracteres até 60.
- Testar capital abaixo de R$ 1.000.
- Testar criação válida.
- Testar todos os grupos do seletor de segmentos.
- Testar segmentos com nomes longos.
- Atualizar página e confirmar persistência da empresa.
- Editar empresa e salvar novamente.
- Confirmar dashboard e nome no card principal.

## 6. Laboratório Financeiro

- Alterar preço, custo variável, custo fixo e unidades.
- Conferir faturamento = preço x unidades.
- Conferir lucro = faturamento - custos variáveis totais - custos fixos.
- Conferir margem de contribuição por unidade = preço - custo variável.
- Conferir ponto de equilíbrio = custos fixos / margem de contribuição.
- Testar cenário com preço menor ou igual ao custo variável.
- Confirmar XP apenas na primeira conclusão.
- Com Empresa Virtual criada, confirmar atualização do faturamento do dashboard.

## 7. Diagnóstico Tributário Educacional

- Testar faturamento mensal, despesas, folha e quantidade de meses.
- Conferir faturamento projetado.
- Conferir resultado antes de tributos.
- Conferir margem simples.
- Conferir relação folha/faturamento.
- Confirmar que o sistema NÃO promete automaticamente o melhor regime tributário.
- Confirmar aviso educacional e necessidade de validar regras vigentes.

## 8. Estoque e Logística

- Testar demanda mensal, prazo, estoque de segurança e estoque atual.
- Conferir consumo médio diário.
- Conferir ponto de reposição.
- Testar estoque abaixo e acima do ponto de reposição.
- Conferir mensagem de necessidade de novo pedido.

## 9. Marketing e Vendas

- Testar visitantes, leads, vendas, mídia e receita.
- Conferir taxa visitante → lead.
- Conferir taxa lead → venda.
- Conferir CAC = investimento / vendas.
- Conferir ROAS = receita atribuída / investimento.
- Testar zero vendas e zero investimento.
- Com Empresa Virtual criada, confirmar atualização de faturamento e clientes no dashboard.

## 10. Gestão de Pessoas

- Testar as três alternativas.
- Confirmar diferenciação visual entre boa, intermediária e ruim.
- Confirmar mensagem pedagógica.
- Confirmar XP apenas uma vez.

## 11. Administração e Prioridades

- Testar as três alternativas.
- Confirmar que risco operacional crítico é priorizado como melhor decisão.
- Confirmar feedback e XP único.

## 12. Reiniciar jornada

- Criar empresa.
- Responder quizzes.
- Completar laboratórios.
- Clicar em Reiniciar jornada.
- Cancelar e confirmar que nada muda.
- Repetir e confirmar exclusão.
- Confirmar reset de:
  - Empresa Virtual;
  - XP;
  - respostas;
  - laboratórios concluídos;
  - dashboard.
- Confirmar que o tema permanece independente do progresso.

## 13. Teste final de UX

Percorrer o aplicativo como um jovem que nunca abriu uma empresa e avaliar:

- Eu sei o que fazer em seguida?
- A linguagem é simples sem parecer infantil?
- Os cards parecem interativos e modernos?
- Os campos são grandes e fáceis de usar no celular?
- Os botões possuem espaço suficiente para toque?
- O aprendizado acontece por decisão e consequência, e não por texto excessivo?
- Existe vontade de continuar para a próxima atividade?
