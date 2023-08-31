if (checkValidCart()) {
  let savedCart = localStorage.getItem("cart");
  let cartArray = JSON.parse(savedCart);
  let itemsInCart = itemsInCartStr(cartArray);

  document.querySelector(".js-items-in-cart").innerHTML = itemsInCart;

  // To delete an item from cart
  document.querySelectorAll(".js-delete").forEach((button) => {
    button.addEventListener("click", () => {
      const quantityToDelete = deleteItemFromCart(button, cartArray);
      savedCart = localStorage.getItem("cart");
      cartArray = JSON.parse(savedCart);
      itemsInCart = itemsInCartStr(cartArray);
      document.querySelector(".js-items-in-cart").innerHTML = itemsInCart;

      const storedNumberStr = localStorage.getItem("cartQuantity");
      const storedNumber = parseInt(storedNumberStr);
      localStorage.setItem(
        "cartQuantity",
        JSON.stringify(storedNumber - quantityToDelete)
      );
      location.reload();
    });
  });

  // To change the quantity of an item in cart
  document.querySelectorAll(".js-items-quantity").forEach((button) => {
    button.addEventListener("change", () => {
      const quantityToAdd = modifyItemQuantity(button.value, button);
      const storedNumberStr = localStorage.getItem("cartQuantity");
      const storedNumber = parseInt(storedNumberStr);
      localStorage.setItem(
        "cartQuantity",
        String(quantityToAdd + storedNumber)
      );
      location.reload();
    });
  });

  // To generate delivery date
  document.querySelectorAll(".js-delivery-date").forEach((date) => {
    date.innerHTML = "Delivery Date: " + getDateInFiveDays();
  });

  // To calculate prices, tax, shipping fee
  const totalPreTaxInCents = calculateTotalPreTax();
  document.querySelector(".price-pretax").innerHTML =
    "$ " + String((totalPreTaxInCents / 100).toFixed(2));

  const shippingFeeInCents = shippingFee(totalPreTaxInCents);
  document.querySelector(".shipping-fee").innerHTML =
    "$ " + String((shippingFeeInCents / 100).toFixed(2));

  const totalInCents = shippingFeeInCents + totalPreTaxInCents;
  document.querySelector(".total-pre-tax").innerHTML =
    "$ " + String((totalInCents / 100).toFixed(2));

  const taxInCents = totalInCents * 0.12;
  document.querySelector(".estimated-tax").innerHTML =
    "$ " + String((taxInCents / 100).toFixed(2));

  const finalPriceInCents = taxInCents + totalInCents;
  document.querySelector(".total-price").innerHTML =
    "$ " + String((finalPriceInCents / 100).toFixed(2));

  const storedNumberStr = localStorage.getItem("cartQuantity");
  document.querySelector(".item-quantity").innerHTML =
    "Items (" + storedNumberStr + ")";

  document.querySelector(".js-checkout-header").innerHTML =
    "Checkout (" + storedNumberStr + " Items)";

  // To place the order
  const orderButton = document.querySelector(".js-order-button");
  orderButton.addEventListener("click", () => {
    localStorage.setItem("cartQuantity", String(0));
    savedCart = localStorage.getItem("cart");
    cartArray = JSON.parse(savedCart);
    let orderDate = new Date();
    orderDate.setDate(orderDate.getDate());
    let orderId = generateRandomId();

    for (let i = 0; i < cartArray.length; i++) {
      const itemInArr = JSON.parse(cartArray[i]);
      const newItem = {
        id: itemInArr.id,
        quantity: itemInArr.quantity,
        orderDate: formatDate(orderDate),
        deliveryDate: getDateInFiveDays(),
        orderId: orderId,
        totalPrice: finalPriceInCents,
      };
      addStringToLocalStorageWithDuplicate("orderHistory", newItem);
    }
    clearLocalStorageByKeyword("cart");
    location.reload();
    alert(
      "Thanks, Your order has been placed.\n(Please note that this is NOT a real e-commerce website)"
    );
  });
}
