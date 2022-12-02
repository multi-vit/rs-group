export default function validateProduct(product) {
  const validProduct = {
    stock_number: product.stock_number,
    name: product.name,
    Description: product.Description,
    Price: product.Price,
  };
  for (const key in validProduct) {
    if (Boolean(product[key]) == false) {
      return { result: false, missing: key };
    }
  }
  return { result: true, product: validProduct };
}
