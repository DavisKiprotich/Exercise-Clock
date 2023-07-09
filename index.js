let breakSessionLength = 5 * 60;
let sessionLength = 25 * 60;
let TWENTYFIVE_MINUTES = 25 * 60;
let FIVE_MINUTES = 5 * 60;
let isSessionMode = true;
let sessionTimer ;
let breakTimer;


const breakMinus = document.getElementById("break-minus");
const breakSessionElement = document.getElementById("break-session");
const breakPlus = document.getElementById("break-plus");
const sessionMinus = document.getElementById("session-minus");
const sessionElement = document.getElementById("session-element");
const sessionPlus = document.getElementById("session-plus");
const timerMinutes = document.getElementById('timer-minutes');
const timerSeconds = document.getElementById('timer-seconds');
const playButton = document.getElementById('play-button');
const pauseButton = document.getElementById('pause-button');
const resetButton = document.getElementById('reset-button');
const title = document.getElementById('title');



let reset = () =>{
    isSessionMode = true;
    breakSessionLength = FIVE_MINUTES;
    sessionLength = TWENTYFIVE_MINUTES;
    breakSessionElement.textContent = FIVE_MINUTES / 60;
    sessionElement.textContent = TWENTYFIVE_MINUTES / 60;
    clearInterval(sessionTimer);
    timerMinutes.textContent = "25";
    timerSeconds.textContent = "00";
}

const startBreak = () =>{
    clearInterval(sessionTimer)
    isSessionMode = false;
    title.textContent = "Break";

    breakTimer = setInterval(() => {
        breakSessionLength -= 1
        updateUITimer(breakSessionLength);
        
        if(breakSessionLength === 0){
            sessionLength = parseInt(sessionElement.textContent, 10) * 60;
            updateUITimer(sessionLength);
            startSession()
        }
    }, 1000)

}

const startSession = () => {
    clearInterval(breakTimer)
    isSessionMode = true;
    title.textContent = "Session";

    sessionTimer = setInterval(() =>{
        sessionLength -= 1;
        updateUITimer(sessionLength);

        if(sessionLength === 0){
            breakSessionLength = parseInt(breakSessionElement.textContent, 10) * 60;
            updateUITimer(breakSessionLength);
            startBreak()
        }
    }, 1000)
}

let updateUITimer = length =>{
    if(Math.floor(length / 60).toString().length === 1){
        timerMinutes.textContent ="0" + Math.floor(length / 60)
    }else{
        timerMinutes.textContent = Math.floor(length / 60)
    }
    if((length % 60).toString().length === 1){
        timerSeconds.textContent ="0" + (length % 60)
    }else{
        timerSeconds.textContent = length % 60
    }
}

playButton.addEventListener("click", () => {
    if(isSessionMode){
        startSession()
    }else{
        startBreak()
    }
});

pauseButton.addEventListener("click", () => {
    if(isSessionMode){
        clearInterval(sessionTimer)
    }
})

resetButton.addEventListener('click', ()=>{
    reset()
})

breakMinus.addEventListener("click", ()=>{
    if(breakSessionLength - 60 === 0){
        return;
    }
    breakSessionLength -= 60;
    breakSessionElement.textContent = breakSessionLength / 60;
})

breakPlus.addEventListener("click", ()=>{
    breakSessionLength += 60;
    breakSessionElement.textContent = breakSessionLength / 60;
})
sessionMinus.addEventListener("click", ()=>{
    if(sessionLength - 60 === 0){
        return;
    }
    sessionLength -= 60;
    sessionElement.textContent = sessionLength / 60;
    if(isSessionMode){
        timerMinutes.textContent = sessionLength / 60;
    }
})

sessionPlus.addEventListener("click", ()=>{
    sessionLength += 60;
    sessionElement.textContent = sessionLength / 60;
    if(isSessionMode){
        timerMinutes.textContent = sessionLength / 60;
    }
})
