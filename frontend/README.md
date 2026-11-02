# React + Vite

## Deployment

The repository root contains a `render.yaml` Blueprint that configures the
Express API and this frontend together. In Render, choose **New → Blueprint
Instance**, connect this repository, and apply the Blueprint. Enter your
MongoDB Atlas connection string when prompted for `MONGO_URI`; `JWT_SECRET` is
generated automatically. The frontend receives the backend host automatically.

For manual deployment, set `VITE_API_URL` to the deployed Express backend's
base URL and rebuild the frontend. Local development defaults to
`http://localhost:3000`.

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
