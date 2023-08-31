function searchEvent() {
  let chosenItems = [];
  search(chosenItems);
  if (chosenItems[0] === "empty") {
    document.querySelector(".js-all-items").innerHTML = allItemsHTML;
  } else if (chosenItems.length === 0) {
    alert("There are no items");
  } else {
    let chosenItemsStr = makeItemsInString(chosenItems);
    document.querySelector(".js-all-items").innerHTML = chosenItemsStr;
    const addToCartButtons = document.querySelectorAll(
      ".js-add-to-cart-button"
    );

    document.querySelectorAll(".js-add-to-cart-button").forEach((button) => {
      button.addEventListener("click", () => {
        const numInCart = updateCart(button);
        document.querySelector(".js-cart-quantity").innerHTML =
          String(numInCart);
      });
    });
  }
}

function search(chosenItems) {
  let input = document.getElementById("search-bar").value;
  input = input.toLowerCase();

  if (input === "") {
    chosenItems[0] = "empty";
    return;
  }

  for (i = 0; i < items.length; i++) {
    for (j = 0; j < items[i].keywords.length; j++) {
      let currentItem = items[i].keywords[j];
      if (currentItem.includes(input)) {
        chosenItems.push(items[i]);
        break;
      }
    }
  }
}

function addNumToLocalStorage(keyword, newNum) {
  let exisitngStr = localStorage.getItem(keyword);
  let existingNum = exisitngStr ? parseInt(exisitngStr) : 0;
  let newData = existingNum + newNum;
  localStorage.setItem(keyword, JSON.stringify(newData));
  return newData;
}

function addStringToLocalStorage(keyword, newItem) {
  if (!newItem) {
    return;
  }
  // Retrieve the existing data from local storage
  let existingData = localStorage.getItem(keyword);

  // If no data exists for the keyword, initialize an empty array
  let dataArray = existingData ? JSON.parse(existingData) : [];
  let foundSameItem = false;

  for (let i = 0; i < dataArray.length && !foundSameItem; i++) {
    let objInArr = JSON.parse(dataArray[i]);
    if (newItem.id === objInArr.id) {
      objInArr.quantity += newItem.quantity;
      dataArray[i] = JSON.stringify(objInArr);
      foundSameItem = true;
    }
  }

  if (!foundSameItem) {
    // Add the new string to the array
    dataArray.push(JSON.stringify(newItem));
  }

  // Save the updated data back to local storage
  localStorage.setItem(keyword, JSON.stringify(dataArray));
}

function addStringToLocalStorageWithDuplicate(keyword, newItem) {
  if (!newItem) {
    return;
  }
  // Retrieve the existing data from local storage
  let existingData = localStorage.getItem(keyword);

  // If no data exists for the keyword, initialize an empty array
  let dataArray = existingData ? JSON.parse(existingData) : [];

  dataArray.push(JSON.stringify(newItem));

  // Save the updated data back to local storage
  localStorage.setItem(keyword, JSON.stringify(dataArray));
}

function updateCart(button) {
  const productId = button.dataset.itemsId;
  const selectElement = document.getElementById(button.dataset.itemsId);
  const selectedValue = selectElement ? Number(selectElement.value) : 1;

  const newItem = {
    id: productId,
    quantity: selectedValue,
  };

  cart.push(newItem);

  addStringToLocalStorage("cart", newItem);
  const numInCart = addNumToLocalStorage("cartQuantity", selectedValue);
  return numInCart;
}

function sumOfAllElement(items) {
  let sum = 0;
  for (let i = 0; i < items.length; i++) {
    sum += items.priceInCents;
  }
  console.log(sum);
  return sum;
}

function makeItemsInString(items) {
  let chosenItems = "";

  items.forEach((item) => {
    chosenItems += `
      <div class="item-container">
        <div class="picture-container">
          <img class="items-image" src="${item.image}">
        </div>
        <div class="items-name">
          ${item.name}
        </div>
        <div class="items-price">
          $ ${(item.priceInCents / 100).toFixed(2)}
        </div>

        <div class="items-quantity-container">
          <select id="${item.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        <button class="add-to-cart-button js-add-to-cart-button" data-items-id="${
          item.id
        }">Add to Cart</button>
      </div>
      `;
  });

  return chosenItems;
}

function itemsInOrderHistory(cart) {
  let firstItemObj = JSON.parse(cart[0]);
  let currId = firstItemObj.orderId;
  let orderDate = firstItemObj.orderDate;
  let deliveryDate = firstItemObj.deliveryDate;
  let totalPrice = firstItemObj.totalPrice;
  let chosenItems = `
  <div class="order-head">
    <div class="order-date">Order Placed: ${orderDate}</div>
    <div class="delivery-date js-delivery-date">Delivery Date: ${deliveryDate}</div>
    <div class="order-id">Order ID: ${currId}</div>
    <div class="order-id">Total: ${(totalPrice / 100).toFixed(2)}</div>
  </div>`;

  cart.forEach((itemStr) => {
    let item = JSON.parse(itemStr);
    let itemId = item.id;
    let itemName = Item.getNameById(items, itemId);
    let itemPic = Item.getPicById(items, itemId);
    let itemPrice = Item.getPriceById(items, itemId);
    let orderId = item.orderId;
    totalPrice = item.totalPrice;
    orderDate = item.orderDate;
    deliveryDate = item.deliveryDate;

    if (currId != orderId) {
      chosenItems += `
        <div class="order-head">
          <div class="order-date">Order Placed: ${orderDate}</div>
          <div class="delivery-date js-delivery-date">Delivery Date: ${deliveryDate}</div>
          <div class="order-id">Order ID: ${orderId}</div>
          <div class="order-id">Total: ${(totalPrice / 100).toFixed(2)}</div>
        </div>`;
      currId = orderId;
    }

    chosenItems += `
      <div class="item-container">
        <div class="picture-container">
          <img class="items-image" src="${itemPic}">
        </div>
        <div class="items-info">
          <div class="items-name">
            ${itemName}
          </div>
          <div class="items-price">
            Total Price: $ ${(itemPrice / 100).toFixed(2)}
          </div>
          <div>
            Quantity:${item.quantity}
          </div>
          <button class="buy-again-button js-buy-again-button" data-items-id="${
            item.id
          }">Buy it again</button>
        </div>
      </div>
    `;
  });
  return chosenItems;
}

function itemsInCartStr(cart) {
  let chosenItems = "";
  cart.forEach((itemStr) => {
    let item = JSON.parse(itemStr);
    let itemId = item.id;
    let itemName = Item.getNameById(items, itemId);
    let itemPic = Item.getPicById(items, itemId);
    let itemPrice = Item.getPriceById(items, itemId);

    chosenItems += `
    <div class="item-container-with-date">
      <div class="delivery-date js-delivery-date">Delivery Date: Calculating</div>
      <div class="item-container">
          <div class="picture-container">
            <img class="items-image" src="${itemPic}">
          </div>
        <div class="items-info">
          <div class="items-name">
            ${itemName}
          </div>
          <div class="items-price">
            $ ${(itemPrice / 100).toFixed(2)}
          </div>
          <div>Quantity:
            <input class="items-quantity js-items-quantity" data-cart-id="${
              item.id
            }" type="number" value="${item.quantity}" min="1" max="10">
          </div>
          <div class="update-delete">
            <span class="delete js-delete" data-cart-id="${
              item.id
            }">Delete</span>
          </div>
        </div>
      </div>
    </div>
      `;
  });
  return chosenItems;
}

function checkValidCart() {
  const savedCart = localStorage.getItem("cart");
  const cartArray = JSON.parse(savedCart);

  return cartArray && cartArray.length != 0 ? true : false;
}

function calculateTotalPreTax() {
  const savedCart = localStorage.getItem("cart");
  const cartArray = JSON.parse(savedCart);

  let objInArr;
  let sum = 0;
  for (let i = 0; i < cartArray.length; i++) {
    objInArr = JSON.parse(cartArray[i]);
    sum += Item.getPriceById(items, objInArr.id) * objInArr.quantity;
  }
  return sum;
}

function shippingFee(sum) {
  return sum < 5000 && sum != 0 ? 1000 : 0;
}

function formatDate(date) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayOfWeek = days[date.getDay()];
  const month = months[date.getMonth()];
  const dayOfMonth = date.getDate();

  return `${dayOfWeek} ${month} ${dayOfMonth}`;
}

function getDateInFiveDays() {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 5);

  return formatDate(currentDate);
}

function modifyItemQuantity(newQuantity, button) {
  const currId = button.dataset.cartId;
  const savedCart = localStorage.getItem("cart");
  const cartArray = JSON.parse(savedCart);

  let isFound = false;
  let quantityDiff = 0;
  for (let i = 0; i < cartArray.length && !isFound; i++) {
    let objInArr = JSON.parse(cartArray[i]);
    if (objInArr.id === currId) {
      quantityDiff = newQuantity - objInArr.quantity;
      objInArr.quantity = newQuantity;
      cartArray[i] = JSON.stringify(objInArr);
      isFound = true;
    }
  }

  localStorage.setItem("cart", JSON.stringify(cartArray));
  return quantityDiff;
}

function deleteItemFromCart(button, arr) {
  const idToDelete = button.dataset.cartId;

  let isFound = false;
  let quant = 0;
  for (let i = 0; i < arr.length && !isFound; i++) {
    let objInArr = JSON.parse(arr[i]);
    if (idToDelete === objInArr.id) {
      quant = objInArr.quantity;
      arr.splice(i, 1);
      isFound = true;
    }
  }
  localStorage.setItem("cart", JSON.stringify(arr));
  return quant;
}

function clearLocalStorageByKeyword(keyword) {
  for (let i = localStorage.length - 1; i >= 0; i--) {
    const key = localStorage.key(i);
    if (key && key.includes(keyword)) {
      localStorage.removeItem(key);
    }
  }
}

function generateRandomId() {
  const timestamp = new Date().getTime(); // Get current timestamp
  const randomNum = Math.random().toString(36).substr(2, 5); // Generate random alphanumeric string
  return `${timestamp}-${randomNum}`;
}
