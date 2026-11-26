> **English speaker?** Read the [English version](README.md).

# Vladmir Prates — Portfólio

Portfólio pessoal de Vladmir Prates, QA em São Paulo.
No ar em **https://vladmirprates.github.io/portfolio/**

Procurando a versão gamificada? Veja a [Ficha de Personagem de QA](https://vladmirprates.github.io/arpg-character/).

## Stack

React 19 · TypeScript · Vite · Tailwind CSS 4 · Framer Motion · i18next (PT-BR / EN)

## Rodando localmente

```bash
npm install
npm run dev       # servidor de desenvolvimento
npm run build     # checagem de tipos + build de produção em dist/
npm run preview   # serve o build de produção
npm run lint
```

## Editando o conteúdo

Todo o texto, nos dois idiomas, fica em `public/locales/<idioma>/translation.json`:

| Seção | Chave |
| --- | --- |
| Cartão de testes do topo | `hero.spec` |
| Experiência | `experience.items` |
| Habilidades | `skills.groups` |
| Projetos | `projects.items` (uma lista `images` torna o projeto o destaque grande, com galeria de capturas) |
| Missões secundárias | `side.items` |

As recomendações ficam em `testimonials.items`: uma seleção feita à mão de `src/data/recommendations.ts` da Ficha de Personagem de QA. A primeira aparece em destaque; `highlight` (um trecho exato da citação) fica em evidência e `translated` adiciona o selo "Traduzido". O botão leva à lista completa no LinkedIn.

O idioma vem de `?lang=pt|en`, depois da última escolha do visitante, depois do idioma do navegador.

## Deploy

Cada push na `master` roda `.github/workflows/deploy.yml`, que faz lint, build e publica `dist/` no GitHub Pages.
Nas configurações do repositório, **Pages → Source** precisa estar em **GitHub Actions**.
