// Declaración de la variable shoppingCart utilizando const
const shoppingCart = [];

// Función para calcular el precio total de un producto
const calculateProductPrice = (product) => {
    return product.price * product.quantity;
};

// Función para agregar un producto al carrito
const addToCart = () => {
    // Obtiene el valor seleccionado del menú desplegable
    const productSelect = document.getElementById('productSelect');
    const selectedProduct = productSelect.value;

    // Obtiene la cantidad del input
    const quantityInput = document.getElementById('quantityInput');
    const quantity = parseInt(quantityInput.value);

    // Crea un nuevo objeto de producto
    const product = {
        id: shoppingCart.length + 1,
        name: selectedProduct,
        price: getProductPrice(selectedProduct),
        quantity: quantity
    };

    // Agrega el producto al carrito
    shoppingCart.push(product);

    // Actualiza y muestra el carrito
    displayCart();

    // Limpia el formulario
    quantityInput.value = '1';
};

// Función para mostrar el carrito
const displayCart = () => {
    // Obtén el elemento UL del carrito
    const cartList = document.getElementById('cartList');

    // Limpia el contenido anterior del carrito
    cartList.innerHTML = '';

    // Recorre el carrito y muestra cada producto
    shoppingCart.forEach((product) => {
        const cartItem = document.createElement('li');
        cartItem.innerHTML = `
            <p>${product.name} - $${calculateProductPrice(product).toFixed(2)} - Quantity: ${product.quantity}</p>
        `;
        cartList.appendChild(cartItem);
    });

    // Calcula y muestra el precio total
    displayTotal();
};

// Función para mostrar el precio total
const displayTotal = () => {
    const totalElement = document.getElementById('total');

    // Calcula el precio total del carrito
    const total = calculateTotal();

    // Muestra el precio total
    totalElement.innerHTML = total.toFixed(2);
};

// Función para calcular el precio total del carrito
const calculateTotal = () => {
    let total = 0;

    // Recorre el carrito y suma los precios de cada producto
    shoppingCart.forEach((product) => {
        total += calculateProductPrice(product);
    });

    return total;
};

// Función para obtener el precio de un producto según su nombre
const getProductPrice = (productName) => {
    // Define los precios de los productos (puedes modificar según sea necesario)
    const productPrices = {
        'Cámara': 13.99,
        'Sweater': 14.99,
        'Jeans': 13.99,
        'Auriculares': 15.99
    };

    // Devuelve el precio del producto o cero si no se encuentra
    return productPrices[productName] || 0;
};

// Inicializa la página cargando el carrito y el total
document.addEventListener('DOMContentLoaded', () => {
    displayCart();
    displayTotal();
});
