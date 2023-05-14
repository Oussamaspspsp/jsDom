// Get all the necessary elements
let itemsContainer = document.getElementById('cart-items');
let totalPriceElement = document.getElementById('price');

// Add event listeners to dynamically added elements
itemsContainer.addEventListener('click', function(event) {
  let target = event.target;

  // Decrease quantity button
  if (target.classList.contains('decrease')) {
    let inputElement = target.nextElementSibling;
    let currentValue = parseInt(inputElement.value);
    if (currentValue > 1) {
      inputElement.value = currentValue - 1;
    } else {
      inputElement.value = 0; // Set quantity to 0
    }
    updateItemTotal(target.closest('.cart-item'));
    updateTotalPrice();
  }

  // Increase quantity button
  if (target.classList.contains('increase')) {
    let inputElement = target.previousElementSibling;
    let currentValue = parseInt(inputElement.value);
    inputElement.value = currentValue + 1;
    updateItemTotal(target.closest('.cart-item'));
    updateTotalPrice();
  }

  // Delete button
  if (target.classList.contains('delete-button')) {
    let item = target.closest('.cart-item');
    item.remove();
    updateTotalPrice();
  }
  
  // Get all the like buttons
  let likeButtons = document.querySelectorAll('.like-button');

  // Add event listener to each like button
  likeButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Toggle the 'liked' class
      this.classList.toggle('liked');
    });
  });
});

// Function to update the total price for a specific item
function updateItemTotal(item) {
  let quantityElement = item.querySelector('.item-quantity input');
  let priceElement = item.querySelector('.item-price');
  let totalElement = item.querySelector('.item-total-price');
  let quantity = parseInt(quantityElement.value);
  let price = parseFloat(priceElement.textContent.slice(1));
  let total = quantity * price;
  totalElement.textContent = '$' + total.toFixed(2);
}

// Function to update the total price of all items
function updateTotalPrice() {
  let totalPrice = 0;
  let itemElements = document.getElementsByClassName('cart-item');
  for (let i = 0; i < itemElements.length; i++) {
    let totalElement = itemElements[i].querySelector('.item-total-price');
    let total = parseFloat(totalElement.textContent.slice(1));
    totalPrice += total;
  }
  totalPriceElement.textContent = '$' + totalPrice.toFixed(2);
}
