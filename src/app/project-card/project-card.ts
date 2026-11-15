import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { Project } from '../portfolio.data';
import { ANIMATIONS, drawGrid } from '../pixel/sprites';

/** Fotogramas extra en el último dibujo antes de repetir el bucle. */
const HOLD_FRAMES = 6;

/**
 * Card de proyecto. Su icono pixel se anima una vez al entrar en pantalla
 * y en bucle mientras la card tiene hover o foco.
 */
@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.html',
  styleUrl: './project-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(mouseenter)': 'play(true)',
    '(focusin)': 'play(true)',
  },
})
export class ProjectCard {
  readonly project = input.required<Project>();

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private readonly frames = computed(() => {
    const anim = ANIMATIONS[this.project().animation]();
    return [...anim, ...Array(HOLD_FRAMES).fill(anim.at(-1)!)];
  });
  private timer: ReturnType<typeof setInterval> | undefined;
  private reduceMotion = false;

  constructor() {
    const destroyRef = inject(DestroyRef);
    destroyRef.onDestroy(() => clearInterval(this.timer));
    afterNextRender(() => {
      this.reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
      this.draw(this.frames().length - 1);
      if (typeof IntersectionObserver === 'undefined') return;
      const io = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          this.play(false);
          io.disconnect();
        },
        { threshold: 0.6 },
      );
      io.observe(this.host.nativeElement);
      destroyRef.onDestroy(() => io.disconnect());
    });
  }

  protected play(loop: boolean): void {
    if (this.reduceMotion || this.timer) return;
    let f = 0;
    this.timer = setInterval(() => {
      this.draw(f);
      if (++f < this.frames().length) return;
      if (loop && this.host.nativeElement.matches(':hover, :focus-within')) f = 0;
      else {
        clearInterval(this.timer);
        this.timer = undefined;
      }
    }, this.project().frameMs);
  }

  private draw(i: number): void {
    drawGrid(this.canvas().nativeElement, this.frames()[i], this.project().scale);
  }
}
