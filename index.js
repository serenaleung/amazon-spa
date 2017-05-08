const DOMAIN = 'http://localhost:3000'
const API_TOKEN = 'SMCI7yFYD2ipdcfhzg24EhYs3wcktHyJmjS2QlRUsjs'

function getProducts() {
return fetch(`${DOMAIN}/api/v1/products?api_token=${API_TOKEN}`)
	.then(function (res) {return res.json() });
}

function getProduct (id) {
	return fetch(`${DOMAIN}/api/v1/products/${id}?api_token=${API_TOKEN}`)
	.then(function (res) { return res.json() });
}

function renderProducts (products) {
  return products.map(function (product) {
    return `
      <div class="product-summary">
        ${product.title}
      </div>
      <hr />
    `
  }).join('')
}

document.addEventListener('DOMContentLoaded', function () {
  // We put out DOM queries inside a DOMContentLoaded event handler
  // because the queried nodes at likely not rendered yet.
  // JavaScript inside of a DOMContentLoaded event handler will
  // run once every HTML tag has been rendered by the browser
  const productsList = document.querySelector('#products-list');

  getProducts()
    .then(renderProducts)
    .then(function (html) { productsList.innerHTML = html })
});
