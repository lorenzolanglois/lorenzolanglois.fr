# lorenzolanglois.fr

My personal portfolio website showcasing my projects and experience.

![Animated preview of the website](assets/metadata/preview.gif?raw=true "Animated preview of the website")

## Features

- Responsive design with a hand-drawn aesthetic
- Interactive drawing canvas
- Bilingual support (French/English)
- Project showcase with descriptions and media
- Contact form

## Technologies

- HTML5 Canvas for interactive drawing
- Vanilla JavaScript
- CSS with custom animations
- GitHub Actions for automated minification
- JSON-based internationalization

## Project Structure

- `/assets` - Images, PDFs, and other static assets
- `/css` - Stylesheets
- `/js` - JavaScript files
- `/lang` - Language files (fr/en)
- `/fonts` - Custom web fonts

## Deployment

The site is automatically deployed using GitHub Pages. A GitHub Action workflow handles:
- JavaScript minification with Terser
- CSS minification with CSSO
- HTML minification with html-minifier-terser
- JSON minification

## Credits

Designed and developed by [lorenzolanglois](https://github.com/lorenzolanglois)
