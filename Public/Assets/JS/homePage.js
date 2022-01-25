let searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
}

let shoppingCart = document.querySelector('.shopping-cart');

document.querySelector('#cart-btn').onclick = () =>{
    shoppingCart.classList.toggle('active');
    searchForm.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
}

let loginForm = document.querySelector('.login-form');

document.querySelector('#login-btn').onclick = () =>{
  window.location.href = 'http://localhost:5000/signin';
    // loginForm.classList.toggle('active');
    // searchForm.classList.remove('active');
    // shoppingCart.classList.remove('active');
    // navbar.classList.remove('active');
}

let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
}

// window.onscroll = () =>{
//     searchForm.classList.remove('active');
//     shoppingCart.classList.remove('active');
//     loginForm.classList.remove('active');
//     navbar.classList.remove('active');
// }

var swiper = new Swiper(".product-slider", {
    loop:true,
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
    loop:true,
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

async function getProduct() {
  await axios.get('/getProduct')
      .then(products => {
          // console.log(products)
          let parentPost = document.getElementById("listProducts");
          products.data.forEach(element => {
              var childPost = document.createElement("div");
              childPost.setAttribute("class", "box");
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
                <a href="#" class="btn">add to cart</a>
              `;
              parentPost.appendChild(childPost);
          })
      })
      .catch((err) => {
          console.log(err)
      })
}

getProduct();