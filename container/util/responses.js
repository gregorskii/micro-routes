const handleErrors = {
  notFound: () => {
    const err = new Error('Path not found');
    err.statusCode = 404;
    throw err;
  }
};

module.exports = {
  handleErrors
}
