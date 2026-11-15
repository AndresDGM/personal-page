/**
 * Sprites pixel art como cuadrículas de texto: cada carácter es un píxel y '.' es transparente.
 * Las animaciones son listas de fotogramas con el mismo formato.
 */
export type Grid = readonly string[];

export const PALETTE: Readonly<Record<string, string>> = {
  K: '#0d1b4d', // contorno azul marino
  N: '#1b2a6b',
  B: '#2f5bff',
  D: '#1239b8',
  L: '#8fb4ff',
  W: '#ffffff',
  C: '#4a5a7a',
  R: '#ff4d6d',
  G: '#28c840',
  A: '#c3cbd6',
  O: '#ffb020',
  Y: '#ffe066',
  U: '#b7410e', // óxido (RustFS)
  X: '#121212', // negro del logo de Goslint
  E: '#00bf63', // verde del logo de Goslint
};

export const SPRITES = {
  cloud: [
    '....CCCC........',
    '...CWWWWCCCC....',
    '.CCWWWWWWWWWCC..',
    'CWWWWWWWWWWWWWC.',
    'CWLLLLLLLLLLLLWC',
    '.CCCCCCCCCCCCCC.',
  ],
  server: ['KKKKKKKKKK', 'KLLLLLLGLK', 'KKKKKKKKKK', 'KLLLLLLGLK', 'KKKKKKKKKK', 'KLLLLLLGLK', 'KKKKKKKKKK'],
  terminal: ['KKKKKKKKKK', 'KNNNNNNNNK', 'KNLNNNNNNK', 'KNNLNNNNNK', 'KNLNNLLNNK', 'KNNNNNNNNK', 'KKKKKKKKKK'],
  gamepad: [
    '..KKKKKKKK..',
    '.KBBBBBBBBK.',
    'KBBLBBBBBRBK',
    'KBLLLBBBRBRK',
    'KBBLBBBBBRBK',
    '.KBBBBBBBBK.',
    '..KKKKKKKK..',
  ],
  // Iconos de tecnologías sin logo oficial: dibujos que representan lo que hacen.
  /** WebSocket: canal bidireccional. */
  websocket: [
    '......B...',
    '......BB..',
    '.BBBBBBBB.',
    '......BB..',
    '......B...',
    '...D......',
    '..DD......',
    '.DDDDDDDD.',
    '..DD......',
    '...D......',
  ],
  /** SSE: el servidor emite un flujo hacia el cliente. */
  sse: ['KKKK......', 'KLGK...B..', 'KKKK...BB.', 'KLGKB.BBBB', 'KKKK...BB.', 'KLGK...B..', 'KKKK......'],
  /** RustFS: almacenamiento de objetos (un bucket) color óxido. */
  bucket: [
    '.KKKKKKKK.',
    'KOOOOOOOOK',
    '.KKKKKKKK.',
    '.KUUUUUUK.',
    '.KUOUUUUK.',
    '..KUUUUK..',
    '..KUUUUK..',
    '..KKKKKK..',
  ],
  /** Scrum: tablero con tareas por hacer, en curso y hechas. */
  board: [
    'KKKKKKKKKK',
    'KYYKLLKGGK',
    'K..K..K..K',
    'KYYK..KGGK',
    'K..KLLK..K',
    'KYYK..KGGK',
    'K..K..K..K',
    'KKKKKKKKKK',
  ],
  /** IoT: señal inalámbrica. */
  wifi: ['..BBBBBB..', '.B......B.', 'B..BBBB..B', '..B....B..', '....BB....', '....BB....'],
  trophy: [
    '..KKKKKKKK..',
    'KKKYWYYYOKKK',
    'K.KYYYYYOK.K',
    '.KKYYYYYOKK.',
    '...KYYYOK...',
    '....KYOK....',
    '....KYOK....',
    '...KKKKKK...',
    '..KDDDDDDK..',
    '..KKKKKKKK..',
  ],
  cap: ['....KKKK....', '..KKBBBBKK..', 'KKBBBBBBBBKK', '.KKKBBBBKKK.', '...KBBBBK...', '...KKKKKK...'],
} satisfies Record<string, Grid>;

export type SpriteName = keyof typeof SPRITES;

// Logo de Goslint: hexágono negro en forma de G con la L verde (E) dentro.
const GOSLINT: Grid = [
  '........XX........',
  '....E.XXXXXX......',
  '....E.XX..XXXX....',
  '..XXE.X.....XXXX..',
  '.XXXE.X.......XXX.',
  '.XX.E..........XX.',
  '.XX.E.........XX..',
  '.XX.E.............',
  '.XX.E..........XX.',
  '.XX.E........XXXX.',
  '.XX.E.....XXXXXXX.',
  '.XX.E..........XX.',
  '.XXX.EE.......XXX.',
  '..XXXX.EE...XXXX..',
  '....XXXX..XXXX....',
  '......XXXXXX......',
  '........XX........',
];
const DOC: Grid = [
  'KKKKKKK...',
  'KWWWWWKK..',
  'KWLLLWKWK.',
  'KWWWWWKKKK',
  'KWLLLLLLWK',
  'KWWWWWWWWK',
  'KWLLLLLWWK',
  'KWWWWWWWWK',
  'KW1W2W3WWK',
  'KWWWWWWWWK',
  'KKKKKKKKKK',
];
const DB: Grid = [
  '.KKKKKKKK.',
  'KLLLLLLLLK',
  'KKKKKKKKKK',
  'KBBBBBB1BK',
  'KKKKKKKKKK',
  'KBBBBBB2BK',
  'KKKKKKKKKK',
  'KBBBBBB3BK',
  '.KKKKKKKK.',
];
const NET: Grid = [
  'KKKKK......KKKKK',
  'KLLLK......KLLGK',
  'KLLLKAAAAAAKKKKK',
  'KKKKK......KLLGK',
  '..K........KKKKK',
  '.KKK............',
];

const blank = (w: number, h: number): string[][] =>
  Array.from({ length: h }, () => Array<string>(w).fill('.'));
const toGrid = (g: string[][]): Grid => g.map((r) => r.join(''));

/** Pinta `rows` sobre `g` en (x, y), ignorando la transparencia y lo que quede fuera. */
function stamp(g: string[][], rows: Grid, x: number, y: number): void {
  rows.forEach((row, j) =>
    [...row].forEach((ch, i) => {
      if (ch !== '.' && g[y + j]?.[x + i] !== undefined) g[y + j][x + i] = ch;
    }),
  );
}

export const ANIMATIONS = {
  /** La L verde del logo se dibuja trazo a trazo: primero la vertical, luego la diagonal. */
  goslint(): Grid[] {
    const base = GOSLINT.map((r) => r.replace(/E/g, '.'));
    const cells: [number, number][] = [];
    GOSLINT.forEach((r, j) => [...r].forEach((ch, i) => ch === 'E' && cells.push([j, i])));
    return [
      base,
      ...cells.map((_, n) => {
        const g = base.map((r) => [...r]);
        cells.slice(0, n + 1).forEach(([j, i]) => (g[j][i] = 'E'));
        return toGrid(g);
      }),
    ];
  },

  /** La PQR avanza de estado: recibida → en proceso → resuelta. */
  mipqr(): Grid[] {
    const states = [
      ['A', 'A', 'A'],
      ['B', 'A', 'A'],
      ['B', 'B', 'A'],
      ['B', 'B', 'G'],
    ];
    return states.map((st) => DOC.map((r) => r.replace(/[123]/g, (d) => st[+d - 1])));
  },

  /** Los datos llenan cada capa del almacenamiento y su LED se enciende. */
  storage(): Grid[] {
    const frames: Grid[] = [];
    for (let n = 0; n <= 9; n++) {
      frames.push(
        DB.map((r, j) => {
          const layer = [3, 5, 7].indexOf(j);
          if (layer < 0) return r;
          const fill = Math.max(0, Math.min(3, n - layer * 3)) * 2;
          return r
            .replace(/B{6}/, 'L'.repeat(fill) + 'B'.repeat(6 - fill))
            .replace(/\d/, fill === 6 ? 'G' : 'N');
        }),
      );
    }
    return frames;
  },

  /** Una petición viaja del cliente al servidor y vuelve la respuesta. */
  net(): Grid[] {
    const at = (i: number, c: string) =>
      NET.map((r, j) => (j === 2 ? r.slice(0, i) + c + r.slice(i + 1) : r));
    const path = [5, 6, 7, 8, 9, 10];
    return [...path.map((i) => at(i, 'B')), ...[...path].reverse().map((i) => at(i, 'G')), NET];
  },

  /** Un cohete (como el logo de Astro) despega, sale por arriba y vuelve a aterrizar. */
  rocket(): Grid[] {
    const W = 11, H = 16, X = 2, IDLE = 5;
    const body = ['...K...', '..KBK..', '.KBBBK.', '.KBWBK.', '.KBBBK.', '.KBBBK.', 'KKBBBKK', 'KDKKKDK'];
    const small = ['..OYO..', '...O...'];
    const big = ['.OYYYO.', '..OYO..', '...O...'];
    const stars = [[0, 1], [10, 3], [9, 12], [1, 9]];
    const frame = (y: number, flame: string[], n: number): Grid => {
      const g = blank(W, H);
      stars.forEach(([x, sy], k) => (g[sy][x] = (n + k) % 2 ? 'L' : 'W'));
      stamp(g, [...body, ...flame], X, y);
      return toGrid(g);
    };
    const frames: Grid[] = [];
    for (let n = 0; n < 4; n++) frames.push(frame(IDLE, n % 2 ? big : small, n));
    for (let y = IDLE - 2; y >= -11; y -= 2) frames.push(frame(y, big, frames.length));
    for (let y = H; y > IDLE; y -= 2) frames.push(frame(y, small, frames.length));
    frames.push(frame(IDLE, small, 0));
    return frames;
  },

  /** Tres módulos caen y se apilan. */
  modules(): Grid[] {
    const W = 10, H = 11;
    const blocks: [x: number, y: number, w: number, h: number, c: string][] = [
      [0, 7, 5, 4, 'B'],
      [5, 7, 5, 4, 'L'],
      [2, 3, 6, 4, 'D'],
    ];
    const box = (w: number, h: number, c: string): Grid =>
      Array.from({ length: h }, (_, j) =>
        j === 0 || j === h - 1 ? 'K'.repeat(w) : 'K' + c.repeat(w - 2) + 'K',
      );
    const frames: Grid[] = [];
    blocks.forEach(([x, finalY, w, h, c], k) => {
      for (let y = -h; ; y += 2) {
        y = Math.min(y, finalY);
        const g = blank(W, H);
        blocks.slice(0, k).forEach(([px, py, pw, ph, pc]) => stamp(g, box(pw, ph, pc), px, py));
        stamp(g, box(w, h, c), x, y);
        frames.push(toGrid(g));
        if (y === finalY) break;
      }
    });
    return frames;
  },
} satisfies Record<string, () => Grid[]>;

export type AnimationName = keyof typeof ANIMATIONS;

/** Dibuja la cuadrícula en el canvas, un rectángulo por píxel y sin antialiasing. */
export function drawGrid(canvas: HTMLCanvasElement, grid: Grid, scale: number): void {
  canvas.width = grid[0].length * scale;
  canvas.height = grid.length * scale;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  grid.forEach((row, j) =>
    [...row].forEach((ch, i) => {
      if (ch === '.') return;
      ctx.fillStyle = PALETTE[ch];
      ctx.fillRect(i * scale, j * scale, scale, scale);
    }),
  );
}
