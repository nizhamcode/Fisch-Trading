

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

let fishCart =
JSON.parse(
localStorage.getItem("fishCart")
) || [];

let relicCart =
JSON.parse(
localStorage.getItem("relicCart")
) || [];


// ======================
// SAVE CART
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
// BADGE
// ======================

function updateBadge() {

    const total =
        fishCart.length +
        relicCart.length;

    [
        "cart-badge-panel",
        "cart-badge-toggle"
    ].forEach(id => {

        const el =
        document.getElementById(id);

        if(el){
            el.textContent = total;
        }
    );
}


// ======================
// ADD FISH
// ======================

function addFish(
    name,
    scrip,
    robux,
    gamepassId
){

    fishCart.push({

        type: "fish",

        name: name,

        scrip: Number(scrip),

        robux: Number(robux),

        gamepassId: gamepassId

    });

    saveCart();
    updateBadge();
    renderCart();
    animateCart();

    showToast(
        name + " added to cart"
    );
}


// ======================
// ADD RELIC
// ======================

function addRelic(
    name,
    scrip,
    robux,
    gamepassId
){

    relicCart.push({

        type: "relic",

        name: name,

        scrip: Number(scrip),

        robux: Number(robux),

        gamepassId: gamepassId

    });

    saveCart();
    updateBadge();
    renderCart();
    animateCart();

    showToast(
        name + " added to cart"
    );
}


// ======================
// REMOVE
// ======================

function removeFish(index){

    fishCart.splice(index,1);

    saveCart();
    updateBadge();
    renderCart();
}


function removeRelic(index){

    relicCart.splice(index,1);

    saveCart();
    updateBadge();
    renderCart();
}


// ======================
// TOTAL
// ======================

function updateTotals(){

    let fishTotal = 0;
    let relicTotal = 0;

    fishCart.forEach(item => {

        fishTotal += item.scrip;
    });

    relicCart.forEach(item => {

        relicTotal += item.scrip;
    });

    const totalItems =
        fishCart.length +
        relicCart.length;

    document.getElementById(
        "fish-total"
    ).textContent =
    "S$ " +
    fishTotal.toLocaleString();

    document.getElementById(
        "relic-total"
    ).textContent =
    "S$ " +
    relicTotal.toLocaleString();

    document.getElementById(
        "item-count"
    ).textContent =
    totalItems;
}


// ======================
// RENDER CART
// ======================

function renderCart(){

    const cartItems =
    document.getElementById(
        "cart-items"
    );

    if(!cartItems) return;

    let html = "";

    fishCart.forEach(
    (item,index)=>{

        html += `
        <div class="cart-item">

            <div>

                🐟 ${item.name}
                <br>

                💰 S$ ${item.scrip.toLocaleString()}
                <br>

                🎮 R$ ${item.robux}

            </div>

            <button
            onclick="removeFish(${index})">
            ❌
            </button>

        </div>
        `;
    });

    relicCart.forEach(
    (item,index)=>{

        html += `
        <div class="cart-item">

            <div>

                🔮 ${item.name}
                <br>

                💰 S$ ${item.scrip.toLocaleString()}
                <br>

                🎮 R$ ${item.robux}

            </div>

            <button
            onclick="removeRelic(${index})">
            ❌
            </button>

        </div>
        `;
    });

    if(
        fishCart.length === 0 &&
        relicCart.length === 0
    ){

        html =
        `
        <p class="empty-cart">
        Cart Empty
        </p>
        `;
    }

    cartItems.innerHTML = html;

    updateTotals();
}


// ======================
// CLEAR CART
// ======================

function clearCart(){

    if(
        !confirm(
            "Clear all items?"
        )
    ){
        return;
    }

    fishCart = [];
    relicCart = [];

    saveCart();

    updateBadge();
    renderCart();

    showToast(
        "Cart cleared"
    );
}


// ======================
// CHECKOUT
// ======================

function checkout(){

    if(
        fishCart.length === 0 &&
        relicCart.length === 0
    ){

        alert(
            "Cart Empty"
        );

        return;
    }

    let totalScrip = 0;
    let totalRobux = 0;

    let text =
`🎣 ZIMZAM TRADING FISCH

Hello, I want to order:

`;

    fishCart.forEach(item=>{

        text +=
`🐟 ${item.name}
💰 S$ ${item.scrip}
🎮 R$ ${item.robux}

`;

        totalScrip += item.scrip;
        totalRobux += item.robux;
    });

    relicCart.forEach(item=>{

        text +=
`🔮 ${item.name}
💰 S$ ${item.scrip}
🎮 R$ ${item.robux}

`;

        totalScrip += item.scrip;
        totalRobux += item.robux;
    });

    const paymentMethod =
    document.getElementById(
        "payment-method"
    )?.value || "QRIS";

    text +=
`
━━━━━━━━━━━━━━

📦 Total Items:
${fishCart.length + relicCart.length}

💰 Total Scrip:
S$ ${totalScrip.toLocaleString()}

🎮 Total Robux:
R$ ${totalRobux.toLocaleString()}

💳 Payment:
${paymentMethod.toUpperCase()}

━━━━━━━━━━━━━━
`;

    window.open(
        "https://wa.me/628881010901?text=" +
        encodeURIComponent(text),
        "_blank"
    );
}


// ======================
// CART PANEL
// ======================

function toggleCart(){

    document
    .getElementById(
        "cart-panel"
    )
    ?.classList.toggle(
        "active"
    );

    document
    .getElementById(
        "cart-overlay"
    )
    ?.classList.toggle(
        "active"
    );
}


// ======================
// CART ANIMATION
// ======================

function animateCart(){

    const btn =
    document.getElementById(
        "cart-toggle"
    );

    if(!btn) return;

    btn.classList.add(
        "bounce"
    );

    setTimeout(()=>{

        btn.classList.remove(
            "bounce"
        );

    },500);
}


// ======================
// TOAST
// ======================

function showToast(message){

    const toast =
    document.createElement(
        "div"
    );

    toast.className =
    "toast";

    toast.textContent =
    message;

    document.body.appendChild(
        toast
    );

    setTimeout(()=>{

        toast.classList.add(
            "show"
        );

    },10);

    setTimeout(()=>{

        toast.remove();

    },2500);
}


// ======================
// START
// ======================

document.addEventListener(
"DOMContentLoaded",
()=>{

    updateBadge();
    renderCart();

    const overlay =
    document.getElementById(
        "cart-overlay"
    );

    overlay?.addEventListener(
        "click",
        toggleCart
    );

});
