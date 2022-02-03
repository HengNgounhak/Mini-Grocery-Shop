function getItems() {
  const data = JSON.parse(sessionStorage.getItem("Cart"));
  // console.log(data);
  if (data && data.length > 0) {
    let parentPost = document.getElementById("bodyTable");
    data.forEach((element) => {
      var childPost = document.createElement("tr");
      childPost.innerHTML = `
          <td>${element.name}</td>
          <td>$${element.price}</td>
          <td>${element.discount}%</td>
          <td class="text-center">${element.qty}</td>
          <td class="text-right">$${(element.price - ((element.discount * element.price)/100)) * element.qty}</td>
      `;
      parentPost.appendChild(childPost);
    });

    const total = document.getElementById('total');
    total.innerHTML = ': ' + sessionStorage.getItem("totalCart");
    const customerMoney = document.getElementById('customerMoney');
    customerMoney.innerHTML = ': ' + sessionStorage.getItem("costumerMoney");
    const payBack = document.getElementById('payBack');
    payBack.innerHTML = ': ' + sessionStorage.getItem("payBackMoney");

    setTimeout(clearSessionStorage(), 1000); 
  } else {
    window.location.href = "/"
  }
}

function clearSessionStorage(){
  sessionStorage.removeItem("Cart");
  sessionStorage.removeItem("totalCart");
  sessionStorage.removeItem("costumerMoney");
  sessionStorage.removeItem("payBackMoney");
}

// function calculatePay() {
//   let payback = document.getElementById('payback');
//   const customerMoney = document.getElementById('customerMoney').value
//   const total = parseFloat(customerMoney - sessionStorage.getItem("totalCart")).toFixed(2)
//   payback.innerHTML = ": " + total

//   if(total>=0){
//     document.getElementById('payNow').href = "/paymentPage"
//     sessionStorage.setItem("costumerMoney", parseFloat(customerMoney).toFixed(2));
//     sessionStorage.setItem("payBackMoney", parseFloat(total).toFixed(2));
//   }else{
//     document.getElementById('payNow').href = "#"
//     document.getElementById('errorPayment').click()
//   }
// }

getItems();