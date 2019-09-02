const waves = document.querySelectorAll('.wave');
const scoreBoard = document.querySelector('.score');
const sharks = document.querySelectorAll('.shark');
let lastWave;
let timeUp = false;
let score = 0;

function randomTime(min,max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomWave(waves) {
    const index = Math.floor(Math.random() * waves.length);
    const wave = waves[index];
    if(wave === lastWave) {
        console.log('Sorry mate, that is the same one!')
        return randomWave(waves);

}

lastWave = wave;
return wave;
}

function peep() {
    const time = randomTime(1000, 4000);
    const wave = randomWave(waves);
    console.log(time, wave); // Checking I get a random wave and a random time assigned
    wave.classList.add('up');
    setTimeout(() => {
        wave.classList.remove('up'); // To get rid of the sharks after they have popped up.
        if (!timeUp) peep();
        peep();
    }, time);
}

function startGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => timeUp = true, 10000)
}

function pat(e) {
    console.log(e);
    if(!e.isTrusted) return;
    score++;
    this.parentNode.classList.remove('up');
    scoreBoard.textContent = score;
}

sharks.forEach(shark => shark.addEventListener('click', pat));