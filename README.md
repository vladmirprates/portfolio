# Portfólio Pessoal - Vladmir Prates

 Bem-vindo ao repositório do meu portfólio pessoal! Este projeto é um showcase das minhas habilidades e experiências como profissional de Quality Assurance e entusiasta de games, com um foco especial em UX/UI. O site foi desenvolvido para ser responsivo, interativo e visualmente atraente, utilizando tecnologias web modernas e uma arquitetura multi-página.

## 🚀 Visão Geral do Projeto

Este portfólio é um **site web com uma página principal e páginas de entrada/saída**, projetado para apresentar meu perfil profissional de forma abrangente. Ele é estruturado para guiar o visitante através de diferentes aspectos da minha carreira:

* **Página de Carregamento (`index.html`):** O ponto de entrada inicial do site. Permite ao usuário selecionar o idioma preferido (Português do Brasil ou Inglês) antes de acessar o conteúdo principal, garantindo uma experiência personalizada desde o início.
* **Página Principal (`main.html`):** Contém todo o conteúdo central do portfólio, organizado em seções distintas como:
    * **Sobre Mim:** Uma introdução sobre minha trajetória, paixões e experiência profissional.
    * **Experiência:** Detalhes sobre minhas passagens por empresas e minhas responsabilidades.
    * **Habilidades:** Um panorama das minhas competências técnicas e soft skills.
    * **Projetos:** Destaque para projetos relevantes que participei ou desenvolvi. (Futuramente, esta seção poderá redirecionar para páginas de projeto dedicadas).
    * **UX/UI:** Seção dedicada ao meu interesse e contribuições na área de Experiência do Usuário e Interface do Usuário.
    * **Games:** Minha paixão por jogos e como ela se conecta com a qualidade e a experiência.
    * **Recomendações:** Testemunhos de colegas e gestores sobre meu trabalho.
    * **Contato:** Formas de entrar em contato comigo para oportunidades e colaborações.
* **Futuras Páginas de Projeto:** O projeto foi planejado com a flexibilidade para a adição de páginas separadas e detalhadas para cada projeto, permitindo um aprofundamento maior sem sobrecarregar a página principal.

## ✨ Funcionalidades Principais

* **Internacionalização (i18n):** Suporte completo para dois idiomas (Português do Brasil e Inglês), com detecção e persistência da preferência do usuário via `localStorage`. A troca de idioma é fluida e mantém o contexto da página.
* **Sistema de Temas:** Múltiplos temas visuais (Padrão, Fantasy, Dark Fire, Leaf) que podem ser alternados pelo usuário a qualquer momento. A escolha do tema é persistida via `localStorage` para uma experiência consistente em futuras visitas.
* **Animações On Scroll (AOS):** Elementos visuais em diversas seções surgem com animações elegantes e fluidas à medida que o usuário rola a página, criando uma experiência de navegação dinâmica.
* **Efeitos Visuais Dinâmicos na Seção Hero:**
    * **Efeito de Digitação:** Um efeito de "máquina de escrever" no subtítulo da seção Hero, cativando o visitante com a revelação progressiva do texto.
    * **Parallax Suave:** Um sutil efeito de parallax na imagem de fundo da seção Hero, adicionando profundidade e movimento ao cabeçalho.
    * **Partículas Animadas:** Um efeito de "partículas" que reagem ao movimento do mouse na seção Hero, criando uma sensação interativa e moderna.
* **Navegação Fluida e Intuitiva:**
    * **Scroll Suave:** Transição suave e animada ao clicar nos links de navegação internos, levando o usuário diretamente à seção desejada.
    * **Menu Responsivo:** Um menu hamburger para dispositivos móveis, adaptando a navegação a diferentes tamanhos de tela e garantindo a usabilidade em smartphones e tablets.
    * **Indicador de Seção Ativa:** Destaca visualmente o link de navegação correspondente à seção atualmente visível na tela, orientando o usuário sobre sua posição no site.
* **Botão "Voltar ao Topo":** Um botão conveniente que aparece discretamente ao rolar a página para cima e permite retornar rapidamente ao início da página com um scroll suave.
* **Design Responsivo:** O layout se adapta perfeitamente a desktops, tablets e smartphones, garantindo uma ótima experiência de usuário e legibilidade em qualquer dispositivo.

## 🛠️ Tecnologias Utilizadas

* **HTML5:** A espinha dorsal do conteúdo, garantindo uma estrutura semântica e acessível.
* **CSS3:** Responsável por toda a estilização e design responsivo, com uso estratégico de variáveis CSS para facilitar a customização de temas e a manutenção.
* **JavaScript (ES6+):** A linguagem que dá vida ao site, implementando todas as funcionalidades interativas e dinâmicas.
* **Font Awesome:** Uma biblioteca amplamente utilizada para ícones escaláveis e vetoriais, aprimorando a identidade visual.
* **AOS (Animate On Scroll):** Uma biblioteca JavaScript leve para criar animações de rolagem, tornando a navegação mais envolvente.
* **Swiper.js:** (`main.html`) Biblioteca moderna para criar carrosséis e sliders responsivos, ideal para seções como "Projetos" ou "Recomendações" (se implementado).

## 📂 Estrutura do Projeto

.
├── assets/
│   ├── css/
│   │   ├── styles.css        # Estilos globais e layout principal do portfólio
│   │   └── theme-styles.css  # Estilos específicos para cada tema visual
│   ├── js/
│   │   ├── hero-effects.js   # Scripts dedicados aos efeitos visuais da seção Hero
│   │   ├── i18n.js           # Gerenciador de internacionalização (i18n)
│   │   ├── main.js           # Scripts principais da página (navegação, AOS, etc.)
│   │   └── themes.js         # Gerenciador do sistema de temas
│   └── images/               # Pasta para imagens (capas, ícones, etc.)
├── index.html                # Página de carregamento inicial e seleção de idioma
├── main.html                 # Página principal do portfólio com todas as seções
├── en.json                   # Arquivo de traduções para o idioma Inglês
└── pt-br.json                # Arquivo de traduções para o idioma Português do Brasil
├── README.md                 # Este arquivo de documentação do projeto

## 📝 Detalhes dos Arquivos

### HTML

* **`index.html`**
    * **Função:** Serve como a porta de entrada para o site. Antes de exibir o conteúdo principal, permite que o usuário escolha seu idioma preferencial.
    * **Características:** Possui estilos CSS embutidos para uma rápida renderização da tela de carregamento e um script JavaScript simples para lidar com a lógica de seleção de idioma, persistência via `localStorage` e o redirecionamento suave para `main.html` com o idioma selecionado como parâmetro de URL.

* **`main.html`**
    * **Função:** É a página central do portfólio, onde todas as seções de conteúdo (Sobre Mim, Experiência, Projetos, etc.) estão organizadas.
    * **Características:** Inclui links para todos os arquivos CSS essenciais (`styles.css`, `theme-styles.css`) e os scripts JavaScript (`main.js`, `hero-effects.js`, `i18n.js`, `themes.js`). Também integra bibliotecas externas como Font Awesome, AOS e Swiper.js, e contém a estrutura para o botão "Voltar ao Topo".

### CSS

* **`styles.css`**
    * **Função:** Contém os estilos CSS globais que definem a aparência base do portfólio.
    * **Características:** Estabelece a paleta de cores padrão (usando variáveis CSS), tipografia, layout geral, estilos de navegação, cabeçalho, rodapé e componentes genéricos. É responsável pela maior parte da responsividade através de `media queries`.

* **`theme-styles.css`**
    * **Função:** Dedicado exclusivamente aos estilos específicos de cada tema visual disponível.
    * **Características:** Sobrescreve as variáveis CSS globais definidas em `styles.css` para ajustar cores de fundo, texto, destaque, etc., conforme o tema ativo (ex: `theme-fantasy`, `theme-dark-fire`). Este arquivo é o coração da funcionalidade de temas, permitindo uma customização visual rápida.

### JavaScript

* **`main.js`**
    * **Função:** Gerencia a maior parte da interatividade geral do site.
    * **Características:** Inicializa as animações AOS, controla o efeito de mudança de estilo do cabeçalho ao rolar, implementa o menu mobile (toggle, fechamento ao clicar), proporciona o scroll suave para links de âncora, e gerencia o indicador visual da seção ativa na navegação, além de garantir a responsividade do menu em redimensionamentos de tela.

* **`hero-effects.js`**
    * **Função:** Adiciona efeitos visuais dinâmicos exclusivamente à seção Hero (primeira tela do portfólio).
    * **Características:** Implementa um efeito de "partículas" que reage ao movimento do mouse, um suave efeito de parallax na imagem de fundo ao rolar a página, e o cativante efeito de digitação para o subtítulo do hero. Possui funções públicas (`clearTypingEffect`, `startTypingEffect`) para serem controladas por outros scripts, como o `i18n.js` após a troca de idioma.

* **`i18n.js` (Internacionalização)**
    * **Função:** Gerencia a funcionalidade de múltiplos idiomas do site.
    * **Características:** É uma classe (`I18nManager`) que detecta o idioma preferencial (via URL, `localStorage` ou padrão), carrega o arquivo JSON de tradução correspondente (`en.json` ou `pt-br.json`), e atualiza todo o conteúdo textual da página usando atributos `data-i18n`. Ele também adiciona dinamicamente um seletor de idioma no cabeçalho e persiste a escolha do usuário. Garante a reinicialização correta de efeitos como o de digitação após a troca de idioma.

* **`themes.js` (Sistema de Temas)**
    * **Função:** Responsável por toda a lógica de alternância e gerenciamento dos temas visuais do site.
    * **Características:** É uma classe (`ThemeManager`) que define os temas disponíveis (nome, ícone), carrega a preferência de tema do `localStorage` (ou usa o padrão), e aplica a classe CSS apropriada (ex: `theme-fantasy`) ao elemento `<html>` do documento. Isso aciona os estilos definidos em `theme-styles.css`. Adiciona dinamicamente um seletor de temas ao cabeçalho, permitindo ao usuário escolher o visual preferido.

### JSON

* **`en.json`**
    * **Função:** Armazena todas as strings de texto utilizadas na página principal (`main.html`), traduzidas para o idioma **inglês**.
    * **Estrutura:** Organizado hierarquicamente por seções (ex: `nav`, `hero`, `sobre`, `experiencia`, `contato`), o que facilita a localização, adição e manutenção das traduções.

* **`pt-br.json`**
    * **Função:** Armazena todas as strings de texto utilizadas na página principal (`main.html`), traduzidas para o idioma **português do Brasil**.
    * **Estrutura:** Segue a mesma estrutura de chaves do `en.json`, garantindo a compatibilidade com o sistema de internacionalização.

## ⚙️ Como Rodar o Projeto Localmente

Para visualizar o projeto, acesse:
[Link]([https://linkedin.com/in/vladmirprates](https://github.com/vladmirprates/portfolio/))


## 🤝 Contribuições

Contribuições são bem-vindas! Se você tiver sugestões de melhoria, encontrar algum bug ou quiser adicionar novas funcionalidades, sinta-se à vontade para abrir uma issue ou um pull request.

## 📞 Contato

Para entrar em contato, por favor, visite a seção "Contato" no meu portfólio ou use os links abaixo:

* **LinkedIn:** [Vladmir Prates](https://linkedin.com/in/vladmirprates) * **GitHub:** [Vladmir Prates](https://github.com/vladmirprates) ---
