function changeQty(id) {
  let totalPrice = 0;
  const total = document.getElementById('TotalCost');
  const data = JSON.parse(sessionStorage.getItem("Cart"));
  if (data && data.length > 0) {
    data.forEach((element) => {
      if (element.id == id) {
        element.qty = document.getElementById('itemQty'+element.id).value;
      }
    });

    sessionStorage.setItem("Cart", JSON.stringify(data));

    data.forEach((element) => {
      totalPrice += ((element.price - (element.discount * element.price)/100) * element.qty)
    });
    total.innerHTML = ': ' + parseFloat(totalPrice).toFixed(2);
    sessionStorage.setItem("totalCart", parseFloat(totalPrice).toFixed(2));
  } 
}

function deleteItem(id) {
  const data = JSON.parse(sessionStorage.getItem("Cart"));
  let totalPrice = sessionStorage.getItem("totalCart");
  const total = document.getElementById('TotalCost');
  if (data && data.length > 0) {
    data.forEach((element, index) => {
      if (element.id == id) {
        document.getElementById("item"+id).remove()
        data.splice(index, 1)

        totalPrice -= ((element.price - (element.discount * element.price)/100) * element.qty)
        total.innerHTML = ': ' + parseFloat(totalPrice).toFixed(2);
        sessionStorage.setItem("totalCart", parseFloat(totalPrice).toFixed(2));
      }
    });

    sessionStorage.setItem("Cart", JSON.stringify(data));
  }
}

function getItems() {
  const data = JSON.parse(sessionStorage.getItem("Cart"));
  // console.log(data);
  if (data && data.length > 0) {
    let parentPost = document.getElementById("listItem");
    data.forEach((element) => {
      var childPost = document.createElement("div");
      childPost.setAttribute("class", "box");
      childPost.setAttribute("id", `item${element.id}`);
      childPost.innerHTML = `
        <i class="fas fa-times" onclick="deleteItem('${element.id}')"></i>
        <img src="/Assets/uploadImage/${element.id}" alt="">
        <div class="content">
            <h3>${element.name}</h3>
            <span> Quantity : </span>
            <input type="number" value="${element.qty}" id="itemQty${element.id}" onchange="changeQty('${element.id}')">
            <br>
            <span> Price : </span>
            <span class="text-success"> $${element.price} </span>
            <span class="text-danger">(${element.discount}% off)</span>
        </div>
      `;
      parentPost.appendChild(childPost);
    });

    const total = document.getElementById('TotalCost');
    total.innerHTML = ': ' + sessionStorage.getItem("totalCart");
  }
}

function calculatePay() {
  let payback = document.getElementById('payback');
  const customerMoney = document.getElementById('customerMoney').value
  const total = parseFloat(customerMoney - sessionStorage.getItem("totalCart")).toFixed(2)
  payback.innerHTML = ": " + total
}

async function purchase() {
  const products = JSON.parse(sessionStorage.getItem("Cart"));
  document.getElementById("payNow").disabled = true;
  let payback = document.getElementById('payback');
  const customerMoney = document.getElementById('customerMoney').value
  const total = parseFloat(customerMoney - sessionStorage.getItem("totalCart")).toFixed(2)
  payback.innerHTML = ": " + total

  if(total>=0){
    sessionStorage.setItem("costumerMoney", parseFloat(customerMoney).toFixed(2));
    sessionStorage.setItem("payBackMoney", parseFloat(total).toFixed(2));
    await axios.post('/addPurchase', {
      products: products,
      totalCost: sessionStorage.getItem("totalCart")
    }).then(result => {
        if (result.data.success == true) {
          window.location.href = "/reciept"
        } else {
          let message = 'Sorry !!!'
          if(result.data.outOfStock){
            for(const i in result.data.outOfStock){
              message += "\n"+`${result.data.outOfStock[i].name} is out of stock (Have only ${result.data.outOfStock[i].qty})`
            }
          }
          alert(message)
        }
    }).catch(err => {
        console.log(err);
    });
  }else{
    alert("Please let customer paid more!!!")
  }
  document.getElementById("payNow").disabled = false;
}

getItems();