import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { PROJECTS, TECH_GROUPS } from './portfolio.data';

describe('App', () => {
  let compiled: HTMLElement;

  beforeEach(async () => {
    // jsdom no implementa canvas; los sprites simplemente no se dibujan en los tests
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null);
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('muestra el nombre en la portada', () => {
    expect(compiled.querySelector('h1')?.textContent).toContain('Andrés Guevara');
  });

  it('muestra una card por proyecto', () => {
    expect(compiled.querySelectorAll('app-project-card').length).toBe(PROJECTS.length);
  });

  it('cada proyecto enlaza a su repositorio y a su demo desplegada', () => {
    const hrefs = [...compiled.querySelectorAll('app-project-card a')].map((a) =>
      a.getAttribute('href'),
    );
    for (const p of PROJECTS) {
      expect(hrefs).toContain(p.repoUrl);
      expect(hrefs).toContain(p.demoUrl);
    }
  });

  it('agrupa las tecnologías por categoría', () => {
    const titles = [...compiled.querySelectorAll('.tech-groups h3')].map((h) => h.textContent);
    expect(titles).toEqual(TECH_GROUPS.map((g) => g.name));
  });

  it('el marcador cuenta proyectos y tecnologías', () => {
    const hud = compiled.querySelector('.hud')?.textContent ?? '';
    const techs = TECH_GROUPS.flatMap((g) => g.techs).length;
    expect(hud).toContain(`PROYECTOS ${String(PROJECTS.length).padStart(2, '0')}`);
    expect(hud).toContain(`TECNOLOGÍAS ${String(techs).padStart(2, '0')}`);
  });

  it('cada tecnología tiene exactamente un icono, nunca un hueco', () => {
    for (const tech of TECH_GROUPS.flatMap((g) => g.techs)) {
      expect([tech.icon, tech.simpleIcon, tech.logoUrl, tech.sprite].filter(Boolean).length).toBe(1);
    }
  });
});
