module.exports = {
  name: 'bar',
  path: '/bar/:id(\\d+)',
  fn: (req, res, routeMatch) => {
    return `bar route ${routeMatch.params.id}`;
  }
};
