
function cancelGame() {
    endGame2withoutTheInterval()
    stopPhysics()
    removePlayerBlock()
    playIdleAnimation('stop');
    playRunAnimation('stop');
    playFallAnimation('stop');
    currentAnimation = 'dance'
}

function endGame2() {

    checkAchievements()
    gameStarted = false
    stopBlockSpawn()
    removeBlocks();
    endGameInterval = setInterval( () => {
        let info = getBlockInfo();
        if (info[6]) {
            endGame()
            playVictory()
            clearInterval(endGameInterval)
        }
    })
}

function endGame2withoutTheInterval() {

    checkAchievements()
    gameStarted = false
    stopBlockSpawn()
    removeBlocks();
}

function endGame() {
    gameStarted = false
    stopBlockSpawn()
    stopPhysics();
    removePlayerBlock()
    removeBlocks();
    //checkAchievements()
    playIdleAnimation('stop');
    playRunAnimation('stop');
    playFallAnimation('stop');
    if (currentAnimation != 'dance') {
        playDanceAnimation('start');
    }
    currentAnimation = 'dance'
}

function startGame() {
    burgerDisplay.classList.remove('hidden')
    countdown.classList.add('hidden')
    gamePaused = -1
    endGame()
    setAudioContext()
    playDanceAnimation('stop')
    currentAnimation = 'idle'
    gameStarted = true
    burgerView.innerHTML = "<div class='bun-bottom'></div>"; 
    stack = ["bun-bottom"]
    dropped = 0
    moved = false
    startBlockSpawn(); 
    createBlock('block1', 100, 100, '#1c783800', true, false); //player
    startPhysics(); 
    playIdleAnimation('start');
    showPlayer()
}

function removePlayerBlock() {
    if (blocks.length > 0) {
        blocks[0].remove()
        blocks.splice(0,1)
    }
}

function removeBlocks() {
    while (blocks.length > 1) {
        let currentBlock = blocks[1];
        currentBlock.remove();
        blocks.splice(1, 1);
    }
}

function stopPhysics () {
    clearInterval(physicsInterval);
}

function startPhysics () {
    physicsInterval = setInterval(applyPhysics, 16);
}

function startBlockSpawn () {
    blockSpawnInterval = setInterval(generateRandomBlock, 700);
}

function stopBlockSpawn () {
    clearInterval(blockSpawnInterval);
}

function pauseGame () {
    stopPhysics();
    stopBlockSpawn();
}

let intervalId;

function unPauseGame(time = 0) {

    countdown.classList.remove('hidden')
    let n = parseInt(time/1000);
    let counter = 0;
    countdown.textContent = `${n}`;
    intervalId = setInterval(() => {
            counter++;
            countdown.textContent = `${n - counter}`;
    if (counter === n - 1) {
        clearInterval(intervalId); 
        const unpause = setTimeout(() => {
                if (gamePaused == 0) {
                    startPhysics();
                    startBlockSpawn(); 
                    gamePaused = -1
                    countdown.classList.add('hidden')
                }
        }, 1000); 
        }
    }, 1000); 
}

setInterval( () => {
    console.log(gamePaused)
} ,100)

function pauseManager(time = 0) {
    if (gameStarted) {
        if (gamePaused == 1) {
            console.log("game is getting unpaused")
            gamePaused = 0
            unPauseGame(time)
            
        }
        else if (gamePaused == 0){
            console.log("game unpausing has been interrupted")
            clearInterval(intervalId)
            gamePaused = 1
        }
        else if (gamePaused == -1) {
            gamePaused = 1
            pauseGame()
            console.log("game has been paused")
        }
    }
}

function gameManager() {
    currentWindow = "game"
    playGameStart()
    if (gameStarted) {
        endGame()
        startGame()
    }
    else {
        startGame()
    }
}
