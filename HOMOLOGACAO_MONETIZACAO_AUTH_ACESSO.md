# Homologação — Monetização, Firebase Auth e Controle de Acesso

Branch obrigatória: `monetizacao-controle-acesso-2026-08-30`

Objetivo: validar a nova camada comercial e de acesso do StoryPlay Empreendedor sem publicar Hosting e sem alterar `main`.

## Pré-condições

- Testar somente a branch acima.
- Firebase Authentication já habilitado com Google e E-mail/Senha.
- Cloud Firestore já criado.
- Regras do Firestore já publicadas no projeto `storyplay-empreendedor`.
- Nenhuma alteração de código durante o teste.
- Não fazer deploy de Hosting.

## 1. Estrutura comercial

Confirmar na seção Planos:

- Explorador = Grátis.
- Empreendedor = opção mensal R$ 29,90.
- Empreendedor = opção anual R$ 299,00.
- Escolas & Turmas = Sob consulta.
- Link mensal abre exatamente `https://payment-link-v3.ton.com.br/pl_P05rwE8vbqmzQWl7U2i3ZeMkgX3pR1Yx`.
- Link anual abre exatamente `https://payment-link-v3.ton.com.br/pl_PajD6lp2kMAEo3YfNKivXgBez1yLm4YK`.
- Ambos abrem em nova aba e não substituem a sessão do StoryPlay.
- Escolas não possui checkout público.

## 2. Conteúdo Explorador

Sem login e sem qualquer documento de acesso no Firestore:

- Home acessível.
- Jornada acessível.
- Episódio 1 acessível.
- Episódio 2 acessível.
- Trilhas acessível.
- Desafios introdutórios acessíveis.
- Empresa Virtual básica acessível.
- Área de Planos acessível.
- Conta acessível.

Critério: conteúdo Explorador nunca deve ficar bloqueado por overlay Premium.

## 3. Conteúdo Empreendedor bloqueado

Sem login / sem acesso Premium ativo:

- módulos avançados devem ficar bloqueados;
- overlay deve informar Conteúdo Premium;
- botão Ver planos deve navegar para `#planos`;
- botão Entrar / validar acesso deve abrir o modal de autenticação;
- o usuário não deve conseguir remover o bloqueio apenas alterando `localStorage`.

## 4. Escolas separado do Empreendedor

Validar que:

- `#area-educador` e `#painel-turma` não são liberados apenas por assinatura Empreendedor;
- exibem bloqueio institucional quando aplicável;
- administrador tem acesso;
- conta de teste autorizada pode acessar quando a política de teste permitir;
- plano Escolas permanece "Sob consulta".

## 5. Login Google — administrador

Entrar com o e-mail administrador configurado no código e regras.

Validar:

- login Google funciona;
- estado retorna administrador;
- acesso integral é liberado;
- painel administrativo aparece pelo link discreto no rodapé;
- não existe senha administrativa hardcoded em JS;
- logout funciona e volta a bloquear Premium.

## 6. Login E-mail/Senha

Criar/usar uma conta comum de teste via Firebase Auth.

Validar:

- criação de conta funciona;
- login funciona;
- conta sem liberação não recebe Premium;
- logout funciona;
- usuário comum não consegue acessar o painel administrativo como admin.

## 7. Liberação de teste por 15 dias

Como administrador:

- cadastrar um e-mail de teste com 15 dias;
- conferir documento em `trialAccess/{email}`;
- validar `status=active`, `source=trial`, `startsAt` e `expiresAt` coerentes;
- entrar com esse mesmo e-mail;
- confirmar Premium ativo;
- confirmar exibição da validade;
- confirmar acesso aos módulos avançados.

## 8. Revogação

Como administrador:

- revogar o e-mail de teste;
- confirmar `status=revoked`;
- no usuário testado, após atualização/relogin, Premium deve ficar bloqueado;
- Explorador deve continuar liberado.

## 9. Extensão +15 dias

Como administrador:

- reativar/liberar o teste;
- usar a ação `+15 dias`;
- confirmar que `expiresAt` avançou em 15 dias a partir da maior data entre agora e a expiração existente;
- usuário permanece ativo.

## 10. Expiração automática

Sem alterar dados de produção real, usar conta/documento de QA e configurar `expiresAt` para instante já vencido.

Validar:

- `active=false`;
- `expired=true`;
- Premium bloqueado;
- Explorador continua livre;
- mensagem de período de teste encerrado aparece.

Depois do teste, remover ou restaurar o documento de QA.

## 11. Segurança Firestore

Testar com usuário comum autenticado:

- pode fazer `get` apenas do próprio `trialAccess/{email}`;
- não pode listar `trialAccess`;
- não pode criar, editar ou excluir `trialAccess`;
- não pode listar `subscriptionAccess`;
- não pode criar, editar ou excluir `subscriptionAccess`;
- não pode ler acesso de outro e-mail;
- não pode escrever em `organizations`;
- não pode assumir privilégio de administrador via localStorage ou edição de DOM.

Como administrador:

- consegue listar e administrar `trialAccess`;
- consegue ler/escrever estruturas autorizadas pelas regras.

## 12. Persistência e troca de sessão

- Login persiste após F5 conforme Firebase Auth.
- Logout remove acesso visual imediatamente.
- Trocar de usuário admin -> comum recalcula acesso corretamente.
- Trocar de usuário comum -> admin recalcula acesso corretamente.
- Não pode sobrar estado Premium do usuário anterior.

## 13. Regressão técnica

Desktop 1366x900 e mobile 390x844:

- sem overflow horizontal;
- menu/hambúrguer normal;
- tema claro/escuro normal;
- modal de autenticação responsivo;
- painel admin utilizável em mobile;
- tabela de acessos não quebra layout;
- 0 erros JavaScript;
- 0 404/5xx nos arquivos da aplicação;
- 0 Promises rejeitadas;
- sem reload em loop;
- sem MutationObserver em loop;
- sem travamento ou uso anormal de CPU.

## 14. Resultado obrigatório

Ao final responder exatamente com uma das conclusões:

`HOMOLOGAÇÃO MONETIZAÇÃO/AUTH/ACESSO — APROVADA`

`Pode seguir para teste controlado e futura promoção.`

ou

`HOMOLOGAÇÃO MONETIZAÇÃO/AUTH/ACESSO — REPROVADA`

seguida da lista objetiva de falhas encontradas.
