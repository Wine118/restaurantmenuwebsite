const images = [
    "images/special/special1.jpg",
    "images/special/special2.jpg",
    "images/special/special3.jpg"
];

let index = 0;

const imgElement = document.getElementById("special-img");

function changeImage() {
    //Fade out first
    imgElement.style.opacity = 0;

    // After fade-out is done, change the image
    setTimeout(() => {
        index = (index + 1) % images.length; // Loop through images
        imgElement.src = images[index]; //Change the imageindex
        imgElement.style.opacity = 1;
    }, 600); // same as CSS transition (0.6s)
    
}

setInterval(changeImage, 3000); // Change every 3 seconds

// Special menu is adding to the cart system
const multiSelectDishes = [
  "Nanpyar",
  "Parata",
  "Youtiao",
  "Keema",
  "Mohinga",
  "Ohn Noh Kauk Swe",
  "Mont Tee Thoke",
  "Kat Kyay Kite",
  "Dumpling",
  "Shan",
  "Tofu Nway",
  "Mee Shay",
  "Myay Oh Mee Shay",
  "Tom Yum Soup"

];
const specialItem = {
    name : "ကြက်ကုန်းဘောင်",
    price: 6000,
    qty: 1
};

document.querySelector("#special-btn").addEventListener("click", () => {

    let cart = JSON.parse(localStorage.getItem("cartItems")) || [];

    if(multiSelectDishes.includes(specialItem.name)){
        window.location.href = `menu.html#category-menu#?item=${specialItem.name}`;
    }else{
        // Check if special item already add -> increase qty
        let item = cart.find(i => i.name === specialItem.name);

        if(item) {
            item.qty += 1;
        }else{
            cart.push(specialItem);
        }
        localStorage.setItem("cartItems", JSON.stringify(cart));

        if (localStorage.getItem("cartItems")) {
        console.log("cartItems is in localStorage!");
        } else {
        console.log("No cartItems found.");
        }

        const cartItems = JSON.parse(localStorage.getItem("cartItems"));
        console.log(cartItems);


        // Go to menu page to show cart
        window.location.href = "menu.html#to-order";
    }

    

});