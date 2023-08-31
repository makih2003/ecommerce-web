let allItemsHTML = makeItemsInString(items);
document.querySelector(".js-all-items").innerHTML = allItemsHTML;

const addToCartButtons = document.querySelectorAll(".js-add-to-cart-button");

document.querySelectorAll(".js-add-to-cart-button").forEach((button) => {
  button.addEventListener("click", () => {
    const numInCart = updateCart(button);
    document.querySelector(".js-cart-quantity").innerHTML = String(numInCart);
  });
});

// To prevent .js-cart-quantity to get reset
const storedNumberStr = localStorage.getItem("cartQuantity");
const storedNumber = parseInt(storedNumberStr);
document.querySelector(".js-cart-quantity").innerHTML = storedNumberStr
  ? storedNumberStr
  : "0";

const jumpToTop = document.querySelector(".js-jump-to-top");
jumpToTop.addEventListener("click", () => {
  scrollTo({ top: 0, behavior: "smooth" });
});
