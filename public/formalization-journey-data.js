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
      id:2,capitulo:1,capituloNome:CAPITULOS[1],emoji:'🧩',titulo:'Qual tipo de empresa combina comigo?',chamada:'',texto:'',checklist:[],temAlertaLocal:false,textoAlertaLocal:'',disclaimerJuridico:'',recompensa:'',proximaFase:3
    },
    {
      id:3,capitulo:1,capituloNome:CAPITULOS[1],emoji:'👥',titulo:'Vou sozinho ou com sócios?',chamada:'',texto:'',checklist:[],temAlertaLocal:false,textoAlertaLocal:'',disclaimerJuridico:'',recompensa:'',proximaFase:4
    },
    {
      id:4,capitulo:1,capituloNome:CAPITULOS[1],emoji:'🏷️',titulo:'Escolha o nome da empresa',chamada:'',texto:'',checklist:[],temAlertaLocal:false,textoAlertaLocal:'',disclaimerJuridico:'',recompensa:'',proximaFase:5
    },
    {
      id:5,capitulo:1,capituloNome:CAPITULOS[1],emoji:'📍',titulo:'Onde minha empresa vai funcionar?',chamada:'',texto:'',checklist:[],temAlertaLocal:true,textoAlertaLocal:ALERTA_LOCAL_PADRAO,disclaimerJuridico:'',recompensa:'',proximaFase:6
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
      id:7,capitulo:1,capituloNome:CAPITULOS[1],emoji:'💰',titulo:'Capital social',chamada:'',texto:'',checklist:[],temAlertaLocal:false,textoAlertaLocal:'',disclaimerJuridico:'',recompensa:'',proximaFase:8
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
      id:12,capitulo:2,capituloNome:CAPITULOS[2],emoji:'🏙️',titulo:'Inscrições da empresa',chamada:'',texto:'',checklist:[],temAlertaLocal:true,textoAlertaLocal:ALERTA_LOCAL_PADRAO,disclaimerJuridico:'',recompensa:'',proximaFase:13
    },
    {
      id:13,capitulo:2,capituloNome:CAPITULOS[2],emoji:'🚒',titulo:'Licenças e alvarás',chamada:'',texto:'',checklist:[],temAlertaLocal:true,textoAlertaLocal:'As licenças exigidas variam bastante conforme município, estado, atividade, endereço e grau de risco. Confirme as exigências com prefeitura, Corpo de Bombeiros, Vigilância Sanitária, órgão ambiental ou autoridade competente da sua região.',disclaimerJuridico:'',recompensa:'',proximaFase:14
    },
    {
      id:14,capitulo:2,capituloNome:CAPITULOS[2],emoji:'🔐',titulo:'Certificado digital e acessos oficiais',chamada:'',texto:'',checklist:[],temAlertaLocal:false,textoAlertaLocal:'',disclaimerJuridico:'',recompensa:'',proximaFase:15
    },
    {
      id:15,capitulo:2,capituloNome:CAPITULOS[2],emoji:'🧾',titulo:'Preparar emissão de nota fiscal',chamada:'',texto:'',checklist:[],temAlertaLocal:true,textoAlertaLocal:ALERTA_LOCAL_PADRAO,disclaimerJuridico:'',recompensa:'',proximaFase:16
    },
    {
      id:16,capitulo:2,capituloNome:CAPITULOS[2],emoji:'🏦',titulo:'Conta PJ e meios de pagamento',chamada:'',texto:'',checklist:[],temAlertaLocal:false,textoAlertaLocal:'',disclaimerJuridico:'',recompensa:'',proximaFase:17
    },
    {
      id:17,capitulo:2,capituloNome:CAPITULOS[2],emoji:'📊',titulo:'Organizar a contabilidade',chamada:'',texto:'',checklist:[],temAlertaLocal:false,textoAlertaLocal:'',disclaimerJuridico:'',recompensa:'',proximaFase:18
    },
    {
      id:18,capitulo:2,capituloNome:CAPITULOS[2],emoji:'👷',titulo:'Vou contratar alguém?',chamada:'',texto:'',checklist:[],temAlertaLocal:false,textoAlertaLocal:'',disclaimerJuridico:'',recompensa:'',proximaFase:19
    },
    {
      id:19,capitulo:2,capituloNome:CAPITULOS[2],emoji:'✅',titulo:'Minha empresa está pronta?',chamada:'',texto:'',checklist:[],temAlertaLocal:false,textoAlertaLocal:'',disclaimerJuridico:'',recompensa:'',proximaFase:null
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