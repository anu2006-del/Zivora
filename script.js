// ===============================
// ZIVORA - SHOPPING CART
// ===============================

// Get existing cart from localStorage
let cart = JSON.parse(localStorage.getItem("zivoraCart")) || [];


// ===============================
// SAVE CART
// ===============================

function saveCart() {
  localStorage.setItem("zivoraCart", JSON.stringify(cart));
}


// ===============================
// ADD PRODUCT TO CART
// ===============================

function addToCart(product) {

  const existingProduct = cart.find(
    item => item.id === product.id
  );

  if (existingProduct) {

    existingProduct.quantity += 1;

  } else {

    cart.push({
      ...product,
      quantity: 1
    });

  }

  saveCart();
  updateCartCount();

  alert(product.name + " added to cart 🛒");
}


// ===============================
// CART COUNT
// ===============================

function updateCartCount() {

  const cartCount = document.querySelector(".cart-count");

  if (!cartCount) return;

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  cartCount.textContent = totalItems;
}


// ===============================
// REMOVE PRODUCT
// ===============================

function removeFromCart(productId) {

  cart = cart.filter(
    item => item.id !== productId
  );

  saveCart();

  renderCart();
  updateCartCount();
}


// ===============================
// CHANGE QUANTITY
// ===============================

function changeQuantity(productId, change) {

  const product = cart.find(
    item => item.id === productId
  );

  if (!product) return;

  product.quantity += change;

  if (product.quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  saveCart();

  renderCart();
  updateCartCount();
}


// ===============================
// CART TOTAL
// ===============================

function getCartTotal() {

  return cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );
}


// ===============================
// DISPLAY CART
// ===============================

function renderCart() {

  const cartContainer =
    document.querySelector("#cart-items");

  const totalElement =
    document.querySelector("#cart-total");

  if (!cartContainer) return;

  cartContainer.innerHTML = "";

  if (cart.length === 0) {

    cartContainer.innerHTML = `
      <div class="empty-cart">
        <h2>Your cart is empty 🛒</h2>
        <p>Add something you love from Zivora.</p>
        <a href="index.html">Continue Shopping</a>
      </div>
    `;

    if (totalElement) {
      totalElement.textContent = "₹0";
    }

    return;
  }


  cart.forEach(item => {

    const cartItem = document.createElement("div");

    cartItem.className = "cart-item";

    cartItem.innerHTML = `

      <img
        src="${item.image}"
        alt="${item.name}"
      >

      <div class="cart-details">

        <h3>${item.name}</h3>

        <p>₹${item.price.toLocaleString("en-IN")}</p>

        <div class="quantity">

          <button
            onclick="changeQuantity(${item.id}, -1)"
          >
            −
          </button>

          <span>${item.quantity}</span>

          <button
            onclick="changeQuantity(${item.id}, 1)"
          >
            +
          </button>

        </div>

        <button
          class="remove-btn"
          onclick="removeFromCart(${item.id})"
        >
          Remove
        </button>

      </div>
    `;

    cartContainer.appendChild(cartItem);

  });


  if (totalElement) {

    totalElement.textContent =
      "₹" + getCartTotal().toLocaleString("en-IN");

  }
}


// ===============================
// PAGE LOAD
// ===============================

document.addEventListener("DOMContentLoaded", () => {

  updateCartCount();

  renderCart();

});