module.exports = (req, res, routeMatch) => {
  return `bar route ${routeMatch.params.id}`;
};
