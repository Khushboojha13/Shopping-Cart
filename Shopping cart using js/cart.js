let basket = JSON.parse(localStorage.getItem("data")) || [];
let label = document.getElementById("label");
let shoppingcart = document.getElementById("shoppingcart");

let calculation = () => {
    document.getElementById("cartnum").textContent = basket.map((x) => x.item).reduce((sum, acc) => sum + acc, 0);
}

calculation();

let generate_cart = () => {
    if (basket.length != 0) {
        return (shoppingcart.innerHTML = basket.map((x) => {
            let { id, item } = x;
            let search = shopitems.find((y) => y.id === id) || [];
            let {img,price,name}=search
            return `
               <div class="cart-item" id="cart-item">
               <img width="160" src=${img} alt=""></img>
               <div class="details">
               <div class="title-price-x">
                <h4> 
                <p>${name}</p>
                <p class="cart-price">$ ${price}</p>
                </h4>
                <i class="bi bi-x-lg" id="cross" onclick="removeitems(${id})"></i>
               </div>
                
               <div class="buttons">
               <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
               <div class="itemnum" id=${id}>${item}</div>
               <i onclick="increment(${id})" class="bi bi-plus"></i>
             </div>

                <div class="price">${item*search.price}</div>
               </div>
               </div>
               `
        }).join(""));
    }
    else {
        shoppingcart.innerHTML = ``;
        label.innerHTML = `
        <h2>Cart is empty</h2>
        <a href="index.html"><button class="btn">Back to home</button></a>
        `
    }
}
generate_cart();

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

    generate_cart(); //here we are adding this b/c we want jab bhi ham + pe cart section me click kare to price bhi modify ho basically it renders all carts with updated value

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
    basket = basket.filter((x) => x.item != 0);
    //setting data permanently to local storage
    // localStorage.setItem("data", JSON.stringify(basket));

    //here basket filter filters all cart having item not equal to 0 then generate cart will be called and it will make cart having item not equal to 0
    generate_cart();

    // update(searchitem.id);

    //ww are writing this line below of local storage bc we want js to do all updates first then local storage should run
    localStorage.setItem("data", JSON.stringify(basket));

}

let update = (id) => {
    let search = basket.find((x) => x.id === id)
    document.getElementById(id).innerHTML = search.item;
    calculation();
    Totalamt();
}



let removeitems=(id)=>{
   let selecteditem=id;
   basket=basket.filter((x)=>x.id!==selecteditem.id);
   console.log("basket");
   console.log(basket);
   generate_cart();
   calculation();
   Totalamt();

   localStorage.setItem("data", JSON.stringify(basket));
}

let clear_cart=()=>{
   basket=[];
   generate_cart();
   calculation();
   localStorage.setItem("data", JSON.stringify(basket));
}

let Totalamt=()=>{
    if(basket.length!=0){
    let amount=basket.map((x)=>{
        let {id,item}=x;
        let search=shopitems.find((y)=>y.id===id)||[];
        return item*search.price;
    }).reduce((sum,acc)=>sum+acc,0);
    console.log(amount);
    label.innerHTML=`
    <h2>Total Bill: $ ${amount}</h2>
    <button class="checkout">Checkout</button>
    <button class="clear-cart" onclick="clear_cart()">Clear cart</button>
    `
}
    else return;
}

Totalamt();