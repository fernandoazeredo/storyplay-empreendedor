# StoryPlay Empreendedor — Monetização e Controle de Acesso

## Branch
`monetizacao-controle-acesso-2026-08-30`

Base: versão estável de entrega em `main` (`238cbd8`).

## Modelo comercial aprovado

### Explorador — GRATUITO
Sempre liberado, sem necessidade de pagamento.

Escopo de entrada:
- Home e Jornada
- Episódios introdutórios
- Trilhas de apresentação
- Desafios introdutórios
- Empresa Virtual básica
- Laboratórios básicos/selecionados
- Perfil, progresso local, tema e recursos gerais
- Área de Planos e Conta

### Empreendedor — PAGO
Cobrança externa Ton/Stone.

Mensal: **R$ 29,90**
- https://payment-link-v3.ton.com.br/pl_P05rwE8vbqmzQWl7U2i3ZeMkgX3pR1Yx

Anual: **R$ 299,00**
- https://payment-link-v3.ton.com.br/pl_PajD6lp2kMAEo3YfNKivXgBez1yLm4YK

Escopo Premium previsto:
- Comparador tributário avançado
- Finanças avançadas
- Logística avançada
- Administração avançada
- Pessoas avançado
- Marketing e Vendas avançado
- Gestão mensal / saúde da empresa
- Eventos CEO
- Desempenho estratégico e recursos avançados

Os links de checkout não devem, por si só, liberar conteúdo no navegador. A autorização real deve ser mantida no Firebase/Firestore ou confirmada por integração futura com o provedor de pagamentos.

### Escolas & Turmas — SOB CONSULTA
Sem checkout público nesta fase.

Escopo institucional:
- Área do Educador
- Painel de Turma
- Recursos institucionais futuros

A assinatura individual Empreendedor não libera automaticamente o plano Escolas & Turmas.

## Administração

Entrada discreta no rodapé: `Administração`.

Administrador principal autorizado:
`fernandoazeredo64@gmail.com`

Autenticação prevista:
- Google
- E-mail e senha

A senha do administrador nunca deve ser escrita no JavaScript, GitHub ou HTML.

## Testes pessoais

O administrador pode cadastrar o e-mail de um convidado e liberar acesso temporário.

Padrão: **15 dias**.

Campos persistidos em `/trialAccess/{email}`:
- email
- status
- source
- startsAt
- expiresAt
- updatedAt

Após `expiresAt`, a aplicação considera o acesso expirado e volta a bloquear o conteúdo protegido.

O administrador pode:
- liberar acesso;
- estender +15 dias;
- revogar acesso.

## Segurança

A decisão de acesso não deve depender de `localStorage`.

Fonte de autoridade:
- Firebase Authentication para identidade;
- Firestore para autorização e validade;
- regras do Firestore restringindo gestão ao administrador.

## Próximos passos obrigatórios antes de deploy

1. Obter a configuração Web oficial do Firebase `storyplay-empreendedor`.
2. Preencher `public/firebase-config.js`.
3. Ativar Authentication:
   - Google;
   - Email/Password.
4. Criar/ativar Firestore.
5. Publicar `firestore.rules`.
6. Homologar login administrativo.
7. Homologar usuário Explorador sem login/pagamento.
8. Homologar liberação de teste por 15 dias.
9. Homologar expiração/revogação.
10. Homologar mensal/anual abrindo os links Ton/Stone corretos.
11. Homologar que Empreendedor não libera Escolas & Turmas.
12. Somente depois considerar promoção para `main` e deploy.
