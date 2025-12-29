// Imports
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const {
  createUserSchema,
  idSchema,
} = require("../validations/userValidations");

// Database
let users = [];

// Generate Path
const userFilePath = path.join(__dirname, "..", "db", "users.json");

// Check File Exist
const isExist = fs.existsSync(userFilePath);

if (isExist) {
  // Read File
  const usersFile = fs.readFileSync(userFilePath, "utf8");

  // Update Array
  users = JSON.parse(usersFile);
} else {
  fs.writeFileSync(userFilePath, "[]");
}

// Handle User.json File

function findAll(request, response) {
  response.json({ message: "Users List", data: { users } });
}

function findOne(request, response, next) {
  // Validate Data
  const { value, error } = idSchema.validate(request.params);

  if (error) {
    error.status = 400;
    return next(error);
  }

  // ID
  const id = request.params.id;
  // Check User: ID
  const user = users.find((item) => item.id == id);
  // If Not Exist Error
  if (!user) {
    const error = new Error("User Not Found!");
    error.status = 404;

    return next(error);
  }
  // Return User
  response.json({ message: "User Found", data: { user } });
}

async function createUser(request, response, next) {
  // Data
  const { value, error } = createUserSchema.validate(request.body, {
    abortEarly: false,
  });

  if (error) {
    const messages = error.details.map((err) => err.message);

    error.message = messages;

    return next(error);
  }

  const { email, password } = value;

  // Email Unique
  let user = users.find((item) => item.email == email);

  if (user) {
    const error = new Error("Email Already Exist!");
    error.status = 409;

    return next(error);
  }

  // Hash
  const hashedPassword = await bcrypt.hash(password, 12);

  // Create
  user = { ...value, id: users.length + 1, password: hashedPassword };
  // Push
  users.push(user);

  // Update File
  fs.writeFileSync(userFilePath, JSON.stringify(users));

  response.status(201).json({ message: "User Create", data: { user } });
}
// [TODO]: UPDATE -> FILE
function updateUser(request, response) {}
function removeUser(request, response, next) {
  // Validate Data
  const { error } = idSchema.validate(request.params);

  if (error) {
    error.status = 400;
    return next(error);
  }

  // ID
  const id = request.params.id;
  // Check Exist ? Delete : Error
  const userIndex = users.findIndex((item) => item.id == id);

  if (userIndex == -1) {
    const error = new Error("User Not Found!");
    error.status = 404;

    return next(error);
  }

  // Delete
  users.splice(userIndex, 1);

  // Update File
  fs.writeFileSync(userFilePath, JSON.stringify(users));

  // Return User
  response.json({ message: "User Deleted Successfully!", data: null });
}

// CRUD
module.exports = {
  findAll,
  findOne,
  createUser,
  updateUser,
  removeUser,
};
