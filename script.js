// simple cart implementation (keeps items in memory)
let cartCount = 0;
let cartItems = [];

// add item
function addToCart(name){
  cartCount++;
  cartItems.push(name);

  // update counter text inside the Cart link
  const countEl = document.getElementById('cart-count');
  if(countEl) countEl.textContent = cartCount;

  // update dropdown list
  const list = document.getElementById('cart-items');
  if(list){
    const li = document.createElement('li');
    li.textContent = name;
    list.appendChild(li);
  }
  // hide empty message if present
  const empty = document.querySelector('.cart-empty');
  if(empty) empty.style.display = cartItems.length ? 'none' : 'block';
}

// dropdown toggle (works on click)
const cartWrapper = document.querySelector('.cart-wrapper');
const cartLink = document.getElementById('cart-link');
const cartDropdown = document.getElementById('cart-dropdown');

if(cartLink && cartWrapper){
  cartLink.addEventListener('click', function (e){
    e.preventDefault();
    const isOpen = cartWrapper.classList.toggle('open');
    cartLink.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    cartDropdown.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
  });

  // close when clicking outside
  window.addEventListener('click', (ev) => {
    if(!cartWrapper.contains(ev.target)){
      cartWrapper.classList.remove('open');
      cartLink.setAttribute('aria-expanded','false');
      cartDropdown.setAttribute('aria-hidden','true');
    }
  });
}
