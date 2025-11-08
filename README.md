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