let userData = JSON.parse(localStorage.getItem("userData")) || { cerrocoins: 5, portfolio: {} };
let companies = JSON.parse(localStorage.getItem("companies")) || [];

document.getElementById("cerrocoins").textContent = userData.cerrocoins;

function renderMarket() {
    const marketList = document.getElementById("market-list");
    marketList.innerHTML = "";

    companies.forEach((company, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${company.name}</td>
            <td>${company.price} CC</td>
            <td>
                <button onclick="buy(${index})">Comprar</button>
                <button class="sell" onclick="sell(${index})">Vender</button>
            </td>
        `;

        marketList.appendChild(row);
    });
}

function renderPortfolio() {
    const portfolioList = document.getElementById("portfolio-list");
    portfolioList.innerHTML = "";

    for (const company in userData.portfolio) {
        if (userData.portfolio[company] > 0) {
            const companyData = companies.find(c => c.name === company);
            const totalValue = (userData.portfolio[company] * companyData.price).toFixed(2);

            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${company}</td>
                <td>${userData.portfolio[company]}</td>
                <td>${totalValue} CC</td>
            `;

            portfolioList.appendChild(row);
        }
    }
}

function buy(index) {
    const company = companies[index];

    if (userData.cerrocoins >= company.price) {
        userData.cerrocoins -= company.price;
        userData.portfolio[company.name] = (userData.portfolio[company.name] || 0) + 1;

        updateLocalStorage();
        render();
    } else {
        alert("No tienes suficientes Cerrocoins.");
    }
}

function sell(index) {
    const company = companies[index];

    if (userData.portfolio[company.name] && userData.portfolio[company.name] > 0) {
        userData.cerrocoins += parseFloat(company.price);
        userData.portfolio[company.name]--;

        // Si ya no tiene más acciones de esa empresa, eliminarla del portafolio
        if (userData.portfolio[company.name] === 0) {
            delete userData.portfolio[company.name];
        }

        updateLocalStorage();
        render();
    } else {
        alert("No tienes acciones de esta empresa.");
    }
}

function updateLocalStorage() {
    localStorage.setItem("userData", JSON.stringify(userData));
}

function render() {
    document.getElementById("cerrocoins").textContent = userData.cerrocoins;
    renderMarket();
    renderPortfolio();
}

render();
