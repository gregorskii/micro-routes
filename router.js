const routeMatch = require('route-match');
const yaml = require('js-yaml');
const path = require('path');
const fs = require('fs');

const Route = routeMatch.Route;
const RouteCollection = routeMatch.RouteCollection;
const PathGenerator = routeMatch.PathGenerator;
const PathMatcher = routeMatch.PathMatcher;

let config;
let handlers = {};
let routes = [];

try {
  config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));
} catch (err) {
  console.error(err);
  process.exit();
}

Object.keys(config.functions).forEach((name) => {
  handlers[name] = {};

  if (Object.hasOwnProperty.call(config.functions, name)) {
    let fnConfig = config.functions[name];
    routes.push(new Route(name, `/${fnConfig.path}`));

    Object.keys(fnConfig.handlers).forEach((method) => {
      if (Object.hasOwnProperty.call(fnConfig.handlers, method)) {
        try {
          handlers[name][method] = require(`./${fnConfig.handlers[method].function}`);
        } catch (err) {
          console.error('Invalid handler config', err);
          process.exit();
        }
      }
    });
  }
});

const routeCollection = new RouteCollection(routes);
const pathGenerator = new PathGenerator(routeCollection);
const pathMatcher = new PathMatcher(routeCollection);

module.exports = {
  pathGenerator,
  pathMatcher,
  handlers
};
