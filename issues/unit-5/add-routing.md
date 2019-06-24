# Mini Project: Routing
## Main Goals
- Separate the app's functionalities into views
- Add routing between views
- Use routes as a source of data to populate your different views
### When Accomplished
- Your app has
  - [ ] at least two views
  - [ ] a functioning router
  - [ ] route-based data flow
## Resources
- [Banno-scoped NPM registry](https://npm.banno-internal.com/)
- [`<app-route>` - WebComponents.org](https://www.webcomponents.org/element/PolymerElements/app-route)
- [Page.js](https://visionmedia.github.io/page.js/)
- [Express.js - JS web app framework](https://expressjs.com/)
## Notes
- To copy the format of Banno apps, you can use `web-component-router` from [Banno's internal NPM registry](https://npm.banno-internal.com).
- If you choose to use the `<app-route>` web component, you will have to refactor your Webpack configuration to be friendly to those components.
- You may also look into more basic routing libraries that you can import directly using Webpack (like [`page.js`](https://visionmedia.github.io/page.js/), which `web-component-router` is based off of).
- You might not be able to implement a router and continue to use `webpack-dev-server` since you may need to set up a custom server (routers usually require `index.html` to be served for any route).
  - You can look into [`webpack-serve`](https://github.com/webpack-contrib/webpack-serve) as an alternative, since it has more configuration options.
  - You can also look into **hash routing** if this seems too complex--but be warned, it has its own drawbacks.