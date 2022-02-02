// create toast
;(function(window, $){
  "use strict";

  var defaultConfig = {
    type: '',
    autoDismiss: false,
    container: '#toasts',
    autoDismissDelay: 4000,
    transitionDuration: 500
  };

  $.toast = function(config){
    var size = arguments.length;
    var isString = typeof(config) === 'string';
    
    if(isString && size === 1){
      config = {
        message: config
      };
    }

    if(isString && size === 2){
      config = {
        message: arguments[1],
        type: arguments[0]
      };
    }
    
    return new toast(config);
  };

  var toast = function(config){
    config = $.extend({}, defaultConfig, config);
    // show "x" or not
    var close = config.autoDismiss ? '' : '&times;';
    
    // toast template
    var toast = $([
      '<div class="toast ' + config.type + '">',
      '<p>' + config.message + '</p>',
      '<div class="close">' + close + '</div>',
      '</div>'
    ].join(''));
    
    // handle dismiss
    toast.find('.close').on('click', function(){
      var toast = $(this).parent();

      toast.addClass('hide');

      setTimeout(function(){
        toast.remove();
      }, config.transitionDuration);
    });
    
    // append toast to toasts container
    $(config.container).append(toast);
    
    // transition in
    setTimeout(function(){
      toast.addClass('show');
    }, config.transitionDuration);

    // if auto-dismiss, start counting
    if(config.autoDismiss){
      setTimeout(function(){
        toast.find('.close').click();
      }, config.autoDismissDelay);
    }

    return this;
  };
  
})(window, jQuery);

/* ---- start demo code ---- */

var count = 1;
var types = ['default', 'error', 'warning', 'info'];

$('button').click(function(){
  var data = this.dataset;

  switch(data.type){
    case 'types':
      $.toast(data.kind, 'This is a ' + data.kind + ' toast.');
      break;

    case 'auto':
      $.toast({
        autoDismiss: true,
        message: 'Add to cart success'
      });

      break;
      
    default:
       $.toast('Hello there!');
  }
});


/* ---- end demo code ---- */


let shoppingCart = document.querySelector(".shopping-cart");

document.querySelector("#cart-btn").onclick = () => {
  shoppingCart.classList.toggle("active");
  loginForm.classList.remove("active");
  navbar.classList.remove("active");
};

let loginForm = document.querySelector(".login-form");

document.querySelector("#login-btn").onclick = () => {
  loginForm.classList.toggle("active");
  shoppingCart.classList.remove("active");
  navbar.classList.remove("active");
};

let navbar = document.querySelector(".navbar");

document.querySelector("#menu-btn").onclick = () => {
  navbar.classList.toggle("active");
  shoppingCart.classList.remove("active");
  loginForm.classList.remove("active");
};

window.onscroll = () => {
  shoppingCart.classList.remove("active");
  loginForm.classList.remove("active");
  navbar.classList.remove("active");
};

var swiper = new Swiper(".product-slider", {
  loop: true,
  spaceBetween: 20,
  autoplay: {
    delay: 7500,
    disableOnInteraction: false,
  },
  centeredSlides: true,
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1020: {
      slidesPerView: 3,
    },
  },
});

var swiper = new Swiper(".review-slider", {
  loop: true,
  spaceBetween: 20,
  autoplay: {
    delay: 7500,
    disableOnInteraction: false,
  },
  centeredSlides: true,
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1020: {
      slidesPerView: 3,
    },
  },
});

function addToCart(id, name, price, discount) {
  let totalPrice = 0;
  var isExit = false;
  const total = document.getElementById('totalCart');
  const btnToast = document.getElementById('btnToast');
  const data = JSON.parse(sessionStorage.getItem("Cart"));
  if (data && data.length > 0) {
    data.forEach((element) => {
      if (element.id == id) {
        element.qty += 1;
        isExit = true;
        const qty = document.getElementById('qty'+element.id);
        qty.innerHTML = "Qty: " + element.qty;
      }
    });
    if (!isExit) {
      data.push({
        id: id,
        name: name,
        price: Number(price),
        discount: Number(discount),
        qty: 1,
      });

      let parentPost = document.getElementById("shopping-cart");
      var childPost = document.createElement("div");
      childPost.setAttribute("class", "box");
      childPost.setAttribute("id", `cart${id}`);
      childPost.innerHTML = `
      <i class="fas fa-trash" onclick="deleteItemAddToCart('${id}')"></i>
      <div class="cart-img">
        <img src="/Assets/uploadImage/${id}" alt="">
      </div>
      <div class="content">
          <h3>${name}</h3>
          <span class="price">$${price}</span>
          <span class="quantity" id="qty${id}">Qty: 1</span>
      </div>
    `;
      parentPost.appendChild(childPost);
    }

    sessionStorage.setItem("Cart", JSON.stringify(data));

    data.forEach((element) => {
      totalPrice += ((element.price - (element.discount * element.price)/100) * element.qty)
    });
    total.innerHTML = 'total : $' + totalPrice;
    sessionStorage.setItem("totalCart", totalPrice);
  } else {
    const newdata = [
      {
        id: id,
        name: name,
        price: Number(price),
        discount: Number(discount),
        qty: 1,
      },
    ];

    let parentPost = document.getElementById("shopping-cart");
    var childPost = document.createElement("div");
    childPost.setAttribute("class", "box");
    childPost.setAttribute("id", `cart${id}`);
    childPost.innerHTML = `
      <i class="fas fa-trash" onclick="deleteItemAddToCart('${id}')"></i>
      <div class="cart-img">
        <img src="/Assets/uploadImage/${id}" alt="">
      </div>
      <div class="content">
          <h3>${name}</h3>
          <span class="price">$${price}</span>
          <span class="quantity" id="qty${id}">Qty: 1</span>
      </div>
    `;
    parentPost.appendChild(childPost);

    sessionStorage.setItem("Cart", JSON.stringify(newdata));

    totalPrice += (price - (discount * price)/100)
    total.innerHTML = 'total : $' + totalPrice;
    sessionStorage.setItem("totalCart", totalPrice);
  }
  btnToast.click();
}

function deleteItemAddToCart(id) {
  const data = JSON.parse(sessionStorage.getItem("Cart"));
  let totalPrice = sessionStorage.getItem("totalCart");
  const total = document.getElementById('totalCart');
  if (data && data.length > 0) {
    data.forEach((element, index) => {
      if (element.id == id) {
        document.getElementById("cart"+id).remove()
        data.splice(index, 1)
        sessionStorage.setItem("Cart", JSON.stringify(data));

        totalPrice -= ((element.price - (element.discount * element.price)/100) * element.qty)
        total.innerHTML = 'total : $' + totalPrice;
        sessionStorage.setItem("totalCart", totalPrice);
      }
    });
  }
}

function getAddToCart() {
  const data = JSON.parse(sessionStorage.getItem("Cart"));
  // console.log(data);
  if (data && data.length > 0) {
    let totalPrice = 0;
    let parentPost = document.getElementById("shopping-cart");
    data.forEach((element) => {
      var childPost = document.createElement("div");
      childPost.setAttribute("class", "box");
      childPost.setAttribute("id", `cart${element.id}`);
      childPost.innerHTML = `
        <i class="fas fa-trash" onclick="deleteItemAddToCart('${element.id}')"></i>
        <div class="cart-img">
          <img src="/Assets/uploadImage/${element.id}" alt="">
        </div>
        <div class="content">
            <h3>${element.name}</h3>
            <span class="price">$${element.price}</span>
            <span class="quantity" id="qty${element.id}">qty : ${element.qty}</span>
        </div>
      `;
      parentPost.appendChild(childPost);
      totalPrice += ((element.price - ((element.discount * element.price)/100)) * element.qty)
    });

    const total = document.getElementById('totalCart');
    total.innerHTML = 'total : $' + totalPrice;
    sessionStorage.setItem("totalCart", totalPrice);
  }
}

async function getProduct() {
  await axios
    .get("/getProduct")
    .then((products) => {
      // console.log(products)
      if(!window.location.href.includes('product')){
      let parentPost = document.getElementById("listProducts");
      products.data.forEach((element) => {
        var childPost = document.createElement("div");
        childPost.setAttribute("class", `box ${element.type}`);
        childPost.innerHTML = `
          <img src="/Assets/uploadImage/${element._id}" alt="">
          <h3>${element.name}</h3>
          <div class="price">$${element.price} </div>
          <div class="stars">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star-half-alt"></i>
          </div>
          <a class="btn" onclick="addToCart('${element._id}', '${element.name}', '${element.price}', '${element.discountPrice}')">add to cart</a>
        `;
        parentPost.appendChild(childPost);
      });
    } else {
      try {
        const url = new URL(window.location.href);
        const category = url.searchParams.get("category");

        let parentPost = document.getElementById("listProducts");
        products.data.forEach((element) => {
          if (category && element.type.includes(category)) {
            var childPost = document.createElement("div");
            childPost.setAttribute("class", `box ${element.type}`);
            childPost.innerHTML = `
                <img src="/Assets/uploadImage/${element._id}" alt="">
                <h3>${element.name}</h3>
                <div class="price">$${element.price} </div>
                <div class="stars">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star-half-alt"></i>
                </div>
                <a class="btn" onclick="addToCart('${element._id}', '${element.name}', '${element.price}', '${element.discountPrice}')">add to cart</a>
              `;
            parentPost.appendChild(childPost);
          }
        });
      } catch (error) {}
    }

    })
    .catch((err) => {
      console.log(err);
    });
}

getProduct();
getAddToCart();
