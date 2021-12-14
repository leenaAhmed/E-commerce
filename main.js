var productList = document.getElementById("product-list");
var cartShoping = document.getElementById("cart-btn");
var addCart = document.getElementsByClassName("add-to-cart-btn");
var cartList = document.getElementById("cart-items-shopping");
var removeItem = document.getElementsByClassName("remove");
var cartItem = document.getElementsByClassName("cart-content");

var quantityInputs = document.getElementsByClassName("cart-quantity-input");

var cardId = 1;
var data;
var xhr = new XMLHttpRequest();

xhr.open("GET", "https://fakestoreapi.com/products/");
xhr.addEventListener("readystatechange", function () {
  if (xhr.readyState == 4 && xhr.status == 200) {
    data = JSON.parse(xhr.response);
    console.log(data);
    displayProduct(data);
    displayCategory(data);
    displayButton();
    ChangeValueCount();
    RemoveCart();
  }
});
function displayProduct(product) {
  data.forEach((products) => {
    productList.innerHTML += `
                  <div class = "product-item" >
                      <div class = "product-img">
                          <img src = "${products.image}" alt = "product image">
                          <button type = "button" class ="add-to-cart-btn" >
                              <i class = "fas fa-shopping-cart"></i>Add To Cart
                          </button>
                      </div>
                      <div class = "product-content">
                          <h3 class = "product-name">${products.title}</h3>
                          <span class = "product-category">${products.category}</span>
                          <p class = "product-price">$${products.price}</p>
                      </div>
                  </div>
              `;
  });
}

function displayCategory(category) {
  var list = document.getElementById("categorySelect");

  data.forEach((products) => {
    list.innerHTML += `<option value=> ${products.category}</option>`;
  });
}

function getProductDetails(product) {
  var productDetails = {
    id: cardId,
    imgeSrc: product.querySelector(".product-img img").src,
    name: product.querySelector(".product-name").textContent,
    category: product.querySelector(".product-category").textContent,
    price: product.querySelector(".product-price").textContent,
  };
  cardId++;
  savedataInLocalStorage(productDetails);
  addToCart(productDetails);
}
function displayButton() {
  for (var i = 0; i < addCart.length; i++) {
    addCart[i].addEventListener("click", function (e) {
      var products = e.target.parentElement.parentElement;
      getProductDetails(products);
      console.log(products);
    });
  }
}
function savedataInLocalStorage(item) {
  var products = getProductFromStorage();
  products.push(item);
  console.log(item);
  localStorage.setItem("products", JSON.stringify(products));
}
function getProductFromStorage() {
  return localStorage.getItem("products")
    ? JSON.parse(localStorage.getItem("products"))
    : [];
}

// open new window
cartShoping.addEventListener("click", function (event) {
  location.assign("cartStor.html");
  addToCart();
});

//  add class to cart
function addToCart(cartsProduct) {
  var cartItem = document.createElement("div");
  cartItem.classList.add("cart-content");
  cartItem.setAttribute("data-id", `${cartsProduct.id}`);
  cartItem.innerHTML = `
  <div class="cart-row">
  <div class="cart-item cart-column">
          <img class="cart-item-image" src="${cartsProduct.imgeSrc}" width="100" height="100">
          <span class="cart-item-title">${cartsProduct.name}</span>
      </div>
      <span class="cart-price cart-column">${cartsProduct.price}</span>
      <div class="cart-quantity cart-column">
          <input class="cart-quantity-input" type="number" value="1">
          <button class="btn btn-danger remove"  type="button">REMOVE </button>
      </div>
  </div>
      
  `;
  cartList.appendChild(cartItem);
}

window.addEventListener("DOMContentLoaded", () => {
  var products = getProductFromStorage();
  products.forEach((product) => addToCart(product));
});
// cart changes
function ChangeValueCount() {
  for (var i = 0; i < quantityInputs.length; i++) {
    var quantity = quantityInputs[i];
    quantity.addEventListener("change", function (e) {
      if (isNaN(e.target.value) || e.target.value <= 0) {
        input.value = 1;
      }
      updateCartTotal();
    });
  }
}

function RemoveCart() {
  for (var i = 0; i < removeItem.length; i++) {
    var remove = removeItem[i];
    remove.addEventListener("click", function (e) {
      e.target.parentElement.parentElement.remove();

      // remove from localStorage

      var products = getProductFromStorage();
      var updateLocal = products.filter(function (product) {
        return product.id !== parseInt(cartItem[0].dataset.id);
      });
      localStorage.setItem("products", JSON.stringify(updateLocal));
      updateCartTotal();
    });
  }
}

function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName("cart-items")[0];
  var cartRows = cartItemContainer.getElementsByClassName("cart-row");
  var total = 0;
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByClassName("cart-price")[0];
    var quantityElement = cartRow.getElementsByClassName(
      "cart-quantity-input"
    )[0];
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantity = quantityElement.value;
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("cart-total-price")[0].innerText =
    "$" + total;
}

xhr.send("");
