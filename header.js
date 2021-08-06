
function getCartItems() {
    db.collection("cart-items").onSnapshot((snapshot) => {
        let totalCount = 0;
        snapshot.docs.forEach((doc)=>{
            totalCount += doc.data().quantity;
        })
        setCartCounter(totalCount);
    })
}

function setCartCounter(totalCount) {
    // cart-item-number
    if(totalCount !== 0) {
        document.querySelector(".cart-item-number").classList.remove("opacity-0");

        document.querySelector(".cart-item-number").innerText = totalCount;
    }
    
}

getCartItems();