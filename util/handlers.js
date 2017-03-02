const getMethod = (router, method, routeName) => {
  const handler = router.routeHandlers[routeName];
  if (handler.methods) {
    if (Object.hasOwnProperty.call(handler.methods, method)) {
      return handler.methods[method];
    }
  } else if (handler.method && method === 'get') {
    return handler.method;
  }
};

module.exports = {
  getMethod
}
