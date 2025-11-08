# Projeto1- (SKYFIT)

Site estático simples para a academia SKYFIT — visual vermelho/preto, logo neon, animações e seções de planos e contato.

## O que há neste repositório

- `index.html` — página principal
- `css/styles.css` — estilos e tema (paleta vermelho/preto)
- `js/main.js` — scripts para interatividade (menu, partículas, formulário)

## Como rodar localmente

Recomendo usar um servidor local para evitar problemas com CORS/recursos e para que o Live Reload funcione bem.

1. Usando Python 3:

```powershell
cd "c:\Users\Suesa.S\Documents\GitHub\Projeto1-"
python -m http.server 5500
```

Abra http://localhost:5500 no navegador.

2. Usando a extensão Live Server no VS Code:
- Instale a extensão "Live Server" (ritwickdey.liveserver)
- Abra a pasta do projeto e clique em "Go Live"

## Publicar no GitHub Pages

1. Garanta que o repositório remoto esteja configurado e que as mudanças tenham sido commitadas.
2. No GitHub vá em `Settings > Pages` e selecione a branch `main` e a pasta `/ (root)` como fonte. Salve.
3. Aguarde alguns minutos e a página estará disponível em `https://<seu-usuario>.github.io/<seu-repo>/`.

Alternativa: criar workflow que publique para gh-pages automaticamente. Posso gerar esse workflow se quiser.

## Próximos passos sugeridos

- Finalizar estilização responsiva dos cards e conteúdos menores
- Melhorar a acessibilidade (contraste, labels e aria-attributes)
- Implementar testes simples e validação de formulários no servidor

---

Se quiser, eu gero um `workflow` do GitHub Actions para deploy automático no GitHub Pages.

## Integração com banco de dados (Supabase) — rápido e simples

Se você quer demonstrar conhecimento básico de banco de dados sem criar um backend, recomendo usar Supabase (Postgres gerenciado).

Passos rápidos:

1. Crie uma conta em https://supabase.com e crie um novo projeto.
2. No painel SQL (ou Table Editor) crie a tabela `contacts` com este SQL mínimo:

```sql
create table public.contacts (
	id uuid primary key default gen_random_uuid(),
	name text,
	email text,
	message text,
	created_at timestamptz default now()
);
```

3. Habilite Row Level Security (RLS) para a tabela `contacts` e então crie uma policy que permita inserts anônimos (somente para demo). Exemplo:

```sql
alter table public.contacts enable row level security;

create policy "allow insert for anon" on public.contacts
	for insert
	using (true)
	with check (true);
```

4. No Project Settings → API copie a `URL` do projeto (algo como `https://xyz.supabase.co`) e a `anon` (public) key.

5. Abra `js/main.js` e preencha as duas constantes no topo:

```js
const SUPABASE_URL = 'https://xyz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJ...';
```

6. Agora, quando alguém enviar o formulário de contato, o site fará um POST direto para o endpoint REST do Supabase para inserir na tabela `contacts`.

Observações de segurança:
- Usar a `anon` key é aceitável para inserts quando você controla a política RLS que restringe o que pode ser inserido. Evite usar a `service_role` key no frontend — essa chave tem privilégios administrativos.
- Para produção, prefira criar validações (policies mais estritas) ou uma função server-side que receba o formulário e escreva na DB.

Se quiser, eu posso:
- gerar os comandos SQL completos e copiá-los no painel do Supabase;
- criar um pequeno script para rodar localmente que valida os inputs antes do envio;
- ou gerar um backend Node/Express minimal caso queira mais controle.

## Usando MySQL local com backend Node/Express

Se você abriu o MySQL local e prefere usar ele para mostrar que sabe trabalhar com bancos relacionais, adicionei uma pequena API de exemplo em `api/` que insere os contatos na tabela `contacts`.

Passos para executar localmente:

1. Entre na pasta `api` e instale dependências:

```powershell
cd api
npm install
```

2. Crie a base de dados e a tabela `contacts` no MySQL (use o arquivo `api/schema.sql`):

```sql
-- execute no seu cliente MySQL
CREATE DATABASE IF NOT EXISTS projeto1 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE projeto1;
-- então rode o conteúdo de api/schema.sql
```

3. Copie `.env.example` para `.env` dentro da pasta `api` e ajuste as credenciais do seu MySQL:

```powershell
cd api
cp .env.example .env
# edite .env e ajuste DB_USER/DB_PASS/DB_NAME
```

4. Rode o servidor:

```powershell
cd api
npm start
```

5. No frontend, abra `js/main.js` e preencha `API_ENDPOINT` com o endereço do servidor (por exemplo `http://localhost:3000/api/contact`). O formulário usará esse endpoint antes de tentar Supabase.

Observações:
- O backend incluído é mínimo e destinado a demonstração/local. Em produção, proteja o endpoint, adicione validações e autenticação conforme necessário.
- Se quiser eu configuro um deploy do backend (por exemplo Railway/Render) e atualizo o `API_ENDPOINT` no front.