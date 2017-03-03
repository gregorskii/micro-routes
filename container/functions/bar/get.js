module.exports = (req, res, routeMatch) => {
  return `${routeMatch.route} route ${routeMatch.params.id}`;
};
