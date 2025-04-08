let gameSeq = [];
let userSeq = [];

let highScore = 0;
let gameStart = false;
let level = 0;
let btns = ["blue", "red", "yellow", "pink"];

let h3 = document.querySelector("h3");
let body = document.querySelector("body");

document.addEventListener("keypress", function () {
    if (gameStart == false) {
        console.log("Game started");
        gameStart = true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("gameflash");
    setTimeout(function () {
        btn.classList.remove("gameflash")
    }, 200);
};
function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash")
    }, 200);
};

function levelUp() {
    userSeq = [];
    level++;
    h3.innerText = `Level ${level}`;

    let randNo = Math.floor(Math.random() * 3);
    let randIdx = btns[randNo];
    let randBtn = document.querySelector(`.${randIdx}`);
    gameSeq.push(randIdx);
    console.log(gameSeq);
    gameFlash(randBtn);
};

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    }
    else {
        if (level - 1 > highScore) {
            highScore = level - 1;
            h3.innerText = `Game Over! Your have a highscore ${level - 1}. Press any key to restart`;
        } else {
            h3.innerText = `Game Over! Your score is ${level - 1}.Highscore: ${highScore} Press any key to restart`;
        }

        reset();
        let orgColor = document.querySelector("body").style.backgroundColor;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            body.style.backgroundColor = orgColor;
        }, 250);
    }
}

function pressButton() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}



let allBtns = document.querySelectorAll(".inner");
for (btn of allBtns) {
    btn.addEventListener("click", pressButton);
};

function reset() {

    gameStart = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
};

let button = document.querySelector("button");
button.addEventListener("click", ()=>{
    if(document.querySelector("body").style.backgroundColor == "black"){
        body.style.backgroundColor="white";
        body.style.color = "black";
        button.style.backgroundColor = "black";
    }
    else {
        body.style.backgroundColor="black";
        body.style.color = "white";
        button.style.backgroundColor = "grey";
    }
    
})