let shop = document.getElementById("shop");


//retriving data from localstorage if data present in local storage retrieve it else empty array is there to push data into local storage
//here basket will contain products id and products quantity
let basket = JSON.parse(localStorage.getItem("data"))||[];

let shopcontent = () => {
    return (shop.innerHTML = shopitems.map((x) => {
        let { id, name, desc, img, price } = x; //destructring- ye nahi karte to x.name, x.img etc use karna padta
        let search = basket.find((x) => x.id === id) || [];
        return ` <div class="shopcontent" id=product-${id}>
               <img src="${img}" alt="" class="image">
               <div class="items">
               <h2>${name}</h2>
               <p>${desc}</p>
               <div class="shopnum">
                   <span>$ ${price}</span>
                   <div class="buttons">
                       <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                       <div class="itemnum" id=${id}>${search.item === undefined ? 0 : search.item}</div>
                       <i onclick="increment(${id})" class="bi bi-plus"></i>
                     </div>
               </div>
           </div>
           </div>`
    })
        .join(""));
    //The join() method of Array instances creates and returns a new string by concatenating all of the elements in this array, separated by commas or a specified separator string. If the array has only one item, then that item will be returned without using the separator.
};
shopcontent();

let increment = (id) => {
    let searchitem = id;
    let search = basket.find((x) => x.id === searchitem.id);
    if (search === undefined) {
        basket.push({
            id: searchitem.id,
            item: 1,
        });
    }
    else {
        search.item += 1;
    }
    //setting data permanently to local storage
   // localStorage.setItem("data", JSON.stringify(basket));

    update(searchitem.id);

    localStorage.setItem("data", JSON.stringify(basket));
}


let decrement = (id) => {
    let searchitem = id;
    let search = basket.find((x) => x.id === searchitem.id);
    if (search === undefined) return;
    else if (search.item == 0) return;
    else {
        search.item -= 1;
    }
    
    update(searchitem.id); //we are adding it above filter b/c here we want update func to run first 

    //we are writing filter here b/c we don't want to store 0 item data in local storage
    basket=basket.filter((x)=>x.item!=0);
    //setting data permanently to local storage
   // localStorage.setItem("data", JSON.stringify(basket));

   // update(searchitem.id);
    
    //ww are writing this line below of local storage bc we want js to do all updates first then local storage should run
    localStorage.setItem("data", JSON.stringify(basket));

}

let update = (id) => {
    let search = basket.find((x) => x.id === id)
    document.getElementById(id).innerHTML = search.item;
    calculation();
}

let calculation = () => {
    document.getElementById("cartnum").textContent = basket.map((x) => x.item).reduce((sum, acc) => sum + acc, 0);
}

calculation();