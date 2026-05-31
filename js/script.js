// ======================
// CART DATA
// ======================

let fishCart = [];
let relicCart = [];

// ======================
// SAVE & LOAD
// ======================

function saveCart() {

    localStorage.setItem(
        "fishCart",
        JSON.stringify(fishCart)
    );

    localStorage.setItem(
        "relicCart",
        JSON.stringify(relicCart)
    );
}

function updateBadge() {

    const badge =
    document.getElementById("cart-badge");

    if (badge) {

        badge.textContent =
        fishCart.length +
        relicCart.length;
    }
}

// ======================
// ADD FISH
// ======================

function addFish(name, price) {

    fishCart.push({
        name: name,
        price: Number(price)
    });

    saveCart();
    updateBadge();
    renderCart();

    alert(name + " added to cart!");
}

// ======================
// ADD RELIC
// ======================

function addRelic(name, price) {

    relicCart.push({
        name: name,
        price: Number(price)
    });

    saveCart();
    updateBadge();
    renderCart();

    alert(name + " added to cart!");
}

// ======================
// RENDER CART
// ======================

function renderCart() {

    const cartItems =
    document.getElementById("cart-items");

    if (!cartItems) return;

    let html = "";

    // FISH
    fishCart.forEach((item, index) => {

        html += `
        <div class="cart-item">

            <div>
                🐟 ${item.name}
                <br>
                $${item.price}
            </div>

            <button
            onclick="removeFish(${index})">
            ❌
            </button>

        </div>
        `;
    });

    // RELIC
    relicCart.forEach((item, index) => {

        html += `
        <div class="cart-item">

            <div>
                🔮 ${item.name}
                <br>
                $${item.price}
            </div>

            <button
            onclick="removeRelic(${index})">
            ❌
            </button>

        </div>
        `;
    });

    if (
        fishCart.length === 0 &&
        relicCart.length === 0
    ) {

        html = `
        <p class="empty-cart">
            Cart is empty
        </p>
        `;
    }

    cartItems.innerHTML = html;

    updateTotals();
}

// ======================
// REMOVE FISH
// ======================

function removeFish(index) {

    fishCart.splice(index, 1);

    saveCart();
    updateBadge();
    renderCart();
}

// ======================
// REMOVE RELIC
// ======================

function removeRelic(index) {

    relicCart.splice(index, 1);

    saveCart();
    updateBadge();
    renderCart();
}

// ======================
// TOTAL
// ======================

function updateTotals() {

    let fishTotal = 0;
    let relicTotal = 0;

    fishCart.forEach(item => {
        fishTotal += Number(item.price);
    });

    relicCart.forEach(item => {
        relicTotal += Number(item.price);
    });

    const fishElement =
    document.getElementById("fish-total");

    const relicElement =
    document.getElementById("relic-total");

    const itemElement =
    document.getElementById("item-count");

    if(fishElement){
        fishElement.textContent =
        "$" + fishTotal.toFixed(2);
    }

    if(relicElement){
        relicElement.textContent =
        "S$ " + relicTotal.toLocaleString();
    }

    if(itemElement){
        itemElement.textContent =
        fishCart.length + relicCart.length;
    }
}
// ======================
// OPEN/CLOSE CART
// ======================

function toggleCart() {

    document
    .getElementById("cart-panel")
    .classList
    .toggle("active");
}

// ======================
// CHECKOUT WA
// ======================

function checkout() {

    if (
        fishCart.length === 0 &&
        relicCart.length === 0
    ) {

        alert("Cart is empty");
        return;
    }

    let total = 0;

    let text =
`Hello Zimzam Trading

I want to order:

`;

    // FISH
    fishCart.forEach(item => {

        text +=
`🐟 ${item.name} - $${item.price}
`;

        total += item.price;
    });

    // RELIC
    relicCart.forEach(item => {

        text +=
`🔮 ${item.name} - $${item.price}
`;

        total += item.price;
    });

    text +=
`
--------------------
Total = $${total.toFixed(2)}

Thank you.
`;

    window.open(
        `https://wa.me/628881010901?text=${encodeURIComponent(text)}`,
        "_blank"
    );
}

// ======================
// LOAD CART
// ======================

window.onload = function () {

    const savedFish =
    localStorage.getItem("fishCart");

    const savedRelic =
    localStorage.getItem("relicCart");

    if (savedFish) {
        fishCart =
        JSON.parse(savedFish);
    }

    if (savedRelic) {
        relicCart =
        JSON.parse(savedRelic);
    }

    updateBadge();
    renderCart();
};
