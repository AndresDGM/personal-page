import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { DEMO_BUCKET_URL, S3Bucket, parseListObjects } from './s3-bucket';

const XML = `<?xml version="1.0" encoding="UTF-8"?>
<ListBucketResult xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
  <Name>demo</Name><KeyCount>2</KeyCount>
  <Contents><Key>logo.png</Key><LastModified>2026-11-14T23:55:44.652Z</LastModified><Size>2048</Size></Contents>
  <Contents><Key>carpeta/mi archivo.txt</Key><LastModified>2026-11-14T23:55:24.114Z</LastModified><Size>10</Size></Contents>
</ListBucketResult>`;

describe('parseListObjects', () => {
  it('lee clave, tamaño y fecha de cada objeto', () => {
    const [logo] = parseListObjects(XML, 'https://s3.example/demo');
    expect(logo).toEqual({
      key: 'logo.png',
      size: 2048,
      lastModified: '2026-11-14T23:55:44.652Z',
      url: 'https://s3.example/demo/logo.png',
    });
  });

  it('codifica cada segmento de la clave en la URL, sin romper las carpetas', () => {
    const [, file] = parseListObjects(XML, 'https://s3.example/demo');
    expect(file.url).toBe('https://s3.example/demo/carpeta/mi%20archivo.txt');
  });

  it('devuelve una lista vacía si el bucket no tiene objetos', () => {
    expect(parseListObjects('<ListBucketResult/>', 'https://s3.example/demo')).toEqual([]);
  });
});

describe('S3Bucket', () => {
  it('pide ListObjectsV2 al bucket de demos', () => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    const http = TestBed.inject(HttpTestingController);
    let keys: string[] = [];

    TestBed.inject(S3Bucket)
      .list()
      .subscribe((items) => (keys = items.map((i) => i.key)));
    http.expectOne(`${DEMO_BUCKET_URL}?list-type=2`).flush(XML);

    expect(keys).toEqual(['logo.png', 'carpeta/mi archivo.txt']);
    http.verify();
  });
});
