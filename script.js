

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
function generateItems(items){
    let itemsHTML = "";
    items.forEach((item) => {

        itemsHTML += `
            <div class="main-product mr-6">
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
                <div class="mt-2 complete-order-button w-32 flex items-center justify-center bg-yellow-500 rounded text-white cursor-pointer hover:bg-yellow-600 p-2" >
                    Add to Cart
                </div>
            </div>
        
        `
    })
    document.querySelector(".main-section-products").innerHTML = itemsHTML;
}
getItems();