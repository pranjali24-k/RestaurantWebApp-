const ul = document.getElementById("menus")
const image = document.getElementById("item-image");
const placeOrderBtn = document.getElementById("placeOrderbtn");
const status = document.getElementById("status");
const billText = document.getElementById("billText");
const payBtn = document.getElementById("pay-btn")
const billdiv = document.getElementById("bill")
var data = {};
var Totalitems = [];
var totalBill = 0
var liId = undefined;
var SelectedMenues = [];
status.innerText = "Select Element";

async function getMenu() {
    const url = `https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json`;
    const response = await fetch(url);
    data = await response.json();
    data.forEach((element) => {
        const li = document.createElement("li");
        const itemSpan = document.createElement("span")
        const priceSpan = document.createElement("span")
        itemSpan.innerText = element.name;
        priceSpan.innerText = `${element.price} $`;
        li.appendChild(itemSpan)
        li.appendChild(priceSpan)
        li.setAttribute("onclick", "getId(event)");
        li.setAttribute("onmouseover", "setImage(event.target.id)");
        li.id = element.id;
        ul.appendChild(li)
    });
}
window.onload = getMenu;

function TakeOrder() {
    status.innerText = " Resolving The Oreder !"
    Totalitems = [];
     totalBill = 0
    var promise1 = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (SelectedMenues.length != 0) {
                resolve(SelectedMenues);
            }
            else {
                reject("Select at least one item")
            }
        }, 2500)
    })
    promise1.then((data) => {
        status.innerText = "Orader Placed !"

        billdiv.style = "display:visible"
        totalBill=0;
        data.forEach((element) => {
            totalBill += element.price;
            Totalitems.push(element.name)
        })
        var itemSpan = document.createElement("span")
        var totalSpan = document.createElement("span")
        itemSpan.innerText = `Total Items ${Totalitems}`
        totalSpan.innerText = `Total Bill ${totalBill}`
        billText.appendChild(itemSpan)
        billText.appendChild(totalSpan)
        orderPrep();
        
    })
    promise1.catch((message) => {
        alert(message);
        status.innerText = message;
    })
}

function orderPrep() {
    var promise2 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ order_status: true, paid: false });
        }, 1500)
    })
    promise2.then((data) => {
        status.innerText = `Order Status = ${data.order_status} , Payment Status = ${data.paid}`;
        console.log(data)
    })
}

async function payOrder() {
   var promise3 = new Promise((resolve) => {
       setTimeout(() => {
           resolve({ order_status: true, paid: true })
       }, 1000)
   });
   promise3.then((data) => {
       status.innerText = ` Order Status =  ${data.order_status}    Payment Status =  ${data.paid}`
       console.log(data);
       billText.innerHTML = "";
       billdiv.style = "display:none"
   })
   setTimeout(() => {
       thankyouFnc()
   }, 1500)
}

function thankyouFnc() {
    alert("thankyou for eating with us today !");
    status.innerText = "Select Element";
    totalBill = 0;
    Totalitems = [];
}

placeOrderBtn.addEventListener("click", TakeOrder);
payBtn.addEventListener("click", payOrder);


// Some Extra Functionality

function getId(event) {

    liId = event.target.id;
    for (let i = 0; i < data.length; i++) {
        if (i + 1 == liId) {
            SelectedMenues.push(data[i]);
        }
    }
    if (SelectedMenues.length == 1) {
        status.innerText = `Selected Item =${SelectedMenues[0].name}`
    }
    else {
        var prevText = status.innerText;
        status.innerText = `${prevText} + ${SelectedMenues[SelectedMenues.length - 1].name}`
    }
}

function setImage(id) {
    var imagePath = "";
    for (let i = 1; i <= data.length; i++) {
        if (i == id) {
            imagePath = data[i].imgSrc;
        }
    }
    image.setAttribute("src", `${imagePath}`)
}







