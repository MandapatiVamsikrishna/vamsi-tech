const stripe = Stripe('YOUR_PUBLISHABLE_KEY'); // Replace with your Stripe publishable key
const elements = stripe.elements();
const cardElement = elements.create('card');
cardElement.mount('#card-element');

// Load cart data
window.onload = function () {
    const cartItemsElement = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');

    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let total = 0;

    if (cartItems.length === 0) {
        cartItemsElement.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cartItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `<p>${item.name} - $${item.price}</p>`;
            cartItemsElement.appendChild(itemElement);
            total += item.price;
        });
    }

    cartTotalElement.textContent = total.toFixed(2);
};

// Handle payment
const form = document.getElementById('payment-form');
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
    });

    if (error) {
        document.getElementById('payment-message').textContent = error.message;
        document.getElementById('payment-message').classList.remove('hidden');
    } else {
        processPayment(paymentMethod.id);
    }
});

// Process payment with server
async function processPayment(paymentMethodId) {
    const cartTotal = parseFloat(document.getElementById('cart-total').textContent) * 100; // Convert to cents

    const response = await fetch('/create-payment-intent', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            paymentMethodId,
            amount: cartTotal,
        }),
    });

    const result = await response.json();
    if (result.error) {
        document.getElementById('payment-message').textContent = result.error.message;
        document.getElementById('payment-message').classList.remove('hidden');
    } else {
        document.getElementById('payment-message').textContent = 'Payment successful!';
        document.getElementById('payment-message').classList.remove('hidden');
        localStorage.clear(); // Clear cart after successful payment
    }
}
