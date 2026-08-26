# Arquitetura de Produto — StoryPlay Empreendedor

## Objetivo
Preparar a V1 local para evoluir para um produto comercial com autenticação, sincronização de progresso, perfis e assinatura, sem acoplar cobrança real antes da validação da experiência.

## Estado atual
A V1 funciona sem login e persiste dados no navegador. Isso permite testar pedagogia, UX, gamificação e simuladores antes de adicionar backend.

## Camada comercial preparada
Planos demonstrativos:
- Explorador — gratuito
- Empreendedor — premium individual
- Escolas & Turmas — institucional

A seleção de plano na V1 é apenas demonstrativa. Não existe checkout, cobrança, cartão ou bloqueio real de conteúdo.

## Modelo de perfis previsto
- aluno/jovem
- universitário/jovem empreendedor
- empreendedor em planejamento
- gestor/profissional
- professor/escola
- administrador da plataforma

## Próxima arquitetura Firebase
### Authentication
Métodos previstos:
- Google
- e-mail e senha

### Firestore
Coleções sugeridas:
- users/{uid}
- users/{uid}/progress/main
- users/{uid}/companies/main
- users/{uid}/monthlyHistory/{monthId}
- users/{uid}/events/{eventId}
- organizations/{orgId}
- organizations/{orgId}/classes/{classId}
- organizations/{orgId}/members/{uid}
- subscriptions/{uid}

## Dados do usuário
Documento `users/{uid}`:
- displayName
- email
- role
- profileType
- goal
- recommendedTrack
- plan
- organizationId opcional
- createdAt
- updatedAt

## Progressão
Documento `users/{uid}/progress/main`:
- xp
- level
- answered
- labs
- achievements
- metrics
- updatedAt

## Empresa Virtual
Documento `users/{uid}/companies/main`:
- name
- sector
- capital
- revenue
- profit
- clients
- reputation
- stockStatus
- cashBalance
- createdAt
- updatedAt

## Regras de acesso planejadas
- Free: conteúdo introdutório e demonstrações
- Premium: trilhas e simuladores completos
- Escola: recursos Premium + turma/professor/relatórios
- Admin: gestão de conteúdo e operação da plataforma

A autorização real deverá ser validada no backend/Firestore Rules. Não confiar apenas em esconder botões no frontend.

## Migração do localStorage
Na primeira autenticação futura:
1. Ler progresso local existente.
2. Criar documento do usuário se não existir.
3. Oferecer migração do progresso local para a nuvem.
4. Evitar sobrescrever progresso mais recente sem comparação de data/versão.
5. Após sincronização, manter cache local para uso rápido.

## Pagamentos
O frontend não deverá armazenar dados de cartão. A cobrança deverá ser feita por provedor de pagamento e confirmada por backend/webhook seguro antes de alterar o plano do usuário.

## Escolas
Recursos previstos:
- professor cria/gerencia turmas
- convite ou código de turma
- visão agregada de progresso
- relatórios por aluno e turma
- trilhas recomendadas
- licenciamento por quantidade de alunos

## Segurança e privacidade
Antes de produção comercial:
- política de privacidade
- termos de uso
- consentimentos aplicáveis
- minimização de dados
- regras Firestore por usuário/organização
- logs administrativos
- revisão de LGPD, especialmente para menores de idade

## Princípio de implementação
Primeiro validar conteúdo, UX e simuladores. Depois ativar autenticação e nuvem. Por último ativar cobrança e bloqueios comerciais, reduzindo risco de retrabalho.