-- ═══════════════════════════════════════════════════════════════
-- NORTE - Setup do Banco de Dados Supabase
-- ═══════════════════════════════════════════════════════════════
-- INSTRUÇÕES:
-- 1. Acesse seu projeto no Supabase (supabase.com)
-- 2. Vá em "SQL Editor" no menu lateral
-- 3. Cole TODO este código
-- 4. Clique em "Run" (ou Ctrl+Enter)
-- 5. Pronto! O banco está configurado.
-- ═══════════════════════════════════════════════════════════════

-- Tabela principal de usuários
CREATE TABLE IF NOT EXISTS usuarios (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  nome TEXT,
  serie TEXT,
  foco TEXT,
  dificuldade TEXT,
  rotina TEXT,
  horas TEXT,
  sentimento TEXT,
  checkins INTEGER DEFAULT 0,
  plano_json TEXT,
  pagamento_status TEXT DEFAULT 'ativo',
  pagamento_id TEXT,
  criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ultimo_acesso TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índice pra buscas rápidas por email
CREATE INDEX IF NOT EXISTS idx_usuarios_email ON usuarios(email);

-- Habilita Row Level Security (segurança)
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;

-- Política: qualquer um pode inserir (criar conta)
DROP POLICY IF EXISTS "permitir_insert" ON usuarios;
CREATE POLICY "permitir_insert" ON usuarios
  FOR INSERT WITH CHECK (true);

-- Política: qualquer um pode ler/atualizar (no MVP, é controlado pelo email no frontend)
-- IMPORTANTE: Em produção real, use Auth do Supabase pra restringir por usuário
DROP POLICY IF EXISTS "permitir_select" ON usuarios;
CREATE POLICY "permitir_select" ON usuarios
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "permitir_update" ON usuarios;
CREATE POLICY "permitir_update" ON usuarios
  FOR UPDATE USING (true);

-- ═══════════════════════════════════════════════════════════════
-- PRONTO! O banco tá configurado.
-- Agora é só pegar a URL e a anon key em Settings → API
-- e colar no arquivo supabase-config.js
-- ═══════════════════════════════════════════════════════════════
