(()=>{
 const api=window.storyplayAPI;if(!api)return;
 const sector=document.getElementById('companySector');
 if(!sector||document.getElementById('companyActivity'))return;

 const catalog={
  'Agricultura, Pecuária, Produção Florestal, Pesca e Aquicultura':['Horta e produção de alimentos','Criação de animais','Produção de mudas e plantas','Pesca e aquicultura','Serviços de apoio ao agronegócio'],
  'Indústrias Extrativas':['Extração de areia e argila','Extração de pedra e brita','Serviços de apoio à mineração'],
  'Indústrias de Transformação':['Fábrica de alimentos','Fábrica de bebidas','Confecção de roupas','Fabricação de móveis','Fabricação de cosméticos','Produção de embalagens','Indústria de produtos sustentáveis'],
  'Eletricidade e Gás':['Energia solar','Instalação e operação de geração distribuída','Serviços ligados a energia e gás'],
  'Água, Esgoto, Atividades de Gestão de Resíduos e Descontaminação':['Coleta e gestão de resíduos','Reciclagem','Tratamento de água','Serviços ambientais e descontaminação'],
  'Construção':['Construtora','Reformas e manutenção predial','Instalações elétricas','Instalações hidráulicas','Arquitetura e execução de obras'],
  'Comércio; Reparação de Veículos Automotores e Motocicletas':['Loja de alimentos e bebidas','Distribuidora','Loja de roupas','Loja de eletrônicos','E-commerce','Loja de produtos sustentáveis','Autopeças','Oficina mecânica','Comércio de veículos'],
  'Transporte, Armazenagem e Correio':['Transportadora','Entregas rápidas','Operador logístico','Armazenagem','Mudanças e fretes','Serviços de courier'],
  'Alojamento e Alimentação':['Restaurante','Lanchonete','Cafeteria','Hamburgueria','Delivery de alimentação','Pousada','Hotel','Hostel'],
  'Informação e Comunicação':['Desenvolvimento de Aplicativos e SaaS (Software as a Service)','Consultoria e Automação com Inteligência Artificial','Desenvolvimento de sistemas sob encomenda','Suporte técnico em TI','Consultoria em tecnologia','Provedor de internet','Hospedagem de aplicações','Portal e conteúdo digital','Tratamento de dados'],
  'Atividades Financeiras, de Seguros e Serviços Relacionados':['Consultoria financeira','Corretagem de seguros','Serviços de apoio financeiro','Tecnologia financeira e meios de pagamento'],
  'Atividades Imobiliárias':['Imobiliária','Administração de imóveis','Intermediação de aluguel e venda','Gestão de propriedades'],
  'Atividades Profissionais, Científicas e Técnicas':['Consultoria empresarial','Agência de marketing','Design e comunicação visual','Arquitetura','Engenharia','Contabilidade','Publicidade','Pesquisa e desenvolvimento','Serviços jurídicos'],
  'Atividades Administrativas e Serviços Complementares':['Serviços administrativos','Limpeza empresarial','Segurança e monitoramento','Organização de eventos','Agência de viagens','Locação de equipamentos','Gestão de facilities'],
  'Administração Pública, Defesa e Seguridade Social':['Atividade institucional pública — conteúdo apenas educacional'],
  'Educação':['EdTech','Cursos livres','Reforço escolar','Treinamento profissional','Escola de idiomas','Produção de conteúdo educacional'],
  'Saúde Humana e Serviços Sociais':['Clínica de saúde','Consultório','Serviços de fisioterapia','Serviços de psicologia','Cuidados e assistência social','Serviços de bem-estar'],
  'Artes, Cultura, Esporte e Recreação':['Academia','Escola esportiva','Produtora cultural','Produção de eventos','Estúdio criativo','Atividades recreativas'],
  'Outras Atividades de Serviços':['Salão de beleza','Barbearia','Lavanderia','Manutenção de computadores e celulares','Serviços pessoais','Associação e serviços diversos'],
  'Serviços Domésticos':['Serviços domésticos — conteúdo apenas educacional'],
  'Organismos Internacionais e Outras Instituições Extraterritoriais':['Atividade institucional internacional — conteúdo apenas educacional']
 };

 const labels={
  'Administração Pública, Defesa e Seguridade Social':'Esta área existe na classificação oficial, mas não representa uma escolha típica para criação de uma empresa privada.',
  'Serviços Domésticos':'Esta área existe na classificação oficial e é apresentada aqui para fins educacionais.',
  'Organismos Internacionais e Outras Instituições Extraterritoriais':'Esta área existe na classificação oficial, mas não representa uma escolha típica para criação de uma empresa privada.'
 };

 const oldLabel=sector.closest('label');
 if(!oldLabel)return;
 const areaLabel=document.createElement('label');
 areaLabel.className=oldLabel.className;
 areaLabel.innerHTML='<span class="field-icon">🧭</span><span class="field-label">Área de atividade</span><small>Escolha primeiro a grande área em que deseja empreender</small><select id="companyActivity"></select><small id="companyActivityNote" class="activity-note"></small>';
 oldLabel.parentNode.insertBefore(areaLabel,oldLabel);
 const activity=document.getElementById('companyActivity');
 const note=document.getElementById('companyActivityNote');
 oldLabel.querySelector('.field-label').textContent='Tipo de negócio';
 const oldSmall=oldLabel.querySelector('small');if(oldSmall)oldSmall.textContent='Agora escolha um negócio dentro da área selecionada';

 Object.keys(catalog).forEach(name=>{const o=document.createElement('option');o.value=name;o.textContent=name;activity.appendChild(o)});

 function fill(selected){
  sector.innerHTML='';
  (catalog[activity.value]||[]).forEach(name=>{const o=document.createElement('option');o.value=name;o.textContent=name;sector.appendChild(o)});
  if(selected&&[...sector.options].some(o=>o.value===selected))sector.value=selected;
  note.textContent=labels[activity.value]||'A escolha da atividade ajuda a conectar a Empresa Virtual aos módulos de operação, gestão e tributação.';
 }
 function findAreaBySector(value){return Object.keys(catalog).find(area=>catalog[area].includes(value))}
 const current=api.getState().company?.sector||sector.value;
 const matched=findAreaBySector(current);
 if(matched)activity.value=matched;
 else activity.value='Comércio; Reparação de Veículos Automotores e Motocicletas';
 fill(current);
 activity.addEventListener('change',()=>fill());

 window.storyplayActivityCatalog=catalog;
})();