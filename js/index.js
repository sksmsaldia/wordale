const 정답 = "APPLE";

let index = 0; //수정 가능한 변수
let attempts = 0; //6번의 시도 중 첫 번째
let timer;

function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료됐습니다.";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:40vh; left:37vw; background-color:white; width:200px; height:100px;";
    document.body.appendChild(div); // document.body 아래에 삽입. js로 조작 가능
    //지양하는 게 좋은 방식
  };
  const nextLine = () => {
    if (attempts === 6) return gameover(); //6번째 시도 끝나면 종료
    attempts += 1; //2번째 시도
    index = 0; //몇 번째 글자였는지 초기화
  };

  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayGameover();
    clearInterval(timer); //게임 종료시 타이머 종료
  };

  const handleEnterKey = () => {
    let 맞은_갯수 = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-column[data-index='${attempts}${i}']`
      );
      // 앞에서 5글자의 단어, 각 블록을 돌며 뽑아서 텍스트 출력

      const 입력한_글자 = block.innerText;
      const 정답_글자 = 정답[i];
      if (입력한_글자 === 정답_글자) {
        맞은_갯수 += 1;
        block.style.background = "#6AAA64"; //같으면 초록색
      } else if (정답.includes(입력한_글자))
        block.style.background = "#C9B458"; //포함하면 노란색
      else block.style.background = "#787C7E";

      block.style.color = "white";
    }

    if (맞은_갯수 === 5) gameover();
    //다음 줄로 넘기기
    else nextLine();
  };

  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-column[data-index='${attempts}${index - 1}']` //index -1 이전 블럭
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index -= 1;
  };

  const handleKeydown = (event) => {
    const key = event.key.toUpperCase(); //대문자
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-column[data-index='${attempts}${index}']`
    );
    // 0번째 시도의 0번째 인덱스인 블록 다져와서 텍스트 업데이트

    //back space 키코드 8
    if (event.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (event.key === "Enter")
        handleEnterKey(); // 단어가 다 입력됐을 때만 호출
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key; //알파벳만 입력되게
      index = index + 1; //인덱스 값 업데이트 [insex += 1;] [index++;]
    }
  };

  //타이머
  const startTimer = () => {
    const 시작_시간 = new Date();

    function setTime() {
      const 현재_시간 = new Date();
      const 흐른_시간 = new Date(현재_시간 - 시작_시간);
      const 분 = 흐른_시간.getMinutes().toString().padStart(2, "0");
      const 초 = 흐른_시간.getSeconds().toString().padStart(2, "0");
      const timeDiv = document.querySelector("#timer");
      timeDiv.innerText = `${분}:${초}`;
    }
    //주기성
    timer = setInterval(setTime, 1000);
    // setInterval의 ID
  };

  startTimer();

  window.addEventListener("keydown", handleKeydown);
}

appStart();
