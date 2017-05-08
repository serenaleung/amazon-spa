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

function postProduct (productParams) {
  return fetch(
    `${DOMAIN}/api/v1/products?api_token=${API_TOKEN}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      // {title: 'dasdas', body: 'dasdas'}
      // should look likeð
      // {product: {title: 'dasdadssa', body: 'dasdas'}}
      body: JSON.stringify({product: productParams})
    }
  )
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
  console.log(product)
  return `
  <button class="back">Back</button>
  <h1>${product.title}</h1>
  <p>$${product.price}</p>
  <p>${product.description}</p>
  <ul class="reviews-list">
    ${renderReviews(product.reviews)}
  </ul>
  `
}

function renderReviews (reviews) {
  return reviews.map(function (review) {
    return `<li class="review">${review.body}</li>`
  }).join('');
}

document.addEventListener('DOMContentLoaded', function () {
  // We put out DOM queries inside a DOMContentLoaded event handler
  // because the queried nodes at likely not rendered yet.
  // JavaScript inside of a DOMContentLoaded event handler will
  // run once every HTML tag has been rendered by the browser
  const productsList = document.querySelector('#products-list');
  const productDetails = document.querySelector('#product-details');
  const productForm = document.querySelector('#product-form');

  function loadProducts () {
    getProducts()
    .then(renderProducts)
    .then(function (html)
    { console.log(html)
      productsList.innerHTML = html });

  }
    loadProducts();


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
  });

  productForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const title = event.currentTarget.querySelector('#title');
    const price = event.currentTarget.querySelector('#price');
    const description = event.currentTarget.querySelector('#description');
    const fData = new FormData(event.currentTarget);

    postProduct({title: fData.get('title'), description: fData.get('description'), price: fData.get('price')})
    .then(function() {
      loadProducts();
    })
  })


});
