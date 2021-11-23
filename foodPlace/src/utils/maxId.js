
const maxId = (products) => {
  let max = 0

  products.map(product => {
    if (product.id > max) max = product.id
  })

  return max + 1
}

module.exports = maxId