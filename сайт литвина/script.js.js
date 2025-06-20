const cart = [];
const cartCount = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const viewButtons = document.querySelectorAll('.view-btn');
const modal = document.getElementById('product-modal');

const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalPrice = document.getElementById('modal-price');
const addToCartModal = document.getElementById('add-to-cart-modal');

let currentProduct = null;

viewButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const product = btn.closest('.product');
    const id = product.dataset.id;
    const name = product.dataset.name;
    const price = product.dataset.price;
    const image = product.dataset.image;
    const desc = product.dataset.desc;

    modalImage.src = image;
    modalTitle.textContent = name;
    modalDesc.textContent = desc;
    modalPrice.textContent = `${price} ₽`;

    currentProduct = { id, name, price: parseInt(price) };
    modal.style.display = 'flex';
  });
});

document.getElementById('close-modal').addEventListener('click', () => {
  modal.style.display = 'none';
});

addToCartModal.addEventListener('click', () => {
  const existing = cart.find(item => item.id === currentProduct.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...currentProduct, qty: 1 });
  }
  updateCart();
  modal.style.display = 'none';
});

document.getElementById('cart-btn').addEventListener('click', () => {
  cartModal.style.display = 'flex';
});

document.getElementById('close-cart').addEventListener('click', () => {
  cartModal.style.display = 'none';
});

function updateCart() {
  cartItems.innerHTML = '';
  let total = 0;
  let count = 0;

  cart.forEach(item => {
    total += item.price * item.qty;
    count += item.qty;

    const li = document.createElement('li');
    li.innerHTML = `
      ${item.name} x ${item.qty}
      <button onclick="removeFromCart('${item.id}')">🗑</button>
    `;
    cartItems.appendChild(li);
  });

  cartTotal.textContent = total;
  cartCount.textContent = count;
}

function removeFromCart(id) {
  const index = cart.findIndex(item => item.id === id);
  if (index !== -1) {
    cart.splice(index, 1);
    updateCart();
  }
}
