const addCartBtns = document.querySelectorAll('.add-cart-btn');
const cartCount = document.querySelector('.cart-count');
const cartLink = document.querySelector('.cart-link');
const cartDropdown = document.querySelector('.cart-dropdown');
const cartItemsList = document.querySelector('.cart-items');
const emptyCartText = document.querySelector('.empty-cart');

let cartItems = [];

// Update counter
function updateCartCount() {
    cartCount.textContent = cartItems.length;
}

// Render mini cart dropdown
function renderCart() {
    cartItemsList.innerHTML = '';
    if (cartItems.length === 0) {
        emptyCartText.style.display = 'block';
    } else {
        emptyCartText.style.display = 'none';
        cartItems.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = item;
            const removeBtn = document.createElement('button');
            removeBtn.innerHTML = '🗑️';
            removeBtn.addEventListener('click', () => {
                cartItems.splice(index, 1);
                updateCartCount();
                renderCart();
            });
            li.appendChild(removeBtn);
            cartItemsList.appendChild(li);
