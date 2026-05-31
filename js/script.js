<script>

let fishCart = [];
let relicCart = [];

/* =========================
   UPDATE TOTALS
========================= */
function updateTotals() {

    const fishTotal =
        fishCart.reduce(
            (sum,item)=>sum + item.price,
            0
        );

    const relicTotal =
        relicCart.reduce(
            (sum,item)=>sum + item.price,
            0
        );

    const totalItems =
        fishCart.length +
        relicCart.length;

    const fishTotalEl =
        document.getElementById("fish-total");

    const relicTotalEl =
        document.getElementById("relic-total");

    const itemCountEl =
        document.getElementById("item-count");

    if(fishTotalEl){
        fishTotalEl.textContent =
        "$" + fishTotal.toFixed(2);
    }

    if(relicTotalEl){
        relicTotalEl.textContent =
        "S$ " + relicTotal.toLocaleString();
    }

    if(itemCountEl){
        itemCountEl.textContent =
        totalItems;
    }

    saveCart();
}

function renderCart(){

    const cartItems =
    document.getElementById("cart-items");

    if(!cartItems) return;

    let html = "";

    fishCart.forEach(item=>{
        html += `
        <div>
        🐟 ${item.name}
        ($${item.price})
        </div>
        `;
    });

    relicCart.forEach(item=>{
        html += `
        <div>
        🔮 ${item.name}
        (S$ ${item.price})
        </div>
        `;
    });

    cartItems.innerHTML = html;
}
renderCart();
addFish()
addRelic()
loadCart()
clearCart()

/* =========================
   ADD FISH
========================= */
function addFish(name, price) {

    fishCart.push({
        name,
        price: Number(price)
    });

    updateTotals();

    alert("🐟 " + name + " added to cart!");
}

/* =========================
   ADD RELIC
========================= */
function addRelic(name, price) {

    relicCart.push({
        name,
        price: Number(price)
    });

    updateTotals();

    alert("🔮 " + name + " added to cart!");
}

/* =========================
   SAVE CART
========================= */
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

/* =========================
   LOAD CART
========================= */
function loadCart() {

    fishCart =
        JSON.parse(
            localStorage.getItem("fishCart")
        ) || [];

    relicCart =
        JSON.parse(
            localStorage.getItem("relicCart")
        ) || [];

    updateTotals();
}

/* =========================
   CHECKOUT WHATSAPP
========================= */
function checkoutCart() {

    if (
        fishCart.length === 0 &&
        relicCart.length === 0
    ) {
        alert("Cart is empty!");
        return;
    }

    let fishTotal = 0;
    let relicTotal = 0;

    let message =
`🎣 ZIMZAM TRADING FISCH

`;

    if (fishCart.length > 0) {

        message += "🐟 FISH ITEMS\n";

        fishCart.forEach(item => {

            message +=
                `• ${item.name} ($${item.price})\n`;

            fishTotal += item.price;
        });

        message += "\n";
    }

    if (relicCart.length > 0) {

        message += "🔮 RELICS\n";

        relicCart.forEach(item => {

            message +=
                `• ${item.name} (S$ ${item.price})\n`;

            relicTotal += item.price;
        });

        message += "\n";
    }

    message +=
`━━━━━━━━━━━━━━

💵 Fish Total:
$${fishTotal.toFixed(2)}

💰 Relic Total:
S$ ${relicTotal.toLocaleString()}

━━━━━━━━━━━━━━

🎮 Roblox Username:
...

💬 Discord Username:
...

Thank You 🙏`;

    window.open(
        "https://wa.me/628881010901?text=" +
        encodeURIComponent(message),
        "_blank"
    );
}

/* =========================
   CLEAR CART
========================= */
function clearCart() {

    fishCart = [];
    relicCart = [];

    localStorage.removeItem("fishCart");
    localStorage.removeItem("relicCart");

    updateTotals();

    alert("Cart cleared!");
}

/* =========================
   PAGE LOAD
========================= */
document.addEventListener(
    "DOMContentLoaded",
    () => {
        loadCart();
        updateTotals();
    }
);

</script>
