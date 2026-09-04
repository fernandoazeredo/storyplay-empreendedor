(()=>{
  const CAPITULOS={
    1:'🏗️ Abrir a Empresa',
    2:'⚙️ Colocar o Negócio Para Funcionar'
  };

  const ALERTA_LOCAL_PADRAO='Esta etapa pode mudar conforme seu município, estado, tipo de atividade e grau de risco do negócio. As informações aqui são orientativas — confirme os detalhes específicos com a prefeitura, Junta Comercial ou órgão responsável da sua região.';

  const fases=[
    {
      id:1,
      capitulo:1,
      capituloNome:CAPITULOS[1],
      emoji:'🚀',
      titulo:'Minha ideia virou negócio',
      chamada:'Todo negócio começa com uma decisão simples: o que você vai vender ou oferecer?',
      texto:'Antes de qualquer registro, vamos organizar sua ideia. Defina o que você pretende vender ou prestar como serviço, para quem é esse produto ou serviço, e se você vai tocar o negócio sozinho ou com sócios — e se pretende ter funcionários desde já.\n\nToda empresa precisa declarar sua atividade econômica principal através de um código chamado CNAE. É esse código que vai definir, mais adiante, se você pode ser MEI, quais licenças vai precisar e como será tributado. Não se preocupe em decorar isso agora — só tenha clareza do que seu negócio faz.',
      checklist:[
        'O que vou vender ou oferecer está definido',
        'Sei para quem é meu produto/serviço',
        'Decidi se será sozinho ou com sócios',
        'Sei se terei funcionários no início'
      ],
      temAlertaLocal:false,
      textoAlertaLocal:'',
      disclaimerJuridico:'',
      recompensa:'+5 XP — Ideia estruturada',
      proximaFase:2
    },
    {
      id:2,
      capitulo:1,
      capituloNome:CAPITULOS[1],
      emoji:'🧩',
      titulo:'Qual tipo de empresa combina comigo?',
      chamada:'Missão da vez: escolher a estrutura jurídica sem se perder na sopa de letrinhas.',
      texto:'MEI, EI, LTDA, ME, EPP… parece código secreto, mas cada sigla responde a uma pergunta diferente. 🧩 O MEI é um Empresário Individual com regras simplificadas e restrições próprias de atividade, faturamento, participação societária e contratação. Já o Empresário Individual (EI) atua em nome próprio, não admite sócios e possui responsabilidade patrimonial pessoal pelas obrigações do negócio.\n\n🏢 A Sociedade Limitada (LTDA) pode ser constituída por uma ou mais pessoas. Nela, o capital é dividido em quotas e a responsabilidade dos sócios é, em regra, limitada ao valor dessas quotas, observadas as responsabilidades previstas em lei. Isso significa uma coisa importante: abrir sozinho não obriga você a escolher EI — uma LTDA também pode ter apenas um sócio.\n\n📏 E atenção à pegadinha: ME e EPP são enquadramentos de porte, não tipos jurídicos. Uma empresa pode, por exemplo, ser uma LTDA enquadrada como ME. A escolha certa depende de atividade, sócios, responsabilidade patrimonial, faturamento esperado e planos de crescimento.\n\n🎯 Objetivo da fase: sair daqui com uma rota jurídica principal para validar antes do registro — e entendendo por que ela combina com o seu negócio.',
      checklist:[
        'Verifiquei se minha atividade e meu perfil podem se enquadrar no MEI',
        'Entendi a diferença básica entre MEI, Empresário Individual e Sociedade Limitada',
        'Sei que ME e EPP são enquadramentos de porte, não tipos jurídicos',
        'Considerei responsabilidade patrimonial, necessidade de sócios e planos de crescimento',
        'Tenho uma opção jurídica principal para validar antes do registro'
      ],
      temAlertaLocal:false,
      textoAlertaLocal:'',
      disclaimerJuridico:'A escolha da natureza jurídica pode afetar responsabilidade patrimonial, documento de constituição, obrigações contábeis e outras regras do negócio. O StoryPlay oferece orientação educacional; valide a escolha final com contador, advogado ou órgão de registro competente antes de formalizar.',
      recompensa:'+10 XP — Tipo jurídico mapeado',
      acaoHref:'#melhor-regime-tributario',
      acaoTexto:'🧩 Testar encaixe MEI',
      proximaFase:3
    },
    {
      id:3,
      capitulo:1,
      capituloNome:CAPITULOS[1],
      emoji:'👥',
      titulo:'Vou sozinho ou com sócios?',
      chamada:'Missão da vez: decidir quem entra no jogo e combinar as regras antes de começar a partida.',
      texto:'Ter sócio pode trazer capital, conhecimento, contatos e divisão de responsabilidades — mas sociedade não funciona bem no modo “a gente vê depois”. 👥 Antes do registro, deixe claro quem realmente será dono do negócio e qual papel cada pessoa terá.\n\n🧍 Se você vai abrir sozinho, lembre da Fase 2: isso não significa automaticamente Empresário Individual. Uma Sociedade Limitada também pode ser formada por um único sócio. Se houver duas ou mais pessoas, a estrutura societária precisa refletir quem participa, quanto cada um aporta e qual será a participação de cada um no capital.\n\n🤝 Com sócios, conversem antes sobre administração, decisões importantes, trabalho de cada pessoa, aportes futuros, retiradas/pró-labore, distribuição de resultados e o que acontece se alguém quiser sair, vender sua participação ou deixar de atuar. Amizade é ótima; regra clara é melhor ainda quando o negócio começa a valer dinheiro.\n\n🎯 Objetivo da fase: terminar sabendo quem são os donos da empresa, quem administra e quais combinações precisam aparecer no documento de constituição da Fase 8.',
      checklist:[
        'Defini quem será titular ou sócio da empresa',
        'Se houver mais de um sócio, alinhei participação e aportes; se não houver, confirmei que isso não se aplica',
        'Defini quem vai administrar e como decisões importantes serão tomadas',
        'Conversei sobre trabalho, retiradas/pró-labore e distribuição de resultados quando aplicável',
        'Registrei regras básicas para entrada, saída ou conflitos quando houver sociedade'
      ],
      temAlertaLocal:false,
      textoAlertaLocal:'',
      disclaimerJuridico:'Percentuais, poderes de administração, retirada, distribuição de resultados, entrada e saída de sócios devem ser compatíveis com a natureza jurídica e com o documento societário. O StoryPlay ajuda a organizar a conversa, mas a redação final deve ser validada com contador, advogado ou órgão de registro competente.',
      recompensa:'+10 XP — Estrutura societária decidida',
      proximaFase:4
    },
    {
      id:4,
      capitulo:1,
      capituloNome:CAPITULOS[1],
      emoji:'🏷️',
      titulo:'Escolha o nome da empresa',
      chamada:'Missão da vez: criar um nome que represente o negócio e esteja pronto para enfrentar a checagem oficial.',
      texto:'Dar nome ao negócio é divertido — até descobrir que já existe alguém usando algo igual ou parecido. 🏷️ O nome empresarial é o nome usado pela empresa nos atos de registro e deve respeitar as regras do tipo jurídico escolhido, além dos princípios de veracidade e novidade. Dependendo da estrutura, ele pode assumir forma de firma ou denominação e precisar indicar o tipo jurídico, como “LTDA”.\n\n✨ Nome empresarial não é a mesma coisa que marca ou nome fantasia. A empresa pode usar uma identidade comercial diferente no mercado, e a proteção de marca é tratada em procedimento próprio perante o INPI. Aprovar um nome empresarial na Junta Comercial não significa, sozinho, ter exclusividade sobre uma marca.\n\n🔎 Nesta fase, crie opções. Pense em nomes fáceis de escrever, falar e lembrar, evite algo que confunda o público e prepare alternativas. A confirmação formal de disponibilidade vem na consulta de viabilidade da Fase 6, então não se apaixone por uma única opção antes do “sinal verde”.\n\n🎯 Objetivo da fase: terminar com um nome principal e opções de reserva prontos para a consulta oficial.',
      checklist:[
        'Criei um nome principal e pelo menos duas opções de reserva',
        'Entendi a diferença entre nome empresarial, nome fantasia e marca',
        'Conferi se o nome pensado combina com o tipo jurídico que pretendo usar',
        'Fiz uma pesquisa preliminar para evitar nomes obviamente iguais ou confundíveis',
        'Separei as opções que levarei para a consulta de viabilidade da Fase 6'
      ],
      temAlertaLocal:false,
      textoAlertaLocal:'',
      disclaimerJuridico:'A disponibilidade de nome empresarial é confirmada pelo órgão de registro competente e não equivale a registro de marca. Se a identidade comercial for relevante para o negócio, avalie também a pesquisa e eventual proteção da marca no INPI com orientação adequada.',
      recompensa:'+10 XP — Nome empresarial preparado',
      proximaFase:5
    },
    {
      id:5,
      capitulo:1,
      capituloNome:CAPITULOS[1],
      emoji:'📍',
      titulo:'Onde minha empresa vai funcionar?',
      chamada:'Missão da vez: escolher um endereço que funcione no mapa e também passe pelas regras do negócio.',
      texto:'O endereço da empresa não é só um ponto no mapa. 📍 Ele entra no cadastro, na viabilidade, no licenciamento e pode influenciar quais atividades são permitidas naquele local. Antes de fechar contrato caro, comprar imóvel ou montar toda a estrutura, confirme se o endereço combina com o CNAE e com as regras locais.\n\n🏠🏢 Dependendo da atividade e das normas da sua cidade, o negócio pode funcionar em imóvel comercial, residência, coworking, escritório compartilhado ou outro formato permitido. Mas não existe uma regra universal dizendo que qualquer atividade pode usar qualquer endereço. Negócios com atendimento ao público, estoque, produção, alimentos, saúde ou maior risco podem exigir condições físicas e autorizações específicas.\n\n🧭 Organize o endereço completo — CEP, logradouro, número, complemento, bairro, município e UF — e confirme que você tem base legítima para utilizá-lo. Se houver condomínio, locação ou regras de uso do imóvel, verifique se existe alguma restrição relevante. Na próxima fase, a consulta de viabilidade dará o “sinal verde” ou mostrará o que precisa ser ajustado.\n\n🎯 Objetivo da fase: chegar à Fase 6 com um endereço principal e, se possível, uma alternativa, sem assumir compromisso irreversível antes da consulta oficial.',
      checklist:[
        'Defini o endereço principal da empresa com todos os dados cadastrais',
        'Entendi se minha operação será residencial, comercial, compartilhada ou em outro formato permitido',
        'Confirmei que tenho autorização ou condição legítima para usar o endereço escolhido',
        'Verifiquei restrições evidentes do imóvel, locação ou condomínio quando aplicável',
        'Evitei assumir compromisso definitivo antes da consulta de viabilidade ou tenho uma alternativa preparada'
      ],
      temAlertaLocal:true,
      textoAlertaLocal:'Uso do solo, zoneamento, endereço residencial, coworking, atendimento ao público, estoque e exigências do imóvel variam conforme município, atividade e grau de risco. A aprovação formal do endereço ocorre na consulta de viabilidade e nos licenciamentos aplicáveis. Confirme sempre no integrador da Redesim e na prefeitura responsável.',
      disclaimerJuridico:'O StoryPlay não valida zoneamento, contrato de locação, convenção de condomínio nem autorização de uso do imóvel. Antes de investir no ponto ou iniciar a operação, confirme a viabilidade e as exigências do endereço nos órgãos competentes.',
      recompensa:'+10 XP — Endereço preparado',
      proximaFase:6
    },
    {
      id:6,
      capitulo:1,
      capituloNome:CAPITULOS[1],
      emoji:'🔎',
      titulo:'Consulta de viabilidade',
      chamada:'Antes de registrar, precisamos saber se esse negócio pode funcionar nesse endereço e com esse nome.',
      texto:'A consulta de viabilidade é o passo em que prefeitura, Junta Comercial e outros órgãos (conforme o caso) verificam se sua atividade pode ser exercida no endereço escolhido e se o nome pretendido está disponível. É uma etapa de confirmação, não de registro definitivo — pense nela como um “sinal verde” antes de seguir.\n\n🟢 Viável — pode seguir com o registro\n🟡 Precisa verificar — algum ponto exige confirmação antes de continuar\n🔴 Não permitido — endereço, atividade ou nome não são compatíveis; ajuste algo e consulte novamente',
      checklist:[
        'Consultei a viabilidade do endereço',
        'Consultei a viabilidade do nome',
        'Recebi um resultado (🟢/🟡/🔴) e sei o que fazer a seguir'
      ],
      temAlertaLocal:true,
      textoAlertaLocal:ALERTA_LOCAL_PADRAO,
      disclaimerJuridico:'',
      recompensa:'+10 XP — Viabilidade consultada',
      proximaFase:7
    },
    {
      id:7,
      capitulo:1,
      capituloNome:CAPITULOS[1],
      emoji:'💰',
      titulo:'Capital social',
      chamada:'Missão da vez: transformar o plano de começo em um valor de capital que faça sentido de verdade.',
      texto:'Capital social não é faturamento, não é lucro e também não é um número para deixar a empresa “bonita no papel”. 💰 É o valor que o titular ou os sócios se comprometem a colocar no negócio para formar sua estrutura inicial. Pode representar dinheiro e, conforme as regras aplicáveis, bens que possam ser avaliados em dinheiro.\n\n🧩 Na Sociedade Limitada, o capital é dividido em quotas e o documento precisa mostrar quanto cabe a cada sócio e como ocorrerá a integralização. A integralização pode seguir a forma e o prazo previstos no contrato, observadas as regras legais; prestação de serviços, por si só, não substitui a integralização de capital da LTDA. No Empresário Individual não existe uma exigência geral de capital mínimo, mas o valor declarado deve ser coerente com o negócio.\n\n🧮 Para chegar a um valor realista, pense no que a empresa precisa para começar: equipamentos, móveis, tecnologia, estoque inicial, cauções, adaptações, licenças e outros recursos de implantação. Capital social também não é sinônimo de capital de giro ou saldo bancário disponível para sempre — são conceitos diferentes. Algumas atividades reguladas podem exigir valores ou condições específicas, então confirme antes de registrar.\n\n🎯 Objetivo da fase: terminar com o valor do capital definido, a participação de cada sócio organizada e a forma de integralização pronta para aparecer no documento da Fase 8.',
      checklist:[
        'Estimei os recursos e bens necessários para colocar o negócio de pé',
        'Defini um valor de capital social coerente com a estrutura inicial da empresa',
        'Se houver sócios, defini quanto do capital e das quotas caberá a cada um',
        'Defini como e quando o capital será integralizado conforme o tipo jurídico escolhido',
        'Confirmei se minha atividade ou situação específica exige alguma regra especial de capital'
      ],
      temAlertaLocal:false,
      textoAlertaLocal:'',
      disclaimerJuridico:'Forma de integralização, avaliação de bens, participação dos sócios e eventuais exigências mínimas dependem da natureza jurídica e de regras específicas da atividade. Antes de registrar o capital no ato constitutivo, valide os valores e a forma de integralização com contador, advogado ou órgão de registro competente.',
      recompensa:'+10 XP — Capital social definido',
      proximaFase:8
    },
    {
      id:8,
      capitulo:1,
      capituloNome:CAPITULOS[1],
      emoji:'📄',
      titulo:'Documento de constituição',
      chamada:'Todo negócio formal precisa de um documento que registre como ele nasceu.',
      texto:'Dependendo da natureza jurídica escolhida lá na Fase 2, esse documento pode ser um contrato social, um ato constitutivo ou um requerimento de empresário individual. Nele normalmente constam: quem são os sócios (se houver), o endereço da empresa, as atividades exercidas, o capital social, quem administra o negócio e qual a participação de cada sócio.',
      checklist:[
        'Sei qual documento se aplica ao meu tipo de empresa',
        'Tenho os dados dos sócios (se houver) organizados',
        'Tenho o endereço, atividades e capital social definidos',
        'Sei quem vai administrar a empresa'
      ],
      temAlertaLocal:false,
      textoAlertaLocal:'',
      disclaimerJuridico:'O StoryPlay orienta o que normalmente precisa constar neste documento, mas não substitui contador, advogado, Junta Comercial ou órgão de registro competente, e não gera automaticamente o documento jurídico definitivo. Para a versão final, formalize com um profissional ou órgão responsável.',
      recompensa:'+10 XP — Documento organizado',
      proximaFase:9
    },
    {
      id:9,
      capitulo:1,
      capituloNome:CAPITULOS[1],
      emoji:'🏛️',
      titulo:'Registrar a empresa',
      chamada:'Missão da vez: transformar o documento da Fase 8 em um registro oficial.',
      texto:'Agora o jogo fica sério — mas sem pânico. 😎 O documento de constituição que você organizou na Fase 8 precisa ser apresentado ao órgão de registro competente. Dependendo do tipo de pessoa jurídica, esse órgão pode ser a Junta Comercial, o Cartório de Registro Civil de Pessoas Jurídicas ou a OAB.\n\n📦 O que normalmente entra nessa missão? O ato constitutivo, os dados e documentos exigidos, o protocolo do processo e, quando aplicável, documentos gerados no fluxo da Redesim, como o DBE. Depois do envio, o órgão analisa o pedido. Se estiver tudo certo, o ato é registrado ou arquivado oficialmente. Se houver uma exigência, nada de desespero: leia o apontamento, corrija o que foi solicitado e acompanhe o protocolo até a aprovação.\n\n🎯 Objetivo da fase: sair daqui com o ato constitutivo oficialmente registrado e com o protocolo guardado. Nesta jornada, o CNPJ aparece na próxima fase para facilitar o aprendizado; na prática, a Redesim integra registro e inscrições e a ordem operacional pode variar conforme o tipo de empresa e o órgão responsável.',
      checklist:[
        'Confirmei qual é o órgão de registro competente para minha empresa',
        'Separei o ato constitutivo e os documentos exigidos para o protocolo',
        'Enviei ou protocolei o pedido de registro no sistema ou órgão responsável',
        'Guardei o número do protocolo e sei onde acompanhar o processo',
        'O ato constitutivo foi aprovado/registrado ou sei qual exigência preciso cumprir'
      ],
      temAlertaLocal:true,
      textoAlertaLocal:'O caminho, os documentos, as taxas e o sistema usado para registrar a empresa podem mudar conforme o estado, a natureza jurídica e o órgão de registro competente. Antes de enviar, confira as exigências da Junta Comercial, Cartório, OAB ou integrador da Redesim responsável pelo seu caso.',
      disclaimerJuridico:'',
      recompensa:'+15 XP — Registro encaminhado',
      proximaFase:10
    },
    {
      id:10,
      capitulo:1,
      capituloNome:CAPITULOS[1],
      emoji:'🪪',
      titulo:'Chegou o CNPJ!',
      chamada:'Missão da vez: confirmar que sua empresa ganhou sua identidade oficial no CNPJ.',
      texto:'Agora sim: sua empresa ganhou um número oficial. 😎 Depois do registro do ato constitutivo, o fluxo da Redesim pode pedir que você acompanhe o protocolo, confirme informações tributárias e conclua assinaturas digitais do representante da empresa e, quando aplicável, do profissional contábil. Quando essas etapas são concluídas, a inscrição no CNPJ é efetivada e o número passa a poder ser consultado e comprovado.\n\n🪪 Pense no CNPJ como a identidade cadastral da empresa perante a Receita Federal. Nele ficam dados como nome empresarial, endereço, natureza jurídica, atividades econômicas (CNAEs) e situação cadastral. Guarde o número e emita o Comprovante de Inscrição e de Situação Cadastral.\n\n💡 Se você abriu como MEI, o caminho é mais simples: a inscrição no CNPJ acontece dentro da própria formalização pelo Portal do Empreendedor.\n\n⚠️ Importante: ter CNPJ ativo não significa, sozinho, que a empresa já pode abrir as portas. Dependendo do negócio, ainda podem existir regime tributário, inscrições estaduais ou municipais, licenças e autorizações. É por isso que nossa jornada continua.',
      checklist:[
        'Acompanhei o protocolo da Redesim até a etapa de inscrição no CNPJ',
        'Confirmei os dados tributários e do profissional contábil, quando exigidos',
        'Concluí as assinaturas digitais solicitadas no fluxo',
        'Recebi e conferi o número do CNPJ da empresa',
        'Emiti e guardei o Comprovante de Inscrição e de Situação Cadastral'
      ],
      temAlertaLocal:false,
      textoAlertaLocal:'',
      disclaimerJuridico:'',
      recompensa:'+15 XP — CNPJ conquistado',
      proximaFase:11
    },
    {
      id:11,
      capitulo:2,
      capituloNome:CAPITULOS[2],
      emoji:'🧾',
      titulo:'Escolher o regime tributário',
      chamada:'Missão da vez: usar o laboratório tributário do StoryPlay para descobrir qual rota merece ser estudada primeiro.',
      texto:'CNPJ na mão? Então chegou uma escolha que pode mexer bastante com o caixa da empresa: como ela será tributada. 🧾 Em vez de tentar decorar um monte de regra, vamos usar uma ferramenta que já existe dentro do StoryPlay.\n\n🎮 Abra o menu “Melhor Regime?”. O laboratório começa verificando se o perfil pode combinar com MEI e, quando o MEI não couber, ajuda a comparar Simples Nacional, Lucro Presumido e Lucro Real de forma educacional. Você informa faturamento, custos, folha, margem e atividade para enxergar quais caminhos merecem uma análise mais profunda.\n\n🧠 Não procure uma resposta mágica. O objetivo é entender por que um regime pode fazer mais sentido do que outro e quais dados do seu negócio pesam nessa análise. CNAE, Fator R, folha, margem, ISS, ICMS, créditos, benefícios fiscais e as regras da Reforma Tributária podem mudar totalmente o resultado.\n\n⚠️ A simulação do StoryPlay é um ponto de partida para aprender e conversar com o contador — não é uma opção tributária automática nem substitui uma análise profissional. Confirme também os prazos e regras oficiais vigentes antes de formalizar qualquer escolha.',
      checklist:[
        'Abri o menu “Melhor Regime?” e rodei a simulação do meu negócio',
        'Verifiquei primeiro se meu perfil pode se enquadrar como MEI',
        'Comparei Simples Nacional, Lucro Presumido e Lucro Real quando aplicável',
        'Entendi quais dados do meu negócio mais influenciaram o resultado',
        'Sei qual rota tributária preciso validar com o contador antes da decisão real'
      ],
      temAlertaLocal:false,
      textoAlertaLocal:'',
      disclaimerJuridico:'O comparador tributário do StoryPlay é uma ferramenta educacional. A escolha do regime depende das regras vigentes, da atividade, do faturamento, da estrutura da empresa e de outros fatores. Antes de optar ou alterar um regime tributário, valide o cenário com um profissional contábil e nos canais oficiais.',
      recompensa:'+15 XP — Rota tributária analisada',
      acaoHref:'#melhor-regime-tributario',
      acaoTexto:'🎮 Abrir Laboratório Tributário',
      proximaFase:12
    },
    {
      id:12,
      capitulo:2,
      capituloNome:CAPITULOS[2],
      emoji:'🏙️',
      titulo:'Inscrições da empresa',
      chamada:'Missão da vez: conferir se sua empresa está identificada corretamente no estado e no município.',
      texto:'CNPJ confirmado? Agora é hora de conferir os outros “RGs fiscais” que podem acompanhar a empresa. 🏙️ Na Redesim, as inscrições tributárias podem ser geradas de forma integrada ao processo de abertura, então muitas vezes você não precisa começar tudo do zero em cada órgão.\n\n🏢 A Inscrição Estadual identifica a empresa perante a Secretaria de Fazenda do estado e se aplica, em regra, a quem exerce atividades sujeitas ao ICMS. Isso significa que nem toda empresa precisa ter uma. Já a Inscrição Municipal — ou cadastro fiscal municipal equivalente — identifica a empresa perante a prefeitura e o modo de geração, consulta e regularização pode variar bastante de cidade para cidade.\n\n🔎 Sua missão aqui não é sair pedindo número por pedir. É abrir o protocolo/integrador, conferir quais inscrições foram geradas, descobrir quais realmente se aplicam ao seu negócio e guardar os comprovantes. Se alguma inscrição obrigatória estiver pendente, descubra qual órgão ou sistema local resolve o próximo passo.\n\n🎯 Objetivo da fase: terminar com todas as inscrições tributárias aplicáveis identificadas, conferidas e organizadas antes de seguir para licenças e alvarás.',
      checklist:[
        'Consultei o protocolo ou integrador da Redesim para verificar as inscrições geradas',
        'Confirmei se minha atividade exige Inscrição Estadual por estar sujeita ao ICMS',
        'Conferi minha Inscrição Municipal ou cadastro fiscal municipal equivalente',
        'Guardei os números e comprovantes das inscrições que se aplicam ao meu negócio',
        'Se existe alguma pendência, sei qual órgão ou sistema estadual/municipal devo procurar'
      ],
      temAlertaLocal:true,
      textoAlertaLocal:'A geração automática, o nome do cadastro, os documentos e o sistema de consulta das inscrições tributárias podem variar conforme o estado, o município, a atividade e a integração local com a Redesim. Confirme a situação nos portais oficiais da Secretaria de Fazenda estadual, da prefeitura ou do integrador responsável pelo seu processo.',
      disclaimerJuridico:'',
      recompensa:'+15 XP — Inscrições conferidas',
      proximaFase:13
    },
    {
      id:13,
      capitulo:2,
      capituloNome:CAPITULOS[2],
      emoji:'🚒',
      titulo:'Licenças e alvarás',
      chamada:'Missão da vez: descobrir quais liberações seu negócio precisa para funcionar legalmente e sem surpresa depois.',
      texto:'Chegamos ao licenciamento — a etapa em que os órgãos responsáveis verificam se o estabelecimento atende às exigências para funcionar. 🚒 Aqui podem entrar segurança sanitária, controle ambiental, prevenção contra incêndios e pânico e outras condições previstas para a atividade.\n\n🧭 O primeiro passo é entender a classificação de risco. No fluxo da Redesim, atividades de nível de risco I (baixo risco) podem ser dispensadas de atos públicos de liberação quando a regra aplicável permitir; atividades de nível de risco II (médio risco) podem receber licenças, alvarás ou similares de caráter provisório de forma automática após o registro; e atividades de nível de risco III (alto risco) normalmente dependem de vistoria prévia e do cumprimento das exigências do órgão licenciador antes do início da operação.\n\n🏥🚒🌱 Dependendo do CNAE, endereço e características do estabelecimento, podem participar prefeitura, Vigilância Sanitária, Corpo de Bombeiros, órgão ambiental e outros licenciadores. Não existe uma lista universal de documentos ou licenças. O caminho correto é consultar o módulo de licenciamento do integrador estadual/Redesim usando o protocolo do processo.\n\n🎯 Objetivo da fase: terminar sabendo qual é o tratamento de risco do seu estabelecimento, quais liberações ou dispensas realmente se aplicam e guardar os comprovantes emitidos pelos órgãos competentes.',
      checklist:[
        'Consultei a classificação de risco das atividades do meu estabelecimento',
        'Identifiquei quais órgãos, licenças ou dispensas realmente se aplicam ao meu negócio',
        'Acessei o módulo de licenciamento do integrador/Redesim, quando aplicável',
        'Cumpri as declarações, documentos, taxas ou vistorias exigidas para o meu caso',
        'Guardei as licenças, alvarás, certificados ou comprovantes de dispensa aplicáveis'
      ],
      temAlertaLocal:true,
      textoAlertaLocal:'As licenças exigidas e a classificação de risco podem mudar conforme município, estado, CNAE, endereço e características do estabelecimento. Confirme o resultado no integrador da Redesim e nos órgãos licenciadores competentes, como prefeitura, Vigilância Sanitária, Corpo de Bombeiros e órgão ambiental, quando aplicável.',
      disclaimerJuridico:'O StoryPlay não declara seu negócio dispensado nem autorizado a funcionar. A classificação de risco e as liberações válidas são definidas pelos órgãos competentes. Antes de iniciar a operação, confirme no sistema oficial se todas as exigências aplicáveis ao seu estabelecimento foram cumpridas.',
      recompensa:'+20 XP — Licenciamento conferido',
      proximaFase:14
    },
    {
      id:14,
      capitulo:2,
      capituloNome:CAPITULOS[2],
      emoji:'🔐',
      titulo:'Certificado digital e acessos oficiais',
      chamada:'Missão da vez: montar o chaveiro digital da empresa e deixar os acessos oficiais prontos para uso.',
      texto:'Sua empresa já existe, já passou por registros e licenças — agora precisa conseguir entrar nos sistemas certos sem depender de improviso. 🔐 O certificado digital funciona como uma identidade eletrônica da pessoa ou da empresa e pode ser usado para autenticação e assinatura digital em serviços oficiais. O e-CNPJ é uma das opções para a pessoa jurídica, mas nem toda empresa precisa usar certificado digital em todas as obrigações.\n\n🧩 Primeiro descubra o que realmente é exigido no seu caso. Alguns serviços aceitam acesso pela conta gov.br do responsável, procuração eletrônica ou outros meios de autenticação; outros podem exigir certificado digital válido. Quando o certificado for necessário, ele deve ser emitido por Autoridade Certificadora habilitada. Modelos como A1 e A3 têm formas diferentes de armazenamento e uso, então escolha pensando em segurança e rotina da empresa.\n\n🖥️ Além do certificado, organize os acessos: conta gov.br do responsável, e-CAC/Receita Federal, Portal do Simples Nacional quando aplicável e portais estaduais ou municipais usados pela empresa. Se o contador ou outro profissional precisar atuar, prefira procurações e autorizações formais em vez de compartilhar senha ou certificado.\n\n🎯 Objetivo da fase: terminar sabendo se sua empresa precisa de certificado digital, com os acessos oficiais testados e com responsáveis, validade e autorizações organizados.',
      checklist:[
        'Confirmei quais obrigações e sistemas da minha empresa exigem certificado digital',
        'Se necessário, emiti ou renovei o certificado por uma Autoridade Certificadora habilitada',
        'Testei os acessos oficiais da empresa e do responsável nos sistemas que realmente uso',
        'Organizei procurações ou autorizações para contador/profissionais sem compartilhar senhas',
        'Registrei a validade do certificado e defini quem cuida da renovação e da segurança dos acessos'
      ],
      temAlertaLocal:false,
      textoAlertaLocal:'',
      disclaimerJuridico:'A necessidade de certificado digital varia conforme regime tributário, obrigações, sistemas utilizados e regras vigentes. O StoryPlay não recomenda compartilhar senha, arquivo de certificado, token, chave privada ou código de acesso. Confirme as exigências com seu contador e nos canais oficiais antes de contratar ou renovar um certificado.',
      recompensa:'+15 XP — Acessos oficiais organizados',
      proximaFase:15
    },
    {
      id:15,
      capitulo:2,
      capituloNome:CAPITULOS[2],
      emoji:'🧾',
      titulo:'Preparar emissão de nota fiscal',
      chamada:'Missão da vez: descobrir qual nota fiscal combina com sua operação e deixar a empresa pronta para emitir sem chute.',
      texto:'Hora de transformar venda em documento fiscal. 🧾 A nota correta depende do que sua empresa faz. Em linhas gerais, a NF-e aparece principalmente nas operações com mercadorias sujeitas ao ICMS; a NFS-e registra prestações de serviços sujeitas ao ISS; e a NFC-e pode ser usada em vendas ao consumidor final onde esse modelo estiver adotado. Seu negócio pode precisar de mais de um documento fiscal.\n\n🧭 Antes de emitir, confirme qual sistema oficial ou emissor deve ser usado e se existe credenciamento, autorização, inscrição ou certificado digital exigido. Para serviços, o padrão nacional da NFS-e já atende MEI e empresas em cenários previstos pelas regras vigentes, mas a forma de utilização pode depender do enquadramento e da integração do município. Não escolha o portal no automático: confirme o caminho oficial aplicável ao seu CNPJ.\n\n🧠 Depois vem a parte que evita dor de cabeça: cadastre corretamente dados da empresa, cliente, produtos ou serviços, códigos fiscais e tributação. Faça um teste controlado do fluxo de emissão e saiba também como consultar, corrigir ou cancelar quando permitido. Combine com a contabilidade como guardar XML, representação em PDF/DANFE ou documentos equivalentes e como entregar a nota ao cliente.\n\n🎯 Objetivo da fase: terminar sabendo qual documento fiscal usar, em qual sistema emitir e com os dados e procedimentos básicos preparados para a primeira emissão válida.',
      checklist:[
        'Identifiquei quais tipos de nota fiscal se aplicam às vendas ou serviços da minha empresa',
        'Confirmei o emissor oficial, credenciamento, autorização e acessos exigidos para o meu caso',
        'Cadastrei ou conferi os dados fiscais essenciais de empresa, clientes, produtos ou serviços',
        'Testei o fluxo de emissão e sei onde consultar, corrigir ou cancelar uma nota quando permitido',
        'Defini com a contabilidade como guardar os arquivos fiscais e entregar os documentos aos clientes'
      ],
      temAlertaLocal:true,
      textoAlertaLocal:'O tipo de nota, o sistema emissor, os códigos fiscais, a necessidade de credenciamento e as regras de emissão podem variar conforme estado, município, CNAE, operação, regime tributário e mudanças normativas. Confirme sempre nos portais oficiais da SEFAZ, prefeitura ou NFS-e Nacional e com a contabilidade.',
      disclaimerJuridico:'O StoryPlay ensina o fluxo, mas não emite nota fiscal real nem valida CFOP, NCM, código de serviço, CST/CSOSN, alíquota ou enquadramento tributário. Antes da primeira emissão oficial, confirme a configuração fiscal com seu contador e no sistema fazendário competente.',
      recompensa:'+20 XP — Emissão fiscal preparada',
      proximaFase:16
    },
    {
      id:16,
      capitulo:2,
      capituloNome:CAPITULOS[2],
      emoji:'🏦',
      titulo:'Conta PJ e meios de pagamento',
      chamada:'Missão da vez: separar o dinheiro do negócio do dinheiro pessoal e deixar a empresa pronta para receber de verdade.',
      texto:'Venda feita e nota pronta? Agora o dinheiro precisa cair no lugar certo. 🏦 Separar as finanças da empresa das pessoais deixa o caixa mais claro, facilita a conciliação e ajuda a contabilidade a entender o que é receita, despesa, aporte ou retirada. Uma conta voltada ao CNPJ costuma simplificar essa organização, mas a necessidade e o formato da conta dependem do tipo de negócio e da instituição escolhida.\n\n💳 Escolha os meios de pagamento pensando no seu cliente e no seu caixa: Pix, boleto, cartão, link de pagamento, cobrança recorrente ou outros recursos podem fazer sentido. Não olhe apenas para a tarifa anunciada. Compare taxas, prazo de recebimento, antecipação, estorno, chargeback, integração com sistema de vendas e qualidade do suporte.\n\n🔎 Depois, teste o caminho completo: vender → receber → identificar a taxa → conferir o valor líquido → conciliar com a venda e a nota fiscal. Se houver devolução ou estorno, você precisa saber como o dinheiro e os registros voltam. Essa rotina evita o clássico “vendi bastante, mas não sei onde foi parar o dinheiro”.\n\n🔐 Segurança também faz parte da missão. Ative autenticação em dois fatores quando disponível, defina limites e perfis de acesso, evite compartilhar senhas e mantenha os dispositivos autorizados sob controle.\n\n🎯 Objetivo da fase: terminar com o fluxo financeiro separado do pessoal, meios de recebimento testados e uma rotina simples para conferir cada valor que entra e sai.',
      checklist:[
        'Escolhi ou organizei uma conta adequada para movimentar o dinheiro da empresa',
        'Separei as entradas e saídas do negócio das minhas movimentações pessoais',
        'Configurei os meios de pagamento que fazem sentido para meus clientes e minha operação',
        'Testei recebimento, taxas, prazo de liquidação, estorno e conciliação do valor líquido',
        'Ativei medidas de segurança e defini quem pode acessar ou movimentar a conta da empresa'
      ],
      temAlertaLocal:false,
      textoAlertaLocal:'',
      disclaimerJuridico:'Tarifas, limites, prazos, regras de estorno, crédito e serviços variam entre instituições financeiras e de pagamento. O StoryPlay não indica uma instituição específica nem garante que um produto bancário seja adequado ao seu negócio. Compare condições, segurança e contratos antes de contratar.',
      recompensa:'+15 XP — Caixa separado e pronto',
      proximaFase:17
    },
    {
      id:17,
      capitulo:2,
      capituloNome:CAPITULOS[2],
      emoji:'📊',
      titulo:'Organizar a contabilidade',
      chamada:'Missão da vez: transformar comprovantes soltos em uma rotina que mostra o que a empresa realmente ganhou, gastou e precisa cumprir.',
      texto:'Empresa funcionando sem contabilidade organizada vira jogo no modo difícil. 📊 A contabilidade não serve só para calcular imposto: ela ajuda a registrar o patrimônio, acompanhar receitas e despesas, separar lucro de caixa disponível e manter obrigações fiscais e societárias em ordem.\n\n🗂️ Monte uma rotina simples com o contador ou responsável: envie notas fiscais emitidas e recebidas, extratos bancários, comprovantes de despesas, contratos, folha de pagamento e movimentações dos sócios. Combine uma data mensal de fechamento e defina quem confere pendências, impostos, declarações e documentos que precisam ser guardados.\n\n🧠 O nível de escrituração e as obrigações mudam conforme natureza jurídica, regime tributário, atividade e porte. Estar no Simples Nacional não significa “não ter contabilidade”. Para MEI, existem rotinas simplificadas próprias, como o Relatório Mensal de Receitas Brutas e a declaração anual, mas organização continua sendo essencial.\n\n🎯 Objetivo da fase: terminar com responsável definido, calendário mensal, documentos organizados e uma rotina de conciliação que permita saber o resultado do negócio sem adivinhação.',
      checklist:[
        'Defini quem é o responsável pela contabilidade e quais informações preciso enviar todo mês',
        'Organizei notas fiscais, extratos, despesas, contratos e movimentações dos sócios',
        'Criei uma data mensal para fechamento, conciliação e conferência de pendências',
        'Sei quais impostos, declarações, livros ou relatórios se aplicam ao meu regime e atividade',
        'Consigo separar faturamento, caixa, despesas, aportes, retiradas e lucro do negócio'
      ],
      temAlertaLocal:false,
      textoAlertaLocal:'',
      disclaimerJuridico:'As obrigações contábeis e fiscais variam conforme natureza jurídica, regime tributário, atividade, porte e operações da empresa. O StoryPlay organiza o aprendizado, mas não substitui escrituração profissional nem valida obrigações acessórias. Confirme sua rotina com profissional contábil habilitado e nos sistemas oficiais.',
      recompensa:'+20 XP — Contabilidade no controle',
      proximaFase:18
    },
    {
      id:18,
      capitulo:2,
      capituloNome:CAPITULOS[2],
      emoji:'👷',
      titulo:'Vou contratar alguém?',
      chamada:'Missão da vez: preparar a primeira contratação sem transformar a folha de pagamento em um chefão surpresa.',
      texto:'Chegou a hora de crescer o time? 👷 Antes de contratar, defina a função, jornada, remuneração, local de trabalho e qual relação realmente existe. Empregado, prestador, sócio e estágio têm regras diferentes — chamar alguém de “PJ” não muda uma relação que, na prática, tenha características de vínculo de emprego.\n\n🧾 Para empregado, organize admissão, documentos, exame ocupacional quando aplicável e envio das informações ao eSocial dentro dos prazos oficiais. A CTPS Digital é alimentada pelas informações transmitidas pelo empregador, e a folha precisa conversar com encargos como INSS e FGTS. Hoje o FGTS Digital usa dados do eSocial para gerar e controlar recolhimentos, por isso cadastro e remuneração precisam estar corretos desde o começo.\n\n🦺 Não esqueça segurança e saúde do trabalho, benefícios obrigatórios ou previstos em norma coletiva, controle de jornada quando aplicável e a convenção/acordo coletivo da categoria. Se você for MEI, existem regras próprias para contratação e limite de empregado, então confirme antes de admitir.\n\n🎯 Objetivo da fase: terminar sabendo se vai contratar agora, qual modelo jurídico realmente se aplica e quem cuidará de admissão, folha, eSocial, FGTS e rotina trabalhista.',
      checklist:[
        'Defini função, jornada, remuneração e o tipo de relação de trabalho que realmente se aplica',
        'Confirmei documentos, exame admissional e regras da categoria antes do início das atividades',
        'Preparei o cadastro e o envio da admissão ao eSocial nos prazos aplicáveis',
        'Defini quem cuidará da folha, INSS, FGTS Digital, benefícios e demais obrigações trabalhistas',
        'Se não vou contratar agora, deixei claro quando e como essa etapa será ativada no futuro'
      ],
      temAlertaLocal:false,
      textoAlertaLocal:'',
      disclaimerJuridico:'Regras de contratação dependem do vínculo, categoria profissional, convenções coletivas, jornada, atividade e legislação vigente. O StoryPlay não substitui análise trabalhista, contábil ou de segurança e saúde. Antes de admitir ou contratar, valide o enquadramento e os prazos com profissionais responsáveis e nos sistemas oficiais.',
      recompensa:'+20 XP — Contratação preparada',
      proximaFase:19
    },
    {
      id:19,
      capitulo:2,
      capituloNome:CAPITULOS[2],
      emoji:'✅',
      titulo:'Minha empresa está pronta?',
      chamada:'Missão final: passar pelo checkpoint de lançamento e conferir se o negócio está realmente pronto para operar sem pular fase importante.',
      texto:'Você chegou ao último nível da Jornada de Formalização. 🎉 Agora não é hora de correr — é hora de conferir. Uma empresa “pronta” não é aquela que apenas recebeu um CNPJ; é aquela que sabe quais registros, tributos, licenças, acessos, documentos fiscais, controles financeiros e rotinas se aplicam ao próprio negócio.\n\n🧭 Volte mentalmente pela jornada: identidade e CNPJ conferidos, regime tributário analisado, inscrições aplicáveis organizadas, licenças ou dispensas válidas, acessos oficiais funcionando, emissão fiscal preparada, dinheiro do negócio separado, contabilidade com rotina definida e contratação organizada quando houver equipe. Se algo ainda estiver pendente, isso não é derrota — é uma missão aberta que precisa ser resolvida antes de depender dela na operação real.\n\n📅 Depois do “abrir as portas” começa outro jogo: manter a empresa regular. Licenças vencem, certificados expiram, declarações têm prazo, tributos mudam, contratos precisam de controle e os dados cadastrais devem acompanhar a realidade do negócio. Crie lembretes e responsáveis para não transformar uma conquista em pendência.\n\n🚀 Objetivo final: terminar esta jornada sabendo o que já está concluído, o que não se aplica ao seu caso e o que ainda precisa de ação antes ou durante a operação.',
      checklist:[
        'Conferi CNPJ, ato registrado e dados cadastrais da empresa',
        'Validei regime tributário e inscrições fiscais que se aplicam ao negócio',
        'Confirmei licenças, alvarás, certificados ou dispensas necessárias para operar',
        'Testei acessos oficiais e deixei a emissão de nota fiscal preparada',
        'Separei o caixa da empresa e configurei os meios de recebimento necessários',
        'Organizei a rotina contábil, documentos, impostos e calendário de obrigações',
        'Defini a situação de contratação e as rotinas trabalhistas, quando aplicáveis',
        'Registrei pendências, renovações e responsáveis para manter a empresa regular'
      ],
      temAlertaLocal:true,
      textoAlertaLocal:'O “pronto para operar” depende da atividade, localização, grau de risco, licenças, regime tributário e regras dos órgãos competentes. Antes de iniciar uma atividade sujeita a autorização, confirme nos portais oficiais se a liberação ou dispensa aplicável está válida.',
      disclaimerJuridico:'Este checklist final é educacional e não funciona como alvará, licença, certidão de regularidade ou autorização jurídica para operar. A confirmação definitiva depende dos órgãos públicos competentes e, conforme o caso, de profissionais contábeis, jurídicos, trabalhistas ou técnicos responsáveis.',
      recompensa:'+30 XP — Empresa pronta para decolar',
      proximaFase:null
    }
  ];

  const schemaCampos=['id','capitulo','capituloNome','emoji','titulo','chamada','texto','checklist','temAlertaLocal','textoAlertaLocal','disclaimerJuridico','recompensa','proximaFase'];
  const estruturaValida=fases.length===19&&fases.every((fase,index)=>fase.id===index+1&&schemaCampos.every(campo=>Object.prototype.hasOwnProperty.call(fase,campo)));

  window.STORYPLAY_FORMALIZATION_JOURNEY={
    menu:'📋 Abrir Minha Empresa',
    titulo:'🚀 Jornada de Formalização',
    chamada:'Do zero ao negócio funcionando.',
    subtitulo:'2 capítulos · 19 fases · missões · XP · progresso · checklists',
    totalFases:19,
    capitulos:CAPITULOS,
    alertaLocalPadrao:ALERTA_LOCAL_PADRAO,
    schemaCampos,
    estruturaValida,
    fases,
    calcularPercentual:faseAtual=>Math.round((Math.max(0,Math.min(19,Number(faseAtual)||0))/19)*100)
  };
})();