let fishCart = [];
let relicCart = [];

function updateCart(){

    let fishTotal = 0;
    let relicTotal = 0;

    fishCart.forEach(item=>{
        fishTotal += item.price;
    });

    relicCart.forEach(item=>{
        relicTotal += item.price;
    });

    document.getElementById("fish-total").innerText =
        "$" + fishTotal.toFixed(2);

    document.getElementById("relic-total").innerText =
        "S$ " + relicTotal.toLocaleString();

    document.getElementById("item-count").innerText =
        fishCart.length + relicCart.length;
}

function addFish(name,price){

    fishCart.push({
        name:name,
        price:price
    });

    updateCart();

    alert(name + " added to cart");
}

function addRelic(name,price){

    relicCart.push({
        name:name,
        price:price
    });

    updateCart();

    alert(name + " added to cart");
}

function checkoutCart(){

    let fishTotal = 0;
    let relicTotal = 0;

    let msg =
`🎣 ZIMZAM TRADING FISCH

`;

    if(fishCart.length){

        msg += "🐟 FISH ITEMS\n";

        fishCart.forEach(item=>{

            msg +=
            "- " +
            item.name +
            " ($" +
            item.price +
            ")\n";

            fishTotal += item.price;
        });

        msg += "\n";
    }

    if(relicCart.length){

        msg += "🔮 RELICS\n";

        relicCart.forEach(item=>{

            msg +=
            "- " +
            item.name +
            " (S$ " +
            item.price +
            ")\n";

            relicTotal += item.price;
        });

        msg += "\n";
    }

    msg +=
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

Thank you 🙏`;

    window.open(
        "https://wa.me/628XXXXXXXXXX?text=" +
        encodeURIComponent(msg)
    );
}