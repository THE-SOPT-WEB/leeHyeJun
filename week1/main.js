const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

let burgerList = [];

function addCartItem(cartList, burgerName, burgerPrice) {
  const tagName = ["span", "input", "span", "button"];
  const elems = [];
  tagName.forEach((name, index) => {
    elems[index] = document.createElement(name);
  });

  elems[0].innerText = burgerName;
  elems[0].classList.add(`cart__list--${burgerName}`);
  elems[1].setAttribute("value", 1);
  elems[1].classList.add(`cart__list--${burgerName}-qty`);
  elems[2].innerText = burgerPrice;
  elems[2].classList.add(`cart__list--${burgerName}-price`);
  elems[3].innerText = "❌";
  elems[3].setAttribute("type", "button");
  elems[3].classList.add(`cart__list--${burgerName}-del`);

  const item = document.createElement("li");
  elems.forEach((elem) => item.appendChild(elem));
  cartList.appendChild(item);
}

function isInCart(cartList, burgerName) {
  const children = cartList.childNodes;
  for (let i = 0; i < children.length; i++)
    if (burgerName === children[i].firstChild.innerText) return true;
  return false;
}

function attachEvent({ cartList, burgerCard }) {
  burgerCard.forEach((burger) => {
    burger.addEventListener("click", () => {
      const burgerName = burger.querySelector(".burger__name").innerText;
      const burgerPrice = burger.querySelector(".burger__price").innerText;

      if (isInCart(cartList, burgerName))
        $(`.cart__list--${burgerName}-qty`).value++;
      else {
        burgerList.push(burgerName);
        addCartItem(cartList, burgerName, burgerPrice);
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
