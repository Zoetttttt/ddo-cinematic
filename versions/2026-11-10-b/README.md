# D Design Office — revision 3 (10 November 2026)

Standalone bilingual website. Build command: blank. Netlify publish directory: `.`. Branch: `main`.

## Updated experience

- A single canvas render clock connects the damped DDO spring, centred O, small dot, circular reveal of the first model, aligned rapid model dissolves, and the final frame morphing into the actual header logo. All thirteen supplied frames are decoded before playback. Cropping is performed by the renderer using source bounds; the image files are retained, presentation borders are excluded and the model artwork is centred in a common display envelope. No artwork is redrawn. Click anywhere, Enter, Space or Escape dissolves the opening into geometric fragments; there is no visible skip button. The opening runs once per tab and the small homepage dot replays it. Reduced-motion users enter directly.
- Geometric Jost typography chosen to follow the monoline circular forms of the supplied logo wordmark. Jost is not claimed to be a verified identification of the original logo font. Its open font licence is included.
- Five homepage scenes in order: Sumi Bar, Arctic White, KOKO / More Fun video, Dragon Hot Pot, Yebisu. The supplied video was already 3838 × 2158; this original resolution is preserved in the desktop version, with a 1920-wide version for mobile. Standard colour conversion and high-quality web encoding are used; no generative detail was added.
- The homepage uses the original cinematic edition’s 3.2-second photo dissolves, 32-second camera drift and 16-second still-image timing, with the requested five-scene order and More Fun video. The background does not move with the pointer. Existing Jost typography and music are retained. The cursor gently expands over clickable controls, which have restrained elastic hover feedback. Navigation indicators remain centred under the text labels.
- The bilingual Services page has DDO’s own asymmetric masthead, orbital brand detail, two-by-two open service fields, offset panoramic photograph and editorial dialogue. It retains the requested clarity and spacing while moving away from the reference page’s centred title, four-column structure and diptych.
- Purple Projects accent; Food & Beverage and Immersive Space category names.
- Red Studio accent; the large D-shaped mark has no inner letter. Six team portraits and the supplied introduction are included.
- New photography comes from the supplied Dropbox banner originals and print-quality portfolio. The full supplied team JPEG is retained at `assets/team-story-original.jpg`; portrait views are cropped for the page without redrawing their content.

## Versions

[Latest](https://zoetttttt.github.io/ddo-cinematic/) · [10 November earlier revision](https://zoetttttt.github.io/ddo-cinematic/versions/2026-11-10-a/) · [9 November edition](https://zoetttttt.github.io/ddo-cinematic/versions/2026-11-09/) · [Original cinematic edition](https://zoetttttt.github.io/ddo-cinematic/versions/2026-11-05/) · [Version index](https://zoetttttt.github.io/ddo-cinematic/versions/)

The original cinematic website is the 5 November edition, an immutable snapshot of commit ed8582b, before Services and the model opening were added. This is the original requested by the user, rather than the 9 November redesign. The 9 November edition preserves outgoing commit 60c37bbfd588c0bce5f0b99b733f3d653583d714 before this revision. The earlier 10 November revision preserves commit eef0f66c5d7c9483b36be51dff70304a4cde2341. SHA-256 checksums are supplied under `versions/`. These dated directories must not be modified by subsequent revisions; see `AGENTS.md`.

## Editing

`app.js`: bilingual content and interactions. `data.js`: projects. `style.css`: typography, layout, animation and colour accents. Assets are local. No build, database or API key is required.

All DDO/DCO artwork and photographs remain the property of their respective rights holders. The original website score is retained. Open font licences accompany their fonts.
