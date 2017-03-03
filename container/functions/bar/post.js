module.exports = (req, res, routeMatch) => {
  return `${routeMatch.route} post route ${routeMatch.params.id}`;
};
