import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

/** Bucket público de demos en mi RustFS (compatible con S3). */
export const DEMO_BUCKET_URL = 'https://s3.goslintjudge.app/demo';

export interface S3Object {
  key: string;
  size: number;
  lastModified: string;
  url: string;
}

/** Lee la respuesta XML de ListObjectsV2 y devuelve los objetos con su URL pública. */
export function parseListObjects(xml: string, baseUrl: string): S3Object[] {
  const doc = new DOMParser().parseFromString(xml, 'application/xml');
  return [...doc.getElementsByTagName('Contents')].map((c) => {
    const text = (tag: string) => c.getElementsByTagName(tag)[0]?.textContent ?? '';
    const key = text('Key');
    return {
      key,
      size: Number(text('Size')),
      lastModified: text('LastModified'),
      url: `${baseUrl}/${key.split('/').map(encodeURIComponent).join('/')}`,
    };
  });
}

@Injectable({ providedIn: 'root' })
export class S3Bucket {
  private readonly http = inject(HttpClient);

  list(baseUrl = DEMO_BUCKET_URL): Observable<S3Object[]> {
    return this.http
      .get(`${baseUrl}?list-type=2`, { responseType: 'text' })
      .pipe(map((xml) => parseListObjects(xml, baseUrl)));
  }
}
