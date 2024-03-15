const tablebodyposts = document.getElementById("maincontainer");
document.addEventListener("DOMContentLoaded", () => {
  fetchPost();
});

function fetchPost() {
  fetch("https://product-2a888-default-rtdb.firebaseio.com/product.json", {
    method: "GET",
  })
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      let chordsegment = "";
      for (let post in data) {
        chordsegment += `
        <li>
        <div class="cartitems">
           <div class="cartimage"><img src=${
             data[post].img
           } alt="car image"></div>
           <div class="productdetails">
             <ul id="details">
                <li>${data[post].description}</li>
                <li>${data[post].name}</li>
                <li><sup>₹</sup> ${data[post].price}</li>
            </ul>
            <div class="cartbutton">
                <button onClick='addToCart(${JSON.stringify(
                  post
                )})' data-id = "${post}">Add to Cart</button>
            </div>
        </div>
    </div>
    </li>`;
      }
      tablebodyposts.firstElementChild.innerHTML = chordsegment;
      returncartItemList(tablebodyposts.firstElementChild);
    });
}

const cartItems = [];

async function addToCart(productId) {
  const existingProductIndex = cartItems.findIndex(
    (item) => item.productId === productId
  );

  if (existingProductIndex !== -1) {
    // cartItems[existingProductIndex].quantity++;
    alert("the product you want to add is already in The Cart");
  } else {
    const response = await fetch(
      `https://product-2a888-default-rtdb.firebaseio.com/product/${productId}.json`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch product data");
    }

    const data = await response.json();
    data["productId"] = productId;
    data["quantity"] = 1;
    cartItems.push(data);
  }
  console.log(cartItems);
  document.getElementById("cartcounter").textContent =
    cartItems.length.toString();
}

const cartbutton = document.getElementById("cartbutton");
cartbutton.addEventListener("click", (e) => {
  e.preventDefault();
  renderCartItems();
});

function renderCartItems() {
  const shoppingCart = document.getElementById("shoppingcart1");
  shoppingCart.style.display = "block";
  shoppingCart.innerHTML = "";

  let totalValue = 0;
  cartItems.forEach((item) => {
    console.log();
  });

  const closeButton = `<div id = 'closeDiv' style = 'background-color: rgb(165, 215, 37);'>
  <button id="close" onClick="closeCart()">Close</button>
</div>`;
  cartItems.forEach((item) => {
    totalValue += parseInt(item.price);
    if (item.quantity > 1) {
      totalValue += parseInt(item.price);
    }

    shoppingCart.innerHTML += `
        <div class="shopping-Cart-Inner-Div">
            <div class="cart-item-img">
                <img src="${item.img}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <div>${item.name}</div>
                <div>${item.description}</div>
                <div>Price: ₹<span>${item.price}</span></div>
                <div>Quantity: <button class='decrement'>-</button><span style='font-size:15px'>${item.quantity}</span><button class='increment'>+</button></div>
                <button class="remove-Cart-Button" id="remove-Cart">Remove From Cart</button>
            </div>
        </div>
    `;
    // console.log(item.price);
  });

  const totalPriceDivHTML = `
    <div class="totalPriceDiv">Total Cart Price: <span>${totalValue}</span></div>
`;
  // console.log(totalValue);
  const div = closeButton + totalPriceDivHTML;
  shoppingCart.innerHTML += div;

  document.getElementById("maincontainer").style.display = "none";
}

//Close Cart

function closeCart() {
  document.getElementById("shoppingcart1").style.display = "none";
  document.getElementById("maincontainer").style.display = "block";
}

//decrease the Quantity
const shoppingCart = document.getElementById("shoppingcart1");
shoppingCart.addEventListener("click", (e) => {
  let target = e.target;
  if (target.classList.contains("decrement")) {
    console.log(target);
    let quantity = target.nextElementSibling;
    let cartPriceElement =
      target.parentElement.parentElement.parentElement.parentElement
        .lastElementChild.firstElementChild;
    let cartPrice = parseInt(
      target.parentElement.parentElement.parentElement.parentElement
        .lastElementChild.firstElementChild.textContent
    );
    let price = parseInt(
      target.parentElement.previousElementSibling.firstElementChild.textContent
    );

    if (parseInt(quantity.textContent) === 1) {
      const c = e.target.closest(".shopping-Cart-Inner-Div");
      c.remove();
      console.log(price);
      cartItems.length--;
      console.log(cartPrice);
      cartPrice -= price;
      cartPriceElement.textContent = cartPrice;
    } else {
      quantity.textContent -= 1;
      cartPrice -= price;
      cartPriceElement.textContent = cartPrice;
    }
    document.querySelector(".cart-counter").textContent =
      cartItems.length.toString();
  }
  // if(cartItems.length === 0){
  //   alert('Your Cart is Empty');
  // }
});

//Increase the Quantity
shoppingCart.addEventListener("click", (e) => {
  let target = e.target;
  if (target.classList.contains("increment")) {
    console.log(target);

    let quantityEle = target.previousElementSibling;
    let quantity = parseInt(quantityEle.textContent);
    quantity += 1;
    quantityEle.textContent = quantity;

    let price = parseInt(
      target.parentElement.previousElementSibling.firstElementChild.textContent
    );

    let cartPriceElement =
      target.parentElement.parentElement.parentElement.parentElement
        .lastElementChild.firstElementChild;
    let cartPrice = parseInt(
      target.parentElement.parentElement.parentElement.parentElement
        .lastElementChild.firstElementChild.textContent
    );

    cartPrice += price;
    cartPriceElement.textContent = cartPrice;
  }
});

//Remove From the Cart Element
shoppingCart.addEventListener("click", (e) => {
  let target = e.target;
  if (target.classList.contains("remove-Cart-Button")) {
    let qualityValueEle =
      target.parentElement.firstElementChild.nextElementSibling
        .nextElementSibling.nextElementSibling.firstElementChild
        .nextElementSibling;

    let qualityValue = parseInt(
      target.parentElement.firstElementChild.nextElementSibling
        .nextElementSibling.nextElementSibling.firstElementChild
        .nextElementSibling.textContent
    );

    let cartValueEle =
      target.parentElement.parentElement.parentElement.lastElementChild
        .firstElementChild;
    let cartValue = parseInt(
      target.parentElement.parentElement.parentElement.lastElementChild
        .firstElementChild.textContent
    );
    let price =
      target.parentElement.firstElementChild.nextElementSibling
        .nextElementSibling.firstElementChild.textContent;
    const c = e.target.closest(".shopping-Cart-Inner-Div");
    console.log(qualityValueEle);
    console.log(cartValueEle);
    console.log(qualityValue);
    console.log(cartValue);
    console.log(price);
    cartValue -= qualityValue * price;
    console.log(cartValue);
    cartValueEle.textContent = cartValue;

    c.remove();
    cartItems.length--;
  }
  document.querySelector(".cart-counter").textContent =
    cartItems.length.toString();
});

//search Input 
function returncartItemList(cartListItem) {
  const searchButton = document.getElementById("searchButton");
  searchButton.addEventListener("click", (e) => {
    e.preventDefault();
    const searchBarValue = document
      .querySelector("#searchInput")
      .value.toLowerCase();
    console.log(searchBarValue);
    let arrayCartListItem = Array.from(cartListItem.children);
    arrayCartListItem.forEach((item) => {
      let listItemDescriptionEle =
        item.firstElementChild.lastElementChild.firstElementChild.firstElementChild.textContent.toLowerCase();

      let listItemNameEle =
        item.firstElementChild.lastElementChild.firstElementChild
          .firstElementChild.nextElementSibling.textContent;

      if (
        listItemNameEle.includes(searchBarValue) ||
        listItemDescriptionEle.includes(searchBarValue)
      ) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
    document.querySelector("#searchInput").value = "";
  });
}
