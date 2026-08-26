# Auditoria Técnica V1 — StoryPlay Empreendedor

Data de revisão: 26/08/2026

## Escopo revisado

- carregamento do app principal
- módulos dinâmicos
- navegação e menu responsivo
- persistência em localStorage
- onboarding
- planos comerciais demonstrativos
- Empresa Virtual
- laboratórios
- gestão mensal
- eventos CEO
- desempenho estratégico
- conta/nuvem em modo local
- reset da jornada

## Correções aplicadas nesta auditoria

### 1. Perfil do onboarding x área de Planos

**Problema encontrado:** o onboarding grava os dados em `storyplay-onboarding`, enquanto a área comercial procurava `storyplay-profile`.

**Impacto:** mesmo com onboarding concluído, a área de Planos poderia exibir “Não definido”.

**Correção:** `commercial.js` agora lê diretamente `storyplay-onboarding`, usa os mesmos IDs de perfil/objetivo e atualiza a visualização quando o estado muda.

### 2. Ordem dos módulos JavaScript

**Problema encontrado:** scripts criados dinamicamente estavam usando `defer`, porém scripts dinâmicos podem executar de forma assíncrona.

**Impacto:** a ordem de criação das seções e itens do menu poderia variar entre carregamentos/navegadores.

**Correção:** o loader em `app.js` passou a usar `script.async = false`, garantindo execução sequencial na ordem definida.

## Estado técnico atual

### Base principal

- `index.html` carrega `styles.css` e `app.js`.
- `app.js` inicializa estado, tema, menu, quizzes, Empresa Virtual e API interna.
- módulos extras são carregados de forma sequencial.

### Ordem oficial dos módulos

1. `labs.js`
2. `progress.js`
3. `business.js`
4. `monthly.js`
5. `events.js`
6. `performance.js`
7. `onboarding.js`
8. `commercial.js`
9. `account.js`

Arquivos CSS correspondentes são carregados antes dos módulos.

### Persistência local

Principais chaves:

- `storyplay-state`
- `storyplay-theme`
- `storyplay-onboarding`
- `storyplay-month-history`
- `storyplay-goals`
- `storyplay-events-state`
- `storyplay-commercial`

### Reset

O reset da jornada apaga progresso empresarial e comercial demonstrativo, mas mantém:

- onboarding/perfil de entrada;
- preferência de tema.

Este comportamento é intencional na V1.

## Firebase

Situação atual:

- Firebase Hosting: configurado.
- Firebase Authentication: não ativado no código de produção.
- Firestore: não ativado no código de produção.
- Cobrança/checkout: não ativo.

Arquivos de preparação existentes:

- `AUTH_CLOUD_SETUP.md`
- `PRODUCT_ARCHITECTURE.md`
- `firestore.rules.example`
- `public/firebase-config.example.js`

## Checklist obrigatório antes do próximo deploy

### Desktop

- [ ] Home carrega sem erro no console.
- [ ] Todos os itens do menu levam à seção correta.
- [ ] Tema claro/escuro persiste após F5.
- [ ] Onboarding conclui e permanece salvo.
- [ ] Área Planos exibe o perfil correto do onboarding.
- [ ] Empresa Virtual cria, edita e restaura dados.
- [ ] Quizzes não duplicam XP após F5.
- [ ] Laboratórios calculam e atualizam métricas.
- [ ] Gestão mensal registra histórico.
- [ ] Eventos CEO alteram métricas corretamente.
- [ ] Desempenho estratégico atualiza após atividades.
- [ ] Área Conta permanece em modo local sem tentar autenticação real.

### Tablet e celular

- [ ] Menu hambúrguer abre corretamente.
- [ ] Tocar em item fecha o menu.
- [ ] Tocar fora fecha o menu.
- [ ] Botão X fecha o menu.
- [ ] Esc fecha quando disponível.
- [ ] Não existe rolagem horizontal indevida.
- [ ] Cards passam corretamente para 2/1 coluna.
- [ ] Formulários permanecem utilizáveis com teclado virtual.
- [ ] Onboarding cabe na tela e permite rolagem interna.
- [ ] Botões têm área confortável para toque.

### Persistência

- [ ] F5 mantém respostas e marcação visual.
- [ ] F5 mantém Empresa Virtual.
- [ ] F5 mantém histórico mensal.
- [ ] F5 mantém eventos CEO.
- [ ] F5 mantém plano demonstrativo.
- [ ] Reset apaga o que deve apagar e preserva tema/perfil.

## Pontos ainda não considerados “produção comercial”

- autenticação real;
- banco Firestore real;
- regras Firestore publicadas;
- sincronização multi-dispositivo;
- checkout e pagamentos;
- assinatura real;
- painel de professor/turmas real;
- política de privacidade e termos finais;
- testes automatizados em navegador;
- monitoramento de erros em produção.

## Conclusão

A V1 está estruturalmente mais consistente e pronta para uma nova rodada de teste funcional em navegador após o próximo deploy de homologação. Antes de classificar como produto comercial em produção, ainda será necessário ativar e testar autenticação, nuvem, segurança e cobrança de forma real.