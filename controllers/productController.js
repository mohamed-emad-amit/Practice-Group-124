const products = [{ id: 1, title: "Apple", price: 100.0, stock: 10, owner: 1 }];

async function findAll(request, response, next) {}
async function findOne(request, response, next) {}
async function createProduct(request, response, next) {
  const { id, role } = request.user;
}
async function updateProduct(request, response, next) {
  const productId = request.params.id;
  const { id, role } = request.user;

  const product = products.find((p) => p.id == productId);
  if (!product) {
    const error = new Error("Product Not Found!");
    error.status = 404;
    next(error);
  }

  const reqRoles = ["admin", "super-admin"];
  const hasAccess = reqRoles.includes(role);

  // User not Owner && Role: User
  if (id != product.owner && !hasAccess) {
    const error = new Error("Access Denied!");
    error.status = 403;
    next(error);
  }
}
async function removeProduct(request, response, next) {
  const { id, role } = request.user;

  // if id == product.owner
}

module.exports = {
  findAll,
  findOne,
  createProduct,
  updateProduct,
  removeProduct,
};
