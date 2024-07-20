let filterProducts = [...products];
console.log(filterProducts);

const getElement = (selector) => {
  const element = document.querySelector(selector);
  if (element) {
    return element;
  } else {
    throw new Error(`${selector} does not exist`);
  }
};

const productsDOM = getElement(".products-container");

function displayProducts() {
  if (filterProducts.length < 1) {
    productsDOM.innerHTML = `<p>Sorry no Product exist.</p>`;
    return;
  }

  const products = filterProducts
    .map((product) => {
      const { title, price, image: img, id } = product;
      return `<!-- single product -->
        <article class="product" data-id = "${id}">
          <img src=${img} class="product-img img" alt=${title} />
          <footer>
            <h5 class="product-name">${title}</h5>
            <span class="product-price">$${price}</span>
          </footer>
        </article>`;
    })
    .join("");

  productsDOM.innerHTML = products;
}

displayProducts();

const form = getElement(".input-form");
const inputValue = getElement(".search-input");

form.addEventListener("keyup", () => {
  const value = inputValue.value;
  filterProducts = filterProducts.filter((product) => {
    return product.title.toLowerCase().includes(value);
  });
  displayProducts();
});

// display buttons
const companyDOM = getElement(".companies");
function displayButtons() {
  const buttons = [
    "all",
    ...new Set(products.map((product) => product.company)),
  ];
  companyDOM.innerHTML = buttons
    .map((company) => {
      return `<button class="company-btn" data-id ="${company}">${company}</button>`;
    })
    .join("");
}

displayButtons();

companyDOM.addEventListener("click", (e) => {
  const id = e.target.dataset.id;
  console.log(id);
  if (id === "all") {
    filterProducts = [...products];
  } else {
    filterProducts = products.filter((product) => {
      return product.company === id;
    });
  }
  inputValue.value = "";
  displayProducts();
});
