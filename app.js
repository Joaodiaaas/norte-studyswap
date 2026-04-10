// ═══════════════════════════════════════════════════════════════
// NORTE - App Principal
// ═══════════════════════════════════════════════════════════════

/* ═══ STATE ═══ */
const state = {
  screen: 'paywall', // paywall | login | chat | admin
  loading: true,
  email: '',
  emailError: '',
  chatStep: 0,
  respostas: {},
  multiSel: [],
  messages: [],
  showPlan: false,
  checkinPhase: 0,
  checkinCount: 0,
  typing: false,
  inputText: '',
  showMenu: false,
  showAdminPrompt: false,
  adminPin: '',
  toast: ''
};

let typingTimeout = null;
let toastTimeout = null;

/* ═══ DIAGNÓSTICO ═══ */
const DIAG = [
  { id: "nome", pergunta: "Primeiro, como posso te chamar?", tipo: "texto" },
  { id: "serie", pergunta: null, opcoes: ["1º ano", "2º ano", "3º ano", "Cursinho"], tipo: "opcoes" },
  { id: "foco", pergunta: "Seu foco é escola ou vestibular?", opcoes: ["Escola", "UFMG Seriado", "ENEM", "Fuvest", "Unicamp", "ITA/IME"], tipo: "opcoes" },
  { id: "dificuldade", pergunta: "Quais matérias você sente mais dificuldade? Pode escolher várias ou digitar.", opcoes: ["Matemática", "Física", "Química", "Biologia", "Português", "História", "Geografia", "Inglês"], tipo: "multi" },
  { id: "rotina", pergunta: "Como tá sua rotina de estudos hoje?", opcoes: ["Estudo todo dia", "Só antes de prova", "Tô perdido", "Quase não estudo"], tipo: "opcoes" },
  { id: "horas", pergunta: "Quantas horas por dia você consegue estudar (fora da escola)?", opcoes: ["1 hora", "2 horas", "3 horas", "4+ horas"], tipo: "opcoes" },
  { id: "sentimento", pergunta: "E como você se sente em relação aos estudos?", opcoes: ["Tranquilo", "Um pouco perdido", "Atrasado", "Muito ansioso"], tipo: "opcoes" }
];

const PAYWALL_PLANS = [
  { nome: "Mensal", preco: "R$ 19,90/mês", destaque: false, desc: "Cancele quando quiser", key: "mensal" },
  { nome: "Trimestral", preco: "R$ 14,90/mês", destaque: true, desc: "Economize 25% — mais popular", key: "trimestral" },
  { nome: "Anual", preco: "R$ 9,90/mês", destaque: false, desc: "Melhor custo-benefício", key: "anual" }
];

const CK2R = {
  keep: "Show! Mantendo o plano. Bora! 💪",
  time: "Melhor 30min todo dia do que 3h uma vez por semana.",
  tired: "Nos dias pesados, 20min de flashcards já conta.",
  motiv: "Motivação vai e volta — o hábito segura. Tenta 10min amanhã.",
  lost: "Amanhã: só 1 matéria, 30min. Depois a gente aumenta.",
  adjust: "Vou redistribuir os blocos pra encaixar melhor.",
  gen: "Vou adaptar o plano. Qualquer progresso conta."
};

/* ═══ STORAGE (Supabase + localStorage fallback) ═══ */
async function saveUserData() {
  if (!state.email) return;

  const data = {
    email: state.email,
    nome: state.respostas.nome,
    serie: state.respostas.serie,
    foco: state.respostas.foco,
    dificuldade: state.respostas.dificuldade,
    rotina: state.respostas.rotina,
    horas: state.respostas.horas,
    sentimento: state.respostas.sentimento,
    checkins: state.checkinCount,
    plano_json: JSON.stringify({ messages: state.messages.slice(-100), chatStep: state.chatStep, showPlan: state.showPlan, checkinPhase: state.checkinPhase }),
    ultimo_acesso: new Date().toISOString()
  };

  // Supabase (produção)
  if (window.NORTE_CONFIG?.supabaseReady) {
    try {
      const { error } = await window.NORTE_CONFIG.supabase
        .from('usuarios')
        .upsert(data, { onConflict: 'email' });
      if (error) console.error('Supabase save error:', error);
    } catch (e) { console.error(e); }
  }

  // localStorage (sempre, como backup)
  try {
    localStorage.setItem('norte-user-data', JSON.stringify({
      email: state.email,
      respostas: state.respostas,
      messages: state.messages.slice(-100),
      chatStep: state.chatStep,
      showPlan: state.showPlan,
      checkinPhase: state.checkinPhase,
      checkinCount: state.checkinCount
    }));
  } catch (e) {}
}

async function loadUserData() {
  // Tenta Supabase primeiro (se tiver email salvo no localStorage)
  try {
    const localData = localStorage.getItem('norte-user-data');
    if (!localData) return null;
    const parsed = JSON.parse(localData);

    if (window.NORTE_CONFIG?.supabaseReady && parsed.email) {
      const { data, error } = await window.NORTE_CONFIG.supabase
        .from('usuarios')
        .select('*')
        .eq('email', parsed.email)
        .single();

      if (data && !error) {
        const planoData = data.plano_json ? JSON.parse(data.plano_json) : {};
        return {
          email: data.email,
          respostas: {
            nome: data.nome, serie: data.serie, foco: data.foco,
            dificuldade: data.dificuldade, rotina: data.rotina,
            horas: data.horas, sentimento: data.sentimento
          },
          messages: planoData.messages || [],
          chatStep: planoData.chatStep || 0,
          showPlan: planoData.showPlan || false,
          checkinPhase: planoData.checkinPhase || 0,
          checkinCount: data.checkins || 0
        };
      }
    }

    // Fallback: só localStorage
    return parsed;
  } catch (e) { return null; }
}

async function clearUserData() {
  localStorage.removeItem('norte-user-data');
}

async function getAllUsers() {
  if (!window.NORTE_CONFIG?.supabaseReady) {
    // Fallback: retorna apenas o usuário local
    const data = localStorage.getItem('norte-user-data');
    if (!data) return [];
    const parsed = JSON.parse(data);
    return [{
      email: parsed.email,
      nome: parsed.respostas?.nome || '—',
      serie: parsed.respostas?.serie || '—',
      foco: parsed.respostas?.foco || '—',
      horas: parsed.respostas?.horas || '—',
      dificuldade: parsed.respostas?.dificuldade || '—',
      rotina: parsed.respostas?.rotina || '—',
      sentimento: parsed.respostas?.sentimento || '—',
      checkins: parsed.checkinCount || 0,
      criado_em: new Date().toISOString(),
      ultimo_acesso: new Date().toISOString()
    }];
  }

  try {
    const { data, error } = await window.NORTE_CONFIG.supabase
      .from('usuarios')
      .select('*')
      .order('criado_em', { ascending: false });
    if (error) { console.error(error); return []; }
    return data || [];
  } catch (e) { return []; }
}

/* ═══ HELPERS ═══ */
function getTrans(step, r, nQ) {
  const n = r.nome || "você";
  switch (step) {
    case 1: return [`Prazer, ${n}! Bora montar teu plano.`, `${n}, qual ano do Ensino Médio você tá?`];
    case 2: return ["Anotado!", nQ.pergunta];
    case 3: {
      const f = r.foco;
      let label = "Entendi seu foco!";
      if (f === "UFMG Seriado") label = "UFMG seriado é sobre constância — vou priorizar isso.";
      else if (f === "ENEM") label = "ENEM exige equilíbrio entre áreas — vou considerar isso.";
      else if (f === "Fuvest") label = "Fuvest cobra profundidade — vou focar nisso.";
      else if (f === "Unicamp") label = "Unicamp valoriza interpretação — vou trabalhar isso.";
      else if (f === "ITA/IME") label = "ITA/IME exigem dedicação pesada em exatas. Bora!";
      return [label, nQ.pergunta];
    }
    case 4: return ["Beleza, vou priorizar essas.", nQ.pergunta];
    case 5: return ["Show, entendi sua rotina.", nQ.pergunta];
    case 6: return ["Quase lá! Última pergunta.", nQ.pergunta];
    default: return [nQ.pergunta];
  }
}

function aCk1(t) {
  const l = t.toLowerCase();
  if (l.includes("sim") || l.includes("tudo") || l.includes("consegui")) return "pos";
  if (l.includes("quase")) return "alm";
  return "neg";
}

function aCk2(t) {
  const l = t.toLowerCase();
  if (l.includes("manter") || l.includes("mesmo")) return "keep";
  if (l.includes("tempo") || l.includes("horário")) return "time";
  if (l.includes("cansa") || l.includes("energia")) return "tired";
  if (l.includes("motiv") || l.includes("vontade")) return "motiv";
  if (l.includes("começ") || l.includes("perdid")) return "lost";
  if (l.includes("ajust") || l.includes("mudar")) return "adjust";
  return "gen";
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function validateEmail(e) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim());
}

function showToast(msg) {
  state.toast = msg;
  render();
  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => { state.toast = ''; render(); }, 3000);
}

/* ═══ CHAT LOGIC ═══ */
function addNorteMsgs(msgs, delay = 800) {
  state.typing = true;
  render();
  if (typingTimeout) clearTimeout(typingTimeout);
  typingTimeout = setTimeout(() => {
    msgs.forEach(t => state.messages.push({ from: 'norte', text: t }));
    state.typing = false;
    saveUserData();
    render();
  }, delay);
}

function advanceStep(answer) {
  const currentQ = DIAG[state.chatStep];
  if (!currentQ) return;

  state.respostas[currentQ.id] = answer;
  state.messages.push({ from: 'aluno', text: answer });
  state.multiSel = [];
  state.inputText = '';

  const next = state.chatStep + 1;

  if (next < DIAG.length) {
    const nextQ = DIAG[next];
    const msgs = getTrans(next, state.respostas, nextQ).filter(Boolean);
    addNorteMsgs(msgs);
    state.chatStep = next;
  } else {
    // Generate plan
    const n = state.respostas.nome || "você";
    state.chatStep = 99;
    state.typing = true;
    render();

    typingTimeout = setTimeout(() => {
      state.messages.push({ from: 'norte', text: `Entendi teu cenário, ${n}! Montando seu plano...` });
      render();

      typingTimeout = setTimeout(() => {
        state.messages.push({ from: 'norte', text: `Pronto, ${n}! Seu plano 👇` });
        state.messages.push({ from: 'norte', text: "Não precisa ser perfeito, só precisa continuar." });
        state.showPlan = true;
        state.typing = false;
        state.chatStep = 100;
        saveUserData();
        render();
      }, 2000);
    }, 1000);
  }

  render();
}

function handleOptionClick(opt) {
  const currentQ = DIAG[state.chatStep];
  if (!currentQ) return;

  if (currentQ.tipo === 'multi') {
    if (state.multiSel.includes(opt)) {
      state.multiSel = state.multiSel.filter(x => x !== opt);
    } else {
      state.multiSel.push(opt);
    }
    render();
  } else {
    advanceStep(opt);
  }
}

function confirmMulti() {
  if (state.multiSel.length === 0) return;
  advanceStep(state.multiSel.join(', '));
}

function handleSend() {
  const text = state.inputText.trim();
  if (!text) return;

  if (state.checkinPhase === 1 || state.checkinPhase === 2) {
    respondCheckin(text);
    state.inputText = '';
    render();
    return;
  }

  const currentQ = DIAG[state.chatStep];
  if (!currentQ || state.chatStep >= DIAG.length) {
    state.messages.push({ from: 'aluno', text });
    const nome = state.respostas.nome || 'Ei';
    addNorteMsgs([`${nome}, usa o botão de check-in pra atualizar seu progresso!`]);
    state.inputText = '';
    render();
    return;
  }

  if (currentQ.id === 'nome' && text.length < 2) {
    showToast('Digite pelo menos 2 letras');
    return;
  }

  advanceStep(text);
}

function startCheckin() {
  state.checkinPhase = 1;
  const nome = state.respostas.nome || 'você';
  state.messages.push({
    from: 'norte',
    text: `E aí, ${nome}! Check-in #${state.checkinCount + 1} ⏰ Conseguiu seguir o plano?`
  });
  saveUserData();
  render();
}

function respondCheckin(resp) {
  state.messages.push({ from: 'aluno', text: resp });
  state.inputText = '';

  if (state.checkinPhase === 1) {
    const r = aCk1(resp);
    const nome = state.respostas.nome || 'você';

    state.typing = true;
    render();

    typingTimeout = setTimeout(() => {
      if (r === 'pos') {
        state.messages.push({ from: 'norte', text: `Demais, ${nome}! 🔥 Esse ritmo faz diferença.` });
        state.messages.push({ from: 'norte', text: 'Quer manter ou ajustar?' });
      } else if (r === 'alm') {
        state.messages.push({ from: 'norte', text: `Muito bom, ${nome}! Quase tudo já é progresso. O que faltou?` });
      } else {
        state.messages.push({ from: 'norte', text: 'Tranquilo. Me conta: o que mais atrapalhou?' });
      }
      state.typing = false;
      state.checkinPhase = 2;
      saveUserData();
      render();
    }, 800);
  } else if (state.checkinPhase === 2) {
    const t = aCk2(resp);
    state.typing = true;
    render();

    typingTimeout = setTimeout(() => {
      state.messages.push({ from: 'norte', text: CK2R[t] });
      state.messages.push({ from: 'norte', text: 'Não precisa ser perfeito, só precisa continuar. 🧭' });
      state.typing = false;
      state.checkinPhase = 3;
      state.checkinCount++;
      saveUserData();
      render();
    }, 1000);
  }

  render();
}

function resetCheckin() {
  state.checkinPhase = 0;
  const nome = state.respostas.nome || 'você';
  state.messages.push({ from: 'norte', text: `Bora pra mais uma semana, ${nome}!` });
  saveUserData();
  render();
}

async function logout() {
  await clearUserData();
  state.screen = 'paywall';
  state.messages = [];
  state.respostas = {};
  state.chatStep = 0;
  state.showPlan = false;
  state.checkinPhase = 0;
  state.checkinCount = 0;
  state.email = '';
  state.showMenu = false;
  render();
}

function handleLogin() {
  const v = state.email.trim();
  if (!v) { state.emailError = 'Digite seu email'; render(); return; }
  if (!validateEmail(v)) { state.emailError = 'Email inválido'; render(); return; }
  state.emailError = '';
  state.screen = 'chat';
  render();
  startWelcome();
}

function tryAdmin() {
  if (state.adminPin === window.NORTE_CONFIG.adminPin) {
    state.showAdminPrompt = false;
    state.adminPin = '';
    state.screen = 'admin';
    state.showMenu = false;
    render();
  } else {
    showToast('PIN incorreto');
    state.adminPin = '';
    render();
  }
}

function startWelcome() {
  if (state.messages.length > 0) return;
  state.typing = true;
  render();

  typingTimeout = setTimeout(() => {
    state.messages = [
      { from: 'norte', text: 'Fala! Eu sou o NORTE, seu mentor de estudos da StudySwap. 🧭' },
      { from: 'norte', text: 'Não sou professor — meu papel é te ajudar a organizar sua rotina e manter a consistência.' },
      { from: 'norte', text: 'Primeiro, como posso te chamar?' }
    ];
    state.typing = false;
    render();
  }, 1200);
}

/* ═══ RENDER ═══ */
function render() {
  const app = document.getElementById('app');

  if (state.loading) {
    app.innerHTML = `<div class="loading-screen"><div class="spinner"></div></div>`;
    return;
  }

  if (state.screen === 'paywall') { renderPaywall(app); return; }
  if (state.screen === 'login') { renderLogin(app); return; }
  if (state.screen === 'admin') { renderAdmin(app); return; }
  if (state.screen === 'chat') { renderChat(app); return; }
}

function renderPaywall(app) {
  const plansHtml = PAYWALL_PLANS.map(p => `
    <div class="plan-card ${p.destaque ? 'featured' : ''}" data-plan="${p.key}">
      ${p.destaque ? '<div class="plan-badge">POPULAR</div>' : ''}
      <div>
        <div class="plan-name">${p.nome}</div>
        <div class="plan-desc">${p.desc}</div>
      </div>
      <div class="plan-price">${p.preco}</div>
    </div>
  `).join('');

  app.innerHTML = `
    <div class="paywall">
      <div class="paywall-hero">
        <div class="logo-box">N</div>
        <h1>NORTE</h1>
        <p class="brand-tag">por StudySwap</p>
        <p class="paywall-desc">Seu mentor de estudos pessoal.</p>
      </div>
      <div class="features-grid">
        <div class="feature"><span>📋</span><span>Plano personalizado</span></div>
        <div class="feature"><span>🔄</span><span>Check-ins semanais</span></div>
        <div class="feature"><span>🎯</span><span>Foco no vestibular</span></div>
        <div class="feature"><span>💾</span><span>Salva progresso</span></div>
      </div>
      <div class="plans">${plansHtml}</div>
      <button class="cta-btn" id="cta-btn">Começar agora</button>
      <p class="cta-sub">7 dias grátis • Cancele a qualquer momento</p>
    </div>
  `;

  // Click nos planos redireciona pro Mercado Pago (se configurado) ou vai pro login
  document.querySelectorAll('.plan-card').forEach(card => {
    card.addEventListener('click', () => {
      const planKey = card.dataset.plan;
      const mpLink = window.NORTE_CONFIG?.mpLinks?.[planKey];
      if (mpLink) {
        window.open(mpLink, '_blank');
      } else {
        state.screen = 'login';
        render();
      }
    });
  });

  document.getElementById('cta-btn').addEventListener('click', () => {
    state.screen = 'login';
    render();
  });
}

function renderLogin(app) {
  app.innerHTML = `
    <div class="login-screen">
      <div class="login-box">
        <div class="login-logo">N</div>
        <h2>Entre no NORTE</h2>
        <p>Seu email pra salvar seu progresso</p>
        <input type="email" class="input-field ${state.emailError ? 'error' : ''}"
          id="email-input" placeholder="seu@email.com" value="${escapeHtml(state.email)}">
        ${state.emailError ? `<p class="input-error">${state.emailError}</p>` : ''}
        <button class="login-btn" id="login-btn">Entrar</button>
        <button class="back-btn" id="back-btn">← Voltar</button>
      </div>
    </div>
  `;

  const emailInput = document.getElementById('email-input');
  emailInput.focus();
  emailInput.addEventListener('input', (e) => {
    state.email = e.target.value;
    state.emailError = '';
  });
  emailInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleLogin();
  });
  document.getElementById('login-btn').addEventListener('click', handleLogin);
  document.getElementById('back-btn').addEventListener('click', () => {
    state.screen = 'paywall';
    render();
  });
}

function renderChat(app) {
  const currentQ = state.chatStep < DIAG.length ? DIAG[state.chatStep] : null;
  const showOpts = currentQ && currentQ.tipo !== 'texto' && state.chatStep < DIAG.length && !state.typing && state.messages.length > 0;
  const plano = state.showPlan ? window.NORTE_PLANOS.getPlano(state.respostas.foco, state.respostas.horas) : null;

  const messagesHtml = state.messages.map(m => `
    <div class="msg ${m.from}">
      <div class="msg-bubble">${escapeHtml(m.text)}</div>
    </div>
  `).join('');

  const typingHtml = state.typing ? `
    <div class="typing">
      <div class="typing-bubble">
        <span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>
      </div>
    </div>
  ` : '';

  const planHtml = plano ? `
    <div class="plan-display">
      <h3>${escapeHtml(plano.t)}</h3>
      <p class="plan-philosophy">${escapeHtml(plano.f)}</p>
      ${plano.s.map(d => `
        <div class="day-block ${d.d === 'Dom' ? 'rest' : d.d === 'Sáb' ? 'weekend' : ''}">
          <div class="day-name">${d.d}</div>
          ${d.b.map(b => `<div class="day-task">→ ${escapeHtml(b)}</div>`).join('')}
        </div>
      `).join('')}
      <div class="tips-box">
        <div class="tips-box-title">💡 DICAS</div>
        ${plano.di.map(d => `<p>• ${escapeHtml(d)}</p>`).join('')}
      </div>
      <div class="review-box">
        <div class="review-box-title">🔄 REVISÃO</div>
        <p>${escapeHtml(plano.re)}</p>
      </div>
    </div>
  ` : '';

  let bottomControlsHtml = '';

  if (showOpts) {
    const optsHtml = currentQ.opcoes.map(o => {
      const sel = currentQ.tipo === 'multi' && state.multiSel.includes(o);
      return `<button class="opt-btn ${sel ? 'selected' : ''}" data-opt="${escapeHtml(o)}">${escapeHtml(o)}</button>`;
    }).join('');
    bottomControlsHtml += `
      <div class="quick-options">${optsHtml}</div>
      ${currentQ.tipo === 'multi' && state.multiSel.length > 0 ?
        `<button class="confirm-btn" id="confirm-multi-btn">Confirmar (${state.multiSel.length})</button>` : ''}
      <p class="hint-text">ou digite abaixo</p>
    `;
  }

  if (state.chatStep === 100 && state.checkinPhase === 0 && !state.typing) {
    bottomControlsHtml += `
      <button class="checkin-btn" id="start-checkin-btn">⏰ Check-in ${state.checkinCount > 0 ? '#' + (state.checkinCount + 1) : ''}</button>
    `;
  }

  if (state.checkinPhase === 1 && !state.typing) {
    const ckOpts = ['Sim, segui tudo!', 'Quase tudo', 'Não consegui'];
    bottomControlsHtml += `
      <div class="quick-options">
        ${ckOpts.map(o => `<button class="opt-btn ck-btn" data-opt="${escapeHtml(o)}">${escapeHtml(o)}</button>`).join('')}
      </div>
      <p class="hint-text">ou digite abaixo</p>
    `;
  }

  if (state.checkinPhase === 2 && !state.typing) {
    const ckOpts = ['Manter o plano', 'Falta de tempo', 'Cansaço', 'Perdi a motivação'];
    bottomControlsHtml += `
      <div class="quick-options">
        ${ckOpts.map(o => `<button class="opt-btn ck-btn" data-opt="${escapeHtml(o)}">${escapeHtml(o)}</button>`).join('')}
      </div>
      <p class="hint-text">ou digite abaixo</p>
    `;
  }

  if (state.checkinPhase === 3 && !state.typing) {
    bottomControlsHtml += `
      <div class="checkin-done">
        <p>✅ Check-in #${state.checkinCount} concluído</p>
        <button class="next-week-btn" id="next-week-btn">Próxima semana →</button>
      </div>
    `;
  }

  if (!state.typing) {
    bottomControlsHtml += `
      <div class="input-row">
        <input type="text" class="text-input" id="text-input"
          placeholder="Digite sua resposta..." value="${escapeHtml(state.inputText)}">
        <button class="send-btn ${state.inputText.trim() ? 'active' : ''}" id="send-btn">↑</button>
      </div>
    `;
  }

  const menuHtml = state.showMenu ? `
    <div class="menu-dropdown">
      <div class="menu-header">
        <div class="menu-label">Logado como</div>
        <div class="menu-value">${escapeHtml(state.email)}</div>
      </div>
      ${state.checkinCount > 0 ? `
        <div class="menu-header">
          <div class="menu-label">Check-ins</div>
          <div class="menu-value highlight">${state.checkinCount}</div>
        </div>
      ` : ''}
      <button class="menu-btn-item gold" id="admin-btn">🔒 Painel Admin</button>
      <button class="menu-btn-item red" id="logout-btn">Sair</button>
    </div>
  ` : '';

  const adminPromptHtml = state.showAdminPrompt ? `
    <div class="modal-overlay" id="modal-overlay">
      <div class="modal-box" id="modal-box">
        <h3>🔒 Acesso Admin</h3>
        <input type="password" class="pin-input" id="pin-input"
          placeholder="PIN" maxlength="10" value="${state.adminPin}">
        <button class="modal-submit" id="pin-submit">Entrar</button>
      </div>
    </div>
  ` : '';

  const toastHtml = state.toast ? `<div class="toast">${escapeHtml(state.toast)}</div>` : '';

  app.innerHTML = `
    <div class="chat-screen">
      ${toastHtml}
      ${adminPromptHtml}
      <div class="header">
        <div class="header-left">
          <div class="header-logo">N</div>
          <div>
            <div class="header-title">NORTE</div>
            <div class="header-status">online agora</div>
          </div>
        </div>
        <button class="menu-btn" id="menu-btn">⋮</button>
        ${menuHtml}
      </div>
      <div class="messages-container" id="messages-container">
        ${messagesHtml}
        ${typingHtml}
        ${planHtml}
      </div>
      <div class="input-area">
        ${bottomControlsHtml}
      </div>
    </div>
  `;

  // Event listeners
  document.getElementById('menu-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    state.showMenu = !state.showMenu;
    render();
  });

  if (state.showMenu) {
    document.getElementById('admin-btn').addEventListener('click', () => {
      state.showAdminPrompt = true;
      state.showMenu = false;
      render();
    });
    document.getElementById('logout-btn').addEventListener('click', logout);
    document.getElementById('messages-container').addEventListener('click', () => {
      state.showMenu = false;
      render();
    });
  }

  if (state.showAdminPrompt) {
    const pinInput = document.getElementById('pin-input');
    pinInput.focus();
    pinInput.addEventListener('input', (e) => { state.adminPin = e.target.value; });
    pinInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') tryAdmin(); });
    document.getElementById('pin-submit').addEventListener('click', tryAdmin);
    document.getElementById('modal-overlay').addEventListener('click', () => {
      state.showAdminPrompt = false;
      state.adminPin = '';
      render();
    });
    document.getElementById('modal-box').addEventListener('click', (e) => e.stopPropagation());
  }

  // Quick options
  document.querySelectorAll('.opt-btn:not(.ck-btn)').forEach(btn => {
    btn.addEventListener('click', () => handleOptionClick(btn.dataset.opt));
  });

  document.querySelectorAll('.ck-btn').forEach(btn => {
    btn.addEventListener('click', () => respondCheckin(btn.dataset.opt));
  });

  const confirmBtn = document.getElementById('confirm-multi-btn');
  if (confirmBtn) confirmBtn.addEventListener('click', confirmMulti);

  const startCkBtn = document.getElementById('start-checkin-btn');
  if (startCkBtn) startCkBtn.addEventListener('click', startCheckin);

  const nextWeekBtn = document.getElementById('next-week-btn');
  if (nextWeekBtn) nextWeekBtn.addEventListener('click', resetCheckin);

  const textInput = document.getElementById('text-input');
  if (textInput) {
    if (!state.showAdminPrompt) textInput.focus();
    textInput.addEventListener('input', (e) => {
      state.inputText = e.target.value;
      document.getElementById('send-btn').classList.toggle('active', !!e.target.value.trim());
    });
    textInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    });
  }

  const sendBtn = document.getElementById('send-btn');
  if (sendBtn) sendBtn.addEventListener('click', handleSend);

  // Scroll to bottom
  const container = document.getElementById('messages-container');
  if (container) container.scrollTop = container.scrollHeight;
}

async function renderAdmin(app) {
  app.innerHTML = `
    <div class="admin-screen">
      <div class="header">
        <div class="header-left">
          <button class="back-icon-btn" id="back-admin-btn">←</button>
          <div>
            <div class="header-title">NORTE ADMIN</div>
            <div class="header-status" style="color: var(--red);">acesso restrito</div>
          </div>
        </div>
      </div>
      <div class="admin-body" id="admin-body">
        <p style="color: var(--muted); text-align: center; padding: 20px;">Carregando...</p>
      </div>
    </div>
  `;

  document.getElementById('back-admin-btn').addEventListener('click', () => {
    state.screen = 'chat';
    render();
  });

  const users = await getAllUsers();
  const stats = {
    total: users.length,
    ativos: users.length,
    comCheckin: users.filter(u => (u.checkins || 0) > 0).length,
    totalCheckins: users.reduce((s, u) => s + (u.checkins || 0), 0)
  };

  const focoCount = {};
  users.forEach(u => { focoCount[u.foco] = (focoCount[u.foco] || 0) + 1; });

  const statsHtml = `
    <div class="stats-grid">
      <div class="stat-card"><div class="stat-value" style="color: var(--green);">${stats.total}</div><div class="stat-label">Total alunos</div></div>
      <div class="stat-card"><div class="stat-value" style="color: var(--blue);">${stats.ativos}</div><div class="stat-label">Ativos</div></div>
      <div class="stat-card"><div class="stat-value" style="color: var(--gold);">${stats.comCheckin}</div><div class="stat-label">Com check-in</div></div>
      <div class="stat-card"><div class="stat-value" style="color: var(--pink);">${stats.totalCheckins}</div><div class="stat-label">Total check-ins</div></div>
    </div>
  `;

  const focoHtml = Object.keys(focoCount).length > 0 ? `
    <div class="foco-box">
      <div class="foco-title">POR FOCO</div>
      ${Object.entries(focoCount).sort((a, b) => b[1] - a[1]).map(([f, c]) => `
        <div class="foco-row">
          <span class="foco-row-label">${escapeHtml(f || '—')}</span>
          <div class="foco-row-right">
            <div class="foco-bar" style="width: ${Math.max(20, (c / stats.total) * 120)}px;"></div>
            <span class="foco-count">${c}</span>
          </div>
        </div>
      `).join('')}
    </div>
  ` : '';

  const usersHtml = users.length === 0 ?
    '<p style="color: var(--muted-2); font-size: 13px; text-align: center; padding: 20px;">Nenhum aluno ainda.</p>' :
    users.map(u => `
      <div class="user-card">
        <div class="user-head">
          <div>
            <div class="user-name">${escapeHtml(u.nome || '—')}</div>
            <div class="user-email">${escapeHtml(u.email)}</div>
          </div>
          ${(u.checkins || 0) > 0 ? `<span class="checkin-badge">${u.checkins} check-in${u.checkins > 1 ? 's' : ''}</span>` : ''}
        </div>
        <div class="user-tags">
          <span class="user-tag" style="color: var(--text-4);">${escapeHtml(u.serie || '—')}</span>
          <span class="user-tag" style="color: var(--green);">${escapeHtml(u.foco || '—')}</span>
          <span class="user-tag" style="color: var(--gold);">${escapeHtml(u.horas || '—')}</span>
        </div>
      </div>
    `).join('');

  document.getElementById('admin-body').innerHTML = statsHtml + focoHtml + `
    <div style="color: var(--muted); font-size: 12px; font-weight: 600; margin-bottom: 8px;">
      ${users.length} ALUNO${users.length !== 1 ? 'S' : ''}
    </div>
    ${usersHtml}
  `;
}

/* ═══ INIT ═══ */
async function init() {
  const saved = await loadUserData();
  if (saved?.email) {
    state.email = saved.email;
    state.respostas = saved.respostas || {};
    state.messages = saved.messages || [];
    state.chatStep = saved.chatStep ?? 0;
    state.showPlan = saved.showPlan || false;
    state.checkinPhase = saved.checkinPhase ?? 0;
    state.checkinCount = saved.checkinCount ?? 0;
    state.screen = 'chat';
  }
  state.loading = false;
  render();

  if (state.screen === 'chat' && state.messages.length === 0) {
    startWelcome();
  }
}

// Click outside menu to close
document.addEventListener('click', (e) => {
  if (state.showMenu && !e.target.closest('.menu-dropdown') && !e.target.closest('#menu-btn')) {
    state.showMenu = false;
    render();
  }
});

init();
