const cartBtn = document.getElementById("cart-btn");
const cartDropdown = document.getElementById("cart-dropdown");
const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartTotalPrice = document.getElementById("cart-total-price");
const addToCartButtons = document.querySelectorAll(".add-to-cart");

let cart = [];

addToCartButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const product = e.target.closest(".product");
    const name = product.dataset.name;
    const price = parseFloat(product.dataset.price);

    const existing = cart.find((item) => item.name === name);
    if (existing) existing.qty++;
    else cart.push({ name, price, qty: 1 });

    updateCart();
  });
});

cartBtn.addEventListener("click", (e) => {
  e.preventDefault();
  cartDropdown.style.display =
    cartDropdown.style.display === "block" ? "none" : "block";
});

function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} (${item.qty}) - $${(item.price * item.qty).toFixed(2)}
      <button class="remove-item" data-index="${index}">🗑️</button>
    `;
    cartItems.appendChild(li);
    total += item.price * item.qty;
  });

  cartCount.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
  cartTotalPrice.textContent = `$${total.toFixed(2)}`;

  document.querySelectorAll(".remove-item").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      cart.splice(index, 1);
      updateCart();
    });
  });
}
