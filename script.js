// Select all add-to-cart buttons
const addCartBtns = document.querySelectorAll('.add-cart-btn');

// Cart count element
const cartCount = document.querySelector('.cart-count');

// Array to hold cart items
let cartItems = [];

// Function to update the cart count
function updateCartCount() {
    cartCount.textContent = cartItems.length;
}

// Function to add item to cart
function addToCart(productName) {
    cartItems.push(productName);
    updateCartCount();
}

// Event listeners for all add-to-cart buttons
addCartBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        // Grab the product name from the card
        const productName = btn.closest('.product-box').querySelector('h3').textContent;
        addToCart(productName);
    });
});

// OPTIONAL: If you want a remove feature (like a trash icon) inside cart dropdown
// you would create cart dropdown HTML and attach similar click handlers to remove items
