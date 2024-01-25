# React + TypeScript + Vite + React Query: (Comment App)

## App public

- [App Comment](https://fcastro84.github.io/react-vite-typescript-comment-react-query/)

## Install

```
$ yarn add @tanstack/react-query -E

$ yarn add react-spinners -E

$ yarn add @tremor/react

$ yarn add -D tailwindcss postcss autoprefixer 

$ yarn tailwindcss init -p

$ yarn add sonner
```
- Add the paths to all of your template files in your **tailwind.config.js** file, including the path to the Tremor module. 

``` js
/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",

    // Path to the Tremor module
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  extend: {},
  },
  plugins: [],
}
```

- Add the @tailwind directives for each of Tailwind's layers to your **./src/index.css** file.

``` css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Documentation

- [tremor](https://www.tremor.so/docs/getting-started/installation)
- [tailwindcss](https://tailwindcss.com/docs/installation)
- [react-query](https://tanstack.com/query/latest/docs/react/installation)
- [sonner](https://sonner.emilkowal.ski/)
- [API: jsonbin.io](https://jsonbin.io/api-reference)
- [react-spinners](https://www.npmjs.com/package/react-spinners)
