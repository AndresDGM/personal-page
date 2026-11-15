# PersonalPage — Portafolio Digital

Portafolio digital desarrollado con [Angular](https://angular.dev/) (generado con [Angular CLI](https://github.com/angular/angular-cli) versión `22.2.7`) y **SCSS**.

## Requisitos previos

- **Node.js** y **npm** instalados en el entorno.
- Instalar las dependencias del proyecto ejecutando:

```bash
npm install
```

## Servidor de desarrollo

Para iniciar el servidor local de desarrollo, ejecuta:

```bash
npm start
```

También puedes usar `npx ng serve`. Una vez iniciado, abre `http://localhost:4200/` en tu navegador; la aplicación se recargará automáticamente al modificar los archivos fuente.

## Generación de código

Angular CLI incluye herramientas para generar elementos del proyecto. Por ejemplo, para crear un nuevo componente:

```bash
npx ng generate component nombre-del-componente
```

Para consultar todos los esquemas disponibles (componentes, directivas, pipes, servicios, etc.):

```bash
npx ng generate --help
```

## Compilación (Build)

Para compilar el proyecto en modo producción:

```bash
npm run build
```

Los artefactos generados se guardarán en el directorio `dist/personal-page`.

## Pruebas unitarias

Para ejecutar las pruebas unitarias con [Vitest](https://vitest.dev/):

```bash
npm test
```

Para una única ejecución sin modo observación:

```bash
npm test -- --watch=false
```

## Recursos adicionales

- [Documentación oficial de Angular](https://angular.dev/)
- [Referencia de comandos de Angular CLI](https://angular.dev/tools/cli)
