# ghoStrudel

**English** · [中文](./README.zh.md) · [Español](./README.es.md)

ghoStrudel is a local browser workspace for writing, playing and switching [Strudel](https://strudel.cc) live-coding tracks. It gives you a full-screen Strudel editor, a track picker, theme switching, and background / inline visuals for `pianoroll` and `punchcard` patterns.

Use it to keep your own `.strudel.js` sketches in one place, perform them in the browser, and quickly remix the included sample tracks into new arrangements.

## Quick start

```bash
bash scripts/serve.sh
```

Open:

```text
http://localhost:8092/
```

Stop the server with `Ctrl+C` in the terminal that started it.

## Basic workflow

```text
Create or edit a .strudel.js file under tracks/
  ↓
Open the page, or press Cmd/Ctrl + K to switch tracks
  ↓
Press Ctrl + Enter to evaluate and play
  ↓
Edit the code while it runs, then press Ctrl + Enter again to hot-swap
```

Browser edits are temporary. Copy the parts you want to keep back into the matching `.strudel.js` file.

## What is included

- Local static Strudel REPL: loads `@strudel/repl` from a pinned CDN URL, with no `npm install` and no `node_modules`.
- Full-screen CodeMirror editor with Strudel-generated visuals showing behind / under the code.
- Auto-discovered tracks from `tracks/*.strudel.js` and `tracks/*.strudel`.
- Command-palette track switching with `Cmd/Ctrl + K`.
- Seamless hot-swap while playing: the clock keeps running and the new pattern takes over at the current cycle.
- 7 visual themes, switchable from the navbar or with `Ctrl+H` / `Ctrl+L`.
- A playable cheatsheet at `src/cheatsheets.strudel.js` for Strudel syntax and visual helpers.

## Vibe coding with the sample tracks

Use the three city tracks as arrangement templates:

- `tracks/Shanghai.strudel.js` — city pop / future funk: electric-piano chords, funk bass, disco drums, pentatonic lead.
- `tracks/New-York.strudel.js` — boom bap / jazz hip-hop: dusty electric piano, swung drums, lazy bass, lo-fi texture.
- `tracks/Dubai.strudel.js` — desert house / Arabic EDM: Phrygian scale, FM bass, house drums, oud-like melody and percussion.

A practical vibe-coding workflow:

1. Copy the closest sample into a new file under `tracks/`.
2. Ask your coding assistant to keep the same broad structure: `chords / bass / drums / lead / arrange`.
3. Change the genre, tempo, scale, drum feel, sound choices and instrument roles.
4. Keep the visual calls unless you intentionally want to remove graphics:
   - use `._pianoroll()` for melodic, bass and harmony parts
   - use `._punchcard()` for drums and rhythmic parts
   - keep the final `.pianoroll(...)` or `.punchcard(...)` on the full arrangement
5. Refresh the page or use `Cmd/Ctrl+K` to load the new track, then press `Ctrl+Enter`.

This keeps the music editable while preserving the background `pianoroll` / `punchcard` display style.

## Project structure

```text
index.html                  loads @strudel/repl, mounts tracks, handles navbar / themes / tutorial
src/cheatsheets.strudel.js  playable Strudel syntax and feature cheatsheet
src/style.css               layout, editor transparency, visual layering and theme tokens
themes/                     theme CSS files
tracks/                     your own tracks: *.strudel.js / *.strudel
scripts/serve.sh            local HTTP server script, default port 8092
```

## Tracks

The page opens **Shanghai** by default. The track picker auto-reads every `.strudel.js` / `.strudel` file under `tracks/`. The cheatsheet stays pinned at the top as a reference.

Direct URL example:

```text
http://localhost:8092/?file=tracks/Shanghai.strudel.js
```

File names with hyphens, such as `New-York.strudel.js`, display as spaces in the picker and avoid spaces in URLs.

## Shortcuts

| Shortcut | Action |
|---|---|
| `Cmd/Ctrl + K` | Open / close the track picker |
| In the picker: `↑` / `↓` or `Ctrl+P` / `Ctrl+N` | Move the selection |
| In the picker: `Enter` / `Esc` | Load selected track / close |
| `Ctrl + Enter` | Evaluate current code: play or apply changes |
| `Ctrl + .` | Stop |
| `Ctrl + H` / `Ctrl + L` | Previous / next theme |

`Ctrl + Enter` and `Ctrl + .` are Strudel editor shortcuts. Theme switching uses `Ctrl+H/L` because `Cmd` combinations are usually reserved by the browser or OS.

## Visuals

Strudel visuals come from the music code, not from CSS:

```js
.pianoroll(...)      // full-page pitch view
.punchcard(...)      // full-page rhythm / event view
._pianoroll(...)     // inline view under a melodic part
._punchcard(...)     // inline view under a rhythmic part
```

`src/style.css` makes those visuals readable by keeping the editor background transparent, showing Strudel's `body > canvas` behind the code, and giving inline visuals a dark backing.

If visuals disappear, check:

1. the current track still calls `.pianoroll(...)` / `.punchcard(...)` at the end, or inline `._pianoroll()` / `._punchcard()` on the parts you care about
2. `src/style.css` still keeps `.cm-editor` and `.cm-scroller` backgrounds transparent

## Cheatsheet

`src/cheatsheets.strudel.js` is a playable reference for:

- tempo, `stack()`, `arrange()`, `cat()` and `silence`
- mini-notation: `~`, `[]`, `<>`, `*`, `/`, `(3,8)`, `{~ oh}%4`
- pitch and harmony: `note()`, `n()`, `scale()`, `chord()`, `voicing()`, `arp()`
- sounds, samples, effects, modulation, transforms, randomness and visuals

## Dependency

Loaded from a CDN:

```text
https://unpkg.com/@strudel/repl@1.3.0
```

Upsides: light project, no install step, easy to inspect. Limits: first load needs a network connection, and some samples / soundbanks may also need network access.

## License

ghoStrudel's own code (`index.html`, `src/`, `themes/`, `tracks/`, `scripts/`) is licensed under the **MIT License**. Full terms: [`LICENSE.md`](./LICENSE.md).

© 2026 ghosTM55

**Dependency note**: `@strudel/repl`, loaded from the CDN at runtime, is **AGPL-3.0-or-later**. This repo references it via `<script>` and does not bundle, modify or redistribute Strudel's source.
