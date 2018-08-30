# Minimal D3 and Typescript Project

This is a minimal project to let you start coding with D3 in Typescript and build up from the bottom.
Don't hesitate to take a look at the configuration files:

* `package.json` for all the dependencies and some build scripts
* `tsconfig.json`defines how typescript is transpiled into Javascript
* `webpack.config.js` defines how everything is concatenated into an output `main.js` file

The configuration is as minimal as possible.

## Usage

1. Clone the repository:

```
git clone https://github.com/jonasoesch/d3-typescript
```

2. Change into the folder:

```
cd d3-typescript
```

3. Install the required node modules:

```
npm install
```

4. Run the Typescript server to preview

```
npm run start
```

5. Start editing:
* `src/index.ts`
* `static/index.html`
* `static/styles.css`

5. And finally build into `dist`

```
npm run build
```
