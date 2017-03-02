const routeMatch = require('route-match');
const requireDir = require('load-directory');
const path = require('path');
const routeHandlers = requireDir.all(path.join(__dirname, 'routes'), {
   recursive: false,
   map: requireDir.Strategies.Filename.lowerCase
});

const Route = routeMatch.Route;
const RouteCollection = routeMatch.RouteCollection;
const PathGenerator = routeMatch.PathGenerator;
const PathMatcher = routeMatch.PathMatcher;

const Routes = Object.keys(routeHandlers).map((key) => {
  if (Object.hasOwnProperty.call(routeHandlers, key)) {
    let route = routeHandlers[key];
    return new Route(route.name, route.path);
  }
});

const routeCollection = new RouteCollection(Routes);

const pathGenerator = new PathGenerator(routeCollection);
const pathMatcher = new PathMatcher(routeCollection);

module.exports = {
  pathGenerator,
  pathMatcher,
  routeHandlers
};
