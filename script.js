const addCartBtns = document.querySelectorAll('.add-cart-btn');
const cartCount = document.querySelector('.cart-count');
const cartLink = document.querySelector('.cart-link');
const cartDropdown = document.querySelector('.cart-dropdown');
const cartItemsList = document.querySelector('.cart-items');
const emptyCartText = document.querySelector('.empty-cart');
const cartTotal = document.querySelector('.cart-total');

let cartItems = [];

// Update counter
function updateCartCount() {
    cartCount.textContent = cartItems.length;
}

// Calculate total
function updateTotal() {
    let total = 0;
    cartItems.forEach(item => total += item.price);
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
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
            li.textContent = `${item.name} - $${item.price}`;
            const removeBtn = document.createElement('button');
            removeBtn.innerHTML = '🗑️';
            removeBtn.addEventListener('click', () => {
                cartItems.splice(index, 1);
                updateCartCount();
                renderCart();
                updateTotal();
            });
            li.appendChild(removeBtn);
            cartItemsList.appendChild(li);
        });
    }
}

// Add to cart
addCartBtns.forEach((btn, index) => {
    btn.addEventListener('click', e => {
        const productBox = e.target.parentElement;
        const productName = productBox.querySelector('h3').textContent;
        const priceText = productBox.querySelector('p').textContent.replace('$','');
        const price = parseFloat(priceText);
        cartItems.push({name: productName, price: price});
        updateCartCount();
        renderCart();
        updateTotal();
    });
});

// Toggle dropdown
cartLink.addEventListener('click', () => {
    cartDropdown.classList.toggle('active');
});
