let h3 = document.querySelector('h3');
let span = document.querySelector('span');

let gameSeq =[];
let userSeq = [];

let btns = ["red", "green", "blue", "yellow"];

let started = false;
let level  = 0;
let highScore = localStorage.getItem('highScore') || 0;


document.addEventListener('keypress',()=>{
    if(started == false){
        console.log("Game Started");
        started = true;
        levelUp();
    }

});

function gameFlash(btn){
    btn.classList.add('flash');
    setTimeout(()=>{
        btn.classList.remove('flash');
    }, 200);
}

function userFlash(btn){
    btn.classList.add('userFlash');
    setTimeout(()=>{
        btn.classList.remove('userFlash');
    }, 200);

    
}

function levelUp(){
    userSeq = [];
    level++;
    h3.textContent = `Level ${level}`;
    span.innerText = `Score : ${level}`;

    if (level > parseInt(highScore)) {
        highScore = level;
        localStorage.setItem('highScore', highScore);
        displayHighScore(); // Update high score display
    }


    let randomIdx = Math.floor(Math.random()*3); // Generating random index
    let randomColor = btns[randomIdx]; // Inserting random index in (btn[]) array to get a color and storing it

    gameSeq.push(randomColor);
    let randomBtn = document.querySelector(`.${randomColor}`); //selecting a random button to flash
    gameFlash(randomBtn);
}

function bttnPress(){
    let userBtn = this;
    userFlash(userBtn);

    userColor = userBtn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

function checkAns(idx) {
    if(userSeq[idx] === gameSeq[idx]) {
        if(userSeq.length == gameSeq.length){
           setTimeout( levelUp(), 1000);
        }
    }
    else{
        h3.innerText = `Game Over! Press any key to start again`;
        document.querySelector('body').style.backgroundColor = 'red';
        setTimeout(()=>{
            document.querySelector('body').style.backgroundColor = 'white';
        }, 850);
        reset();
    }
};

let bttns = document.querySelectorAll('.inner');
for(let bttn of bttns){
    bttn.addEventListener('click', bttnPress);
}

function reset(){
    level = 0;
    gameSeq = [];
    userSeq = [];
    started = false;
}

// Function to display high score
function displayHighScore() {
    let highScoreDisplay = document.querySelector('.highScore');
    highScoreDisplay.innerText = `High Score: ${highScore}`;
}

// Call the function to display high score
displayHighScore();
