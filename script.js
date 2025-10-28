const addCartBtns = document.querySelectorAll('.add-cart-btn');
const cartCount = document.querySelector('.cart-count');
const cartLink = document.querySelector('.cart-link');
const cartDropdown = document.querySelector('.cart-dropdown');
const cartItemsList = document.querySelector('.cart-items');
const emptyCartText = document.querySelector('.empty-cart');

let cartItems = [];

// Update counter
function updateCartCount() {
    cartCount.textContent = cartItems.reduce((sum, item) => sum + item.qty, 0);
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
            li.innerHTML = `
                ${item.name} x${item.qty} - $${(item.price * item.qty).toFixed(2)}
                <button class="remove-item" data-index="${index}">🗑️</button>
            `;
            cartItemsList.appendChild(li);
        });

        // Add total and checkout button at the bottom
        const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
        const totalLi = document.createElement('li');
        totalLi.style.fontWeight = '700';
        totalLi.style.marginTop = '8px';
        totalLi.textContent = `Total: $${total.toFixed(2)}`;
        cartItemsList.appendChild(totalLi);

        const checkoutBtn = document.createElement('button');
        checkoutBtn.textContent = 'Checkout';
        checkoutBtn.style.marginTop = '6px';
        checkoutBtn.style.width = '100%';
        checkoutBtn.style.padding = '10px';
        checkoutBtn.style.border = 'none';
        checkoutBtn.style.borderRadius = '6px';
        checkoutBtn.style.background = '#ffd700';
        checkoutBtn.style.color = '#111';
        checkoutBtn.style.fontWeight = '700';
        cartItemsList.appendChild(checkoutBtn);

        // Attach remove item functionality
        const removeButtons = document.querySelectorAll(".remove-item");
        removeButtons.forEach((btn) => {
            btn.addEventListener("click", () => {
                cartItems.splice(btn.dataset.index, 1);
                updateCartCount();
                renderCart();
            });
        });
    }
}

// Add to cart
addCartBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        const productBox = e.target.closest('.product-box');
        const productName = productBox.querySelector('h3').textContent;
        const price = parseFloat(productBox.querySelector('p').textContent.replace('$',''));
        const existing = cartItems.find(item => item.name === productName);
        if(existing) existing.qty++;
        else cartItems.push({name: productName, price: price, qty: 1});
        updateCartCount();
        renderCart();
    });
});

// Toggle dropdown
cartLink.addEventListener('click', () => {
    cartDropdown.classList.toggle('active');
});

// Mobile adjustment: keep dropdown visible on screen
function adjustDropdownMobile() {
    if(window.innerWidth <= 560){
        const dropdownWidth = cartDropdown.offsetWidth;
        const viewportWidth = window.innerWidth;
        cartDropdown.style.left = `${Math.max(4, viewportWidth - dropdownWidth - 10)}px`;
    } else {
        cartDropdown.style.left = '';
    }
}

window.addEventListener('resize', adjustDropdownMobile);
adjustDropdownMobile();
