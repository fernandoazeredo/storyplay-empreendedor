# Ativação Firebase Auth + Firestore — StoryPlay Empreendedor

Branch de trabalho: `monetizacao-controle-acesso-2026-08-30`

## Objetivo

Ativar autenticação e controle de acesso para três níveis comerciais:

- **Explorador** — gratuito e sempre liberado.
- **Empreendedor** — pago mensal/anual ou acesso temporário autorizado.
- **Escolas & Turmas** — sob consulta e autorização institucional.

Administrador autorizado: `fernandoazeredo64@gmail.com`.

## 1. Authentication

No Firebase Console do projeto `storyplay-empreendedor`:

1. Abra **Authentication**.
2. Clique em **Começar / Get started**.
3. Em **Sign-in method**, habilite:
   - **Google**;
   - **E-mail/senha**.
4. Em Google, selecione o e-mail de suporte do projeto e salve.
5. Confirme que `storyplay-empreendedor.web.app` está em **Authorized domains**.

Nenhuma senha de administrador deve ser colocada no GitHub ou em arquivo JavaScript. A senha é gerenciada exclusivamente pelo Firebase Authentication.

## 2. Firestore Database

1. Abra **Firestore Database**.
2. Clique em **Criar banco de dados**.
3. Use modo de produção.
4. Escolha uma região adequada e mantenha-a como região definitiva do projeto.
5. Não crie permissões públicas temporárias.

As regras oficiais desta branch estão em `firestore.rules`.

## 3. Configuração Web pública

Acesse **Configurações do projeto > Geral > Seus apps**.

Se já existir um aplicativo Web, abra **SDK setup and configuration > Config**.

Se não existir, crie um aplicativo Web chamado, por exemplo, `StoryPlay Empreendedor Web`, sem alterar o Hosting existente.

Copie somente estes valores públicos:

- `apiKey`
- `authDomain`
- `projectId`
- `storageBucket`
- `messagingSenderId`
- `appId`

Eles devem substituir os placeholders em `public/firebase-config.js`.

A configuração Web do Firebase não é uma senha. A segurança é fornecida pelo Firebase Auth e por `firestore.rules`.

## 4. Regras de acesso

A coleção `trialAccess` usa o e-mail normalizado como ID do documento.

Exemplo conceitual:

```text
trialAccess/amigo@example.com
  email: amigo@example.com
  status: active
  source: trial
  startsAt: 2026-08-30T12:00:00.000Z
  expiresAt: 2026-09-14T12:00:00.000Z
```

Somente o administrador pode criar, alterar, listar ou revogar liberações. O usuário autenticado pode consultar apenas o documento correspondente ao próprio e-mail.

A coleção `subscriptionAccess` fica reservada para futuras confirmações de assinatura/manual ou webhook.

## 5. Teste de administrador

Após preencher `public/firebase-config.js` e publicar as regras em ambiente de homologação:

1. Abra o link discreto **Administração** no rodapé.
2. Entre com Google usando `fernandoazeredo64@gmail.com`.
3. O painel deve mostrar **Administrador**.
4. Libere um e-mail de teste por 15 dias.
5. Em outro navegador/perfil, crie/login com exatamente o e-mail liberado.
6. Confirme acesso Premium.
7. Revogue o teste no painel.
8. Confirme que o Premium volta a ficar bloqueado.

## 6. Política comercial

### Explorador

Sempre livre. Não exige pagamento e não deve ser afetado por expiração de teste.

### Empreendedor

Checkout externo:

- Mensal — R$ 29,90
- Anual — R$ 299,00

Enquanto não houver webhook da Ton/Stone, a confirmação de pagamento não libera automaticamente o usuário. A automação de pagamento será uma etapa posterior.

### Escolas & Turmas

Sem checkout público. Acesso institucional sob consulta e autorização administrativa.

## 7. Publicação segura

Não publicar diretamente em produção antes de homologar:

- login Google;
- login e-mail/senha;
- administrador;
- teste 15 dias;
- expiração/revogação;
- Explorador sempre livre;
- Empreendedor bloqueado sem autorização;
- Escolas separado do Empreendedor;
- links Ton mensal/anual;
- responsividade e tema;
- console/rede sem erros.
