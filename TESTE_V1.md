# Roteiro de Testes — StoryPlay Empreendedor V1

## 1. Navegação e responsividade

- Testar desktop, notebook, tablet vertical/horizontal e celular.
- Confirmar ausência de rolagem horizontal indevida.
- Em larguras até 1280 px, confirmar uso do menu hambúrguer.
- Validar todos os itens visíveis do menu e as respectivas âncoras.
- Confirmar que âncoras não ficam escondidas sob o cabeçalho.
- No menu hambúrguer, confirmar:
  - abertura e fechamento pelo botão;
  - fechamento ao selecionar uma opção;
  - fechamento ao tocar fora;
  - fechamento pelo overlay;
  - rolagem interna até o último item;
  - tecla Esc quando disponível.
- Confirmar que o menu não permanece aberto ao voltar para uma largura acima de 1280 px.

## 2. Tema

- Alternar claro/escuro.
- Atualizar a página.
- Fechar e reabrir navegador.
- Confirmar persistência.
- Verificar contraste de cards, campos, textos, barras, tabelas e botões em ambos os temas.

## 3. Episódios e quizzes

- Responder q1, q2, q3, q4, q5, q6 e q7.
- Testar respostas melhores, intermediárias e ruins.
- Confirmar feedback correto.
- Confirmar XP apenas na primeira resposta de cada pergunta.
- Atualizar a página e confirmar:
  - alternativa selecionada destacada;
  - feedback restaurado;
  - XP preservado;
  - pergunta não pontua novamente.
- No Episódio 2, confirmar conteúdo real nos quatro tópicos:
  - Viabilidade;
  - Atividade e estrutura;
  - Registro e CNPJ;
  - Inscrições e licenças.

## 4. Progresso

- Conferir XP, conhecimento e nível após atividades.
- Confirmar que conhecimento nunca passa de 100%.
- Confirmar mudança de próxima missão.
- Confirmar conquistas na Empresa Virtual.
- Confirmar que XP é tratado como gamificação, não como nota escolar.

## 5. Empresa Virtual

- Estado inicial deve mostrar nenhuma empresa criada.
- Nome deve iniciar vazio.
- Capital deve iniciar sem valor real cadastrado.
- Testar nome com menos de 2 caracteres.
- Testar contador de caracteres até 60.
- Testar capital abaixo de R$ 1.000.
- Testar criação válida.
- Testar segmentos longos.
- Atualizar página e confirmar persistência.
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
- Confirmar que a simulação não destrói métricas consolidadas da Empresa Virtual.

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
- Criar Empresa Virtual, fechar meses e aplicar evento CEO; depois rodar Marketing com valores zerados.
- Confirmar que revenue e clients consolidados NÃO voltam para zero.
- Confirmar que a simulação fica separada das métricas reais acumuladas.

## 10. Gestão de Pessoas e Administração

- Testar todas as alternativas dos cenários.
- Confirmar diferenciação visual.
- Confirmar mensagem pedagógica.
- Confirmar XP apenas uma vez.
- Confirmar que reputação não pode ser aumentada repetidamente pelo mesmo cenário.

## 11. Gestão mensal e Eventos CEO

- Fechar pelo menos 3 meses.
- Confirmar histórico, faturamento, lucro/prejuízo, clientes e caixa.
- Confirmar conquista de 3 meses.
- Testar Eventos CEO e suas consequências.
- Confirmar persistência após F5.
- Confirmar que eventos não permitem efeitos ilimitados para o mesmo período.

## 12. Desempenho Estratégico

- Confirmar índice estratégico.
- Conferir dimensões Financeiro, Mercado, Operação, Pessoas e Risco.
- Conferir ranking/faixa.
- Conferir desafios de 3, 6 e 12 meses quando aplicáveis.

## 13. Onboarding, Conta e Planos

- Completar onboarding.
- Editar Meu Perfil.
- Confirmar persistência após F5.
- Conferir Conta em Modo local.
- Confirmar Google/e-mail em preparação e Firestore/Cobrança não ativos.
- Se a seção Planos estiver visível, confirmar que é demonstração e não existe cobrança real.

## 14. Modo Piloto

- Confirmar seção Piloto no menu.
- Conferir indicadores pedagógicos separados do XP.
- Confirmar cálculo de:
  - decisões avaliadas;
  - melhores decisões;
  - atividades práticas;
  - Mercado;
  - Formalização;
  - Finanças;
  - Gestão.
- Preencher notas de 1 a 5 para clareza, facilidade, engajamento, aprendizado percebido e dificuldade.
- Tentar salvar com nota faltando e confirmar bloqueio.
- Salvar avaliação completa e comentário opcional.
- Dar F5 e confirmar persistência.
- Limpar avaliação e confirmar remoção local.

## 15. Relatório Individual de Aprendizagem

- Abrir Relatório pelo menu.
- Confirmar nome/perfil quando houver onboarding.
- Conferir XP identificado como gamificação.
- Conferir decisões avaliadas, melhores decisões e atividades práticas.
- Conferir competências Mercado, Formalização, Finanças e Gestão.
- Conferir Empresa Virtual, faturamento, clientes, reputação, meses e eventos.
- Conferir avaliação do piloto quando preenchida.
- Clicar em Atualizar relatório.
- Usar Imprimir / Salvar PDF e verificar layout de impressão.
- Confirmar que o relatório não apresenta XP como certificação ou nota escolar.

## 16. Área do Educador

- Abrir Educador pelo menu.
- Alternar roteiros de 45, 90 e 120 minutos.
- Confirmar atualização correta das etapas e tempos.
- Marcar itens do checklist.
- Registrar notas do facilitador.
- Salvar observações.
- Dar F5 e confirmar persistência.
- Testar impressão do roteiro.
- Confirmar aviso de uso responsável dos indicadores.

## 17. Painel de Turma Local

- Abrir Painel de Turma pelo menu.
- Adicionar participante por código/apelido, sem exigir nome completo.
- Registrar percentuais de Mercado, Formalização, Finanças e Gestão.
- Adicionar pelo menos 3 participantes.
- Conferir:
  - total de participantes;
  - média geral;
  - média por competência;
  - área com maior necessidade de reforço.
- Testar importação/uso do resultado do usuário atual, quando disponível.
- Remover um participante e conferir recálculo.
- Dar F5 e confirmar persistência local.
- Testar impressão do painel.
- Limpar a turma e confirmar remoção dos registros.
- Confirmar orientação para não registrar dados pessoais desnecessários.

## 18. Reiniciar jornada

- Criar empresa.
- Responder quizzes.
- Completar laboratórios.
- Preencher avaliação piloto.
- Clicar em Reiniciar jornada.
- Cancelar e confirmar que nada muda.
- Repetir e confirmar exclusão.
- Confirmar reset do progresso principal e dados de piloto vinculados à jornada.
- Confirmar que tema e perfil de onboarding permanecem quando essa for a regra definida.

## 19. Teste final de UX

Percorrer o aplicativo como um jovem que nunca abriu uma empresa e avaliar:

- Eu sei o que fazer em seguida?
- A linguagem é simples sem parecer infantil?
- Os cards parecem interativos e modernos?
- Os campos são grandes e fáceis de usar no celular?
- Os botões possuem espaço suficiente para toque?
- O aprendizado acontece por decisão e consequência, e não por texto excessivo?
- Existe vontade de continuar para a próxima atividade?

Depois, percorrer como educador e avaliar:

- Consigo aplicar uma oficina sem treinamento técnico prévio?
- Consigo observar aprendizagem sem confundir XP com nota?
- O relatório ajuda a discutir evolução?
- O Painel de Turma ajuda a identificar áreas que precisam de reforço?
