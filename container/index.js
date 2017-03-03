const micro = require('micro');
const path = require('path');

const router = require(path.join(__dirname, 'router'));
const handlerUtils = require(path.join(__dirname, 'util', 'handlers'));
const responses = require(path.join(__dirname, 'util', 'responses'));

const server = micro(async (req, res) => {
  const routeMatch = router.pathMatcher.match(req.url);

  if (routeMatch) {
    if (Object.hasOwnProperty.call(router.handlers, routeMatch.route)) {
      const handlerMethod = handlerUtils.getMethod(
        router, req.method.toLowerCase(), routeMatch.route
      );

      if (handlerMethod) {
        return handlerMethod(req, res, routeMatch);
      }
    }
  }

  responses.handleErrors.notFound();
});

server.listen(3000);
