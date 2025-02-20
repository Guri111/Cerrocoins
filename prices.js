const companies = [
    { name: "Empresa A", price: getRandomPrice() },
    { name: "Empresa B", price: getRandomPrice() },
    { name: "Empresa C", price: getRandomPrice() }
];

function getRandomPrice() {
    return (Math.random() * 4 + 1).toFixed(2); // Precio entre 1 y 5
}

function updatePrices() {
    companies.forEach(company => {
        company.price = getRandomPrice();
    });
    localStorage.setItem("companies", JSON.stringify(companies));
}

setInterval(updatePrices, 30 * 60 * 1000); // Actualiza cada 30 minutos

// Guarda los precios al iniciar si es la primera vez
if (!localStorage.getItem("companies")) {
    localStorage.setItem("companies", JSON.stringify(companies));
} else {
    companies.splice(0, companies.length, ...JSON.parse(localStorage.getItem("companies")));
}
