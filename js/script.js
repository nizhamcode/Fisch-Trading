
<script>

let fishCart = [];
let relicCart = [];

function updateTotals(){

    let fishTotal = 0;
    let relicTotal = 0;

    fishCart.forEach(item=>{
        fishTotal += item.price;
    });

    relicCart.forEach(item=>{
        relicTotal += item.price;
    });

    document.getElementById("fish-total")
    .innerText =
    "$" + fishTotal.toFixed(2);

    document.getElementById("relic-total")
    .innerText =
    "S$ " + relicTotal.toLocaleString();

    document.getElementById("item-count")
    .innerText =
    fishCart.length + relicCart.length;
}

function addFish(name,price){

    fishCart.push({
        name:name,
        price:price
    });

    updateTotals();

    alert(name + " added!");
}

function addRelic(name,price){

    relicCart.push({
        name:name,
        price:price
    });

    updateTotals();

    alert(name + " added!");
}

</script>

	<button onclick="checkoutCart()">
📱 Checkout
</button>

	<script>

function checkoutCart(){

let message =
"🎣 ZIMZAM TRADING FISCH\n\n";

if(fishCart.length){

message +=
"🐟 FISH ITEMS\n";

fishCart.forEach(item=>{

message +=
"- " + item.name +
" ($" + item.price + ")\n";

});

message += "\n";
}

if(relicCart.length){

message +=
"🔮 RELICS\n";

relicCart.forEach(item=>{

message +=
"- " + item.name +
" (S$ " + item.price + ")\n";

});

message += "\n";
}

let fishTotal = 0;
let relicTotal = 0;

fishCart.forEach(i=>fishTotal+=i.price);
relicCart.forEach(i=>relicTotal+=i.price);

message +=
"━━━━━━━━━━━━━━\n";

message +=
"💵 Fish Total: $" +
fishTotal.toFixed(2) +
"\n";

message +=
"💰 Relic Total: S$ " +
relicTotal.toLocaleString();

window.open(
"https://wa.me/628XXXXXXXXXX?text="
+ encodeURIComponent(message)
);

}

</script>

let cart = [];

function addToCart(name, price){

    cart.push({
        name:name,
        price:Number(price)
    });

    renderCart();

    localStorage.setItem(
        "zimzamCart",
        JSON.stringify(cart)
    );

    alert(name + " added to cart!");
}

function renderCart(){

    let html = "";
    let total = 0;

    cart.forEach(item=>{

        html += `
        <p>
            ${item.name}
            - $${item.price}
        </p>
        `;

        total += item.price;
    });

    const items =
    document.getElementById("cart-items");

    const totalText =
    document.getElementById("cart-total");

    const count =
    document.getElementById("cart-count");

    if(items){
        items.innerHTML = html;
    }

    if(totalText){
        totalText.innerText =
        total.toFixed(2);
    }

    if(count){
        count.innerText =
        cart.length;
    }
}

function checkout(){

    if(cart.length === 0){

        alert("Cart is empty");
        return;
    }

    let total = 0;

    let text =
`Hello Zimzam Trading

I want to order:

`;

    cart.forEach(item=>{

        text +=
`• ${item.name} - $${item.price}
`;

        total += item.price;
    });

    text +=
`
Total = $${total.toFixed(2)}

Thank you.
`;

    window.open(
        `https://wa.me/628881010901?text=${encodeURIComponent(text)}`,
        "_blank"
    );
}

window.onload = function(){

    const saved =
    localStorage.getItem("zimzamCart");

    if(saved){

        cart =
        JSON.parse(saved);

        renderCart();
    }
};
