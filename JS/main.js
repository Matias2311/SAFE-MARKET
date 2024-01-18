;function loadCartFromStorage() {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
        shoppingCart = JSON.parse(cartData);
    }
}
function displayCart() {
    var cartList = document.getElementById('cartList');
    var totalElement = document.getElementById('total');

    // Verifica si los elementos existen antes de continuar
    if (!cartList || !totalElement) {
        console.error("No se pudieron encontrar elementos del carrito en el DOM.");
        return;
    }

    // Limpia el contenido previo del contenedor del carrito
    cartList.innerHTML = '';

    // Itera sobre los productos en el carrito y agrega elementos al DOM
    for (var i = 0; i < shoppingCart.length; i++) {
        var product = shoppingCart[i];
        var cartItem = document.createElement('li');
        cartItem.className = 'list-group-item';

        // Agrega contenido al elemento del carrito
        cartItem.innerHTML = `
            <div class="d-flex justify-content-between">
                <span>${product.name} - Quantity: ${product.quantity}</span>
                <span>$${calculateProductPrice(product).toFixed(2)}</span>
            </div>
        `;

        // Agrega el elemento del carrito a la lista
        cartList.appendChild(cartItem);
    }

    // Actualiza el total
    totalElement.innerHTML = calculateTotal().toFixed(2);
}

function displayTotal() {
    const totalElement = document.getElementById('total');
    const totalAmount = calculateTotal();
    totalElement.textContent = totalAmount.toFixed(2);
}

function calculateTotal(cart) {
    let total = 0;

    if (Array.isArray(cart)) {
        for (const product of cart) {
            total += calculateProductPrice(product);
        }
    }

    return total;
}
function init() {
    loadCartFromStorage();
    displayCart();
    displayTotal();
}
document.addEventListener('DOMContentLoaded', init);
// Función para calcular el precio total de un producto
function calculateProductPrice(product) {
    return product.price * product.quantity;
}
// Función para crear un elemento visual que representa un artículo en el carrito
function createCartItem(product) {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.dataset.productId = product.id; // Agregamos un atributo de datos para identificación

    // Estructura básica del elemento, puedes personalizarla según tu diseño
    cartItem.innerHTML = `
        <img src="./ruta/a/la/imagen.jpg" alt="${product.name}" class="cart-item-image">
        <div class="cart-item-details">
            <p class="cart-item-name">${product.name}</p>
            <p class="cart-item-price">$${calculateProductPrice(product).toFixed(2)}</p>
            <p class="cart-item-quantity">Quantity: ${product.quantity}</p>
            <button class="remove-item-button" onclick="removeItem(${product.id})">Remove Item</button>
        </div>
    `;

    return cartItem;
}
// Función para crear un mensaje cuando el carrito esté vacío
function createEmptyCartMessage() {
    const emptyCartMessage = document.createElement('p');
    emptyCartMessage.textContent = 'Tu carrito está vacío.';
    emptyCartMessage.classList.add('empty-cart-message');
    return emptyCartMessage;
}
// Función para remover un elemento del carrito
function removeItem(productId) {
    // Encuentra el índice del producto en el carrito
    const index = shoppingCart.findIndex(item => item.id === productId);

    // Si se encuentra, elimina el elemento y actualiza la visualización
    if (index !== -1) {
        shoppingCart.splice(index, 1);
        updateCart();
    }
}
// Función para actualizar la visualización del carrito
function updateCart() {
    const cartContainer = document.getElementById('cart-container');
    
    // Elimina todos los elementos actuales del carrito
    while (cartContainer.firstChild) {
        cartContainer.removeChild(cartContainer.firstChild);
    }

    // Si hay productos en el carrito, muestra los elementos, de lo contrario, muestra el mensaje vacío
    if (shoppingCart.length > 0) {
        shoppingCart.forEach(product => {
            const cartItemElement = createCartItem(product);
            cartContainer.appendChild(cartItemElement);
        });
    } else {
        const emptyCartMessageElement = createEmptyCartMessage();
        cartContainer.appendChild(emptyCartMessageElement);
    }
}
function addToCart() {
    // Obtener el producto seleccionado
    var selectedProduct = {
        id: document.getElementById('productSelect').value,
        name: document.getElementById('productSelect').options[document.getElementById('productSelect').selectedIndex].text,
        price: getProductPrice(document.getElementById('productSelect').value), // Reemplaza getProductPrice con la lógica adecuada
        quantity: parseInt(document.getElementById('quantityInput').value, 10)
    };

    // Agregar el producto al carrito
    shoppingCart.push(selectedProduct);

    // Actualizar y mostrar el carrito
    updateCart();
    displayCart();
    displayTotal();
}
function getProductPrice(productId) {
    // Implementa la lógica para obtener el precio del producto según el productId
    // Puedes usar un switch o un objeto de productos para obtener el precio
    // Ejemplo:
    switch (productId) {
        case 'camara':
            return 13.99;
        case 'sweater':
            return 14.99;
        case 'jeans':
            return 13.99;
        case 'auriculares':
            return 15.99;
        default:
            return 0.00; // Precio predeterminado en caso de que no haya coincidencia
    }
}


