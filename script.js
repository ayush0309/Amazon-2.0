

function getItems () {
    db.collection("items").get().then((querySnapshot) => {
        let items = [];
        querySnapshot.forEach((doc) => {
        items.push({
            id: doc.id,
            image: doc.data().image,
            name: doc.data().name,
            make: doc.data().make,
            rating: doc.data().rating,
            price: doc.data().price
        })
    });
    generateItems(items); 
});
}

function addToCart(item) {
    let cartItem = db.collection("cart-items").doc(item.id);
    cartItem.get().then(function(doc){
        if(doc.exists) {
            cartItem.update({
                quantity: doc.data().quantity + 1
            })
        } else {
            cartItem.set({
                image: item.image,
                make: item.make,
                name: item.name,
                rating: item.rating,
                price: item.price,
                quantity: 1
            })
        }
    })
    
}


function generateItems(items){
    let itemsHTML = "";
    items.forEach((item) => {
        let doc = document.createElement("div");
        doc.classList.add(".main-product", "mr-6", "mt-5");
        doc.innerHTML = `
            <div class="product-image w-48 h-52 bg-white rounded-lg p-4 cursor-pointer">
                <img class="h-full w-full object-contain" src="${item.image}" alt="">
                </div>
            <div class="product-name text-gray-700 font-bold mt-2 text-sm">
                ${item.name}
            </div>
            <div class="product-make text-green-700 font-bold">
                ${item.make}
            </div>
            <div class="product-rating text-yellow-500 my-1">
                ⭐⭐⭐⭐⭐ ${item.rating}
            </div>
            <div class="product-price font-bold text-gray-700 text-lg">
                ₹${item.price}
            </div>
        
        `

        let addToCartElement = document.createElement("div");
        addToCartElement.classList.add("mt-2", "addToCart-button", "w-32", "flex", "items-center", "justify-center", "bg-yellow-500", "rounded", "text-white", "cursor-pointer", "hover:bg-yellow-600", "p-2");
        addToCartElement.innerText = "Add to Cart";
        addToCartElement.addEventListener("click", function(){
            addToCart(item);
        })
        doc.appendChild(addToCartElement);
        document.querySelector(".main-section-products").appendChild(doc);
    })
}
getItems();