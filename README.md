# Personal React Frontend Starter Kit

A **personal and opiniated**, **production-ready**, **scalable** and **customizable** web frontend starter kit based on React.

## Features

1. Opiniated One-Stop Solution

React [concentrates only on building views](https://reactjs.org/), therefore is not adequate for real-world projects on its own in many ways. This kit preselects well-rated and suitable React packages and is preconfigured so that you can start to write your code after [learning the basics](docs/basics.md) without spending days and nights on configuration.

2. Production Ready

Besides excellent debug experiences, it packs tools and features to simplify production process like `one-click to GitHub Pages`. See more in the [doc](docs/production.md) 

3. Scalable, Engineered

With **TypeScript** and **react.di**, writing loosely coupled, well-structured and scalable React application without losing agility is within reach. A [simple opiniated style reference](doc/styleReference.md) is available to keep naming and coding style consistent throughout the application.

4. Open, Customizable and Keep on the Trend

It's built from the ground up with **webpack**. No breaking boilerplate-specific commands or tools are introduced (like the ones in create-react-app), which means external packages can be easily integrated. It always follows the trend and utilizes the most productive resources from the community.

## Run Demo

1. `npm install` install the dependencies
2. `npm run` start the application on [http://localhost:3000](http://localhost:3000)
3. Explore the demo app

## Detail

[Basics](docs/basics.md)

[Code Splitting](docs/codeSplitting.md)

[Routing](docs/routing.md)

[UI](docs/ui.md)

[Internationalization](docs/i18n.md)

[Dependency Injecting](docs/di.md)

[User Management with JWT](docs/user.md)

[Interaction with API](docs/api.md)

[Production](docs/production.md)

[CLI Commands](docs/command.md)

[Demo Explained](docs/demoExplained.md)

[Style Reference](docs/styleReference.md)

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
- Custom i18n implementation
  - dynamic replacement, async loading

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

## License

MIT
