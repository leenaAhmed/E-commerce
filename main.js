var productList = document.getElementById("product-list");
var addCart = document.getElementsByClassName("add-to-cart-btn");
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
  }
});
function displayProduct(product) {
  data.forEach((products) => {
    productList.innerHTML += `
                  <div class = "product-item">
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
function displayButton() {
  for (var i = 0; i < addCart.length; i++) {
    addCart[i].addEventListener("click", function (e) {
      var product = e.target.parentElement.parentElement;
      localStorage.setItem("products", data.id);
      console.log(product);
    });
  }
}

xhr.send("");
