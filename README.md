# Personal React Frontend Starter Kit

A **personal and opinionated**, **production-ready**, **scalable** and **customizable** web frontend starter kit based on React.

## Features

1. Opinionated One-Stop Solution

React [concentrates only on building views](https://reactjs.org/), therefore is not adequate for real-world projects on its own in many ways. This kit preselects well-rated and suitable React packages and is preconfigured so that you can start to write your code after [learning the basics](docs/basics.md) without spending days and nights on configuration.

2. Production Ready

Besides excellent debug experiences, it packs tools and features to simplify production process like `one-click to GitHub Pages`. See more in the [doc](https://github.com/viccrubs/FrontendStarterKit/wiki/Basics)

3. Scalable, Engineered

With **TypeScript** and **react.di**, writing loosely coupled, well-structured and scalable React application without losing agility is within reach. A simple opinionated style reference is available at the ends of docs to keep naming and coding style consistent throughout the application.

4. Open, Customizable and Keep on the Trend

It's built from the ground up with **webpack**. No breaking boilerplate-specific commands or tools are introduced (like the ones in create-react-app), which means external packages can be easily integrated. It always follows the trend and utilizes the most productive resources from the community.

## Run Demo

1. `npm install` install the dependencies
2. `npm run` start the application on [http://localhost:3000](http://localhost:3000)
3. Explore the demo app

## Detail

[Basics](https://github.com/viccrubs/FrontendStarterKit/wiki/Basics)

[Code Splitting](https://github.com/viccrubs/FrontendStarterKit/wiki/Code-Splitting)

[Routing](https://github.com/viccrubs/FrontendStarterKit/wiki/Routing)

[UI](https://github.com/viccrubs/FrontendStarterKit/wiki/UI)

[Internationalization](https://github.com/viccrubs/FrontendStarterKit/wiki/Internationalization)

[DIP, IoC and DI](https://github.com/viccrubs/FrontendStarterKit/wiki/DIP,-IoC-and-DI)

[User Management with JWT](https://github.com/viccrubs/FrontendStarterKit/wiki/User-Management-with-JWT)

[Interaction with API](https://github.com/viccrubs/FrontendStarterKit/wiki/Interaction-with-API)

[Unit tests](https://github.com/viccrubs/FrontendStarterKit/wiki/Unit-tests)

[Production](https://github.com/viccrubs/FrontendStarterKit/wiki/Production)

[CLI Commands](https://github.com/viccrubs/FrontendStarterKit/wiki/CLI-Commands)

[Demo Explained](docs/demoExplained.md)

## Packed Tools

### Basics
- [React](https://reactjs.org/) v16
- [MobX](https://cn.mobx.js.org/) 5
  - Elegant state management
- [React-Router](https://github.com/ReactTraining/react-router) v4
  - Routing
- [TypeScript](https://www.typescriptlang.org/)
  - Better development experience and must-have for large projects
- [react.di](https://github.com/RobinBuschmann/react.di/tree/master)
  - Dependency Injection
- [Webpack](https://webpack.js.org/) v4
  - bundling and preprocessing (like compiling and optimization)

### UI
- [Ant Design](https://ant.design)
  - UI components
- [styled-components](https://www.styled-components.com)
  - CSS in JS
- [BizCharts](https://github.com/alibaba/BizCharts)
  - Powerful and beautiful data visualization
- [Ant Motion](https://motion.ant.design/)
  - Animation solution

### Test
- [mocha](https://mochajs.org/)
- [enzyme](https://github.com/airbnb/enzyme)
- [chai](https://github.com/chaijs/chai)

### Internalization
- Custom i18n implementation v2
  - **Strongly typed**, dynamic replacement, async loading

### Production Utilities and Features

See more in [here](docs/production.md)

- Clean dist before building
- One-click submit to GitHub Pages
- One-click local express server deployment

### Miscellaneous

- [cache-loader](https://github.com/webpack-contrib/cache-loader) and [thread-loader](https://github.com/webpack-contrib/thread-loader)
  - accelerates build time
- [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin)
  - extract CSS from JS
- [JSON5](https://github.com/json5/json5)
  > JSON for human
- [less-loader](https://github.com/webpack-contrib/less-loader)
  - supports for [`less`](http://lesscss.org/) out of box
- [react-markdown](https://github.com/rexxars/react-markdown)
  - Out-of-box `Markdown` component under `components`
- [TSLint](https://palantir.github.io/tslint/)
  - Lint for TypeScript. 

## License

MIT
