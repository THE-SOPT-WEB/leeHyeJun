const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

function setElements(burger) {
  const tagName = ["span", "input", "span", "button"];
  const elems = [];

  tagName.forEach((name, index) => {
    elems[index] = document.createElement(name);
  });

  elems[0].innerText = burger.querySelector(".burger__name").innerText;
  elems[1].setAttribute("value", 1);
  elems[2].innerText = burger.querySelector(".burger__price").innerText;
  elems[3].setAttribute("type", "button");
  elems[3].innerText = "❌";

  return elems;
}

function addCartItem(cartList, elems) {
  const item = document.createElement("li");
  elems.forEach((elem) => {
    item.appendChild(elem);
  });
  cartList.appendChild(item);
}

function attachEvent({ cartList, burgerCard }) {
  burgerCard.forEach((burger) => {
    burger.addEventListener("click", () => {
      addCartItem(cartList, setElements(burger));
    });
  });
}

function cartManager(cartInfo) {
  attachEvent(cartInfo);
}

window.onload = () => {
  cartManager({
    cartList: $("ul.cart__list"),
    burgerCard: $$(".burger__card"),
  });
};
