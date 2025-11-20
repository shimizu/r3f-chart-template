## Project Overview

This project is a template for creating 3D charts using React Three Fiber (`r3f`). It's set up with Vite for a fast development environment. The main dependencies include `react`, `@react-three/fiber`, `@react-three/drei`, `three`, and `d3`.

The current implementation displays a simple rotating cube with a bloom post-processing effect. The intention is to replace this with a 3D chart.

## Building and Running

### Development

To run the development server:

```bash
npm run dev
```

### Build

To create a production build:

```bash
npm run build
```

### Lint

To run the linter:

```bash
npm run lint
```

### Preview

To preview the production build:

```bash
npm run preview
```

## Development Conventions

The project uses ESLint for code linting. The configuration can be found in `eslint.config.js`. The styling is done via `App.css`. The 3D scene is organized into a `Scene.jsx` component, which is rendered within the main `App.jsx` component.
