// Imports
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// Config
dotenv.config();

// Main: Check Token Exist Or Not => Verify Token
function authMiddleware(request, response, next) {
  const auth = request.headers?.authorization;

  if (!auth) {
    return response.status(401).json({ message: "User: UnAuthorized" });
  }

  const [_, token] = auth.split(" ");
  if (!token) {
    return response.status(401).json({ message: "User: UnAuthorized" });
  }

  try {
    const userData = jwt.verify(token, process.env.JWT_SECRET);
    request.user = userData; // OBJ Append Key: User = UserData

    next();
    console.log(userData);
  } catch (error) {
    return response.status(401).json({ message: "User: UnAuthorized" });
  }
}

module.exports = { authMiddleware };
