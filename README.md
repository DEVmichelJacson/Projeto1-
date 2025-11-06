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