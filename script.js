// Initialize cart count and cart items array
let cartCount = 0;
let cartItems = [];

// Function to add item to cart
function addToCart(productName) {
    cartCount++;
    cartItems.push(productName);

    // Update cart counter
    const cartCountElement = document.getElementById('cart-count');
    cartCountElement.textContent = cartCount;

    // Update cart dropdown
    const cartList = document.getElementById('cart-items');
    const newItem = document.createElement('li');
    newItem.textContent = productName;
    cartList.appendChild(newItem);
}
