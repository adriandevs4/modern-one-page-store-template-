let cartCount = 0;
let cartItems = [];

function addToCart(productName) {
    cartCount++;
    cartItems.push(productName);

    const cartCountElement = document.getElementById('cart-count');
    cartCountElement.textContent = cartCount;

    const cartList = document.getElementById('cart-items');
    const newItem = document.createElement('li');
    newItem.textContent = productName;
    cartList.appendChild(newItem);
}
