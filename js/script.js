
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

const cartItems =
document.getElementById("cart-items");

if(!cartItems) return;

let html = "";

fishCart.forEach((item,index)=>{

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

relicCart.forEach((item,index)=>{

html += `
<div class="cart-item">

<div>
🔮 ${item.name}
<br>
S$ ${item.price}
</div>

<button
onclick="removeRelic(${index})">

❌

</button>

</div>
`;
});

if(
fishCart.length===0 &&
relicCart.length===0
){

html=
`
<p class="empty-cart">
Cart is empty
</p>
`;
}

cartItems.innerHTML = html;
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
