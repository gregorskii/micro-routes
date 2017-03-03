const routeMatch = require('route-match');
const requireDir = require('load-directory');
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

Object.keys(config.functions).forEach((functionName) => {
  if (Object.hasOwnProperty.call(config.functions, functionName)) {
    let functionConfig = config.functions[functionName];

    routes.push(new Route(functionName, functionConfig.path));

    Object.keys(functionConfig.handlers).forEach((method) => {
      if (Object.hasOwnProperty.call(functionConfig.handlers, method)) {
        handlers[functionName] = {};
        try {
          handlers[functionName][method] = require(`./${functionConfig.handlers[method].handler}`);
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
