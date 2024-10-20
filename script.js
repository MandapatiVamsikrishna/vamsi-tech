// Sample product data
const products = [
    {
        id: 1,
        name: "Migraine Tablets",
        price: 100,
        image: "https://5.imimg.com/data5/SELLER/Default/2022/10/LS/OF/DQ/151454344/migraine-medicine-tablets.jpg",
        description: "Head Ach use"
    },
    {
        id: 2,
        name: "Dolo 650",
        price: 150,
        image: "https://5.imimg.com/data5/SELLER/Default/2021/6/QJ/KS/FB/15283689/fever-tablet-500x500.jpeg",
        description: "Feaver"
    },
    {
        id: 3,
        name: "Antibiotic Tablet",
        price: 200,
        image: "https://5.imimg.com/data5/SELLER/Default/2022/6/CX/EL/VT/132111207/antibiotic-tablets-capsule-syrup-1000x1000.jpeg",
        description: "cold"
    }
];

// Initialize cart
let cart = [];

// Load products into the DOM
const productList = document.getElementById('product-list');
products.forEach(product => {
    const productElement = document.createElement('div');
    productElement.classList.add('product');
    productElement.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <p class="price">$${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productList.appendChild(productElement);
});

// Add to cart functionality
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCartCount();
    alert(`${product.name} has been added to your cart.`);
}

// Update cart count in the header
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length;
}
