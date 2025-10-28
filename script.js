let cartCount = 0;
let cartItems = [];

// Add item to cart
function addToCart(name){
  cartCount++;
  cartItems.push(name);

  const countEl = document.getElementById('cart-count');
  if(countEl) countEl.textContent = cartCount;

  const list = document.getElementById('cart-items');
  if(list){
    const li = document.createElement('li');
    li.textContent = name;

    const removeBtn = document.createElement('button');
    removeBtn.innerHTML = '🗑️';
    removeBtn.onclick = () => removeFromCart(name, li);

    li.appendChild(removeBtn);
    list.appendChild(li);
  }

  const empty = document.querySelector('.cart-empty');
  if(empty) empty.style.display = cartItems.length ? 'none' : 'block';
}

// Remove item
function removeFromCart(name, li){
  const index = cartItems.indexOf(name);
  if(index > -1) cartItems.splice(index,1);
  li.remove();
  cartCount--;
  const countEl = document.getElementById('cart-count');
  if(countEl) countEl.textContent = cartCount;
  const empty = document.querySelector('.cart-empty');
  if(empty) empty.style.display = cartItems.length ? 'none' : 'block';
}

// dropdown toggle
const cartWrapper = document.querySelector('.cart-wrapper');
const cartLink = document.getElementById('cart-link');
const cartDropdown = document.getElementById('cart-dropdown');

if(cartLink && cartWrapper){
  cartLink.addEventListener('click', function(e){
    e.preventDefault();
    const isOpen = cartWrapper.classList.toggle('open');
    cartLink.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    cartDropdown.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
  });

  window.addEventListener('click', (ev)=>{
    if(!cartWrapper.contains(ev.target)){
      cartWrapper.classList.remove('open');
      cartLink.setAttribute('aria-expanded','false');
      cartDropdown.setAttribute('aria-hidden','true');
    }
  });
}
