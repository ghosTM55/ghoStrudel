# ghoStrudel

[English](./README.md) · [中文](./README.zh.md) · **Español**

ghoStrudel es un espacio de trabajo local en el navegador para escribir, reproducir y cambiar pistas de live coding con [Strudel](https://strudel.cc). Incluye un editor Strudel a pantalla completa, selector de pistas, cambio de temas y visualizaciones de fondo / en línea para patrones `pianoroll` y `punchcard`.

Úsalo para mantener tus propios bocetos `.strudel.js` en un solo lugar, tocarlos en el navegador y remezclar rápidamente las pistas de ejemplo incluidas para crear nuevos arreglos.

## Inicio rápido

```bash
bash scripts/serve.sh
```

Abre:

```text
http://localhost:8092/
```

Detén el servidor con `Ctrl+C` en la terminal que lo inició.

## Flujo básico

```text
Crea o edita un archivo .strudel.js dentro de tracks/
  ↓
Abre la página, o pulsa Cmd/Ctrl + K para cambiar de pista
  ↓
Pulsa Ctrl + Enter para evaluar y reproducir
  ↓
Edita el código mientras suena, y pulsa Ctrl + Enter otra vez para hacer hot-swap
```

Las ediciones en el navegador son temporales. Copia las partes que quieras conservar de vuelta al archivo `.strudel.js` correspondiente.

## Qué incluye

- REPL local y estático de Strudel: carga `@strudel/repl` desde un CDN fijado, sin `npm install` y sin `node_modules`.
- Editor CodeMirror a pantalla completa con visualizaciones generadas por Strudel detrás / debajo del código.
- Descubrimiento automático de pistas desde `tracks/*.strudel.js` y `tracks/*.strudel`.
- Selector de pistas con paleta de comandos mediante `Cmd/Ctrl + K`.
- Hot-swap sin cortes mientras suena: el reloj sigue corriendo y el nuevo patrón entra en el ciclo actual.
- 7 temas visuales, cambiables desde la barra o con `Ctrl+H` / `Ctrl+L`.
- Una cheatsheet reproducible en `src/cheatsheets.strudel.js` para sintaxis y ayudas visuales de Strudel.

## Vibe coding con las pistas de ejemplo

Usa las tres pistas de ciudad como plantillas de arreglo:

- `tracks/Shanghai.strudel.js` — city pop / future funk: acordes de piano eléctrico, bajo funk, batería disco, melodía pentatónica.
- `tracks/New-York.strudel.js` — boom bap / jazz hip-hop: piano eléctrico polvoriento, batería con swing, bajo relajado, textura lo-fi.
- `tracks/Dubai.strudel.js` — desert house / Arabic EDM: escala frigia, bajo FM, batería house, melodía tipo oud y percusión.

Flujo práctico de vibe coding:

1. Copia el ejemplo más cercano a tu intención en un nuevo archivo dentro de `tracks/`.
2. Pide a tu asistente de código que mantenga la misma estructura general: `chords / bass / drums / lead / arrange`.
3. Cambia el género, tempo, escala, feel de batería, sonidos y roles de instrumentos.
4. Conserva las llamadas visuales salvo que quieras quitar los gráficos:
   - usa `._pianoroll()` para partes melódicas, bajos y armonías
   - usa `._punchcard()` para baterías y partes rítmicas
   - conserva el `.pianoroll(...)` o `.punchcard(...)` final sobre el arreglo completo
5. Recarga la página o usa `Cmd/Ctrl+K` para cargar la nueva pista, y pulsa `Ctrl+Enter`.

Así puedes editar la música manteniendo el estilo visual de fondo `pianoroll` / `punchcard`.

## Estructura del proyecto

```text
index.html                  carga @strudel/repl, monta pistas, gestiona barra / temas / tutorial
src/cheatsheets.strudel.js  cheatsheet reproducible de sintaxis y funciones de Strudel
src/style.css               layout, transparencia del editor, capas visuales y tokens de tema
themes/                     archivos CSS de temas
tracks/                     tus pistas: *.strudel.js / *.strudel
scripts/serve.sh            servidor HTTP local, puerto por defecto 8092
```

## Pistas

La página abre **Shanghai** por defecto. El selector lee automáticamente todos los archivos `.strudel.js` / `.strudel` dentro de `tracks/`. La cheatsheet queda fijada arriba como referencia.

Ejemplo de URL directa:

```text
http://localhost:8092/?file=tracks/Shanghai.strudel.js
```

Los nombres con guion, como `New-York.strudel.js`, se muestran con espacios en el selector y evitan espacios en la URL.

## Atajos

| Atajo | Acción |
|---|---|
| `Cmd/Ctrl + K` | Abrir / cerrar el selector de pistas |
| En el selector: `↑` / `↓` o `Ctrl+P` / `Ctrl+N` | Mover la selección |
| En el selector: `Enter` / `Esc` | Cargar la pista seleccionada / cerrar |
| `Ctrl + Enter` | Evaluar el código actual: reproducir o aplicar cambios |
| `Ctrl + .` | Parar |
| `Ctrl + H` / `Ctrl + L` | Tema anterior / siguiente |

`Ctrl + Enter` y `Ctrl + .` son atajos del editor de Strudel. El cambio de tema usa `Ctrl+H/L` porque muchas combinaciones con `Cmd` están reservadas por el navegador o el sistema.

## Visuales

Los visuales de Strudel vienen del código musical, no de CSS:

```js
.pianoroll(...)      // vista de altura a pantalla completa
.punchcard(...)      // vista de ritmo / eventos a pantalla completa
._pianoroll(...)     // vista en línea bajo una parte melódica
._punchcard(...)     // vista en línea bajo una parte rítmica
```

`src/style.css` hace que esos visuales sean legibles: mantiene transparente el fondo del editor, muestra el `body > canvas` de Strudel detrás del código y da un fondo oscuro a los visuales en línea.

Si desaparecen los visuales, revisa primero:

1. que la pista actual aún termine con `.pianoroll(...)` / `.punchcard(...)`, o que las partes importantes aún tengan `._pianoroll()` / `._punchcard()`
2. que `src/style.css` aún mantenga transparentes los fondos de `.cm-editor` y `.cm-scroller`

## Cheatsheet

`src/cheatsheets.strudel.js` es una referencia reproducible para:

- tempo, `stack()`, `arrange()`, `cat()` y `silence`
- mini-notación: `~`, `[]`, `<>`, `*`, `/`, `(3,8)`, `{~ oh}%4`
- altura y armonía: `note()`, `n()`, `scale()`, `chord()`, `voicing()`, `arp()`
- sonidos, samples, efectos, modulación, transformaciones, azar y visuales

## Dependencia

Cargada desde un CDN:

```text
https://unpkg.com/@strudel/repl@1.3.0
```

Ventajas: proyecto ligero, sin instalación, fácil de inspeccionar. Límites: la primera carga necesita conexión de red, y algunos samples / soundbanks también pueden necesitar red.

## Licencia

El código propio de ghoStrudel (`index.html`, `src/`, `themes/`, `tracks/`, `scripts/`) está bajo la **MIT License**. Términos completos: [`LICENSE.md`](./LICENSE.md).

© 2026 ghosTM55

**Nota sobre la dependencia**: `@strudel/repl`, cargado desde el CDN en tiempo de ejecución, es **AGPL-3.0-or-later**. Este repositorio lo referencia mediante `<script>` y no empaqueta, modifica ni redistribuye el código fuente de Strudel.
