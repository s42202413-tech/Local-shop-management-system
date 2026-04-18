// Local Shop Management System - script.js

// Product Data
let products = [
    { id: 1, name: "Rice", price: 20, stock: 50 },
    { id: 2, name: "Sugar", price: 15, stock: 40 },
    { id: 3, name: "Soap", price: 5, stock: 100 }
];

// Customer Data
let customers = [];

// Sales Data
let sales = [];

// Display Products
function displayProducts() {
    let table = document.getElementById("productTable");
    table.innerHTML = "";

    products.forEach(product => {
        table.innerHTML += `
            <tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>$${product.price}</td>
                <td>${product.stock}</td>
            </tr>
        `;
    });
}

// Add Product
function addProduct() {
    let name = document.getElementById("pname").value;
    let price = parseFloat(document.getElementById("pprice").value);
    let stock = parseInt(document.getElementById("pstock").value);

    let newProduct = {
        id: products.length + 1,
        name: name,
        price: price,
        stock: stock
    };

    products.push(newProduct);
    displayProducts();
    alert("Product Added Successfully!");
}

// Add Customer
function addCustomer() {
    let cname = document.getElementById("cname").value;
    let phone = document.getElementById("cphone").value;

    customers.push({
        name: cname,
        phone: phone
    });

    alert("Customer Added Successfully!");
}

// Make Sale
function makeSale() {
    let productId = parseInt(document.getElementById("saleId").value);
    let qty = parseInt(document.getElementById("saleQty").value);

    let product = products.find(p => p.id === productId);

    if (product) {
        if (product.stock >= qty) {
            product.stock -= qty;

            let total = qty * product.price;

            sales.push({
                product: product.name,
                quantity: qty,
                total: total
            });

            displayProducts();
            alert("Sale Completed! Total = $" + total);
        } else {
            alert("Not enough stock!");
        }
    } else {
        alert("Product not found!");
    }
}

// Search Product
function searchProduct() {
    let keyword = document.getElementById("search").value.toLowerCase();

    let result = products.filter(product =>
        product.name.toLowerCase().includes(keyword)
    );

    let table = document.getElementById("productTable");
    table.innerHTML = "";

    result.forEach(product => {
        table.innerHTML += `
            <tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>$${product.price}</td>
                <td>${product.stock}</td>
            </tr>
        `;
    });
}

// Dashboard Summary
function updateDashboard() {
    document.getElementById("totalProducts").innerText = products.length;

    let totalSales = sales.reduce((sum, sale) => sum + sale.total, 0);
    document.getElementById("totalSales").innerText = "$" + totalSales;

    document.getElementById("totalCustomers").innerText = customers.length;
}

// Auto Update Dashboard Every 2 Seconds
setInterval(updateDashboard, 2000);

// Load Products on Start
window.onload = function () {
    displayProducts();
    updateDashboard();
};
