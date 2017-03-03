const micro = require('micro');

const router = require('./router');
const handlerUtils = require('./util/handlers');
const responses = require('./util/responses');

const server = micro(async (req, res) => {
  const routeMatch = router.pathMatcher.match(req.url);
  let routeName;

  if (routeMatch) {
    routeName = routeMatch.route;

    if (Object.hasOwnProperty.call(router.handlers, routeName)) {
      const handlerMethod = handlerUtils.getMethod(
        router, req.method.toLowerCase(), routeName
      );

      if (handlerMethod) {
        return handlerMethod(req, res, routeMatch);
      }
    }
  }

  responses.handleErrors.notFound();
});

server.listen(3000);
