import { ANIMATIONS, AnimationName, Grid, PALETTE, SPRITES } from './sprites';

/** Una cuadrícula válida es rectangular y solo usa colores de la paleta o '.' */
function expectValidGrid(grid: Grid): void {
  expect(grid.length).toBeGreaterThan(0);
  const width = grid[0].length;
  for (const row of grid) {
    expect(row.length).toBe(width);
    for (const ch of row) expect(ch === '.' || ch in PALETTE).toBe(true);
  }
}

describe('sprites', () => {
  it('los sprites estáticos son cuadrículas válidas', () => {
    Object.values(SPRITES).forEach(expectValidGrid);
  });

  for (const name of Object.keys(ANIMATIONS) as AnimationName[]) {
    it(`la animación "${name}" tiene fotogramas válidos y del mismo tamaño`, () => {
      const frames = ANIMATIONS[name]();
      expect(frames.length).toBeGreaterThan(1);
      frames.forEach(expectValidGrid);
      const [w, h] = [frames[0][0].length, frames[0].length];
      frames.forEach((f) => expect([f[0].length, f.length]).toEqual([w, h]));
    });
  }

  it('goslint termina con la L verde completa y empieza sin ella', () => {
    const frames = ANIMATIONS.goslint();
    expect(frames[0].join('')).not.toContain('E');
    expect(frames.at(-1)!.join('').match(/E/g)!.length).toBe(15);
  });

  it('mipqr termina con la PQR resuelta (verde)', () => {
    expect(ANIMATIONS.mipqr().at(-1)!.join('')).toContain('G');
  });
});
