
function updateBadge() {

    const total =
        fishCart.length +
        relicCart.length;

    [
        "cart-badge",
        "cart-badge-toggle",
        "cart-badge-panel"
    ].forEach(id => {

        const badge =
            document.getElementById(id);

        if(!badge) return;

        badge.textContent = total;

        badge.style.display =
    total > 0
    ? "inline-flex"
    : "none";
	
    });
}
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

function clearCart(){

    if(
        !confirm(
            "Clear all items?"
        )
    ) return;

    fishCart = [];
    relicCart = [];

    localStorage.removeItem(
        "fishCart"
    );

    localStorage.removeItem(
        "relicCart"
    );

    updateBadge();
    renderCart();

    showToast(
        "Cart cleared"
    );
}

function toggleCart() {

    const panel =
        document.getElementById("cart-panel");

    const overlay =
        document.getElementById("cart-overlay");

    if (!panel) {
        console.error(
            "cart-panel not found"
        );
        return;
    }

    panel.classList.toggle("active");

    overlay?.classList.toggle("active");

    document.body.classList.toggle(
        "cart-open"
    );
}

function closeCart(){

    const panel =
        document.getElementById("cart-panel");

    const overlay =
        document.getElementById("cart-overlay");

    panel?.classList.remove("active");
    overlay?.classList.remove("active");

    document.body.classList.remove(
        "cart-open"
    );
}

document.addEventListener("DOMContentLoaded", () => {

    const overlay =
        document.getElementById("cart-overlay");

    if (overlay) {

        overlay.addEventListener(
            "click",
            toggleCart
        );
    }
});

function animateCart() {

    const btn =
    document.querySelector(".cart-toggle");

    if(!btn) return;

    btn.classList.add("bounce");

    setTimeout(() => {

        btn.classList.remove("bounce");

    }, 500);
}

function addFish(name, price) {

    fishCart.push({
        name,
        price:Number(price)
    });

    saveCart();
    updateBadge();
    renderCart();

    animateCart();
showToast(name + " added to cart");
}

function addRelic(name, price) {

    relicCart.push({
        name,
        price:Number(price)
    });

    saveCart();
    updateBadge();
    renderCart();

    animateCart();
showToast(name + " added to cart");
}
function showToast(message){

    const toast =
    document.createElement("div");

    toast.className =
    "toast";

    toast.textContent =
    message;

    document.body.appendChild(toast);

    setTimeout(()=>{
        toast.classList.add("show");
    },10);

    setTimeout(()=>{
        toast.remove();
    },2500);
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
	
text += `
━━━━━━━━━━━━━━
Total Items : ${
    fishCart.length +
    relicCart.length
}

Total Price : $${total.toFixed(2)}
━━━━━━━━━━━━━━

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
document.addEventListener(
    "DOMContentLoaded",
    () => {

        const savedFish =
            localStorage.getItem(
                "fishCart"
            );

        const savedRelic =
            localStorage.getItem(
                "relicCart"
            );

        if(savedFish){
            fishCart =
            JSON.parse(savedFish);
        }

        if(savedRelic){
            relicCart =
            JSON.parse(savedRelic);
        }

        updateBadge();
        renderCart();

    }
);
