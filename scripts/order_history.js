const savedHistory = localStorage.getItem("orderHistory");
const historyArray = JSON.parse(savedHistory);
if (historyArray) {
  document.querySelector(".js-ordered-items").innerHTML =
    itemsInOrderHistory(historyArray);
} else {
  document.querySelector(".js-ordered-items").innerHTML = "No order history";
}

document.querySelectorAll(".js-buy-again-button").forEach((button) => {
  button.addEventListener("click", () => {
    const numInCart = updateCart(button);
    button.innerText = "Added to Cart";
    setTimeout(function () {
      button.innerText = "Buy it again";
    }, 2000);
    document.querySelector(".js-cart-quantity").innerHTML = String(numInCart);
  });
});

const storedNumberStr = localStorage.getItem("cartQuantity");
const storedNumber = parseInt(storedNumberStr);
document.querySelector(".js-cart-quantity").innerHTML = storedNumberStr
  ? storedNumberStr
  : "0";
