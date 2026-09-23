const CART_STORAGE_KEY = "cart-items";

export function loadCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

export function addToCart(product, quantityChange = 1) {
  if (!product || !product.productID) return;
  const cart = loadCart();
  const existingIndex = cart.findIndex((item) => item.productID === product.productID);

  if (existingIndex === -1) {
    if (quantityChange > 0) {
      cart.push({
        image: product.images?.[0] ?? product.image ?? "",
        productID: product.productID,
        name: product.name,
        price: Number(product.price) || 0,
        labelledPrice: Number(product.labelledPrice) || Number(product.price) || 0,
        quantity: quantityChange,
      });
    }
  } else {
    cart[existingIndex].quantity += quantityChange;
    if (cart[existingIndex].quantity <= 0) {
      cart.splice(existingIndex, 1);
    }
  }

  saveCart(cart);
}

export function getTotal() {
  return loadCart().reduce((total, item) => total + item.price * item.quantity, 0);
}
