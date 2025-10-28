const addCartBtns = document.querySelectorAll('.add-cart-btn');
const cartCount = document.querySelector('.cart-count');
const cartLink = document.querySelector('.cart-link');
const cartDropdown = document.querySelector('.cart-dropdown');
const cartItemsList = document.querySelector('.cart-items');
const emptyCartText = document.querySelector('.empty-cart');
const cartTotalText = document.querySelector('.cart-total');

let cartItems = [];

// Update counter
function updateCartCount() {
    cartCount.textContent = cartItems.length;
}

// Render mini cart dropdown
function renderCart() {
    cartItemsList.innerHTML = '';
    let total = 0;

    if (cartItems.length === 0) {
        emptyCartText.style.display = 'block';
        cartTotalText.textContent = 'Total: $0.00';
    } else {
        emptyCartText.style.display = 'none';
        cartItems.forEach((item, index) => {
            const li = document.createElement('li');

            li.textContent = `${item.name} - $${item.price.toFixed(2)}`;

            const removeBtn = document.createElement('button');
            removeBtn.innerHTML = '🗑️';
            removeBtn.addEventListener('click', () => {
                cartItems.splice(index, 1);
                updateCartCount();
                renderCart();
            });
            li.appendChild(removeBtn);
            cartItemsList.appendChild(li);

            total += item.price;
        });
        cartTotalText.textContent = `Total: $${total.toFixed(2)}`;
    }
}

// Add to cart
addCartBtns.forEach((btn, idx) => {
    btn.addEventListener('click', e => {
        const productBox = e.target.parentElement;
        const productName = productBox.querySelector('h3').textContent;
        const productPrice = parseFloat(productBox.querySelector('p').textContent.replace('$',''));
        cartItems.push({ name: productName, price: productPrice });
        updateCartCount();
        renderCart();
    });
});

// Toggle dropdown
cartLink.addEventListener('click', () => {
    cartDropdown.classList.toggle('active');
});
