const toppingData = {
    "Nanpyar":[
        {name: "Bean Paste", price: 0},
        {name: "Sugar", price: 0}
    ], 
    "Parata":[
        {name: "Bean Paste", price: 0},
        {name: "Sugar", price: 0}
    ],
    "Youtiao":[
        {name: "Bean Paste", price: 0},
        {name: "Sugar", price: 0}
    ],
    "Keema":[
        {name: "Chicken", price: 0},
        {name: "Mutton", price: 0},
        {name: "Beef", price: 0}
    ],
    "Mohinga":[
        {name: "Fritter", price: 300},
        {name: "Fish Cake", price: 500},
        {name: "Sliced Eggs", price: 700},
        {name: "Oh Bae Ou(Soup boiled egg)", price: 1000}
    ],
    "Ohn Noh Kauk Swe":[
        {name: "Fritter", price: 300},
        {name: "Fish Cake", price: 500},
        {name: "Sliced Eggs", price: 700},
        {name: "Oh Bae Ou(Soup boiled egg)", price: 1000}
    ],
    "Mont Tee Thoke":[
        {name: "Fritter", price: 300},
        {name: "Fish Cake", price: 500},
        {name: "Sliced Eggs", price: 700}
    ],
    "Kat Kyay Kite":[
        {name: "Chicken", price: 0},
        {name: "Seafood", price: 2000}
    ],
    "Dumpling":[
        { name: "Chicken", price: 0 },
        { name: "Pork", price: 0 }
    ],
    "Shan":[
        { name: "Chicken", price: 0 },
        { name: "Pork", price: 0 }
    ],
    "Tofu Nway":[
        { name: "Chicken", price: 0 },
        { name: "Pork", price: 0 }
    ],
    "Mee Shay":[
        { name: "Chicken", price: 0 },
        { name: "Pork", price: 0 }
    ],
    "Myay Oh Mee Shay":[
        { name: "Chicken", price: 0 },
        { name: "Seafood", price: 2000 }
    ],
    "Tom Yum Soup":[
        { name: "Chicken", price: 0 },
        { name: "Seafood", price: 2000 }
    ],
}

const multiSelectDishes = ["Mohinga", "Mont Tee Thoke", "Ohn Noh Kauk Swe"];
let basePrice = 0;
let itemName = "";


function openMohingaOptions(dishName,originalPrice) {
        
    itemName = dishName;
    basePrice = originalPrice;
    const modal = document.getElementById("mohingaModal");
    const box = modal.querySelector(".toppingbox");

    box.innerHTML = "";
    const toppings = toppingData[dishName];

    // Determine input type (checkbox or radio)
    const inputType = multiSelectDishes.includes(dishName) ? "checkbox" : "radio";
    
    toppings.forEach((topping, index) => {
        const row = document.createElement("div");
        
        row.className = "topping-option";

        row.innerHTML = `
            <div>${topping.name}</div>
            <div class="chk-wrapper">
                <input type="${inputType}"
                name="toppingChoice"
                value="${topping.price}"
                data-topping-name="${topping.name}"
                data-price="${topping.price}"
                class="mohinga-topping"
                >
            </div>
        `;
        box.appendChild(row);
    });
    
    modal.style.display = "block";

}

function closeMohingaOptions() {
    document.getElementById("mohingaModal").style.display = "none";
    // Optionally uncheck all checkboxes when closing
    document.querySelectorAll('.mohinga-topping').forEach(cb => cb.checked = false);
    
}

function addMohinga() {
    let totalPrice = basePrice;
    let toppingNames = [];   
    

    // Collect selected toppings
    document.querySelectorAll('.mohinga-topping:checked').forEach(topping => {
        totalPrice += parseInt(topping.dataset.price);

        let toppingName = topping.dataset.toppingName;

        toppingNames.push(toppingName);
    });

    
    if (toppingNames.length > 0) {
        itemName += " + " + toppingNames.join(", ");
    }
    console.log(`itemName = ${itemName} and totalprice = ${totalPrice}`);
    
    // Add to order list using your existing addItem function
    addItem(itemName, totalPrice);
    itemName = "";
    basePrice= 0;
    closeMohingaOptions();
}


// ORDER SYSTEM

let order = {}; //Store items by name
let total = 0; 
function addItem(dishName, price){
    if(order[dishName]){
        //Item exists -> increase quantity
        order[dishName].quantity += 1;
    } else {
        // New item
        order[dishName] = {
            price: price,
            quantity: 1
        };
    }

    updateOrderList();        
}

function updateOrderList() {
    const orderList = document.getElementById("order-list");
    const msg = document.getElementById("empty-message");
    const totalAmount = document.getElementById("total-amount");

    orderList.innerHTML = "";
    total = 0;

    const itemNames = Object.keys(order);
    if(itemNames.length === 0){
        msg.style.display = "block";
        totalAmount.textContent = "0 MMK";
        orderList.style.display = "none";
        order = {};
        total = 0;
        return;
    }else{
        msg.style.display = "none";
        orderList.style.display = "flex";
    }
    
    itemNames.forEach(name => {
        const item = order[name];
        const rowTotal = item.price * item.quantity;
        total += rowTotal;

        orderList.innerHTML += `
            <div class="order-row">

                <div class="order-name">
                    ${name}
                </div>

                <div class="order-qty">
                    <input type="number"
                     value="${item.quantity}"
                      min="1"
                      onchange = "changeQty('${name}',this.value)"
                      >
                </div>

                <div class="order-price">
                    ${item.price} MMK
                </div>

                <div class="order-price-total">
                    ${rowTotal} MMK
                </div>

                <button class="remove-btn" onclick="removeItem('${name}')">x</button>

        </div>
        `;
    });

    totalAmount.textContent = `${total} MMK`;
    
}

function changeQty(dishName, newQty){
    newQty = parseInt(newQty);
    if(newQty <= 0) newQty = 1;

    order[dishName].quantity = newQty;
    updateOrderList();
}

function removeItem(name){
    delete order[name];
    updateOrderList();
}


document.addEventListener("DOMContentLoaded", updateOrderList);
