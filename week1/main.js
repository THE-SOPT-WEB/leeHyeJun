const $ = (selector) => document.querySelector(selector);

// 이미 장바구니에 있는 아이템인지 검사
function isInCart(cartList, burgerName) {
  const nameList = cartList.querySelectorAll(".cart__list--name");
  for (let i = 0; i < nameList.length; i++)
    if (burgerName === nameList[i].innerText) return true;
  return false;
}

// 장바구니 아이템 삭제
function delCartItem(cartList, burgerName, btn) {
  if (isInCart(cartList, burgerName)) {
    btn.parentElement.remove();
    calcTotalPrice(cartList);
  }
}

// 장바구니 아이템 추가
function addCartItem(cartList, burgerName, burgerPrice) {
  const burgerLi = document.createElement("li");
  burgerLi.insertAdjacentHTML(
    "afterbegin",
    `<span class="cart__list--name cart__list--${burgerName}">${burgerName}</span><input class="cart__list--qty cart__list--${burgerName}-qty" type="number" value="1" /><span class="cart__list--price">${burgerPrice}</span><button class="cart__list--del cart__list--${burgerName}-del" type="button">❌</button>`
  );
  cartList.appendChild(burgerLi);

  $(".cart__list--qty").addEventListener("change", () => {
    calcTotalPrice(cartList);
  });
  $(".cart__list--del").addEventListener("click", (e) => {
    delCartItem(cartList, burgerName, e.target);
  });
}

function parsePriceToNumber(price) {
  const removedComma = price.slice(0, -1).replace(/\D/g, "");
  return +removedComma;
}

// 누적 금액 계산
function calcTotalPrice(cartList) {
  const priceList = cartList.querySelectorAll(".cart__list--price");
  const qtyList = cartList.querySelectorAll(".cart__list--qty");

  let totalPrice = 0;
  for (let i = 0; i < priceList.length; i++) {
    const price = parsePriceToNumber(priceList[i].innerText);
    const qty = qtyList[i].value;
    totalPrice += price * qty;
  }
  $(".cart__total > p").innerText = totalPrice.toLocaleString();
}

// 모달 창 보여주기
function showModal(modalContent) {
  $(".modal__body").innerHTML = modalContent;
  $(".modal").classList.remove("hide");
}

function attachEvent({ burgerSection, cartList }) {
  // 햄버거 카드 클릭시 장바구니에 추가 (이벤트 위임)
  burgerSection.addEventListener("click", (e) => {
    const burgerCard = e.target.closest("article");
    const burgerName = burgerCard.querySelector(".burger__name").innerText;
    const burgerPrice = burgerCard.querySelector(".burger__price").innerText;

    // 아이템 추가시 흔들리는 애니메이션
    const cart = $(".cart");
    cart.classList.add("shake");
    setTimeout(() => {
      cart.classList.remove("shake");
    }, 300);

    // 장바구니 안에 이미 있는 햄버거인지 확인 후 수량 증가 혹은 추가
    if (isInCart(cartList, burgerName))
      $(`.cart__list--${burgerName}-qty`).value++;
    else addCartItem(cartList, burgerName, burgerPrice);

    // 누적 금액 계산
    calcTotalPrice(cartList);
  });

  // 장바구니 주문하기 버튼 클릭
  $(".cart__order-btn").addEventListener("click", () => {
    showModal("정말 주문하시겠어요?");
  });

  // 장바구니 취소하기 버튼 클릭
  $(".cart__cancel-btn").addEventListener("click", () => {
    console.log(cartList.children);
    cartList.children.forEach((list) => {
      list.remove();
    });
    calcTotalPrice(cartList);
  });

  // 모달 닫기 버튼 클릭
  $(".modal__close-btn").addEventListener("click", () => {
    $(".modal").classList.add("hide");
  });
}

window.onload = () => {
  attachEvent({
    burgerSection: $("section.burger"),
    cartList: $("ul.cart__list"),
  });
};
