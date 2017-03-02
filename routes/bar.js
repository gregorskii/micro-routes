module.exports = {
  name: 'bar',
  path: '/bar/:id(\\d+)',
  methods: {
    get: (req, res, routeMatch) => {
      return `bar route ${routeMatch.params.id}`;
    }
  }
};
