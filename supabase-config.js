// ═══════════════════════════════════════════════════════════════
// CONFIGURAÇÃO DO SUPABASE
// ═══════════════════════════════════════════════════════════════
//
// INSTRUÇÕES:
// 1. Crie uma conta em https://supabase.com
// 2. Crie um novo projeto
// 3. Vá em Settings → API
// 4. Copie a "Project URL" e a "anon public" key
// 5. Cole abaixo, substituindo os valores de exemplo
// 6. Salve o arquivo
//
// ATENÇÃO: A "anon key" é segura pra usar no frontend.
// NUNCA use a "service_role key" aqui!
// ═══════════════════════════════════════════════════════════════

const SUPABASE_URL = 'https://wwhbuwrqwrdjzjpdutqj.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_ZqTTV7dyANROZihp754a7A_tAScPFLA';

// PIN do Admin (mude pra algo que só você sabe)
const ADMIN_PIN = 'StudySwapNorteIFPJM2711';

// Links do Mercado Pago (gerados ao criar os planos de assinatura)
// Deixe vazio ('') se ainda não configurou
const MP_LINKS = {
  mensal: '',
  trimestral: '',
  anual: ''
};

// ═══════════════════════════════════════════════════════════════
// NÃO MEXA DAQUI PRA BAIXO
// ═══════════════════════════════════════════════════════════════

const supabaseReady = SUPABASE_URL !== 'COLE_SUA_URL_AQUI' && SUPABASE_ANON_KEY !== 'COLE_SUA_ANON_KEY_AQUI';
let supabaseClient = null;

if (supabaseReady) {
  supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  console.log('✅ Supabase conectado');
} else {
  console.warn('⚠️ Supabase não configurado. Edite o arquivo supabase-config.js');
}

// Exporta pra usar no app.js
window.NORTE_CONFIG = {
  supabase: supabaseClient,
  supabaseReady,
  adminPin: ADMIN_PIN,
  mpLinks: MP_LINKS
};
