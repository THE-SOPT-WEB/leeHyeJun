import pic1 from "./assets/김규민.jpeg";
import pic2 from "./assets/전희선.jpeg";
import pic3 from "./assets/서혜은.jpg";
import pic4 from "./assets/황주희.jpeg";
import pic5 from "./assets/백지연.png";

const $ = (selector) => document.querySelector(selector);

let currentStep = 0;

const quizList = [
  {
    src: pic1,
    answer: "김규민",
  },
  {
    src: pic2,
    answer: "전희선",
  },
  {
    src: pic3,
    answer: "서혜은",
  },
  {
    src: pic4,
    answer: "황주희",
  },
  {
    src: pic5,
    answer: "백지연",
  },
];

function initGame({ score, answer, image }) {
  console.log(score, image, answer);
  currentStep = 0;
  score.innerText = 0;

  image.src = quizList[currentStep].src;
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

  showModal("나를 알아주다니 고마워!");
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
        showModal(`나는 ${currentAnswer}가 아니야!!`);
      }
    }
  });
}

function gameManager(gameInfo) {
  initGame(gameInfo);
  attachEvent(gameInfo);
}

window.onload = () => {
  gameManager({
    score: $(".scoreBoard__score"),
    answer: $("ul.answer__list"),
    image: $(".imageBoard > img"),
  });
};
