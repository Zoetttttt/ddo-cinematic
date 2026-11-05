# D Design Office — The art of being somewhere

A standalone cinematic edition based on the revised 5 November 2026 brief.

## Experience

- V1's full-screen photography, overlaid title and navigation; Manrope typography from V3.
- Four selected spaces: Sumi Bar, Yappari Steak, Arctic White and Dragon Hot Pot.
- A 64-second visual cycle, slow continuous camera movement and 3.2-second dissolves.
- Original 64-second ambient piano score, supplied locally as M4A. Click Sound to start. Audio fades in/out; nothing plays audibly before a user gesture.
- Pause/play, manual scene selection, keyboard and mobile swipe controls; reduced-motion support.
- English default with Chinese toggle; separate project pages, categories and brand filters; SVG arrows.

## Deploy

Import this repository as a new Netlify project: branch `main`, no build command, publish directory `.`. All photos, fonts and music are local; no API key or database is required.

Or unzip the supplied archive and upload the folder containing `index.html` to Netlify Drop.

[Create a separate Netlify project](https://app.netlify.com/start/deploy?repository=https://github.com/Zoetttttt/ddo-cinematic)

## Source

`app.js` contains bilingual content and interactions. `style.css` contains page layout and cinematic styling. `data.js` contains 24 selected portfolio projects. `assets/` contains imagery, Manrope and the original music recording.

The soundtrack was composed and synthesised specifically for this edition. It contains no sampled commercial recording. The original DDO/DCO portfolio images and brand assets retain their respective rights. Manrope's SIL Open Font License is included.

The earlier design editions and their published links remain separate.
