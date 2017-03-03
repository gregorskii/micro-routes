module.exports = (req, res, routeMatch) => {
  return `${routeMatch.route} route`;
};
