<div align="center">

# Erick Marques · Portfólio

**Interfaces que resolvem problemas, do Figma ao deploy.**

Portfólio pessoal de desenvolvedor front-end e UI designer, feito com React, TypeScript e Tailwind CSS.

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Oxlint](https://img.shields.io/badge/lint-Oxlint-F7B93E?style=flat-square)

[GitHub](https://github.com/erickmarquesc) · [LinkedIn](https://www.linkedin.com/in/erick-marques-cabral-999b151b4/)

</div>

---

## Sobre o projeto

Uma página única que apresenta meu trabalho: experiência, serviços, forma de trabalhar e projetos em destaque. A abertura traz um estudo de anatomia de um botão, montado em código, que mostra as camadas do componente, as medidas de espaçamento e os estados de interação, do mesmo jeito que eu apresentaria no Figma.

### Seções

| Seção | Conteúdo |
| --- | --- |
| **Início** | Apresentação, chamada para o WhatsApp e o painel de anatomia do botão |
| **Experiência** | Linha do tempo profissional e um card sobre meu uso de IA no dia a dia |
| **Serviços** | Interfaces no Figma, front-end em produção e design systems |
| **Processo** | As quatro etapas: entender, prototipar, validar e desenvolver |
| **Sobre** | Quem sou e as tecnologias que uso, agrupadas por área |
| **Projetos** | Estudos de caso com desafio, solução, destaques e stack |
| **Contato** | Canais para conversar sobre um projeto |

## Destaques

- **Tema claro e escuro automático**, seguindo a preferência do sistema operacional.
- **Mobile-first**: o painel da abertura é reduzido proporcionalmente a partir do tablet e empilha no celular para continuar legível.
- **Acessibilidade**: HTML semântico, navegação por teclado e respeito a `prefers-reduced-motion`.
- **Performance**: animações pausam quando saem da tela (`IntersectionObserver`), sem dependências pesadas de UI.
- **Conteúdo separado do layout**: textos, projetos e experiências ficam em `src/data`, então dá para atualizar o portfólio sem mexer nos componentes.
- **Componentes compostos** (`Header.Root`, `Hero.Title`, `Showcase.Inspector`...), que deixam a montagem da página legível e flexível.

## Tecnologias

| Área | Ferramentas |
| --- | --- |
| Interface | React 19, TypeScript |
| Estilo | Tailwind CSS 4, `clsx` + `tailwind-merge` |
| Build | Vite 8 |
| Qualidade | Oxlint, checagem de tipos com `tsc` |

## Como rodar

**Pré-requisitos:** Node.js LTS (a versão está em [`.nvmrc`](.nvmrc)) e npm.

```bash
# clonar o repositório
git clone git@github.com:erickmarquesc/erickmarquescabral.git
cd erickmarquescabral

# usar a versão do Node do projeto (opcional, com nvm)
nvm use

# instalar as dependências
npm install

# subir o servidor de desenvolvimento
npm run dev
```

O site abre em `http://localhost:5173`.

### Scripts

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento com recarregamento instantâneo |
| `npm run build` | Checa os tipos e gera a versão de produção em `dist/` |
| `npm run preview` | Serve localmente a versão gerada pelo build |
| `npm run lint` | Analisa o código com o Oxlint |

## Estrutura

```text
src/
├── components/        # seções da página e componentes compostos
│   ├── Header/        # cabeçalho, navegação e menu mobile
│   ├── Hero/          # abertura
│   ├── Showcase/      # painel de anatomia do botão
│   ├── Experience/    # linha do tempo e card de IA
│   ├── Projects/      # estudos de caso e capas ilustradas
│   ├── ...            # Services, Process, About, Contact, Footer
│   └── ui/            # Button, Icon, Reveal, ScaleToFit
├── data/              # conteúdo do site (perfil, projetos, experiência, menu)
├── hooks/             # useActiveSection, useFitScale, useMediaQuery...
├── lib/               # utilitário cn() para juntar classes
├── utils/             # formatação de datas
├── App.tsx            # montagem da página
├── main.tsx           # ponto de entrada
└── index.css          # tema, tokens de cor e breakpoints do Tailwind
```

## Editando o conteúdo

| Quero mudar... | Arquivo |
| --- | --- |
| Nome, cargo, links, serviços, processo e tecnologias | [`src/data/profile.ts`](src/data/profile.ts) |
| Projetos em destaque e outros projetos | [`src/data/projects.ts`](src/data/projects.ts) |
| Linha do tempo profissional | [`src/data/experience.ts`](src/data/experience.ts) |
| Card sobre IA | [`src/data/ai.ts`](src/data/ai.ts) |
| Itens do menu | [`src/data/navigation.ts`](src/data/navigation.ts) |
| Cores, fontes e breakpoints | [`src/index.css`](src/index.css) |

## Contato

Quer conversar sobre um projeto? Me encontre no [LinkedIn](https://www.linkedin.com/in/erick-marques-cabral-999b151b4/) ou pelo botão de WhatsApp no site.

<div align="center">
<sub>Feito por <a href="https://github.com/erickmarquesc">Erick Marques</a>.</sub>
</div>
