# Conquistas | Afonso Scheufele

Portfolio imersivo — [@AfonsoScheufele](https://github.com/AfonsoScheufele)

## Rodar

```bash
npm install
npm run dev
```

## Features

- **Lenis** smooth scroll + GSAP ScrollTrigger
- Preloader com cortina split
- Seções ON/OFF (Industrial vs Software)
- Timeline pinned, stats, gráfico de linguagens
- Galeria horizontal com mocks SVG + case study modal
- Cursor customizado (desktop), progress bar, nav mobile

## Pessoal & contato

Edite [`src/data/personal.json`](src/data/personal.json): bio, missão/visão/valores, e-mail, LinkedIn, “disponível para”.

CV imprimível: [`public/cv.html`](public/cv.html) (abra e use “Salvar / Imprimir PDF”).

Demos interativas: [`public/demos/`](public/demos/) — ligadas em [`src/data/repo-media.json`](src/data/repo-media.json).

## Deploy (GitHub Pages)

O código já está em `main`. Para ativar o deploy automático:

```bash
gh auth login -s workflow
git push origin main
```

(O commit do workflow pode estar só local se o token não tiver escopo `workflow`.)

Depois: **Settings → Pages → Source: GitHub Actions**.

URL: `https://afonsoscheufele.github.io/repo/`

## Dados

```bash
npm run fetch-github   # AfonsoScheufele por padrão
```

Editar conquistas: [`src/data/manual-achievements.json`](src/data/manual-achievements.json)

## Screenshots dos repos

Substituir mocks em [`public/screenshots/`](public/screenshots/) e paths em [`src/data/repo-media.json`](src/data/repo-media.json).

## Deploy (GitHub Pages)

```bash
gh auth login -s workflow
git push origin main
```

Ativar Pages: Settings → Pages → GitHub Actions.

## Animações

| Lib | Uso |
|-----|-----|
| GSAP | Pin, scrub, horizontal scroll, parallax |
| Anime.js | Contadores, barras de linguagem, hero stagger |
| Motion | Modal, filtros, cursor, mobile menu |
