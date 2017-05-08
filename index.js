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
        <a
          data-id=${product.id}
          href
          class="product-link">
            ${product.title}
        </a>
      </div>
    `
  }).join('')
}

function renderProduct(product){
  return `
  <button class="back">Back</button>
  <h1>${product.title}</h1>
  <p>${product.description}</p>
  `
}

document.addEventListener('DOMContentLoaded', function () {
  // We put out DOM queries inside a DOMContentLoaded event handler
  // because the queried nodes at likely not rendered yet.
  // JavaScript inside of a DOMContentLoaded event handler will
  // run once every HTML tag has been rendered by the browser
  const productsList = document.querySelector('#products-list');
  const productDetails = document.querySelector('#product-details');

  getProducts()
    .then(renderProducts)
    .then(function (html) { productsList.innerHTML = html });

    productsList.addEventListener('click', function (event) {
    const { target } = event;

    if (target.matches('.product-link')) {
      event.preventDefault();
      const productId = target.getAttribute('data-id');

      getProduct(productId)
       .then(function (product) {
         productDetails.innerHTML = renderProduct(product);
         productsList.classList.add('hidden');
         productDetails.classList.remove('hidden');
       });
    }
  });

  productDetails.addEventListener('click', function(event) {
    const {target} = event;

    if (target.matches('button.back')) {
      productDetails.classList.add('hidden');
      productsList.classList.remove('hidden');
    }
  })
});
