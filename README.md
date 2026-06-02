# Space Exploration Website

A static, responsive website showcasing space missions, planets, astronauts and related visual content.

This repository contains a small front-end site built with HTML, CSS and vanilla JavaScript. It features a unified galaxy background, animated starfield, mission cards with a modal detail view, and accessible navigation.

**Features**
- Landing page / Home with hero, stats and calls-to-action
- Missions grid with two-cards-per-row layout and modal details
- Planet, Astronauts and Dashboard pages
- CSS starfield + nebula visual theme across pages
- JS-driven modal content and image metadata (images are sourced from `missions.js`)
- Accessible markup: keyboard-openable cards and focus outlines

**Project Structure**
- `Index.html` — Home page (landing)
- `index.css`, `index.js` — Styles and scripts for the home page
- `missions.html`, `missions.css`, `missions.js` — Missions grid and modal logic
- `planet.html`, `planet.css`, `planet.js` — Planet page
- `astronauts.html`, `astronauts.css`, `astronauts.js` — Astronauts page
- `dashboard.html`, `dashboard.css`, `dashboard.js` — Dashboard / utilities
- `Images/` — Local image assets used by the site
- `README.md` — This file

Note: The repository root folder name in this workspace is "Space Explartion Website" (minor typo).


## Local Development

Open the site directly in a browser by opening `Index.html`, or serve the directory with a lightweight server for correct asset/href behavior:

Python 3 built-in HTTP server:

```bash
python -m http.server 8000
```

Then open http://localhost:8000/Index.html in your browser.

Alternatively, use VS Code Live Server extension or any static file server like `http-server` (npm).


## How images are handled

Mission card and modal images are driven from the `MISSIONS` object in `missions.js`. To update a mission's photo, edit the `photo` and `photoAlt` fields in `missions.js`. The page syncs card thumbnails with the JS data on load and opens the modal using the same source.

Images are stored in the `Images/` directory — keep high-quality, web-appropriate sizes for best results.


## Contributing

Contributions are welcome. Suggested workflow:
1. Fork the repository
2. Create a feature branch: `git checkout -b feat/describe-change`
3. Make changes, run local checks
4. Commit and push, then open a Pull Request

Please keep changes focused and consistent with the existing visual style.


## License

This project is unlicensed by default. If you want to add a license, consider adding an `LICENSE` file (MIT, Apache-2.0, etc.).


## Credits
- Design and implementation by the project author
- Public domain / Wikimedia images where applicable — verify upstream license when republishing


## Contact
If you'd like help improving this site, testing pages across devices, or consolidating repeated CSS into a shared stylesheet, let me know and I can implement those changes.