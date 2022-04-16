const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

function isInCart(cartList, burgerName) {
  const children = cartList.childNodes;
  for (let i = 0; i < children.length; i++)
    if (burgerName === children[i].firstChild.innerText) return true;
  return false;
}

function delCartItem(cartList, burgerName, btn) {
  if (isInCart(cartList, burgerName)) {
    btn.parentElement.remove();
  }
}

function addCartItem(cartList, burgerName, burgerPrice) {
  const tagName = ["span", "input", "span", "button"];
  const elems = [];
  tagName.forEach((name, index) => {
    elems[index] = document.createElement(name);
  });

  elems[0].innerText = burgerName;
  elems[0].classList.add(`cart__list--${burgerName}`);
  elems[1].setAttribute("value", 1);
  elems[1].classList.add(`cart__list--qty`);
  elems[1].classList.add(`cart__list--${burgerName}-qty`);
  elems[2].innerText = burgerPrice;
  elems[2].classList.add(`cart__list--price`);
  elems[3].innerText = "❌";
  elems[3].setAttribute("type", "button");
  elems[3].classList.add(`cart__list--${burgerName}-del`);

  elems[3].addEventListener("click", (e) => {
    delCartItem(cartList, burgerName, e.target);
  });

  const item = document.createElement("li");
  elems.forEach((elem) => item.appendChild(elem));
  cartList.appendChild(item);
}

function parsePriceToNumber(price) {
  const removedComma = price.slice(0, -1).replace(/\D/g, "");
  return +removedComma;
}

function calcTotalPrice(cartList) {
  let totalPrice = 0;
  const children = cartList.childNodes;
  for (let i = 0; i < children.length; i++) {
    const price = parsePriceToNumber(
      children[i].querySelector(`.cart__list--price`).innerText
    );
    const qty = children[i].querySelector(`.cart__list--qty`).value;
    totalPrice += price * qty;
  }
  $(".cart__total > p").innerText = totalPrice.toLocaleString();
}

function showModal(modalContent) {
  const modal = $(".modal");
  const modalBody = $(".modal__body");
  const noBtn = $(".modal__close-btn");

  modalBody.innerHTML = modalContent;
  modal.classList.remove("hide");
  noBtn.addEventListener("click", () => {
    modal.classList.add("hide");
  });
}

function attachEvent({ cartList, burgerCard, orderBtn, cancelBtn }) {
  burgerCard.forEach((burger) => {
    burger.addEventListener("click", () => {
      const burgerName = burger.querySelector(".burger__name").innerText;
      const burgerPrice = burger.querySelector(".burger__price").innerText;

      if (isInCart(cartList, burgerName))
        $(`.cart__list--${burgerName}-qty`).value++;
      else addCartItem(cartList, burgerName, burgerPrice);

      calcTotalPrice(cartList);
    });
  });

  orderBtn.addEventListener("click", () => {
    showModal("정말 주문하시겠어요?");
  });

  cancelBtn.addEventListener("click", () => {
    Array.from(cartList.children).forEach((list) => {
      list.remove();
    });
    calcTotalPrice(cartList);
  });
}

function cartManager(cartInfo) {
  attachEvent(cartInfo);
}

window.onload = () => {
  cartManager({
    cartList: $("ul.cart__list"),
    burgerCard: $$(".burger__card"),
    orderBtn: $(".cart__button > button:nth-child(1)"),
    cancelBtn: $(".cart__button > button:nth-child(2)"),
  });
};
