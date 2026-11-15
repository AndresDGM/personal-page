import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, of } from 'rxjs';
import { PixelSprite } from '../pixel/pixel-sprite';
import { DEMO_BUCKET_URL, S3Bucket, S3Object } from './s3-bucket';
import { S3_SNIPPETS } from './s3-snippets';

type ListState = { status: 'loading' } | { status: 'ok'; items: S3Object[] } | { status: 'error' };

const IMAGE_EXT = /\.(png|jpe?g|gif|webp|svg|avif)$/i;

/** Lista en vivo el bucket público de demos y muestra cómo consumirlo desde varios stacks. */
@Component({
  selector: 'app-s3-demo',
  imports: [DatePipe, PixelSprite],
  templateUrl: './s3-demo.html',
  styleUrl: './s3-demo.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class S3Demo {
  protected readonly bucketUrl = DEMO_BUCKET_URL;
  protected readonly snippets = S3_SNIPPETS;
  protected readonly tab = signal(S3_SNIPPETS[0].id);
  protected readonly snippet = computed(() => this.snippets.find((s) => s.id === this.tab())!);
  protected readonly copied = signal(false);

  protected readonly state = toSignal(
    inject(S3Bucket)
      .list()
      .pipe(
        map((items): ListState => ({ status: 'ok', items })),
        catchError(() => of<ListState>({ status: 'error' })),
      ),
    { initialValue: { status: 'loading' } as ListState },
  );

  protected isImage(key: string): boolean {
    return IMAGE_EXT.test(key);
  }

  protected kb(size: number): string {
    return `${(size / 1024).toFixed(1)} KB`;
  }

  protected async copy(): Promise<void> {
    await navigator.clipboard.writeText(this.snippet().code);
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 1500);
  }
}
