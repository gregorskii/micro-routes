const micro = require('micro');
const router = require('./router');

const server = micro(async (req, res) => {
  const routeMatch = router.pathMatcher.match(req.url);
  let routeName;

  if (routeMatch) {
    routeName = routeMatch.route;
  } else {
    const err = new Error('Path not found');
    err.statusCode = 404;
    throw err;
  }

  if (Object.hasOwnProperty.call(router.routeHandlers, routeName)) {
    return router.routeHandlers[routeName].fn(req, res, routeMatch);
  } else {
    const err = new Error('Path not found');
    err.statusCode = 404;
    throw err;
  }
});

server.listen(3000);
