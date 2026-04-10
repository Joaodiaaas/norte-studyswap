# norte-studyswap
🧭 NORTE — Mentor de Estudos por StudySwap
Sistema de mentoria acadêmica focado em organização, rotina e acompanhamento de estudos. Adaptado pra UFMG Seriado, ENEM, Fuvest, Unicamp, ITA/IME e provas escolares.

📋 O que você precisa antes de começar
Uma conta no GitHub (grátis) — github.com
Uma conta no Supabase (grátis) — supabase.com
Uma conta na Vercel (grátis) — vercel.com
Uma conta no Mercado Pago — mercadopago.com.br
Um navegador (qualquer um)
Tempo total estimado: ~1 hora

Não precisa instalar nada no seu computador. Tudo é feito pelo navegador.

🎯 Visão geral do que vamos fazer
Subir os arquivos no GitHub (10 min)
Criar o banco de dados no Supabase (15 min)
Configurar as chaves no código (5 min)
Hospedar na Vercel (10 min)
Criar planos de assinatura no Mercado Pago (15 min)
Conectar tudo (5 min)
No final, você vai ter o NORTE rodando numa URL tipo norte.vercel.app, recebendo alunos e gerando receita.

1️⃣ PASSO 1: Subir os arquivos no GitHub
1.1. Criar a conta
Vá em github.com e clique em "Sign up"
Use o mesmo email que vai usar nos outros serviços
1.2. Criar o repositório
Depois de logado, clique no "+" no canto superior direito
Selecione "New repository"
Nome do repositório: norte-studyswap
Marque a opção "Public"
Marque "Add a README file"
Clique em "Create repository"
1.3. Subir os arquivos
Dentro do repositório, clique em "Add file" → "Upload files"
Arraste TODOS estes arquivos pra dentro:
index.html
style.css
app.js
planos.js
supabase-config.js
supabase-setup.sql
vercel.json
README.md (esse aqui)
Embaixo, escreva uma mensagem tipo "Primeiro upload" e clique em "Commit changes"
✅ Pronto, código tá no GitHub.

2️⃣ PASSO 2: Criar o banco de dados no Supabase
2.1. Criar a conta
Vá em supabase.com
Clique em "Start your project"
Faça login com a conta do GitHub (autorize quando pedir)
2.2. Criar o projeto
Clique em "New Project"
Organization: sua organização padrão
Name: norte-studyswap
Database Password: crie uma senha forte e ANOTE EM ALGUM LUGAR SEGURO (você não vai usar essa senha no código, mas vai precisar dela se algum dia precisar acessar o banco direto)
Region: South America (São Paulo) — importantíssimo escolher essa
Pricing Plan: Free
Clique em "Create new project"
⏳ Aguarde uns 2 minutos enquanto o projeto é criado
2.3. Rodar o SQL pra criar a tabela
Quando o projeto estiver pronto, no menu lateral esquerdo, clique em "SQL Editor"
Clique em "New query"
Abra o arquivo supabase-setup.sql (do GitHub) e copie todo o conteúdo
Cole no editor SQL do Supabase
Clique no botão verde "Run" no canto inferior direito
Você deve ver uma mensagem de sucesso
2.4. Pegar as chaves do projeto
No menu lateral, clique no ícone de engrenagem "Project Settings"
Clique em "API"
Você vai ver duas informações importantes:
Project URL (algo como https://abcdefgh.supabase.co)
Project API keys → anon public (uma chave longa que começa com eyJ...)
Copie as duas e guarde — você vai usar no próximo passo
⚠️ IMPORTANTE: Existem 2 chaves nessa página. Use a anon public, NUNCA a service_role!

✅ Pronto, banco tá criado.

3️⃣ PASSO 3: Configurar as chaves no código
3.1. Editar o arquivo de configuração
Volte pro seu repositório no GitHub
Clique no arquivo supabase-config.js
Clique no ícone de lápis (Edit this file) no canto superior direito
Você vai ver linhas assim:
const SUPABASE_URL = 'COLE_SUA_URL_AQUI';
const SUPABASE_ANON_KEY = 'COLE_SUA_ANON_KEY_AQUI';
Substitua pelos valores que você copiou do Supabase
Também troque o PIN do Admin pra algo só você sabe (em vez de 1234)
Vai ficar mais ou menos assim:

const SUPABASE_URL = 'https://abcdefgh.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJI...'; // sua chave longa
const ADMIN_PIN = '7521'; // qualquer combinação que você quiser
Role pra baixo e clique em "Commit changes"
✅ Pronto, código configurado.

4️⃣ PASSO 4: Hospedar na Vercel
4.1. Criar a conta
Vá em vercel.com
Clique em "Sign Up"
Selecione "Continue with GitHub"
Autorize a Vercel a acessar seu GitHub
4.2. Importar o projeto
No dashboard da Vercel, clique em "Add New..." → "Project"
Você vai ver a lista dos seus repositórios do GitHub
Encontre "norte-studyswap" e clique em "Import"
Na próxima tela, deixe tudo como tá (Vercel detecta automaticamente)
Clique em "Deploy"
⏳ Aguarde uns 30 segundos
4.3. Pegar a URL
Quando terminar, vai aparecer uma tela de sucesso com confete
Clique em "Continue to Dashboard"
A URL do seu site tá no topo, algo como norte-studyswap.vercel.app
Clica nela pra testar!
✅ Pronto, NORTE tá no ar!

4.4. (Opcional) Domínio personalizado
Se quiser uma URL tipo norte.studyswap.com.br:

Compre o domínio em registro.br (~R$40/ano)
Na Vercel, vá em Settings → Domains
Adicione seu domínio e siga as instruções
5️⃣ PASSO 5: Criar planos no Mercado Pago
5.1. Acessar planos de assinatura
Faça login em mercadopago.com.br
No menu lateral, vá em "Cobrar" → "Assinaturas"
Clique em "Criar plano de assinatura"
5.2. Criar o Plano Mensal
Nome: NORTE Mensal
Preço: R$ 19,90
Frequência: Mensal
(Opcional) Em "Mais opções" → ative "Teste grátis" de 7 dias
Clique em "Criar"
Copie o link gerado
5.3. Criar o Plano Trimestral
Mesmo processo:
Nome: NORTE Trimestral
Preço: R$ 44,70
Frequência: Trimestral
Copie o link
5.4. Criar o Plano Anual
Mesmo processo:
Nome: NORTE Anual
Preço: R$ 118,80
Frequência: Anual
Copie o link
✅ Pronto, agora você tem 3 links de pagamento.

6️⃣ PASSO 6: Conectar os links no NORTE
6.1. Editar o arquivo de configuração novamente
Volte ao GitHub
Abra supabase-config.js
Clique no lápis pra editar
Encontre o bloco MP_LINKS:
const MP_LINKS = {
  mensal: '',
  trimestral: '',
  anual: ''
};
Cole os links que você copiou do Mercado Pago:
const MP_LINKS = {
  mensal: 'https://mpago.la/abc123',
  trimestral: 'https://mpago.la/def456',
  anual: 'https://mpago.la/ghi789'
};
Clique em "Commit changes"
A Vercel vai automaticamente atualizar o site em ~30 segundos
✅ PRONTO! O NORTE tá 100% no ar e funcionando.

🎉 Como funciona agora
Fluxo do aluno:
Aluno acessa a URL da Vercel
Vê os 3 planos no paywall
Clica em um plano → vai pro Mercado Pago
Paga (PIX, cartão, etc)
Volta pro NORTE e faz login com email
Completa o diagnóstico
Recebe o plano de estudos personalizado
Faz check-ins semanais
Como você acompanha tudo:
Painel Admin do NORTE: acesse o site → menu ⋮ → "Painel Admin" → digite seu PIN
Dashboard do Supabase: acesse supabase.com → seu projeto → Table Editor → tabela "usuarios"
Mercado Pago: acompanhe receitas, assinaturas ativas, cancelamentos
🛠️ Como atualizar o NORTE depois
Toda vez que você quiser mudar alguma coisa:

Vai no GitHub
Edita o arquivo
Commit changes
A Vercel atualiza sozinha em ~30 segundos
❓ Problemas comuns
"O paywall não vai pro Mercado Pago quando clico"
Verifique se você colou os links no supabase-config.js
Os links devem começar com https://
"Os dados não estão salvando"
Verifique se a URL e a anon key do Supabase tão corretas
Vá no console do navegador (F12) — deve aparecer "✅ Supabase conectado"
"Painel Admin tá vazio"
É normal no início, ainda não tem alunos
Crie uma conta de teste pra ver os dados aparecendo
"Esqueci o PIN do Admin"
Vai no GitHub, edita supabase-config.js, muda o ADMIN_PIN
📞 Quando precisar de ajuda
Supabase: supabase.com/docs (em inglês)
Vercel: vercel.com/docs (em inglês)
Mercado Pago: mercadopago.com.br/developers/pt
GitHub: docs.github.com (tem em português)
🚀 Próximos passos depois de lançar
Validar com 5 beta-testers — peça pra amigos usarem grátis e dar feedback
Postar nas redes — Instagram, TikTok, grupos de estudo
Acompanhar métricas — quem tá fazendo check-in? quem desistiu?
Iterar com base no feedback — o que os alunos pediram mais?
Não precisa ser perfeito, só precisa estar no ar. 🧭
