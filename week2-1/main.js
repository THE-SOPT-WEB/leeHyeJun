import pic1 from "./assets/짱구.png";
import pic2 from "./assets/유리.png";
import pic3 from "./assets/맹구.png";
import pic4 from "./assets/훈이.png";
import pic5 from "./assets/철수.png";

const $ = (selector) => document.querySelector(selector);

let currentStep = 0;

const quizList = [
  {
    src: pic1,
    answer: "짱구",
  },
  {
    src: pic2,
    answer: "유리",
  },
  {
    src: pic3,
    answer: "맹구",
  },
  {
    src: pic4,
    answer: "훈이",
  },
  {
    src: pic5,
    answer: "철수",
  },
];

function initGame({ score, answer, image }) {
  currentStep = 0;
  score.innerText = 0;

  image.src = quizList[currentStep].src;
}

function resetGame(gameInfo) {
  const resetBtn = $(".buttonList__shuffle");
  resetBtn.addEventListener("click", () => {
    initGame(gameInfo);
  });
}

function showModal(modalContent, keepOpen) {
  const modal = $(".modal");
  const modalBody = $(".modal__body");
  modalBody.innerHTML = modalContent;

  modal.classList.remove("hide");
  if (keepOpen) return;
  setTimeout(() => {
    modal.classList.add("hide");
  }, 500);
}

function goNextStep(score, image) {
  currentStep++;
  score.innerText = +score.innerText + 1;

  if (currentStep === quizList.length) {
    showModal(`<a href="/">메인화면으로</a>`, true);
    return;
  }

  showModal("딩동댕!");
  image.src = quizList[currentStep].src;
}

function attachEvent({ score, answer, image }) {
  answer.addEventListener("click", (e) => {
    if (e.target instanceof HTMLLIElement) {
      const currentAnswer = e.target.innerText;
      const realAnswer = quizList[currentStep].answer;
      if (currentAnswer === realAnswer) {
        goNextStep(score, image);
      } else {
        showModal(`땡! 나는 ${currentAnswer}가 아니야`);
      }
    }
  });
}

function gameManager(gameInfo) {
  initGame(gameInfo);
  attachEvent(gameInfo);
  resetGame(gameInfo);
}

window.onload = () => {
  gameManager({
    score: $(".scoreBoard__score"),
    answer: $("ul.answer__list"),
    image: $(".imageBoard > img"),
  });
};
