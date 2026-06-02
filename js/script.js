const cart = [];

const fishItems = [

{
name:"Awakened Omnithal",
usd:4.99,
idr:"Rp89.000",
robux:450,
scrip:"S$ 4,999"
},

{
name:"Omnithal",
usd:1.99,
idr:"Rp35.000",
robux:180,
scrip:"S$ 1,000"
},

{
name:"Fossilized Plesiosaur",
usd:7.00,
idr:"Rp125.000",
robux:600,
scrip:"S$ 7,000"
}

];

const limitedItems = [

{
name:"Moonstone",
usd:1.99,
idr:"Rp35.000",
robux:180,
scrip:"S$ 1,000"
},

{
name:"Jurassic Mosasaurus",
usd:30,
idr:"Rp534.000",
robux:2800,
scrip:"S$ 39,000"
},

{
name:"Redlip Batfish",
usd:19.99,
idr:"Rp356.000",
robux:1800,
scrip:"S$ 4,100"
},

{
name:"Apex Leviathan",
usd:39,
idr:"Rp694.000",
robux:3500,
scrip:"S$ 50,000"
}

];

const relicItems = [

{
name:"Enchant Relic",
usd:0.05,
idr:"Rp1.000",
robux:5,
scrip:"S$11"
},

{
name:"Twisted Relic",
usd:0.10,
idr:"Rp2.000",
robux:10,
scrip:"S$5"
},

{
name:"Exalted Relic",
usd:0.20,
idr:"Rp4.000",
robux:20,
scrip:"S$20"
},

{
name:"Cosmic Relic",
usd:0.50,
idr:"Rp8.000",
robux:50,
scrip:"S$100"
},

{
name:"Song of the Deep",
usd:0.50,
idr:"Rp8.000",
robux:50,
scrip:"S$100"
},

{
name:"Invincible Relic",
usd:1.00,
idr:"Rp15.000",
robux:100,
scrip:"S$200"
},

{
name:"Eerie Relic",
usd:4.99,
idr:"Rp89.000",
robux:450,
scrip:"S$3,999"
},

{
name:"Spooky Relic",
usd:4.99,
idr:"Rp89.000",
robux:450,
scrip:"S$3,999"
},

{
name:"Frightful Relic",
usd:4.99,
idr:"Rp89.000",
robux:450,
scrip:"S$4,000"
},

{
name:"Festive Relic",
usd:1.49,
idr:"Rp25.000",
robux:120,
scrip:"S$500"
},

{
name:"Santa Relic",
usd:5.99,
idr:"Rp105.000",
robux:550,
scrip:"S$5,000"
},

{
name:"Cupid Relic",
usd:1.99,
idr:"Rp35.000",
robux:180,
scrip:"S$600"
},

{
name:"Valentine's Relic",
usd:2.99,
idr:"Rp55.000",
robux:250,
scrip:"S$1,000"
},

{
name:"Sovereign Relic",
usd:7.99,
idr:"Rp140.000",
robux:700,
scrip:"S$4,500"
},

{
name:"Wrath Scylla",
usd:5.00,
idr:"Rp89.000",
robux:500,
scrip:"S$5,000"
}

];

function renderCards(list, containerId){

const container =
document.getElementById(containerId);

list.forEach(item=>{

container.innerHTML += `
<div class="card">

<h3>${item.name}</h3>

<p>${item.scrip}</p>
<p>$${item.usd}</p>
<p>${item.idr}</p>
<p>${item.robux} Robux</p>

<button
onclick="addToCart(
'${item.name}',
${item.usd}
)">
🛒 Add To Cart
</button>

</div>
`;

});
}

function addToCart(name,price){

cart.push({name,price});

renderCart();
}

function renderCart(){

const items =
document.getElementById("cart-items");

const totalEl =
document.getElementById("cart-total");

let html = "";
let total = 0;

cart.forEach(item=>{

html += `
<div>
${item.name}
- $${item.price}
</div>
`;

total += item.price;
});

items.innerHTML =
html || "Cart Empty";

totalEl.textContent =
"$" + total.toFixed(2);

document.getElementById(
"cart-badge"
).textContent =
cart.length;
}

function checkoutCart(){

let text =
"🎣 ZIMZAM TRADING FISCH\n\n";

cart.forEach(item=>{

text +=
`• ${item.name} - $${item.price}\n`;

});

window.open(
"https://wa.me/628881010901?text="
+
encodeURIComponent(text)
);
}

function clearCart(){

cart.length = 0;

renderCart();
}

function toggleCart(){

document
.getElementById("cart-panel")
.classList
.toggle("active");

document
.getElementById("cart-overlay")
.classList
.toggle("active");
}

renderCards(
fishItems,
"fish-container"
);

renderCards(
limitedItems,
"limited-container"
);

renderCards(
relicItems,
"relic-container"
);


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
	fishCart.forEach(item=>{

text +=
`🐟 ${item.name}
USD : $${item.usd}
IDR : Rp${item.idr.toLocaleString()}
Robux : ${item.robux}
\n`;

});
	
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
    relicCart.forEach(item=>{

text +=
`🔮 ${item.name}
Scrip : ${item.scrip}
USD : $${item.usd}
Robux : ${item.robux}
\n`;

});
	
	
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

function updateTotals(){

let fishTotalUSD = 0;
let relicTotalScrip = 0;

fishCart.forEach(item=>{
    fishTotalUSD += item.usd;
});

relicCart.forEach(item=>{
    relicTotalScrip += item.scrip;
});

document.getElementById(
"fish-total"
).textContent =
"$" + fishTotalUSD.toFixed(2);

document.getElementById(
"relic-total"
).textContent =
"S$ " +
relicTotalScrip.toLocaleString();

document.getElementById(
"item-count"
).textContent =
fishCart.length +
relicCart.length;

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
function addFish(
    name,
    usd,
    idr,
    scrip,
    robux
){

    fishCart.push({
        name,
        usd: Number(usd),
        idr: Number(idr),
        scrip: Number(scrip),
        robux: Number(robux),
        category: "fish"
    });

    saveCart();
    updateBadge();
    renderCart();

    animateCart();

    showToast(
        name + " added!"
    );
}

function addRelic(
    name,
    usd,
    idr,
    scrip,
    robux
){

    relicCart.push({
        name,
        usd: Number(usd),
        idr: Number(idr),
        scrip: Number(scrip),
        robux: Number(robux),
        category: "relic"
    });

    saveCart();
    updateBadge();
    renderCart();
    animateCart();

	showToast(
        name + " added!"
    );
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

let totalRobux = 0;
totalRobux += item.robux;
totalRobux += item.robux;
text += `
━━━━━━━━━━━━━━

📦 Items :
${fishCart.length + relicCart.length}

💵 USD :
$${totalUSD.toFixed(2)}

🎮 Robux :
${totalRobux}

━━━━━━━━━━━━━━
`;

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
fishCart.forEach((item,index)=>{

html += `
<div class="cart-item">

<div>

🐟 ${item.name}

<br>

💵 $${item.usd}

<br>

💰 Rp${item.idr.toLocaleString()}

<br>

🎮 ${item.robux} Robux

</div>

<button
onclick="removeFish(${index})">
❌
</button>

</div>
`;

});

	
    // RELIC
  relicCart.forEach((item,index)=>{

html += `
<div class="cart-item">

<div>

🔮 ${item.name}

<br>

S$ ${item.scrip.toLocaleString()}

<br>

💵 $${item.usd}

<br>

🎮 ${item.robux} Robux

</div>

<button
onclick="removeRelic(${index})">
❌
</button>

</div>
`;

});

	
		fishTotal += Number(item.usd);
		relicTotal += Number(item.scrip);

	
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


const payment =
document.getElementById(
"payment-method"
).value;



text += `
Payment Method:
${payment}
`;



