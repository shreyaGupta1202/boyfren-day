# Boyfriend's Day static site

## Before sharing

1. In `script.js`, replace `const EVENT_DATE = "YYYY-MM-DD"` with the event's IST date, for example `"2026-10-12"`.
2. Add the supplied background and font files in `images/` with these names:
   - `red-background.jpg`
   - `Handsome.woff2`
   - `Versailles.woff2`

The stickers and welcome video already have their expected names. All itinerary content and map URLs are together at the top of `script.js` for simple editing.

## Run locally

Open `index.html` in a browser, or from this folder run `python3 -m http.server 8000` and visit `http://localhost:8000`. A local server best matches mobile browser video behavior.

## Publish for free

### Netlify (fastest)

Create an account at Netlify, select **Add new site** → **Deploy manually**, and drag this project folder onto the drop zone. Netlify immediately gives a shareable HTTPS URL. You can change its generated site name in Site configuration.

### GitHub Pages

Create a new GitHub repository, upload these files (including `images/`), then go to **Settings** → **Pages**. Set the source to **Deploy from a branch**, choose `main` and `/ (root)`, and save. GitHub will show the public URL after the deploy finishes.
