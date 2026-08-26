# Preparação de autenticação e nuvem

A V1 permanece local-first. Nenhuma autenticação ou escrita em Firestore é ativada apenas por este arquivo.

## Estado atual

- Firebase Hosting ativo.
- Progresso salvo em `localStorage`.
- Onboarding, Empresa Virtual, eventos, metas e históricos permanecem locais.
- Tela “Conta” informa claramente que o modo atual é local.

## Próxima ativação técnica

1. No Firebase Console, habilitar Authentication.
2. Ativar os provedores desejados, inicialmente Google e E-mail/Senha.
3. Criar o banco Firestore na região adequada ao projeto.
4. Copiar `firestore.rules.example` para `firestore.rules`, revisar e publicar as regras.
5. Obter a configuração Web App oficial do projeto e criar `public/firebase-config.js` com base em `public/firebase-config.example.js`.
6. Carregar o SDK modular do Firebase e inicializar Auth/Firestore.
7. Implementar observação de sessão (`onAuthStateChanged`).
8. Na primeira autenticação, oferecer migração dos dados locais para o documento do usuário.
9. Após confirmar sincronização, manter cache local como contingência e experiência offline.

## Modelo de dados sugerido

`users/{uid}`
- displayName
- email
- role: student | entrepreneur | teacher | admin
- onboardingProfile
- onboardingGoal
- plan
- createdAt
- updatedAt

`users/{uid}/progress/main`
- xp
- answered
- labs
- achievements
- metrics

`users/{uid}/companies/main`
- company
- goals
- monthlyHistory
- eventsHistory

Estrutura institucional futura:

`organizations/{orgId}`
`organizations/{orgId}/members/{uid}`
`organizations/{orgId}/classes/{classId}`
`organizations/{orgId}/classes/{classId}/students/{uid}`

## Migração local → nuvem

A migração deve ser explícita e idempotente:

1. usuário entra pela primeira vez;
2. app detecta progresso local;
3. app verifica se a conta já possui progresso em nuvem;
4. se a nuvem estiver vazia, oferece “Salvar meu progresso nesta conta”;
5. grava os dados e registra versão/data de migração;
6. nunca sobrescreve silenciosamente uma jornada existente na nuvem.

## Segurança

- Nunca confiar apenas na interface para autorização.
- Toda proteção real precisa existir nas Firestore Security Rules.
- Documentos pessoais devem ser acessíveis apenas pelo próprio `uid`, salvo regras institucionais explícitas.
- Perfis administrativos não devem ser definidos pelo cliente sem validação segura.
- Cobrança futura deve usar backend/webhook confiável para definir entitlement; nunca apenas `localStorage`.

## LGPD

Antes do lançamento multiusuário:

- Política de Privacidade;
- Termos de Uso;
- finalidade e base legal do tratamento;
- retenção e exclusão de conta/dados;
- minimização de dados pessoais;
- atenção específica para eventual uso por menores e escolas.
