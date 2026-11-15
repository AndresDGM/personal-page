/** Ejemplos para consumir el bucket público de demos desde distintos stacks. */
export interface Snippet {
  id: string;
  label: string;
  file: string;
  code: string;
}

export const S3_SNIPPETS: Snippet[] = [
  {
    id: 'node',
    label: 'Node.js',
    file: 'demo.mjs (Node 18+, sin dependencias)',
    code: `import { writeFile } from 'node:fs/promises';

const BASE = 'https://s3.goslintjudge.app/demo';

// 1. Listar los objetos del bucket (ListObjectsV2)
const xml = await (await fetch(\`\${BASE}?list-type=2\`)).text();
const keys = [...xml.matchAll(/<Key>(.*?)<\\/Key>/g)].map((m) => m[1]);
console.log(keys);

// 2. Descargar un archivo: en un bucket público basta con su URL
const res = await fetch(\`\${BASE}/\${encodeURIComponent(keys[0])}\`);
await writeFile(keys[0], Buffer.from(await res.arrayBuffer()));`,
  },
  {
    id: 'angular',
    label: 'Angular',
    file: 'demo-bucket.ts (requiere provideHttpClient())',
    code: `import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DemoBucket {
  private readonly http = inject(HttpClient);
  private readonly base = 'https://s3.goslintjudge.app/demo';

  /** Nombres de los objetos del bucket (ListObjectsV2). */
  list(): Observable<string[]> {
    return this.http.get(\`\${this.base}?list-type=2\`, { responseType: 'text' }).pipe(
      map((xml) => new DOMParser().parseFromString(xml, 'application/xml')),
      map((doc) => [...doc.getElementsByTagName('Key')].map((k) => k.textContent ?? '')),
    );
  }

  /** URL pública para usar en <img [src]>, <a [href]>, etc. */
  url(key: string): string {
    return \`\${this.base}/\${encodeURIComponent(key)}\`;
  }
}`,
  },
  {
    id: 'spring',
    label: 'Spring Boot',
    file: 'DemoController.java (software.amazon.awssdk:s3)',
    code: `@Configuration
class S3Config {
  @Bean
  S3Client s3Client() {
    return S3Client.builder()
        .endpointOverride(URI.create("https://s3.goslintjudge.app"))
        .region(Region.US_EAST_1)          // RustFS ignora la región, pero el SDK la exige
        .forcePathStyle(true)              // https://host/bucket/key
        .credentialsProvider(AnonymousCredentialsProvider.create()) // bucket público
        .build();
  }
}

@RestController
@RequestMapping("/api/demo")
class DemoController {
  private final S3Client s3;

  DemoController(S3Client s3) {
    this.s3 = s3;
  }

  @GetMapping
  List<String> list() {
    return s3.listObjectsV2(r -> r.bucket("demo")).contents().stream()
        .map(S3Object::key)
        .toList();
  }

  @GetMapping("/{key}")
  ResponseEntity<byte[]> get(@PathVariable String key) {
    var obj = s3.getObjectAsBytes(r -> r.bucket("demo").key(key));
    return ResponseEntity.ok()
        .contentType(MediaType.parseMediaType(obj.response().contentType()))
        .body(obj.asByteArray());
  }
}`,
  },
];
