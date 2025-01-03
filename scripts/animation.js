const idleAnimation = ["sprites/idle-0.png","sprites/idle-1.png","sprites/idle-2.png","sprites/idle-3.png"]
const runAnimation = ["sprites/run0.png","sprites/run1.png","sprites/run2.png","sprites/run3.png","sprites/run4.png","sprites/run5.png"]
const jumpAnimation = "sprites/jump0.png"
const fallAnimation = ["sprites/fall0.png", "sprites/fall1.png"]
const danceAnimation = ["sprites/dance (1).png","sprites/dance (2).png","sprites/dance (3).png", "sprites/dance (4).png","sprites/dance (5).png", "sprites/dance (6).png", "sprites/dance (7).png","sprites/dance (8).png","sprites/dance (9).png","sprites/dance (10).png","sprites/dance (11).png","sprites/dance (12).png"]
let currentAnimation = 'idle'

function animationManager() {
    let playerDoc = document.getElementById('player')
    let newAnimation = currentAnimation;
    if (keys.ArrowLeft) {
        playerDoc.classList.add('mirrored')
    }
    if (keys.ArrowRight) {
        playerDoc.classList.remove('mirrored')
    }
    let blockInfo = getBlockInfo();
    if (Math.abs(blockInfo[4]) > 2 || keys.ArrowLeft || keys.ArrowRight) {
        newAnimation = 'run'
    }
    else {
        newAnimation = 'idle'
    }
    if (! blockInfo[6]) {
        if (blockInfo[5] > 0) {
            newAnimation = 'fall'
        }
        else {
            newAnimation = 'jump'
        }
    }
    //console.log(blockInfo[6], Math.abs(blockInfo[4]) > 2 || keys.ArrowLeft || keys.ArrowRight, newAnimation)
    if (currentAnimation != newAnimation) {
        if (newAnimation == 'run') {
            playIdleAnimation('stop');
            playFallAnimation('stop')

            playRunAnimation('start');
        }
        else if (newAnimation == 'idle') {
            playRunAnimation('stop');
            playFallAnimation('stop')

            playIdleAnimation('start');
        }
        else if (newAnimation == 'jump') {
            playJump()
            playIdleAnimation('stop');
            playRunAnimation('stop');
            playFallAnimation('stop')

            playJumpAnimation()
        }
        else if (newAnimation == 'fall') {
            playIdleAnimation('stop');
            playRunAnimation('stop');

            playFallAnimation('start')
        }
    }
    currentAnimation = newAnimation;
}


function playDanceAnimation(mode) {
    let playerDoc = document.getElementById('player')
    let child = playerDoc.getElementsByTagName('img')
    let plrImg = child[0];
    if (mode == 'start') {
        //console.log('created new Dance interval')
        let i = 0
        plrImg.src = danceAnimation[i];
        danceAnimInterval = setInterval(() => {
            i = (i + 1) % danceAnimation.length;
            plrImg.src = danceAnimation[i];
            //console.log('animation has been swapped to:' + i)
        } ,75)
    }
    else if (mode == 'stop') {
        if (idleAnimInterval) {clearInterval(danceAnimInterval);
            //console.log("stopped dance interval")
        }
    }
}

function playIdleAnimation(mode) {
    let playerDoc = document.getElementById('player')
    let child = playerDoc.getElementsByTagName('img')
    let plrImg = child[0];
    if (mode == 'start') {
        //console.log('created new Idle interval')
        let i = 0
        plrImg.src = idleAnimation[i];
        idleAnimInterval = setInterval(() => {
            i = (i + 1) % idleAnimation.length;
            plrImg.src = idleAnimation[i];
            //console.log('animation has been swapped to:' + i)
        } ,200)
    }
    else if (mode == 'stop') {
        if (idleAnimInterval) {clearInterval(idleAnimInterval);
            //console.log("stopped idle interval")
        }
    }
}

function playFallAnimation(mode) {
    let playerDoc = document.getElementById('player')
    let child = playerDoc.getElementsByTagName('img')
    let plrImg = child[0];
    if (mode == 'start') {
        //console.log('created new fall interval')
        let i = 0
        plrImg.src = fallAnimation[i];
        fallAnimInterval = setInterval(() => {
            i = (i + 1) % fallAnimation.length;
            plrImg.src = fallAnimation[i];
            //console.log('animation has been swapped to:' + i)
        } ,200)
    }
    else if (mode == 'stop') {
        if (fallAnimInterval) {clearInterval(fallAnimInterval);
            //console.log("stopped fall interval")
        }
    }
}

function playRunAnimation(mode) {
    let playerDoc = document.getElementById('player')
    let child = playerDoc.getElementsByTagName('img')
    let plrImg = child[0];
    if (mode == 'start') {
        //console.log('created new run interval')
        let i = 0
        plrImg.src = runAnimation[i];
        runAnimInterval = setInterval(() => {
            i = (i + 1) % runAnimation.length;
            plrImg.src = runAnimation[i];
            //console.log('animation has been swapped to:' + i)
        } ,50)
    }
    else if (mode == 'stop') {
        if (runAnimInterval) {clearInterval(runAnimInterval);
            //console.log("stopped run interval")
        }
    }
}

function playJumpAnimation() {
    let playerDoc = document.getElementById('player')
    let child = playerDoc.getElementsByTagName('img')
    let plrImg = child[0];
    plrImg.src = jumpAnimation
}

hidePlayer()
playIdleAnimation('start');
playIdleAnimation('stop');
playRunAnimation('start');
playRunAnimation('stop');
playFallAnimation('start');
playFallAnimation('stop');
playDanceAnimation('start');
playDanceAnimation('stop');

setInterval(() => {
    if (gamePaused == -1) {
        handleSound()
    } else {
        stopSound()
    }
  }, 100); // Check every 100ms