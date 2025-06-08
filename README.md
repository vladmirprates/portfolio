# Portfólio - Vladmir Prates

Documentação centralizada do projeto de portfólio, incluindo detalhes sobre a estrutura, sistemas implementados e instruções de manutenção.

## Estrutura do Projeto

```
/
├── index.html           # Loading page com seleção de idioma
├── main.html            # Página principal do site
├── assets/
│   ├── css/
│   │   ├── styles.css           # Estilos principais
│   │   └── theme-styles.css     # Estilos específicos para temas
│   ├── js/
│   │   ├── main.js              # Funcionalidades gerais do site
│   │   ├── hero-effects.js      # Efeitos específicos da seção hero
│   │   ├── themes.js            # Sistema de gerenciamento de temas
│   │   └── i18n.js              # Sistema de internacionalização
│   ├── images/                  # Imagens do site
│   └── translations/            # Arquivos de tradução
│       ├── pt-br.json           # Traduções em português
│       └── en.json              # Traduções em inglês
```

## Sistemas Implementados

### 1. Loading Page

A página de carregamento inicial apresenta um design de terminal com animações e permite ao usuário selecionar o idioma antes de entrar no site principal.

**Arquivos relacionados:**
- `index.html` - Estrutura HTML da loading page
- Estilos CSS inline no próprio arquivo

**Funcionalidades:**
- Efeito de digitação para textos do terminal
- Barra de progresso animada
- Seleção de idioma (português/inglês)
- Transição suave para o site principal
- Partículas animadas no fundo

**Como usar:**
- A preferência de idioma é salva no localStorage
- O idioma selecionado é passado para o site principal via parâmetro URL

### 2. Sistema de Temas

O site possui múltiplos temas visuais que podem ser alternados pelo seletor no cabeçalho.

**Arquivos relacionados:**
- `themes.js` - Lógica de gerenciamento de temas
- `theme-styles.css` - Estilos específicos para cada tema

**Temas disponíveis:**
1. **Default** - Tema padrão com tons de roxo e verde
2. **Fantasy** - Tema com tons de roxo e dourado
3. **Dark Fire** - Tema escuro com tons de vermelho e laranja
4. **Leaf** - Tema com tons de verde e dourado

**Como funciona:**
- Cada tema define suas próprias variáveis CSS (cores, gradientes, sombras)
- O sistema adiciona uma classe ao `body` correspondente ao tema atual
- A preferência de tema é salva no localStorage
- Transições suaves são aplicadas na troca de temas

**Como adicionar um novo tema:**
1. Adicione o tema ao objeto `themes` no arquivo `themes.js`:
```javascript
this.themes = {
  'default': { name: 'Padrão', icon: 'fas fa-palette' },
  'seu-tema': { name: 'Nome do Tema', icon: 'fas fa-icon-apropriado' }
};
```

2. Adicione as variáveis CSS no arquivo `theme-styles.css`:
```css
:root[data-theme="seu-tema"] {
  --cor-primaria: #valor;
  --cor-secundaria: #valor;
  /* Demais variáveis... */
}

/* Ajustes específicos para o tema */
.theme-seu-tema {
  /* Estilos específicos... */
}
```

### 3. Sistema de Internacionalização (i18n)

O site suporta múltiplos idiomas com troca dinâmica sem recarregar a página.

**Arquivos relacionados:**
- `i18n.js` - Lógica de gerenciamento de idiomas
- `assets/translations/pt-br.json` - Traduções em português
- `assets/translations/en.json` - Traduções em inglês

**Idiomas suportados:**
- Português (pt-br) - Idioma padrão
- Inglês (en)

**Como funciona:**
- Os textos traduzíveis são marcados com o atributo `data-i18n`
- O sistema carrega dinamicamente o arquivo JSON do idioma selecionado
- A preferência de idioma é salva no localStorage
- Integração com a loading page para seleção inicial

**Como adicionar um novo idioma:**
1. Crie um novo arquivo JSON na pasta `assets/translations/` (ex: `fr.json`)
2. Copie a estrutura de um arquivo existente e traduza os valores
3. Adicione o novo idioma à lista de idiomas suportados no arquivo `i18n.js`

**Como adicionar novos textos traduzíveis:**
1. Adicione o atributo `data-i18n` ao elemento HTML:
```html
<h2 data-i18n="secao.titulo">Título padrão</h2>
```

2. Adicione a chave correspondente nos arquivos de tradução:
```json
{
  "secao": {
    "titulo": "Título traduzido"
  }
}
```

### 4. Efeitos Visuais

O site possui diversos efeitos visuais para melhorar a experiência do usuário.

**Arquivos relacionados:**
- `hero-effects.js` - Efeitos específicos da seção hero
- `main.js` - Outros efeitos e animações

**Efeitos implementados:**
- Efeito de partículas interativas no hero
- Efeito parallax no scroll
- Efeito de digitação no subtítulo
- Animações AOS (Animate On Scroll)
- Efeitos específicos para cada tema

**Como usar o AOS:**
Adicione os atributos `data-aos` aos elementos:
```html
<div data-aos="fade-up" data-aos-delay="100">
  Conteúdo com animação
</div>
```

## Responsividade

O site é totalmente responsivo e se adapta a diferentes tamanhos de tela.

**Principais ajustes responsivos:**
- Menu mobile com toggle para telas pequenas
- Layout flexível que se adapta a diferentes larguras
- Imagens e conteúdo redimensionáveis
- Media queries para ajustes específicos

**Breakpoints principais:**
- Mobile: até 576px
- Tablet: 577px a 768px
- Desktop: acima de 768px

## Manutenção e Boas Práticas

### Adicionando Novos Conteúdos

1. **Novos Projetos:**
   - Adicione um novo card na seção de projetos seguindo a estrutura existente
   - Inclua imagens na pasta `assets/images/`
   - Adicione as traduções nos arquivos de idioma

2. **Novas Habilidades:**
   - Adicione novas tags na categoria apropriada
   - Mantenha a consistência visual com as tags existentes

### Modificando Estilos

1. **Ajustes Gerais:**
   - Modifique o arquivo `styles.css` para alterações globais
   - Respeite as variáveis CSS para manter a consistência

2. **Ajustes de Tema:**
   - Modifique apenas o arquivo `theme-styles.css`
   - Mantenha a estrutura de variáveis para cada tema

### Depuração

- Verifique o console do navegador para possíveis erros
- Teste em diferentes navegadores e dispositivos
- Valide as alterações em todos os temas e idiomas

## Créditos e Recursos

- **Bibliotecas utilizadas:**
  - Font Awesome (ícones)
  - AOS - Animate On Scroll
  - Google Fonts

- **Recursos externos:**
  - Imagens
  - Ícones: Font Awesome
  - Fontes: Google Fonts (Montserrat, Orbitron, Roboto)

## Contato
* **LinkedIn:** [Vladmir Prates](https://linkedin.com/in/vladmirprates)
* **GitHub:** [Vladmir Prates](https://github.com/vladmirprates)
