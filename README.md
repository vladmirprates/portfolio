> **Falante de Português?** Leia a [Versão em Português aqui](README-pt.md)
# Portfolio - Vladmir Prates

Centralized documentation for the portfolio project, including details on structure, implemented systems, and maintenance instructions.

## Project Structure

```
/
├── index.html           # Loading page with language selection
├── main.html            # Main site page
├── assets/
│   ├── css/
│   │   ├── styles.css           # Main styles
│   │   └── theme-styles.css     # Theme-specific styles
│   ├── js/
│   │   ├── main.js              # General site functionality
│   │   ├── hero-effects.js      # Specific hero section effects
│   │   ├── themes.js            # Theme management system
│   │   └── i18n.js              # Internationalization system
│   ├── images/                  # Site images
│   └── translations/            # Translation files
│       ├── pt-br.json           # Portuguese translations
│       └── en.json              # English translations
```

## Implemented Systems

### 1. Loading Page

The initial loading page features a terminal design with animations and allows the user to select their language before entering the main site.

**Related files:**
- `index.html` - HTML structure of the loading page
- Inline CSS styles within the file itself

**Features:**
- Typing effect for terminal text
- Animated progress bar
- Language selection (Portuguese/English)
- Smooth transition to the main site
- Animated particles in the background

**How to use:**
- Language preference is saved in `localStorage`
- The selected language is passed to the main site via URL parameter

### 2. Theme System

The site features multiple visual themes that can be toggled via the selector in the header.

**Related files:**
- `themes.js` - Theme management logic
- `theme-styles.css` - Specific styles for each theme

**Available themes:**
1. **Default** - Standard theme with purple and green tones
2. **Fantasy** - Theme with purple and gold tones
3. **Dark Fire** - Dark theme with red and orange tones
4. **Leaf** - Theme with green and gold tones

**How it works:**
- Each theme defines its own CSS variables (colors, gradients, shadows)
- The system adds a class to the `body` corresponding to the current theme
- Theme preference is saved in `localStorage`
- Smooth transitions are applied when switching themes

**How to add a new theme:**
1. Add the theme to the `themes` object in the `themes.js` file:
```javascript
this.themes = {
  'default': { name: 'Default', icon: 'fas fa-palette' },
  'your-theme': { name: 'Theme Name', icon: 'fas fa-appropriate-icon' }
};
```

2. Add the CSS variables in the `theme-styles.css` file:
```css
:root[data-theme="your-theme"] {
  --cor-primaria: #value;
  --cor-secundaria: #value;
  /* Other variables... */
}

/* Specific adjustments for the theme */
.theme-your-theme {
  /* Specific styles... */
}
```

### 3. Internationalization System (i18n)

The site supports multiple languages with dynamic switching without reloading the page.

**Related files:**
- `i18n.js` - Language management logic
- `assets/translations/pt-br.json` - Portuguese translations
- `assets/translations/en.json` - English translations

**Supported languages:**
- Portuguese (pt-br) - Default language
- English (en)

**How it works:**
- Translatable texts are marked with the `data-i18n` attribute
- The system dynamically loads the JSON file for the selected language
- Language preference is saved in `localStorage`
- Integrated with the loading page for initial selection

**How to add a new language:**
1. Create a new JSON file in the `assets/translations/` folder (e.g., `fr.json`)
2. Copy the structure of an existing file and translate the values
3. Add the new language to the supported languages list in the `i18n.js` file

**How to add new translatable texts:**
1. Add the `data-i18n` attribute to the HTML element:
```html
<h2 data-i18n="section.title">Default Title</h2>
```

2. Add the corresponding key in the translation files:
```json
{
  "section": {
    "title": "Translated Title"
  }
}
```

### 4. Visual Effects

The site includes various visual effects to enhance the user experience.

**Related files:**
- `hero-effects.js` - Specific effects for the hero section
- `main.js` - Other effects and animations

**Implemented effects:**
- Interactive particle effect in the hero section
- Parallax scrolling effect
- Typing effect in the subtitle
- AOS (Animate On Scroll) animations
- Theme-specific effects

**How to use AOS:**
Add `data-aos` attributes to elements:
```html
<div data-aos="fade-up" data-aos-delay="100">
  Content with animation
</div>
```

## Responsiveness

The site is fully responsive and adapts to different screen sizes.

**Key responsive adjustments:**
- Mobile menu with toggle for small screens
- Flexible layout that adapts to different widths
- Resizable images and content
- Media queries for specific adjustments

**Main Breakpoints:**
- Mobile: up to 576px
- Tablet: 577px to 768px
- Desktop: above 768px

## Maintenance and Best Practices

### Adding New Content

1. **New Projects:**
   - Add a new card in the projects section following the existing structure
   - Include images in the `assets/images/` folder
   - Add translations in the language files

2. **New Skills:**
   - Add new tags in the appropriate category
   - Maintain visual consistency with existing tags

### Modifying Styles

1. **General Adjustments:**
   - Modify the `styles.css` file for global changes
   - Respect CSS variables to maintain consistency

2. **Theme Adjustments:**
   - Modify only the `theme-styles.css` file
   - Maintain the variable structure for each theme

### Debugging

- Check the browser console for potential errors
- Test on different browsers and devices
- Validate changes across all themes and languages

## Credits and Resources

- **Libraries used:**
  - Font Awesome (icons)
  - AOS - Animate On Scroll
  - Google Fonts

- **External Resources:**
  - Images
  - Icons: Font Awesome
  - Fonts: Google Fonts (Montserrat, Orbitron, Roboto)

## Contact
* **LinkedIn:** [Vladmir Prates](https://linkedin.com/in/vladmirprates)
* **GitHub:** [Vladmir Prates](https://github.com/vladmirprates)
