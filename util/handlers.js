const getMethod = (router, method, routeName) => {
  const handler = router.handlers[routeName];
  if (Object.hasOwnProperty.call(handler, method)) {
    return handler[method];
  }
};

module.exports = {
  getMethod
}
