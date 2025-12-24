function errorMiddleware(error, request, response, next) {
  console.error(error.stack);

  response
    .status(error.status || 500)
    .json({ message: error.message || "Internal Server Error!", data: null });
}

module.exports = { errorMiddleware };
