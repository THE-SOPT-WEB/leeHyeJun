const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

let burgerList = [];

function setElements(burgerName, burgerPrice) {
  const tagName = ["span", "input", "span", "button"];
  let elems = [];

  tagName.forEach((name, index) => {
    elems[index] = document.createElement(name);
  });

  elems[0].innerText = burgerName;
  elems[1].setAttribute("value", 1);
  elems[1].classList.add(`cart__list--${burgerName}-value`);
  elems[2].innerText = burgerPrice;
  elems[3].setAttribute("type", "button");
  elems[3].innerText = "❌";

  burgerList.push(burgerName);

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
      const burgerName = burger.querySelector(".burger__name").innerText;
      if (burgerList.includes(burgerName)) {
        $(`.cart__list--${burgerName}-value`).value++;
      } else {
        const burgerPrice = burger.querySelector(".burger__price").innerText;
        addCartItem(cartList, setElements(burgerName, burgerPrice));
      }
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
