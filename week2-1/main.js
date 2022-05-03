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

// 게임(단계, 점수, 이미지) 초기화
function initGame({ score, image }) {
  currentStep = 0;
  score.innerText = 0;
  image.src = quizList[currentStep].src;
}

// 모달 창 띄우기
function showModal(modalContent) {
  $(".modal__body").innerHTML = modalContent;
  $(".modal").classList.remove("hide");
}

// 정답을 맞췄을 시 다음 단계 작업
function goNextStep(score, image) {
  currentStep++;
  score.innerText = +score.innerText + 1;

  // 퀴즈가 모두 끝난 경우
  if (currentStep === quizList.length) {
    showModal(`<a href="/">메인화면으로</a>`);
    return;
  }

  image.src = quizList[currentStep].src;
  const scoreBoard = $(".scoreBoard");
  scoreBoard.classList.add("scored");
  setTimeout(() => {
    scoreBoard.classList.remove("scored");
  }, 1500);
  showModal("호호이~ 이미지 로딩중!");
}

function attachEvent({ score, answer, image }) {
  // 답 클릭시 정답 판별
  answer.addEventListener("click", (e) => {
    if (e.target instanceof HTMLLIElement) {
      const currentAnswer = e.target.innerText;
      const realAnswer = quizList[currentStep].answer;

      if (currentAnswer === realAnswer) goNextStep(score, image);
      else showModal(`땡! 나는 ${currentAnswer}가 아니야`);
    }
  });

  // 이미지 로딩이 완료되면 모달 숨기기
  image.addEventListener("load", () => {
    modal.classList.add("hide");
  });

  // 다시하기 클릭시
  $(".buttonList__shuffle").addEventListener("click", () => {
    initGame({ score, image });
  });

  // 모달 바깥 부분 클릭시 모달 닫기
  const modal = $(".modal");
  modal.addEventListener("click", (e) => {
    e.target === modal ? modal.classList.add("hide") : false;
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
