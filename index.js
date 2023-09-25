const itemDisplay = false;

document.querySelector('.menu-toggle').addEventListener('click', function () {

    document.querySelector('.menu-toggle').classList.toggle('active');
    document.querySelector('.cart-display').classList.toggle('active');
  });



document.addEventListener("DOMContentLoaded", function () {
  const productContainers = document.querySelectorAll(".product-container");
  const cartItemsList = document.getElementById("cart-items");
  const cartTotalSpan = document.getElementById("cart-total");
  let cartTotal = 0;

  // Load cart data from local storage
  const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
  for (const item of storedCart) {
      const { productName, productPrice, quantity } = item;
      const cartItem = createCartItemElement(productName, productPrice, quantity);
      cartItemsList.appendChild(cartItem);
      cartTotal += productPrice * quantity;
  }
  updateCartTotal();

  productContainers.forEach(container => {
      const addToCartButton = container.querySelector(".add-to-cart");
      const quantityInput = container.querySelector("input[type='number']");
      const productKey = container.getAttribute("data-product-key");
      const productInfo = getProductInfo(productKey);

      addToCartButton.addEventListener("click", function () {
          const { productName, productPrice } = productInfo;
          const quantity = parseInt(quantityInput.value);

          // Create a new cart item element
          const cartItem = createCartItemElement(productName, productPrice, quantity);

          // Update the cart total and UI
          cartTotal += productPrice * quantity;
          updateCartTotal();

          // Append the cart item to the cart items list
          cartItemsList.appendChild(cartItem);

          // Update local storage
          const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
          storedCart.push({ productName, productPrice, quantity });
          localStorage.setItem("cart", JSON.stringify(storedCart));
      });
  });

  function getProductInfo(productKey) {
      const productInfo = {
          product1: { productName: "Product 1", productPrice: 19.99 },
          product2: { productName: "Product 2", productPrice: 29.99 },
          product3: { productName: "Product 3", productPrice: 39.99 }
      };
      return productInfo[productKey];
  }

  function createCartItemElement(productName, productPrice, quantity) {
      const cartItem = document.createElement("li");
      cartItem.textContent = `${productName} x ${quantity} - $${(productPrice * quantity).toFixed(2)}`;
      
      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.addEventListener("click", function () {
          cartItemsList.removeChild(cartItem);
          cartTotal -= productPrice * quantity;
          updateCartTotal();

          // Remove from local storage
          const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
          const updatedCart = storedCart.filter(item => item.productName !== productName);
          localStorage.setItem("cart", JSON.stringify(updatedCart));
      });
      cartItem.appendChild(removeButton);

      return cartItem;
  }

  function updateCartTotal() {
      cartTotalSpan.textContent = cartTotal.toFixed(2);
  }
});