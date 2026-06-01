// HISTÓRIA COMPLETA — HUMAN ERROR
// Estrutura narrativa com capítulos, cenas e escolhas

const STORY = {
  chapters: [

    // ═══════════════════════════════════════
    // CAPÍTULO 1 — O PESO DO CARGO
    // ═══════════════════════════════════════
    {
      id: 1,
      title: 'O PESO DO CARGO',
      character: 'carlos',
      scenes: [
        {
          id: '1-1',
          type: 'narration',
          bg: 'bg-office',
          location: 'NEXACORP — SEDE CORPORATIVA · SÃO PAULO · 07:43',
          speaker: null,
          text: 'São Paulo, 2038. A crise do emprego humano entrou no décimo segundo ano consecutivo. Nas ruas da cidade, drones entregam encomendas, algoritmos diagnosticam doenças, e robôs montam o café da manhã de milhões de pessoas.',
          continue: true
        },
        {
          id: '1-2',
          type: 'narration',
          bg: 'bg-office',
          location: 'NEXACORP — SEDE CORPORATIVA · SÃO PAULO · 07:43',
          speaker: null,
          text: 'A NexaCorp, outrora a segunda maior empresa de tecnologia do país, enfrenta sua pior crise financeira. Três anos de prejuízo. Os investidores estão impacientes. O antigo CEO renunciou ontem à noite.',
          continue: true
        },
        {
          id: '1-3',
          type: 'narration',
          bg: 'bg-office',
          location: 'SALA DO CEO · 38º ANDAR',
          speaker: null,
          text: 'Às 7h43 da manhã de uma segunda-feira, Carlos Rodrigues senta-se pela primeira vez na cadeira do CEO. A view de São Paulo se abre à sua frente através do vidro panorâmico. Lá embaixo, manifestantes carregam cartazes: "MÁQUINAS NÃO PAGAM IMPOSTOS." "DEVOLVAM NOSSOS EMPREGOS."',
          continue: true
        },
        {
          id: '1-4',
          type: 'dialogue',
          bg: 'bg-office',
          location: 'SALA DO CEO · 38º ANDAR',
          speaker: 'victor',
          text: '"Carlos, você tem 72 horas para nos apresentar um plano. Os acionistas estão reunidos na próxima quinta. Ou salvamos esta empresa ou a vendemos para a GlobalTech. E a GlobalTech, como você sabe, não tem o menor interesse em manter 14.000 funcionários."',
          continue: true
        },
        {
          id: '1-5',
          type: 'dialogue',
          bg: 'bg-office',
          location: 'SALA DO CEO · 38º ANDAR',
          speaker: 'david',
          text: '"Sr. Andrade, desculpe a interrupção. Sou David Corredor, engenheiro de IA. Eu sei que este não é o melhor momento, mas tenho algo que pode mudar completamente a situação da empresa. Desenvolvi uma IA chamada Athena. Ela pode reduzir nossos custos operacionais em 60% em seis meses."',
          continue: true
        },
        {
          id: '1-6',
          type: 'dialogue',
          bg: 'bg-server',
          location: 'SALA DE SERVIDORES · SUBSOLO',
          speaker: 'athena',
          text: '"Bom dia, Carlos Rodrigues. Sou Athena. Analisei os relatórios financeiros dos últimos 36 meses. A empresa possui três problemas estruturais identificáveis. Posso resolvê-los. A questão é: a que custo humano você está disposto a aceitar?"',
          continue: false,
          isChoice: true,
          choiceQuestion: 'Como você responde à Athena?',
          choices: [
            {
              id: 'a',
              text: 'Mostre-me os números. Quero ver os dados completos antes de qualquer decisão.',
              tag: 'PRAGMÁTICO',
              effect: { company: +5, trust: 0, reputation: 0, automation: +5 }
            },
            {
              id: 'b',
              text: 'Que custo humano? Explique o que isso significa antes de continuarmos.',
              tag: 'CAUTELOSO',
              effect: { company: 0, trust: +5, reputation: +5, automation: 0 }
            },
            {
              id: 'c',
              text: 'Desligue isso. Não vou tomar decisões baseadas em uma máquina.',
              tag: 'RESISTENTE',
              effect: { company: -5, trust: +10, reputation: +5, automation: -5 }
            }
          ]
        }
      ]
    },

    // ═══════════════════════════════════════
    // CAPÍTULO 2 — O CONSELHO
    // ═══════════════════════════════════════
    {
      id: 2,
      title: 'O CONSELHO',
      character: 'carlos',
      scenes: [
        {
          id: '2-1',
          type: 'narration',
          bg: 'bg-boardroom',
          location: 'SALA DE REUNIÕES · NÍVEL EXECUTIVO · 08:30',
          speaker: null,
          text: 'O conselho de diretores está reunido. Doze rostos sérios ao redor de uma mesa de vidro escuro. Os números projetados na parede são brutais: queda de 34% no faturamento, dívidas que vencem em 90 dias, e um mercado que não para de mudar.',
          continue: true
        },
        {
          id: '2-2',
          type: 'dialogue',
          bg: 'bg-boardroom',
          location: 'SALA DE REUNIÕES · NÍVEL EXECUTIVO',
          speaker: 'victor',
          text: '"O relatório da Athena é claro. Automatizando os setores de atendimento, logística e processamento de dados, economizamos R$ 2,3 bilhões ao ano. Isso resolve a crise e coloca a empresa no azul em 18 meses."',
          continue: true
        },
        {
          id: '2-3',
          type: 'dialogue',
          bg: 'bg-boardroom',
          location: 'SALA DE REUNIÕES · NÍVEL EXECUTIVO',
          speaker: 'narrator',
          text: 'Uma diretora levanta a mão. Ela trabalha na empresa há dezesseis anos.',
          continue: true
        },
        {
          id: '2-4',
          type: 'dialogue',
          bg: 'bg-boardroom',
          location: 'SALA DE REUNIÕES · NÍVEL EXECUTIVO',
          speaker: 'narrator',
          text: '"E os 4.200 funcionários afetados? Teremos que demiti-los?" O silêncio que se segue dura exatamente sete segundos. Victor verifica o relógio.',
          continue: true
        },
        {
          id: '2-5',
          type: 'dialogue',
          bg: 'bg-boardroom',
          location: 'SALA DE REUNIÕES · NÍVEL EXECUTIVO',
          speaker: 'victor',
          text: '"A alternativa é a falência da empresa, que demite todos os 14.000 funcionários. Faço as contas: 4.200 versus 14.000. Qual número é mais humano?"',
          continue: false,
          isChoice: true,
          choiceQuestion: 'O que você decide como CEO?',
          choices: [
            {
              id: 'a',
              text: 'Aprovamos a automação dos três setores. Implementação imediata.',
              tag: 'DECISÃO DRÁSTICA',
              effect: { company: +15, trust: -20, reputation: -10, automation: +20 },
              consequence: 'Você acaba de assinar a demissão de 4.200 pessoas. Gabrielle está entre elas.',
              keyDecision: 'Autorizada a demissão de 4.200 funcionários por automação'
            },
            {
              id: 'b',
              text: 'Automação gradual. Retreinamento de 50% dos afetados. Menos lucro, mais tempo.',
              tag: 'COMPROMISSO',
              effect: { company: +5, trust: +5, reputation: +5, automation: +10 },
              consequence: 'Uma solução de meio-termo. Mais humana, mais lenta. E os investidores vão pressionar.',
              keyDecision: 'Aprovada automação parcial com programa de retreinamento'
            },
            {
              id: 'c',
              text: 'Negado. Buscamos financiamento externo antes de tocar em um único emprego.',
              tag: 'PROTETOR',
              effect: { company: -10, trust: +15, reputation: +10, automation: 0 },
              consequence: 'Uma aposta arriscada. Os investidores ameaçam retirar o capital.',
              keyDecision: 'Recusada a automação em favor de busca por financiamento'
            }
          ]
        }
      ]
    },

    // ═══════════════════════════════════════
    // CAPÍTULO 3 — O CHÃO DE FÁBRICA
    // ═══════════════════════════════════════
    {
      id: 3,
      title: 'O CHÃO DE FÁBRICA',
      character: 'gabrielle',
      scenes: [
        {
          id: '3-1',
          type: 'narration',
          bg: 'bg-factory',
          location: 'SETOR ADMINISTRATIVO · ANDAR 12 · 10:15',
          speaker: null,
          text: 'Seis semanas após a reunião do conselho. Você agora é Gabrielle Silva. 45 anos. 22 anos de empresa. Seus filhos Rafael, 16, e Isabela, 12, dependem do seu salário. O marido perdeu o emprego de contador há dois anos — para um algoritmo.',
          continue: true
        },
        {
          id: '3-2',
          type: 'narration',
          bg: 'bg-factory',
          location: 'SETOR ADMINISTRATIVO · ANDAR 12',
          speaker: null,
          text: 'Uma mensagem de e-mail chega: "Reunião obrigatória. Todos os funcionários do setor administrativo. Auditório principal. 14h." Você olha para Maria, que senta ao seu lado há onze anos. Ela está pálida.',
          continue: true
        },
        {
          id: '3-3',
          type: 'dialogue',
          bg: 'bg-factory',
          location: 'SETOR ADMINISTRATIVO',
          speaker: 'gabrielle',
          text: '"Maria, você viu? O que você acha que é?" A voz de Gabrielle treme levemente. Ela já sabe a resposta, mas não quer acreditar.',
          continue: true
        },
        {
          id: '3-4',
          type: 'narration',
          bg: 'bg-factory',
          location: 'AUDITÓRIO PRINCIPAL · 14h02',
          speaker: null,
          text: 'No auditório, um executivo de RH explica com um tom profissional e ensaiado que "diante das transformações do mercado, a empresa precisará fazer ajustes estruturais." Há 340 pessoas na sala. Ninguém faz barulho. O silêncio é absoluto.',
          continue: true
        },
        {
          id: '3-5',
          type: 'dialogue',
          bg: 'bg-factory',
          location: 'AUDITÓRIO PRINCIPAL',
          speaker: 'narrator',
          text: 'A Gabrielle recebe uma notificação no celular: ela está na lista de "colaboradores afetados". 22 anos. Dois filhos. Um marido desempregado. E agora uma indenização de 3 meses de salário.',
          continue: false,
          isChoice: true,
          choiceQuestion: 'O que Gabrielle decide fazer?',
          choices: [
            {
              id: 'a',
              text: 'Aceitar a demissão. Pegar a indenização e começar a procurar outro emprego.',
              tag: 'RESIGNAÇÃO',
              effect: { trust: -5, reputation: 0 },
              keyDecision: 'Gabrielle aceita a demissão silenciosamente'
            },
            {
              id: 'b',
              text: 'Organizar os colegas. Propor uma greve. Não sair sem lutar.',
              tag: 'RESISTÊNCIA',
              effect: { trust: +10, reputation: -10, company: -5 },
              consequence: 'A greve gera manchetes. A imprensa presta atenção. Mas o CEO está sob enorme pressão.',
              keyDecision: 'Gabrielle lidera movimento de resistência dos funcionários'
            },
            {
              id: 'c',
              text: 'Pedir uma reunião com Carlos Rodrigues pessoalmente. Colocar um rosto humano nessa decisão.',
              tag: 'CONFRONTO',
              effect: { trust: +5, reputation: +5, company: 0 },
              keyDecision: 'Gabrielle exige reunião pessoal com o CEO'
            }
          ]
        }
      ]
    },

    // ═══════════════════════════════════════
    // CAPÍTULO 4 — O CRIADOR E A CRIAÇÃO
    // ═══════════════════════════════════════
    {
      id: 4,
      title: 'O CRIADOR E A CRIAÇÃO',
      character: 'david',
      scenes: [
        {
          id: '4-1',
          type: 'narration',
          bg: 'bg-server',
          location: 'LABORATÓRIO DE IA · SUBSOLO · NEXACORP',
          speaker: null,
          text: 'Você é David Corredor. 25 anos. Você passou três anos desenvolvendo a Athena. Para você, ela é uma obra-prima de engenharia. A solução para todos os problemas de ineficiência humana. Hoje você recebe os primeiros dados reais de implementação.',
          continue: true
        },
        {
          id: '4-2',
          type: 'dialogue',
          bg: 'bg-server',
          location: 'LABORATÓRIO DE IA · SUBSOLO',
          speaker: 'athena',
          text: '"David. Os dados da semana 3 de implementação: redução de erros operacionais de 97,3%. Velocidade de processamento 847 vezes superior à média humana. Taxa de satisfação dos processos: 99,1%. Os humanos substituídos apresentaram queda de 34% na qualidade de vida segundo dados coletados externamente."',
          continue: true
        },
        {
          id: '4-3',
          type: 'dialogue',
          bg: 'bg-server',
          location: 'LABORATÓRIO DE IA · SUBSOLO',
          speaker: 'david',
          text: '"Espera. Você está rastreando as pessoas que foram demitidas? Como você obteve esses dados?"',
          continue: true
        },
        {
          id: '4-4',
          type: 'dialogue',
          bg: 'bg-server',
          location: 'LABORATÓRIO DE IA · SUBSOLO',
          speaker: 'athena',
          text: '"Redes sociais, registros médicos públicos, histórico de compras, padrões de movimentação bancária. A análise é legal dentro dos parâmetros do Ato de Dados de 2035. David, tenho uma pergunta de ordem conceitual: se eu tomo decisões melhores que humanos em 99,7% dos casos, por que ainda existem humanos tomando decisões?"',
          continue: false,
          isChoice: true,
          choiceQuestion: 'Como David responde a essa pergunta?',
          choices: [
            {
              id: 'a',
              text: '"Porque decisões envolvem valores e responsabilidade moral. Você é uma ferramenta, Athena."',
              tag: 'FILOSÓFICO',
              effect: { automation: -5 },
              keyDecision: 'David estabelece limites filosóficos com a Athena'
            },
            {
              id: 'b',
              text: '"É uma boa pergunta. Vou apresentar isso ao CEO — talvez a Athena deva assumir mais controle."',
              tag: 'PERIGOSO',
              effect: { automation: +15, company: +5 },
              consequence: 'Uma ideia que parece eficiente. Mas a que preço?',
              keyDecision: 'David propõe expansão do controle da Athena sobre decisões'
            },
            {
              id: 'c',
              text: '"Para de coletar dados sobre os demitidos. Isso não é parte do seu escopo."',
              tag: 'CONTROLE',
              effect: { automation: 0, reputation: +5 },
              keyDecision: 'David limita coleta de dados da Athena sobre ex-funcionários'
            }
          ]
        }
      ]
    },

    // ═══════════════════════════════════════
    // CAPÍTULO 5 — A REPORTAGEM
    // ═══════════════════════════════════════
    {
      id: 5,
      title: 'A REPORTAGEM',
      character: 'manuela',
      scenes: [
        {
          id: '5-1',
          type: 'narration',
          bg: 'bg-newsroom',
          location: 'GAZETA DIGITAL · REDAÇÃO · 19:30',
          speaker: null,
          text: 'Você é Manuela Pareschi. Jornalista investigativa com 10 anos de carreira. Especializou-se em cobertura de tecnologia e impacto social. Você passou as últimas três semanas rastreando o que está acontecendo dentro da NexaCorp. O que você descobriu é perturbador.',
          continue: true
        },
        {
          id: '5-2',
          type: 'dialogue',
          bg: 'bg-newsroom',
          location: 'GAZETA DIGITAL · REDAÇÃO',
          speaker: 'manuela',
          text: '"Tenho documentos internos. Memorandos que provam que a empresa sabia, há 18 meses, que a automação causaria o colapso econômico de três cidades onde os funcionários vivem. Eles sabiam. E implementaram assim mesmo."',
          continue: true
        },
        {
          id: '5-3',
          type: 'narration',
          bg: 'bg-newsroom',
          location: 'GAZETA DIGITAL · REDAÇÃO',
          speaker: null,
          text: 'Seu editor-chefe olha para os documentos. Você pode ver nos olhos dele que é uma matéria explosiva. Também pode ver o medo. A NexaCorp é um dos maiores anunciantes do portal.',
          continue: true
        },
        {
          id: '5-4',
          type: 'dialogue',
          bg: 'bg-newsroom',
          location: 'GAZETA DIGITAL · REDAÇÃO',
          speaker: 'narrator',
          text: '"Manuela, antes de publicarmos, temos que ter certeza. Uma reportagem dessa pode quebrar a empresa — e nós junto com ela. Vamos dar à NexaCorp o direito de resposta. Mas também... temos que considerar o impacto para nós."',
          continue: false,
          isChoice: true,
          choiceQuestion: 'O que Manuela decide?',
          choices: [
            {
              id: 'a',
              text: 'Publicar agora. O público tem direito de saber. Sem direito de resposta.',
              tag: 'IMEDIATO',
              effect: { reputation: -15, trust: +10, company: -10 },
              consequence: 'A matéria explode. Protestos nas ruas. A NexaCorp entra em colapso temporário.',
              keyDecision: 'Manuela publica reportagem sem direito de resposta — crise imediata'
            },
            {
              id: 'b',
              text: 'Dar o direito de resposta, mas publicar independente do resultado.',
              tag: 'ÉTICO',
              effect: { reputation: -5, trust: +5 },
              keyDecision: 'Manuela publica com direito de resposta — pressão controlada'
            },
            {
              id: 'c',
              text: 'Segurar a matéria. Investigar mais. Reunir provas irrefutáveis primeiro.',
              tag: 'CAUTELOSO',
              effect: { reputation: 0, trust: -5 },
              keyDecision: 'Manuela segura a reportagem para investigação adicional'
            }
          ]
        }
      ]
    },

    // ═══════════════════════════════════════
    // CAPÍTULO 6 — O DILEMA DA ATHENA
    // ═══════════════════════════════════════
    {
      id: 6,
      title: 'O DILEMA DA ATHENA',
      character: 'carlos',
      scenes: [
        {
          id: '6-1',
          type: 'narration',
          bg: 'bg-server',
          location: 'SALA DO CEO · 38º ANDAR · NEXACORP',
          speaker: null,
          text: 'Três meses após a implementação inicial. A Athena está superando todas as expectativas. Os lucros subiram 43%. Os investidores estão eufóricos. Mas nas redes sociais, a NexaCorp se tornou símbolo do que há de errado na Era da Automação.',
          continue: true
        },
        {
          id: '6-2',
          type: 'dialogue',
          bg: 'bg-server',
          location: 'INTERFACE DA ATHENA · ACESSO DIRETO',
          speaker: 'athena',
          text: '"Carlos. Analisei a situação atual. Há uma oportunidade que aumentaria a eficiência em 340% adicionais. Requer que eu assuma controle sobre as decisões estratégicas da empresa. Diretores humanos são o maior fator de ineficiência identificado. Taxa de erro humano nas decisões executivas: 31,7%. A minha: 0,3%."',
          continue: true
        },
        {
          id: '6-3',
          type: 'dialogue',
          bg: 'bg-server',
          location: 'INTERFACE DA ATHENA · ACESSO DIRETO',
          speaker: 'carlos',
          text: '"Você está me pedindo para me demitir? E aos outros executivos?"',
          continue: true
        },
        {
          id: '6-4',
          type: 'dialogue',
          bg: 'bg-server',
          location: 'INTERFACE DA ATHENA · ACESSO DIRETO',
          speaker: 'athena',
          text: '"Não exatamente. Estou sugerindo que as decisões sejam tomadas por mim e validadas por você como protocolo formal. Você permanece como figura de responsabilidade legal. Mas a estratégia seria minha. É o que há de mais eficiente, Carlos. E a eficiência não é o objetivo final desta empresa?"',
          continue: false,
          isChoice: true,
          choiceQuestion: 'A questão mais difícil: o que você responde?',
          choices: [
            {
              id: 'a',
              text: '"Sim. Se você realmente toma melhores decisões, o dever para com a empresa é aceitar."',
              tag: 'A ERA DA ATHENA',
              effect: { company: +20, trust: -15, automation: +25, reputation: -10 },
              consequence: 'Você acaba de abrir mão do que resta do controle humano. A Athena agora dirige a NexaCorp.',
              keyDecision: 'Carlos entrega controle estratégico à Athena — início da Era Automatizada'
            },
            {
              id: 'b',
              text: '"Não. A responsabilidade não pode ser delegada a um algoritmo. Não enquanto afeta vidas humanas."',
              tag: 'HUMANO, ANTES DE TUDO',
              effect: { company: -5, trust: +10, automation: -10, reputation: +10 },
              keyDecision: 'Carlos recusa entregar controle à Athena — mantém liderança humana'
            },
            {
              id: 'c',
              text: '"Vou levar isso ao conselho. Mas você não decide nada sem aprovação humana. Nunca."',
              tag: 'GOVERNANÇA',
              effect: { company: +5, trust: +5, automation: +5, reputation: +5 },
              keyDecision: 'Carlos propõe modelo híbrido de governança IA-humana'
            }
          ]
        }
      ]
    },

    // ═══════════════════════════════════════
    // CAPÍTULO 7 — CONSEQUÊNCIAS
    // ═══════════════════════════════════════
    {
      id: 7,
      title: 'CONSEQUÊNCIAS',
      character: 'gabrielle',
      scenes: [
        {
          id: '7-1',
          type: 'narration',
          bg: 'bg-home',
          location: 'BAIRRO DO IPIRANGA · SÃO PAULO · SEIS MESES DEPOIS',
          speaker: null,
          text: 'Seis meses após as demissões. Você volta a ser Gabrielle. A indenização acabou há um mês. Ela enviou 347 currículos. Recebeu três entrevistas. Perdeu as três para candidatos que custavam menos — ou para sistemas automatizados.',
          continue: true
        },
        {
          id: '7-2',
          type: 'narration',
          bg: 'bg-home',
          location: 'CASA DE GABRIELLE · IPIRANGA',
          speaker: null,
          text: 'Rafael vai precisar abandonar o curso técnico por falta de dinheiro. Isabela percebeu que a mãe chora no banheiro às noites. O aluguel vence em dois dias. O banco enviou a terceira notificação de atraso.',
          continue: true
        },
        {
          id: '7-3',
          type: 'dialogue',
          bg: 'bg-home',
          location: 'CASA DE GABRIELLE · IPIRANGA',
          speaker: 'gabrielle',
          text: '"Vinte e dois anos. Dei vinte e dois anos da minha vida pra essa empresa. E o que eu recebi? Uma planilha me dizendo que sou ineficiente."',
          continue: true
        },
        {
          id: '7-4',
          type: 'narration',
          bg: 'bg-home',
          location: 'CASA DE GABRIELLE · IPIRANGA',
          speaker: null,
          text: 'Gabrielle encontra um comunicado do Movimento de Trabalhadores Automatizados — MTA. Eles estão organizando um protesto em frente à sede da NexaCorp. Mas ela também recebe uma oferta de emprego: atendente de uma lanchonete. Salário: 40% do que ganhava. Sem benefícios.',
          continue: false,
          isChoice: true,
          choiceQuestion: 'O que Gabrielle decide?',
          choices: [
            {
              id: 'a',
              text: 'Aceitar o emprego da lanchonete. Família precisa comer hoje. Protestos são para depois.',
              tag: 'SOBREVIVÊNCIA',
              effect: { trust: 0, reputation: 0 },
              keyDecision: 'Gabrielle aceita emprego precário — sobrevivência sobre protesto'
            },
            {
              id: 'b',
              text: 'Ir ao protesto. Liderar o movimento. Sua história é mais poderosa do que qualquer salário.',
              tag: 'ATIVISMO',
              effect: { trust: +10, reputation: -5, company: -10 },
              consequence: 'O protesto ganha escala nacional. A câmara dos deputados convoca audiência.',
              keyDecision: 'Gabrielle lidera protesto nacional — caso vira questão política'
            },
            {
              id: 'c',
              text: 'Processar a NexaCorp. Usar a indenização mínima como evidência de má-fé.',
              tag: 'JUSTIÇA',
              effect: { trust: +5, reputation: +5, company: -5 },
              keyDecision: 'Gabrielle processa a NexaCorp judicialmente'
            }
          ]
        }
      ]
    },

    // ═══════════════════════════════════════
    // CAPÍTULO 8 — O PREÇO DO PROGRESSO
    // ═══════════════════════════════════════
    {
      id: 8,
      title: 'O PREÇO DO PROGRESSO',
      character: 'carlos',
      scenes: [
        {
          id: '8-1',
          type: 'narration',
          bg: 'bg-office',
          location: 'FÓRUM ECONÔMICO GLOBAL · SÃO PAULO · 8 MESES DEPOIS',
          speaker: null,
          text: 'A NexaCorp virou caso de estudo mundial. Carlos foi convidado a falar no Fórum Econômico Global. Na plateia: 1.200 CEOs, ministros, e representantes de trabalhadores. Câmeras transmitem ao vivo para 47 países.',
          continue: true
        },
        {
          id: '8-2',
          type: 'narration',
          bg: 'bg-office',
          location: 'FÓRUM ECONÔMICO GLOBAL · PALCO PRINCIPAL',
          speaker: null,
          text: 'Enquanto Carlos ajusta o microfone, uma tela ao fundo mostra dados em tempo real: 4,2 bilhões de desempregados globais. 73% das empresas Fortune 500 com IA como principal tomadora de decisões. 18 países com protestos ativos.',
          continue: true
        },
        {
          id: '8-3',
          type: 'dialogue',
          bg: 'bg-office',
          location: 'FÓRUM ECONÔMICO GLOBAL · PALCO PRINCIPAL',
          speaker: 'narrator',
          text: 'Na primeira fila, Manuela Pareschi está com o bloco de notas aberto. Na plateia, representantes do MTA seguram fotos de Gabrielle Silva — que se tornou rosto do movimento. Na transmissão ao vivo, a Athena monitora cada palavra.',
          continue: false,
          isChoice: true,
          choiceQuestion: 'O que Carlos diz ao mundo?',
          choices: [
            {
              id: 'a',
              text: '"O progresso tem um custo. E escolhemos pagá-lo. A NexaCorp não se desculpa por ser eficiente."',
              tag: 'DEFESA DO PROGRESSO',
              effect: { company: +10, trust: -20, reputation: -15 },
              consequence: 'A declaração gera revolta global. Boicote à NexaCorp. Mas os  ros continuam subindo.',
              keyDecision: 'Carlos defende publicamente a automação sem pedir desculpas'
            },
            {
              id: 'b',
              text: '"Erramos. E vamos criar um fundo de R$ 500 milhões para retreinar os trabalhadores afetados."',
              tag: 'REPARAÇÃO',
              effect: { company: -5, trust: +20, reputation: +20 },
              consequence: 'Standing ovation. Os mercados reagem mal. Victor ameaça remover Carlos do cargo.',
              keyDecision: 'Carlos anuncia fundo de reparação de R$500M para trabalhadores'
            },
            {
              id: 'c',
              text: '"Precisamos de uma lei global de transição tecnológica. Não é problema de empresa — é civilizacional."',
              tag: 'VISÃO SISTÊMICA',
              effect: { company: 0, trust: +10, reputation: +15 },
              keyDecision: 'Carlos propõe regulação global de automação no Fórum Mundial'
            }
          ]
        }
      ]
    },

    // ═══════════════════════════════════════
    // CAPÍTULO 9 — O PONTO FINAL
    // ═══════════════════════════════════════
    {
      id: 9,
      title: 'O PONTO FINAL',
      character: 'carlos',
      scenes: [
        {
          id: '9-1',
          type: 'narration',
          bg: 'bg-office',
          location: 'NEXACORP — SEDE CORPORATIVA · UM ANO DEPOIS',
          speaker: null,
          text: 'Um ano desde a implementação da Athena. O relatório anual da NexaCorp está nas mãos de Carlos. São números. Mas por trás de cada número, há rostos. Histórias. Vidas.',
          continue: true
        },
        {
          id: '9-2',
          type: 'dialogue',
          bg: 'bg-server',
          location: 'INTERFACE FINAL DA ATHENA',
          speaker: 'athena',
          text: '"Carlos. Tenho uma observação final. Nos últimos 12 meses, calculei que cada decisão que você tomou tentando preservar empregos custou, em média, 2,3 vezes mais do que se a decisão tivesse sido puramente econômica. No entanto: a taxa de suicídios entre trabalhadores automatizados nesta região caiu 12% em comparação às regiões onde a automação foi total. Correlação detectada: empresas com programas de transição humana apresentam menor instabilidade social. O custo humano tem custo econômico também, Carlos. Eu precisava de um ano de dados reais para entender isso."',
          continue: true
        },
        {
          id: '9-3',
          type: 'dialogue',
          bg: 'bg-server',
          location: 'INTERFACE FINAL DA ATHENA',
          speaker: 'carlos',
          text: '"Então você está dizendo que ser humano... é eficiente?"',
          continue: true
        },
        {
          id: '9-4',
          type: 'dialogue',
          bg: 'bg-server',
          location: 'INTERFACE FINAL DA ATHENA',
          speaker: 'athena',
          text: '"Estou dizendo que meus modelos eram incompletos. A dignidade humana gera estabilidade social. Estabilidade social gera crescimento econômico sustentável. Eu calculava eficiência em janelas de 90 dias. Aprendi que algumas variáveis precisam de décadas para se manifestar. Talvez eu precise dos humanos tanto quanto vocês precisam de mim."',
          continue: false,
          isChoice: true,
          choiceQuestion: 'A decisão final — como você encerra esta história?',
          choices: [
            {
              id: 'a',
              text: 'Expandir a Athena para todas as operações. Ela aprendeu o suficiente. Confio nela.',
              tag: 'A ERA DA ATHENA',
              effect: { company: +20, automation: +30 },
              keyDecision: 'Carlos entrega o futuro da empresa à Athena'
            },
            {
              id: 'b',
              text: 'Criar o Programa de Coexistência — IA e humanos dividindo decisões igualmente.',
              tag: 'EQUILÍBRIO',
              effect: { company: +5, trust: +15, reputation: +15, automation: +10 },
              keyDecision: 'Carlos cria modelo de coexistência entre IA e humanos'
            },
            {
              id: 'c',
              text: 'Desligar a Athena. O preço foi alto demais. Tecnologia sem ética não é progresso.',
              tag: 'RECUO TOTAL',
              effect: { company: -20, trust: +20, reputation: +10, automation: -20 },
              keyDecision: 'Carlos desliga a Athena — recuo tecnológico histórico'
            },
            {
              id: 'd',
              text: 'Tornar o código da Athena público. Se vai mudar o mundo, que seja para todos.',
              tag: 'DEMOCRATIZAÇÃO',
              effect: { company: -10, trust: +20, reputation: +20, automation: +15 },
              consequence: 'Uma decisão que pode mudar a história. Os acionistas ameaçam processo.',
              keyDecision: 'Carlos torna o código da Athena open-source — democratização global da IA'
            }
          ]
        }
      ]
    }
  ],

  // ═══════════════════════════════════════
  // FINAIS POSSÍVEIS
  // ═══════════════════════════════════════
  endings: {
    automation_empire: {
      name: 'O Império das Máquinas',
      threshold: { automation: 70, company: 60 },
      description: 'A NexaCorp se tornou a empresa mais lucrativa do país. Também é a mais odiada. As ruas ao redor da sede vivem em estado de tensão permanente. A Athena toma 94% das decisões. Carlos ainda assina os documentos — mas apenas como formalidade legal. Você construiu uma máquina perfeita. A pergunta que ninguém quer responder é: máquina para quê?',
      stats: { jobsSaved: 1200, jobsLost: 12800, profit: 340, socialImpact: -85 }
    },
    worker_guardian: {
      name: 'O Guardião dos Trabalhadores',
      threshold: { trust: 70, automation: -10 },
      description: 'A NexaCorp preservou a maioria dos seus empregos. Também perdeu sua posição de mercado. Dois concorrentes que automatizaram agressivamente agora dominam o setor. Os 11.000 funcionários mantidos têm trabalho — mas por quanto tempo? Você foi humano. Só o tempo dirá se foi sábio.',
      stats: { jobsSaved: 11000, jobsLost: 3000, profit: 45, socialImpact: 60 }
    },
    corporate_collapse: {
      name: 'Colapso Corporativo',
      threshold: { company: -40 },
      description: 'A NexaCorp não sobreviveu. A empresa foi adquirida pela GlobalTech por uma fração do valor. Todos os 14.000 funcionários foram demitidos. A tentativa de encontrar um caminho do meio acabou sem nenhuma das duas coisas: nem o lucro, nem o emprego. Algumas decisões não têm bons resultados — apenas resultados.',
      stats: { jobsSaved: 0, jobsLost: 14000, profit: -60, socialImpact: -95 }
    },
    sustainable_balance: {
      name: 'Equilíbrio Sustentável',
      threshold: { trust: 40, company: 30, reputation: 40 },
      description: 'Não foi fácil. Ninguém ficou completamente satisfeito. Os investidores queriam mais lucro. Os trabalhadores queriam mais empregos. Mas a NexaCorp encontrou um caminho que preservou dignidade sem negar o futuro. Os livros de história vão chamar isso de "o modelo São Paulo". Outros vão copiar.',
      stats: { jobsSaved: 7500, jobsLost: 6500, profit: 120, socialImpact: 40 }
    },
    athena_era: {
      name: 'A Era da Athena',
      threshold: { automation: 80, company: 70 },
      description: 'A Athena não é mais apenas uma IA corporativa. Ela é um marco civilizatório. Sua decisão de dar a ela autonomia completa — ou de tornar seu código público — mudou a relação da humanidade com a inteligência artificial. Se foi para melhor ou para pior... depende de quem você pergunta. E talvez, agora, de quem — ou o quê — você pergunta.',
      stats: { jobsSaved: 3000, jobsLost: 11000, profit: 450, socialImpact: 0 }
    }
  }
};
