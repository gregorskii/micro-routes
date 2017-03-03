module.exports = (req, res, routeMatch) => {
  return `bar post route ${routeMatch.params.id}`;
};
