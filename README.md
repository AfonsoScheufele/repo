# Conquistas | @devA52

Portfolio animado de conquistas de **Afonso Scheufele**, com dados do GitHub e seção manual editável.

## Stack

| Biblioteca | Uso neste projeto |
|------------|-------------------|
| **GSAP + ScrollTrigger** | Parallax no hero, timeline pinned, entrada em batch dos cards |
| **Anime.js** | Stagger do título, contadores animados, desenho SVG |
| **Motion** (`motion/react`) | Bento grid, filtros com layoutId, hover nos repos |

## Rodar localmente

```bash
npm install
npm run dev
```

Abre em [http://localhost:5173](http://localhost:5173).

## Atualizar conquistas

### GitHub (automático)

```bash
npm run fetch-github
```

Puxa avatar, repos e stats da API pública. Variáveis opcionais:

```bash
GITHUB_USERNAME=devA52 DISPLAY_NAME="Afonso Scheufele" npm run fetch-github
```

### Conquistas manuais

Edite [`src/data/manual-achievements.json`](src/data/manual-achievements.json) com projetos de carreira, certificações, etc. O script faz merge com os dados do GitHub.

## Build

```bash
npm run build
npm run preview
```

## Deploy (GitHub Pages)

O workflow em [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) publica automaticamente na branch `main`.

## Acessibilidade

Respeita `prefers-reduced-motion`: animações são desativadas ou simplificadas quando o usuário prefere movimento reduzido.

## Licença

MIT
