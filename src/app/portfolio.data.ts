import { AnimationName, SpriteName } from './pixel/sprites';

export interface Project {
  name: string;
  description: string;
  stack: string[];
  demoUrl: string;
  repoUrl: string;
  /** Animación pixel art propia de la card. */
  animation: AnimationName;
  scale: number;
  frameMs: number;
  /** Aún se despliega a mano; falta migrarlo a GitHub Actions. */
  manualDeploy?: boolean;
}

export interface Like {
  title: string;
  text: string;
  sprite: SpriteName;
}

/** Cada tecnología lleva exactamente una fuente de icono. */
export interface Tech {
  label: string;
  /** Ruta dentro de Devicon (sin la extensión .svg). */
  icon?: string;
  /** Slug de Simple Icons, para logos que Devicon no tiene. */
  simpleIcon?: string;
  /** URL directa del logo oficial cuando no está en ningún catálogo. */
  logoUrl?: string;
  /** Icono pixel propio cuando la tecnología no tiene logo oficial. */
  sprite?: SpriteName;
}

export interface TechGroup {
  name: string;
  techs: Tech[];
}

export const LIKES: Like[] = [
  { title: 'DevOps', text: 'Mantener y administrar servidores.', sprite: 'server' },
  { title: 'Backend', text: 'APIs, datos y lógica de servidor.', sprite: 'terminal' },
  { title: 'Videojuegos', text: 'Desarrollarlos, no solo jugarlos.', sprite: 'gamepad' },
  {
    title: 'Programación competitiva',
    text: 'Maratones de programación; mi trabajo de grado es un juez en línea para ellas.',
    sprite: 'trophy',
  },
  { title: 'Enseñar', text: 'Explicar lo que aprendo; sigo practicando.', sprite: 'cap' },
];

export const TECH_GROUPS: TechGroup[] = [
  {
    name: 'Frontend',
    techs: [
      { label: 'Angular', icon: 'angular/angular-original' },
      { label: 'TypeScript', icon: 'typescript/typescript-original' },
      { label: 'HTML', icon: 'html5/html5-original' },
      { label: 'Sass', icon: 'sass/sass-original' },
      { label: 'Astro', icon: 'astro/astro-original' },
    ],
  },
  {
    name: 'Backend',
    techs: [
      { label: 'Node.js', icon: 'nodejs/nodejs-original' },
      { label: 'Express', icon: 'express/express-original' },
      { label: 'Python', icon: 'python/python-original' },
      { label: 'C/C++', icon: 'cplusplus/cplusplus-original' },
    ],
  },
  {
    name: 'Java',
    techs: [
      { label: 'Java', icon: 'java/java-original' },
      { label: 'Spring Boot', icon: 'spring/spring-original' },
      { label: 'JPA', sprite: 'jpa' },
      { label: 'JSP', sprite: 'jsp' },
      { label: 'PrimeFaces', simpleIcon: 'primefaces' },
      { label: 'Java Swing', sprite: 'swing' },
    ],
  },
  {
    name: 'Tiempo real y mensajería',
    techs: [
      { label: 'WebSocket', sprite: 'websocket' },
      { label: 'SSE', sprite: 'sse' },
      { label: 'MQTT', simpleIcon: 'mqtt' },
      { label: 'Sockets TCP/UDP', sprite: 'sockets' },
      { label: 'RabbitMQ', icon: 'rabbitmq/rabbitmq-original' },
    ],
  },
  {
    name: 'Datos y almacenamiento',
    techs: [
      { label: 'PostgreSQL', icon: 'postgresql/postgresql-original' },
      { label: 'Redis', icon: 'redis/redis-original' },
      { label: 'AWS S3', icon: 'amazonwebservices/amazonwebservices-original-wordmark' },
      { label: 'Supabase Storage', icon: 'supabase/supabase-original' },
      { label: 'RustFS', sprite: 'bucket' },
    ],
  },
  {
    name: 'Infraestructura y DevOps',
    techs: [
      { label: 'VPS', sprite: 'server' },
      { label: 'SSH', icon: 'ssh/ssh-original' },
      { label: 'OCI', icon: 'oracle/oracle-original' },
      { label: 'Amazon EC2', simpleIcon: 'amazonec2' },
      { label: 'Railway', icon: 'railway/railway-original' },
      { label: 'Docker', icon: 'docker/docker-original' },
      {
        label: 'Dokploy',
        logoUrl: 'https://cdn.jsdelivr.net/gh/Dokploy/dokploy@v0.31.2/apps/dokploy/public/icon-light.svg',
      },
      { label: 'GitHub Actions', icon: 'githubactions/githubactions-original' },
    ],
  },
  {
    name: 'IoT y hardware',
    techs: [
      { label: 'IoT', sprite: 'wifi' },
      { label: 'Arduino', icon: 'arduino/arduino-original' },
      { label: 'ESP32', simpleIcon: 'espressif' },
      { label: 'Node-RED', simpleIcon: 'nodered' },
    ],
  },
  {
    name: 'Videojuegos',
    techs: [
      { label: 'Godot', icon: 'godot/godot-original' },
      { label: 'C++ SFML', simpleIcon: 'sfml' },
      { label: 'C/C++ raylib', simpleIcon: 'raylib' },
    ],
  },
  {
    name: 'Colaboración y metodologías ágiles',
    techs: [
      { label: 'Scrum', sprite: 'board' },
      { label: 'Jira', icon: 'jira/jira-original' },
      { label: 'GitHub Projects', icon: 'github/github-original' },
      { label: 'Slack', icon: 'slack/slack-original' },
    ],
  },
  {
    name: 'Control de versiones y pruebas',
    techs: [
      { label: 'Git', icon: 'git/git-original' },
      { label: 'GitHub', icon: 'github/github-original' },
      { label: 'Bitbucket', icon: 'bitbucket/bitbucket-original' },
      { label: 'Vitest', icon: 'vitest/vitest-original' },
      { label: 'Jest', icon: 'jest/jest-plain' },
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    name: 'Goslint Judge',
    description:
      'Juez en línea para maratones de programación de la UCEVA. Compila y ejecuta C, C++, Java y Python en un sandbox aislado y devuelve el veredicto en tiempo real. Trabajo de grado.',
    stack: ['Java', 'Spring Boot', 'PostgreSQL', 'RabbitMQ', 'Docker'],
    demoUrl: 'https://goslintjudge.app/',
    repoUrl: 'https://github.com/JOR3NTO/goslint_judge',
    animation: 'goslint',
    scale: 5,
    frameMs: 70,
    manualDeploy: true,
  },
  {
    name: 'MiPQR',
    description:
      'Plataforma web para registrar, asignar y seguir peticiones, quejas y reclamos con un código único de seguimiento. Caso piloto: Clínica Dolormed.',
    stack: ['Angular', 'Node.js', 'Express', 'TypeScript', 'GitHub Actions'],
    demoUrl: 'https://aguevaradev.me/MiPQR/',
    repoUrl: 'https://github.com/AndresDGM/MiPQR',
    animation: 'mipqr',
    scale: 7,
    frameMs: 380,
  },
  {
    name: 'Storage Manager',
    description:
      'Librería Angular para gestionar LocalStorage y Cache Storage con tipos y errores propios, más una app Showcase. Pruebas con 100 % de cobertura.',
    stack: ['Angular', 'TypeScript', 'Vitest'],
    demoUrl: 'https://aguevaradev.me/storage-manager-project/',
    repoUrl: 'https://github.com/AndresDGM/storage-manager-project',
    animation: 'storage',
    scale: 7,
    frameMs: 140,
  },
  {
    name: 'Taller Cliente-Servidor',
    description:
      'Un cliente Angular y un servidor Node.js para practicar la arquitectura cliente-servidor, cada uno con su propio pipeline.',
    stack: ['Angular', 'Node.js', 'GitHub Actions'],
    demoUrl: 'https://aguevaradev.me/Uceva-Angular-NodeJS-Taller-Client-Server',
    repoUrl: 'https://github.com/AndresDGM/Uceva-Angular-NodeJS-Taller-Client-Server',
    animation: 'net',
    scale: 6,
    frameMs: 110,
  },
  {
    name: 'Taller Astro + Angular',
    description:
      'Un sitio estático generado con Astro y una SPA en Angular para comparar SSG y SPA sobre los mismos datos: usuarios, productos, categorías, pedidos y reseñas.',
    stack: ['Astro', 'Angular', 'TypeScript', 'Jest', 'GitHub Actions'],
    demoUrl: 'https://aguevaradev.me/Uceva-Astro-Angular-SSG-SPA/users/',
    repoUrl: 'https://github.com/AndresDGM/Uceva-Astro-Angular-SSG-SPA',
    animation: 'rocket',
    scale: 5,
    frameMs: 90,
  },
  {
    name: 'Taller de Módulos',
    description:
      'Aplicación Angular organizada en módulos temáticos (God of War, Metal Gear, anime…) para practicar módulos y componentes.',
    stack: ['Angular', 'SCSS', 'GitHub Actions'],
    demoUrl: 'https://aguevaradev.me/Uceva-Angular-Taller-Modules',
    repoUrl: 'https://github.com/AndresDGM/Uceva-Angular-Taller-Modules',
    animation: 'modules',
    scale: 7,
    frameMs: 90,
  },
];
