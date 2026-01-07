// Main: Accept Array of Roles [admin, super-admin, user]

function roleMiddleware(...roles) {
  // ['admin', 'super-admin']
  return function (request, response, next) {
    const role = request.user.role; // user

    if (!role) {
      return response.status(401).json({ message: "User: Unauthorized!" });
    }

    const isMatch = roles.includes(role);

    if (!isMatch) {
      return response.status(403).json({ message: "User: Forbidden!" });
    }

    next();
  };
}

module.exports = { roleMiddleware };
