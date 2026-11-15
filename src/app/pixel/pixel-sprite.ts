import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  afterRenderEffect,
  input,
  viewChild,
} from '@angular/core';
import { SPRITES, SpriteName, drawGrid } from './sprites';

/** Sprite pixel art estático dibujado en un canvas. */
@Component({
  selector: 'app-pixel-sprite',
  template: '<canvas #canvas aria-hidden="true"></canvas>',
  styles: ':host { display: block; } canvas { display: block; image-rendering: pixelated; }',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PixelSprite {
  readonly name = input.required<SpriteName>();
  readonly scale = input(4);

  private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

  constructor() {
    afterRenderEffect(() =>
      drawGrid(this.canvas().nativeElement, SPRITES[this.name()], this.scale()),
    );
  }
}
