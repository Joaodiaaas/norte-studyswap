// ═══════════════════════════════════════════════════════════════
// PLANOS DE ESTUDO - NORTE
// ═══════════════════════════════════════════════════════════════
// Cada plano é gerado dinamicamente baseado no foco e nas horas disponíveis.
// Adicione novos vestibulares aqui seguindo o padrão.
// ═══════════════════════════════════════════════════════════════

const PLANOS = {

  /* ═══ UFMG SERIADO ═══ */
  "UFMG Seriado": {
    1: {
      t: "UFMG Seriado — 1h/dia",
      f: "Rotação inteligente: 1 matéria por dia + revisão rápida no início. Perfeito pra manter constância sem sobrecarregar.",
      s: [
        { d: "Seg", b: ["Revisão relâmpago (10min) — flashcards da semana passada", "Matemática (50min) — 1 tópico + 5 questões da UFMG"] },
        { d: "Ter", b: ["Revisão relâmpago (10min)", "Física (50min) — teoria resumida + 5 questões"] },
        { d: "Qua", b: ["Revisão relâmpago (10min)", "Química (50min) — exercícios do tema da semana"] },
        { d: "Qui", b: ["Revisão relâmpago (10min)", "Biologia (50min) — leitura ativa + anotações"] },
        { d: "Sex", b: ["Revisão relâmpago (10min)", "Português ou Humanas (50min) — alternando semana"] },
        { d: "Sáb", b: ["Mini-simulado (40min) — 15 questões mistas da UFMG", "Correção e análise de erros (20min)"] },
        { d: "Dom", b: ["Descanso total", "Planejar próxima semana (10min à noite)"] }
      ],
      di: ["Foque na matéria que mais cai na UFMG da sua série", "Os 10min iniciais de revisão fixam o conteúdo anterior", "50min focado vale mais que 3h distraído", "Mantenha um caderno de erros e revise todo sábado"],
      re: "Ciclo de 7 dias: sábado revisita os erros da semana. A cada 4 semanas, simulado maior cobrindo o mês todo."
    },
    2: {
      t: "UFMG Seriado — 2h/dia",
      f: "2 matérias por dia com revisão consistente. O ritmo ideal pra manter constância no seriado.",
      s: [
        { d: "Seg", b: ["Matemática (60min) — teoria + 10 questões progressivas", "Física (60min) — resumo do tópico + exercícios"] },
        { d: "Ter", b: ["Química (60min) — estudo dirigido + questões aplicadas", "Biologia (60min) — leitura ativa com mapas mentais"] },
        { d: "Qua", b: ["Português (60min) — interpretação de texto + gramática", "História (60min) — cronologia + questões de vestibular"] },
        { d: "Qui", b: ["Revisão matéria mais fraca (60min) — refazer erros", "Geografia (60min) — mapas temáticos + exercícios"] },
        { d: "Sex", b: ["Simulado misto (90min) — 25 questões da UFMG", "Correção detalhada (30min) — padrões de erro"] },
        { d: "Sáb", b: ["Aprofundamento de 1 matéria (90min)", "Revisão acumulativa (30min) — flashcards do mês"] },
        { d: "Dom", b: ["Descanso", "Planejamento semanal (15min)"] }
      ],
      di: ["Alterne exatas e humanas no mesmo dia pra não cansar", "Quinta é dia sagrado de revisão — não pule", "Simulado toda sexta cria o hábito de prova sob pressão", "Troque a matéria de aprofundamento do sábado a cada 2 semanas"],
      re: "Revisão espaçada: dia 1 (estudo), dia 3 (revisão rápida), dia 7 (questões), dia 30 (simulado). Sábado = revisão mensal."
    },
    3: {
      t: "UFMG Seriado — 3h/dia",
      f: "3 horas é o ponto ideal: 2-3 matérias por dia com profundidade e revisão integrada.",
      s: [
        { d: "Seg", b: ["Matemática (70min) — teoria + 15 questões em dificuldade crescente", "Física (70min) — estudo teórico + resolução guiada", "Revisão ativa (40min) — refazer 5 erros da semana passada"] },
        { d: "Ter", b: ["Química (70min) — conteúdo + exercícios aplicados", "Biologia (70min) — estudo com esquemas visuais", "Redação ou interpretação (40min)"] },
        { d: "Qua", b: ["Português (60min) — gramática + literatura", "História (60min) — estudo temático com questões", "Geografia (60min) — conteúdo + mapas + exercícios"] },
        { d: "Qui", b: ["Matéria mais fraca — intensiva (90min)", "Revisão cruzada (45min) — conectar temas entre matérias", "Inglês ou complementar (45min)"] },
        { d: "Sex", b: ["Simulado completo (120min) — 35 questões da UFMG", "Correção analítica (60min) — categorizar erros"] },
        { d: "Sáb", b: ["Aprofundamento em 2 matérias (120min)", "Revisão mensal acumulativa (60min)"] },
        { d: "Dom", b: ["Descanso ativo — leitura ou documentário", "Planejamento da semana (15min)"] }
      ],
      di: ["Divida as 3h em 3 blocos de ~1h com pausas de 10min", "Quinta é o dia coringa — ataque sua maior fraqueza", "Categorize erros: conceitual, conta, interpretação, distração", "A cada 3 semanas, faça uma prova antiga da UFMG cronometrada"],
      re: "Revisão em camadas: diária (10min início), semanal (quinta), mensal (último sábado com simulado)."
    },
    4: {
      t: "UFMG Seriado — 4h+/dia",
      f: "Cobertura completa e profundidade. Cuidado com burnout: pausas são obrigatórias.",
      s: [
        { d: "Seg", b: ["Matemática (80min) — teoria profunda + 20 questões", "Física (80min) — resolução com diferentes métodos", "Revisão ativa (40min) — flashcards + erros", "Leitura/atualidades (40min)"] },
        { d: "Ter", b: ["Química (80min) — orgânica e inorgânica alternando", "Biologia (80min) — conteúdo denso com esquemas", "Redação (40min)", "Revisão do dia anterior (40min)"] },
        { d: "Qua", b: ["Português (60min) — literatura + gramática", "História (60min) — período + questões", "Geografia (60min) — geopolítica + física", "Inglês (60min) — interpretação de texto"] },
        { d: "Qui", b: ["Intensiva matéria fraca (90min)", "Revisão interdisciplinar (60min)", "Provas anteriores da UFMG (90min)"] },
        { d: "Sex", b: ["Simulado grande (150min) — 45 questões", "Correção detalhada (60min)", "Planejamento de gaps (30min)"] },
        { d: "Sáb", b: ["Aprofundamento nos gaps (120min)", "Revisão mensal (60min)", "Estudo complementar (60min)"] },
        { d: "Dom", b: ["Descanso obrigatório — sem culpa", "Planejamento (20min à noite)"] }
      ],
      di: ["Pomodoro obrigatório: 50min estudo + 10min pausa", "Máximo 2h seguidas na mesma matéria", "Domingo é sagrado — descanso é parte do treino", "Pelo menos 1 prova antiga da UFMG por mês, completa", "Exaustão? Reduza pra 3h uns dias — melhor que parar"],
      re: "4 camadas: diária (15min flashcards), a cada 3 dias (questões), semanal (simulado sexta), mensal (prova antiga completa)."
    }
  },

  /* ═══ ENEM ═══ */
  "ENEM": {
    1: {
      t: "ENEM — 1h/dia",
      f: "Com 1h, foque numa área por dia e pratique redação toda semana. Interpretação é o segredo do ENEM.",
      s: [
        { d: "Seg", b: ["Linguagens (60min) — interpretação + gramática contextualizada"] },
        { d: "Ter", b: ["Matemática (60min) — 1 tema + 8 questões modelo ENEM"] },
        { d: "Qua", b: ["Ciências Humanas (60min) — História ou Geografia alternando"] },
        { d: "Qui", b: ["Redação (60min) — estruturar e escrever 1 redação completa"] },
        { d: "Sex", b: ["Ciências da Natureza (60min) — Física, Química ou Bio alternando"] },
        { d: "Sáb", b: ["Mini-simulado (45min) — 15 questões mistas do ENEM", "Correção (15min)"] },
        { d: "Dom", b: ["Descanso + planejamento (10min)"] }
      ],
      di: ["Interpretação de texto é 70% do ENEM — treine todo dia", "Redação semanal é obrigatória — sem isso não passa de 800", "Estude por competências, não só por matéria", "Use provas anteriores do ENEM como material principal"],
      re: "Revisão semanal no sábado com mini-simulado. Mensal: refazer 1 prova antiga completa de uma área."
    },
    2: {
      t: "ENEM — 2h/dia",
      f: "2 áreas por dia com prática constante. Equilíbrio entre conteúdo e redação.",
      s: [
        { d: "Seg", b: ["Linguagens (60min) — interpretação + literatura", "Redação (60min) — repertório + estrutura argumentativa"] },
        { d: "Ter", b: ["Matemática (80min) — 2 temas + questões progressivas", "Revisão da semana passada (40min)"] },
        { d: "Qua", b: ["História (60min) — estudo temático + questões", "Geografia (60min) — atualidades + exercícios"] },
        { d: "Qui", b: ["Física (50min) — fórmulas aplicadas", "Química (50min) — conteúdo + exercícios", "Revisão ativa (20min)"] },
        { d: "Sex", b: ["Biologia (60min) — estudo + questões", "Redação (60min) — escrever redação cronometrada"] },
        { d: "Sáb", b: ["Simulado (90min) — 30 questões mistas", "Correção detalhada (30min)"] },
        { d: "Dom", b: ["Descanso", "Planejamento (15min)"] }
      ],
      di: ["Redação cronometrada toda sexta simula o dia da prova", "Atualidades são essenciais — 10min de notícias/dia", "Conecte matérias: história explica geografia", "Faça redação toda semana, sem exceção"],
      re: "A cada 3 dias integrado ao plano. Semanal: simulado sábado. Mensal: prova antiga de 1 área."
    },
    3: {
      t: "ENEM — 3h/dia",
      f: "3h é o equilíbrio ideal. Cobertura ampla + prática intensa + redação semanal.",
      s: [
        { d: "Seg", b: ["Linguagens (60min) — literatura + interpretação avançada", "Matemática (60min) — 2 temas com questões ENEM", "Redação (60min) — repertório sociocultural"] },
        { d: "Ter", b: ["Física (60min) — teoria + aplicação", "Química (60min) — conteúdo + exercícios", "Biologia (60min) — estudo dirigido"] },
        { d: "Qua", b: ["História (60min) — período + questões contextualizadas", "Geografia (60min) — geopolítica + atualidades", "Redação (60min) — escrever redação completa"] },
        { d: "Qui", b: ["Matéria mais fraca (90min)", "Revisão interdisciplinar (45min)", "Resolução de questões ENEM (45min)"] },
        { d: "Sex", b: ["Simulado (120min) — 45 questões cronometradas", "Correção analítica (60min)"] },
        { d: "Sáb", b: ["Aprofundamento (90min) — temas que mais errou", "Revisão acumulativa (60min)"] },
        { d: "Dom", b: ["Descanso obrigatório", "Planejamento (15min)"] }
      ],
      di: ["Simule condições reais: cronometre, sem celular", "Domine os 5 critérios de correção da redação", "Atualidades são essenciais — leia notícias 15min/dia", "A cada 2 semanas: caderno completo de prova antiga"],
      re: "Revisão espaçada: dia 1, 3, 7, 30. Sexta = simulado semanal. Último sábado do mês = prova antiga cronometrada."
    },
    4: {
      t: "ENEM — 4h+/dia",
      f: "Preparação profunda com simulados longos e revisões acumulativas. Cuidado com o ritmo.",
      s: [
        { d: "Seg", b: ["Linguagens (60min)", "Matemática (80min) — 2 temas com questões ENEM", "Redação (40min) — repertório", "Revisão de erros (40min)"] },
        { d: "Ter", b: ["Física (70min)", "Química (70min)", "Biologia (50min)", "Revisão Natureza (30min)"] },
        { d: "Qua", b: ["História (70min)", "Geografia (70min)", "Redação completa (50min)", "Inglês/Espanhol (30min)"] },
        { d: "Qui", b: ["Matéria fraca intensiva (100min)", "Revisão interdisciplinar (60min)", "Questões ENEM (80min)"] },
        { d: "Sex", b: ["Simulado (150min) — 45 questões", "Correção analítica (60min)", "Reescrever redação (30min)"] },
        { d: "Sáb", b: ["Aprofundamento (120min)", "Revisão acumulativa (60min)", "Prova antiga — 1 caderno (60min)"] },
        { d: "Dom", b: ["Descanso obrigatório", "Planejamento (15min)"] }
      ],
      di: ["Máximo 5h/dia — rendimento cai drasticamente depois", "Intercale matérias pesadas com leves", "Redação 2x por semana no mínimo", "Simulado grande toda sexta é não-negociável"],
      re: "Espaçada: dia 1, 3, 7, 30. Sexta = simulado. Último sábado = prova antiga completa cronometrada."
    }
  },

  /* ═══ FUVEST (USP) ═══ */
  "Fuvest": {
    1: {
      t: "Fuvest — 1h/dia",
      f: "Fuvest é prova de conteúdo profundo. Com 1h, foco total em 1 matéria por dia e questões discursivas.",
      s: [
        { d: "Seg", b: ["Matemática (60min) — questões discursivas do tema"] },
        { d: "Ter", b: ["Física (60min) — resolução detalhada de 3 questões"] },
        { d: "Qua", b: ["Química (60min) — química orgânica + exercícios"] },
        { d: "Qui", b: ["Português + Literatura (60min) — obras obrigatórias"] },
        { d: "Sex", b: ["História ou Geografia (60min) — alternando"] },
        { d: "Sáb", b: ["Biologia ou Redação (60min) — alternando semana"] },
        { d: "Dom", b: ["Descanso", "Planejamento (10min)"] }
      ],
      di: ["Fuvest cobra profundidade, não volume", "Literatura obrigatória: leia as obras completas", "Questões discursivas exigem treino específico", "Foque em resolver questões da Fuvest, não só teoria"],
      re: "Semanal no sábado. Mensal: 1 prova antiga completa da Fuvest."
    },
    2: {
      t: "Fuvest — 2h/dia",
      f: "2h permite 2 matérias por dia + revisão. Equilíbrio entre conteúdo e prática com questões discursivas.",
      s: [
        { d: "Seg", b: ["Matemática (60min) — questões discursivas + geometria", "Física (60min) — mecânica ou eletromagnetismo"] },
        { d: "Ter", b: ["Química (60min) — orgânica + exercícios", "Biologia (60min) — conteúdo + questões da Fuvest"] },
        { d: "Qua", b: ["Português (60min) — gramática + interpretação", "Literatura (60min) — obras obrigatórias atual"] },
        { d: "Qui", b: ["História (60min) — Brasil ou Geral", "Geografia (60min) — geopolítica + questões"] },
        { d: "Sex", b: ["Redação (60min) — dissertação argumentativa", "Revisão matéria fraca (60min)"] },
        { d: "Sáb", b: ["Questões da Fuvest (90min) — mistas", "Correção comentada (30min)"] },
        { d: "Dom", b: ["Descanso", "Planejamento (15min)"] }
      ],
      di: ["Literatura obrigatória da Fuvest: leia as obras completas, não resumos", "Questões discursivas exigem escrita clara e direta", "Redação da Fuvest é dissertativa — treine estrutura", "Foque em provas da Fuvest, não ENEM"],
      re: "Espaçada: dia 1, 3, 7, 30. Sábado = questões da Fuvest. Mensal: prova antiga."
    },
    3: {
      t: "Fuvest — 3h/dia",
      f: "3h permite cobertura profunda + questões discursivas + literatura sólida.",
      s: [
        { d: "Seg", b: ["Matemática (70min) — teoria + questões Fuvest", "Física (70min) — resolução detalhada", "Revisão (40min)"] },
        { d: "Ter", b: ["Química (70min) — orgânica + exercícios aplicados", "Biologia (70min) — conteúdo denso", "Questões (40min)"] },
        { d: "Qua", b: ["Português (60min) — gramática avançada", "Literatura (60min) — obras obrigatórias", "Redação (60min) — produção"] },
        { d: "Qui", b: ["História (60min) — Brasil + Geral", "Geografia (60min)", "Revisão interdisciplinar (60min)"] },
        { d: "Sex", b: ["Simulado Fuvest (120min) — 25 questões discursivas", "Correção analítica (60min)"] },
        { d: "Sáb", b: ["Aprofundamento literatura (90min) — análise das obras", "Matéria fraca (60min)"] },
        { d: "Dom", b: ["Descanso ativo", "Planejamento (15min)"] }
      ],
      di: ["Literatura é a alma da Fuvest — domine as obras", "Questões discursivas > alternativas múltiplas", "Redação argumentativa clássica", "Refaça questões erradas até acertar sem olhar"],
      re: "Sexta = simulado Fuvest semanal. Último sábado = prova antiga completa."
    },
    4: {
      t: "Fuvest — 4h+/dia",
      f: "Preparação completa pra Fuvest: cobertura total + profundidade + questões antigas.",
      s: [
        { d: "Seg", b: ["Matemática (80min) — questões discursivas avançadas", "Física (80min) — resolução profunda", "Revisão ativa (40min)", "Atualidades (40min)"] },
        { d: "Ter", b: ["Química (80min) — orgânica + inorgânica", "Biologia (80min) — citologia ou ecologia", "Redação (40min)", "Revisão (40min)"] },
        { d: "Qua", b: ["Português (60min) — gramática avançada", "Literatura (80min) — análise profunda das obras", "História (60min)", "Geografia (40min)"] },
        { d: "Qui", b: ["Intensiva matéria fraca (100min)", "Revisão interdisciplinar (60min)", "Provas antigas Fuvest (80min)"] },
        { d: "Sex", b: ["Simulado Fuvest (150min) — 30 questões", "Correção completa (60min)", "Reescrever redação (30min)"] },
        { d: "Sáb", b: ["Literatura profunda (90min)", "Aprofundamento temas (90min)", "Prova antiga (60min)"] },
        { d: "Dom", b: ["Descanso obrigatório", "Planejamento (20min)"] }
      ],
      di: ["Literatura obrigatória da Fuvest muda todo ano — confira a lista atual", "Questões discursivas são 2ª fase — treine desde já", "Redação é dissertação argumentativa clássica", "Use provas antigas da Fuvest — são o melhor material"],
      re: "4 camadas: diária, 3 dias, semanal (sexta), mensal (sábado). Literatura revisada toda semana."
    }
  },

  /* ═══ UNICAMP ═══ */
  "Unicamp": {
    1: {
      t: "Unicamp — 1h/dia",
      f: "Unicamp cobra raciocínio e interpretação. Com 1h, foco em questões que exigem análise profunda.",
      s: [
        { d: "Seg", b: ["Matemática (60min) — questões que exigem raciocínio"] },
        { d: "Ter", b: ["Física (60min) — resolução comentada"] },
        { d: "Qua", b: ["Química (60min) — conteúdo + exercícios aplicados"] },
        { d: "Qui", b: ["Português + Literatura (60min) — interpretação"] },
        { d: "Sex", b: ["História ou Geografia (60min)"] },
        { d: "Sáb", b: ["Biologia ou Redação (60min)"] },
        { d: "Dom", b: ["Descanso", "Planejamento (10min)"] }
      ],
      di: ["Unicamp exige interpretação e contexto, não só decorar", "Questões são contextualizadas — leia com atenção", "Literatura é cobrada em questões analíticas", "Pratique com provas antigas da Unicamp"],
      re: "Semanal no sábado. Mensal: prova antiga completa."
    },
    2: {
      t: "Unicamp — 2h/dia",
      f: "Unicamp valoriza interpretação. 2 matérias/dia + prática de questões analíticas.",
      s: [
        { d: "Seg", b: ["Matemática (60min) — problemas contextualizados", "Física (60min) — teoria + aplicação"] },
        { d: "Ter", b: ["Química (60min) — conteúdo + exercícios", "Biologia (60min) — leitura ativa"] },
        { d: "Qua", b: ["Português (60min) — interpretação de texto", "Literatura (60min) — análise de obras"] },
        { d: "Qui", b: ["História (60min) — Brasil e Geral", "Geografia (60min) — contexto socioeconômico"] },
        { d: "Sex", b: ["Redação (60min) — gêneros textuais variados", "Revisão matéria fraca (60min)"] },
        { d: "Sáb", b: ["Questões Unicamp (90min) — mistas", "Correção (30min)"] },
        { d: "Dom", b: ["Descanso", "Planejamento (15min)"] }
      ],
      di: ["Unicamp cobra múltiplos gêneros textuais na redação", "Questões são interpretativas — não decore, entenda", "Contexto histórico-social é essencial", "Use provas antigas pra pegar o estilo da banca"],
      re: "Espaçada: dia 1, 3, 7, 30. Sábado = questões. Mensal: prova antiga."
    },
    3: {
      t: "Unicamp — 3h/dia",
      f: "3h permite cobertura ampla + interpretação profunda + múltiplos gêneros de redação.",
      s: [
        { d: "Seg", b: ["Matemática (70min) — problemas contextualizados", "Física (70min) — resolução guiada", "Revisão (40min)"] },
        { d: "Ter", b: ["Química (70min) — orgânica e inorgânica", "Biologia (70min) — estudo dirigido", "Questões (40min)"] },
        { d: "Qua", b: ["Português (60min) — interpretação avançada", "Literatura (60min) — obras da Unicamp", "Redação (60min) — gêneros variados"] },
        { d: "Qui", b: ["História (60min)", "Geografia (60min)", "Interdisciplinar (60min)"] },
        { d: "Sex", b: ["Simulado Unicamp (120min) — 30 questões", "Correção analítica (60min)"] },
        { d: "Sáb", b: ["Aprofundamento (90min)", "Literatura analítica (60min)"] },
        { d: "Dom", b: ["Descanso ativo", "Planejamento (15min)"] }
      ],
      di: ["Unicamp cobra redação em diferentes gêneros: carta, artigo, dissertação", "Literatura: leia as obras indicadas com anotações", "Questões exigem justificativa — treine a argumentação escrita", "Provas antigas são o melhor material"],
      re: "Sexta = simulado. Último sábado = prova antiga completa."
    },
    4: {
      t: "Unicamp — 4h+/dia",
      f: "Preparação completa: cobertura profunda + múltiplos gêneros + questões analíticas.",
      s: [
        { d: "Seg", b: ["Matemática (80min)", "Física (80min)", "Revisão (40min)", "Atualidades (40min)"] },
        { d: "Ter", b: ["Química (80min)", "Biologia (80min)", "Redação (40min)", "Revisão (40min)"] },
        { d: "Qua", b: ["Português (60min)", "Literatura (80min) — análise profunda", "História (60min)", "Geografia (40min)"] },
        { d: "Qui", b: ["Matéria fraca intensiva (100min)", "Interdisciplinar (60min)", "Provas antigas (80min)"] },
        { d: "Sex", b: ["Simulado (150min)", "Correção (60min)", "Reescrever redação (30min)"] },
        { d: "Sáb", b: ["Aprofundamento (90min)", "Literatura (60min)", "Prova antiga (60min)"] },
        { d: "Dom", b: ["Descanso", "Planejamento (20min)"] }
      ],
      di: ["Unicamp cobra múltiplos gêneros de redação — domine todos", "Literatura obrigatória muda anualmente — confira", "Questões interdisciplinares são frequentes", "Refaça provas antigas até entender o padrão da banca"],
      re: "4 camadas de revisão. Sexta = simulado. Mensal = prova antiga completa."
    }
  },

  /* ═══ ITA/IME ═══ */
  "ITA/IME": {
    1: {
      t: "ITA/IME — 1h/dia",
      f: "ITA/IME são as provas mais pesadas do Brasil em exatas. 1h/dia é pouco — mas se é o que tem, foque 100% em exatas.",
      s: [
        { d: "Seg", b: ["Matemática (60min) — questão difícil + teoria"] },
        { d: "Ter", b: ["Física (60min) — mecânica ou eletromagnetismo"] },
        { d: "Qua", b: ["Química (60min) — físico-química"] },
        { d: "Qui", b: ["Matemática (60min) — geometria ou álgebra"] },
        { d: "Sex", b: ["Física (60min) — termodinâmica ou óptica"] },
        { d: "Sáb", b: ["Português + Inglês (60min) — alternando"] },
        { d: "Dom", b: ["Descanso", "Planejamento (10min)"] }
      ],
      di: ["ITA/IME exigem muito mais que 1h — considere aumentar", "Exatas são 80% da prova — priorize total", "Nível das questões é muito acima do ENEM", "Não pule Português e Inglês — eles eliminam"],
      re: "Revisão diária. Mensal: 1 questão completa do ITA/IME."
    },
    2: {
      t: "ITA/IME — 2h/dia",
      f: "2h é o mínimo pra ITA/IME. Foco total em exatas com profundidade nível vestibular militar.",
      s: [
        { d: "Seg", b: ["Matemática (70min) — álgebra ou geometria", "Física (50min) — mecânica"] },
        { d: "Ter", b: ["Física (70min) — eletromagnetismo", "Química (50min) — físico-química"] },
        { d: "Qua", b: ["Matemática (70min) — trigonometria ou números complexos", "Química (50min) — orgânica"] },
        { d: "Qui", b: ["Matéria mais fraca (90min) — sessão intensiva", "Revisão (30min)"] },
        { d: "Sex", b: ["Português (60min) — gramática avançada", "Inglês (60min) — interpretação"] },
        { d: "Sáb", b: ["Questões ITA/IME (90min) — 5 questões difíceis", "Correção detalhada (30min)"] },
        { d: "Dom", b: ["Descanso", "Planejamento (15min)"] }
      ],
      di: ["Nível ITA/IME exige teoria profunda + muitas questões", "Português do IME é gramática pesada — não subestime", "Inglês: foco em interpretação técnica", "Use coleção Fundamentos de Matemática Elementar"],
      re: "Espaçada + questões difíceis no sábado. Mensal: prova antiga."
    },
    3: {
      t: "ITA/IME — 3h/dia",
      f: "3h é o ritmo realista pra ITA/IME. Cobertura profunda + muitas questões difíceis.",
      s: [
        { d: "Seg", b: ["Matemática (80min) — teoria + questões ITA", "Física (80min) — resolução nível ITA", "Química (20min) — revisão"] },
        { d: "Ter", b: ["Matemática (70min) — álgebra/geometria", "Física (70min) — mecânica ou eletromag", "Química (40min) — exercícios"] },
        { d: "Qua", b: ["Química (80min) — físico-química profunda", "Matemática (60min) — trigonometria", "Revisão (40min)"] },
        { d: "Qui", b: ["Matéria mais fraca (120min) — intensiva", "Questões difíceis (60min)"] },
        { d: "Sex", b: ["Português (60min) — gramática avançada", "Inglês (60min) — interpretação técnica", "Revisão (60min)"] },
        { d: "Sáb", b: ["Questões ITA/IME (120min) — 10 questões", "Correção completa (60min)"] },
        { d: "Dom", b: ["Descanso ativo", "Planejamento (15min)"] }
      ],
      di: ["ITA tem 4 fases — prepare-se pra todas", "IME cobra mais geometria e álgebra linear", "Questões discursivas exigem resolução impecável", "Refaça questões erradas até acertar sem consultar"],
      re: "Diária + semanal (sábado com questões difíceis) + mensal (prova antiga)."
    },
    4: {
      t: "ITA/IME — 4h+/dia",
      f: "O ritmo sério pra passar no ITA/IME. Cobertura total + profundidade + muitas questões antigas.",
      s: [
        { d: "Seg", b: ["Matemática (90min) — teoria profunda + questões", "Física (90min) — resolução detalhada", "Química (40min)", "Revisão (40min)"] },
        { d: "Ter", b: ["Matemática (80min) — álgebra/geometria", "Física (80min) — eletromagnetismo", "Química (50min) — orgânica", "Questões mistas (30min)"] },
        { d: "Qua", b: ["Química (90min) — físico-química avançada", "Matemática (80min) — trigonometria/complexos", "Física (40min)", "Revisão (30min)"] },
        { d: "Qui", b: ["Matéria fraca intensiva (120min)", "Questões ITA/IME antigas (90min)", "Revisão (30min)"] },
        { d: "Sex", b: ["Português (60min)", "Inglês (60min)", "Simulado parcial (90min)", "Correção (30min)"] },
        { d: "Sáb", b: ["Simulado completo (180min) — uma prova inteira", "Correção detalhada (60min)"] },
        { d: "Dom", b: ["Descanso obrigatório", "Revisar erros da semana (30min)", "Planejamento (20min)"] }
      ],
      di: ["ITA/IME exigem dedicação full-time — 4h é o mínimo pra quem é sério", "Use livros específicos: Morgado, Iezzi, Halliday", "Sábado com prova completa simula o dia da prova", "Pomodoro é essencial: 50min + 10min pausa", "Não pule Português e Inglês — eles eliminam"],
      re: "Diária + 3 dias + semanal (sábado com prova completa) + mensal (prova antiga diferente)."
    }
  },

  /* ═══ ESCOLA ═══ */
  "Escola": {
    1: {
      t: "Escola — 1h/dia",
      f: "Rotação por matéria pra não deixar nada acumular. Foco em acompanhar o que tá sendo dado em aula.",
      s: [
        { d: "Seg", b: ["Matemática (60min) — refazer exercícios da aula + lista"] },
        { d: "Ter", b: ["Português (60min) — interpretação de texto + gramática"] },
        { d: "Qua", b: ["Física ou Química (60min) — resolver exercícios do tema"] },
        { d: "Qui", b: ["Biologia (60min) — leitura ativa do capítulo + esquemas"] },
        { d: "Sex", b: ["História ou Geografia (60min) — resumo + questões"] },
        { d: "Sáb", b: ["Revisão da matéria que tem prova mais próxima (30-60min)"] },
        { d: "Dom", b: ["Descanso", "Planejar a semana (10min)"] }
      ],
      di: ["Revise no mesmo dia que teve a aula — fixa muito mais", "Antes de prova: foque em exercícios, não em ler teoria", "Se acumular, pegue 1 matéria por vez"],
      re: "Diária. Antes de prova: 3 dias focados nos exercícios."
    },
    2: {
      t: "Escola — 2h/dia",
      f: "Cobrir 2 matérias por dia, alternando exatas e humanas pra não cansar.",
      s: [
        { d: "Seg", b: ["Matemática (60min) — exercícios do capítulo atual", "Português (60min) — gramática + redação curta"] },
        { d: "Ter", b: ["Física (60min) — fórmulas + 10 questões", "Biologia (60min) — leitura + mapa mental"] },
        { d: "Qua", b: ["Química (60min) — exercícios aplicados", "História (60min) — cronologia + questões"] },
        { d: "Qui", b: ["Matéria com mais dificuldade (60min) — refazer erros", "Geografia (60min) — mapas + atualidades"] },
        { d: "Sex", b: ["Inglês (60min) — interpretação de texto", "Revisão da semana (60min)"] },
        { d: "Sáb", b: ["Revisão pra prova (60min)", "Organizar caderno + resumos (60min)"] },
        { d: "Dom", b: ["Descanso", "Planejamento (15min)"] }
      ],
      di: ["Sempre alterne uma exata com uma humana", "Quinta é dia de atacar a matéria mais difícil", "Sábado é só revisão — não estude conteúdo novo"],
      re: "Diária + revisão de sábado. Antes de prova: 3 dias focados."
    },
    3: {
      t: "Escola — 3h/dia",
      f: "Acompanhar a escola com folga + começar a olhar pro vestibular.",
      s: [
        { d: "Seg", b: ["Matemática (60min) — teoria + exercícios", "Português (60min) — interpretação + gramática", "Questões de vestibular do tema (60min)"] },
        { d: "Ter", b: ["Física (60min) — fórmulas + resolução", "Química (60min) — exercícios", "Revisão da matéria mais fraca (60min)"] },
        { d: "Qua", b: ["Biologia (60min) — leitura + esquemas", "História (60min) — temático + questões", "Mini-simulado (40min) — 10 questões mistas"] },
        { d: "Qui", b: ["Matéria difícil — sessão intensiva (90min)", "Geografia (60min) — mapas + exercícios", "Revisão da semana (30min)"] },
        { d: "Sex", b: ["Inglês (60min) — interpretação", "Redação (60min) — escrever 1 texto completo", "Estudo livre da matéria que quiser (60min)"] },
        { d: "Sáb", b: ["Revisão pra prova ou aprofundamento (90min)", "Questões de vestibular do que viu na semana (60min)"] },
        { d: "Dom", b: ["Descanso", "Planejamento (15min)"] }
      ],
      di: ["Com tempo extra, comece a fazer questões de vestibular", "Quinta é o dia da matéria mais difícil", "Redação semanal já te coloca à frente"],
      re: "Diária + revisão semanal no sábado."
    },
    4: {
      t: "Escola — 4h+/dia",
      f: "Domínio total da escola + preparação séria pro vestibular.",
      s: [
        { d: "Seg", b: ["Matemática (80min) — teoria + 15 questões", "Português (60min) — gramática + literatura", "Vestibular (60min) — questões do tema da escola", "Leitura/atualidades (40min)"] },
        { d: "Ter", b: ["Física (80min) — teoria + resolução completa", "Química (60min) — orgânica ou inorgânica", "Redação (60min) — análise ou produção", "Revisão do dia anterior (40min)"] },
        { d: "Qua", b: ["Biologia (80min) — conteúdo + esquemas", "História (60min) — período + questões", "Geografia (60min) — geopolítica + atualidades", "Inglês (40min)"] },
        { d: "Qui", b: ["Matéria mais difícil — intensiva (90min)", "Revisão cruzada (60min) — conectar matérias", "Questões de vestibular (60min)", "Resumos da semana (30min)"] },
        { d: "Sex", b: ["Simulado (120min) — 30 questões mistas", "Correção analítica (60min)", "Redação completa cronometrada (60min)"] },
        { d: "Sáb", b: ["Aprofundamento da matéria mais fraca (90min)", "Revisão acumulativa do mês (60min)", "Prova antiga ou estudo livre (60min)"] },
        { d: "Dom", b: ["Descanso obrigatório", "Planejamento da semana (20min)"] }
      ],
      di: ["Use Pomodoro: 50min + 10min de pausa", "Não estude mais de 2h seguidas na mesma matéria", "Domingo é sagrado — descanso é parte do treino", "Simulado toda sexta cria o hábito de prova"],
      re: "Diária + semanal (sexta) + mensal (último sábado)."
    }
  }
};

// Função pra pegar o plano certo baseado no foco e horas
function getPlano(foco, horas) {
  const fk = foco === "Outro vestibular" ? "ENEM" : (PLANOS[foco] ? foco : "Escola");
  const hk = { "1 hora": 1, "2 horas": 2, "3 horas": 3, "4+ horas": 4 }[horas] || 2;
  return PLANOS[fk][hk];
}

window.NORTE_PLANOS = { PLANOS, getPlano };
