let grabSound = new Audio('sounds/grabSound.wav')
let victorySound = new Audio('sounds/dumbVictory.wav')
let grabSoundPath = 'sounds/grabSound.wav'
let grabSound2 = new Audio('sounds/grabSound2.mp3')
let grabSoundPath2 = 'sounds/grabSound2.mp3'
let jumpSoundPath = "sounds/jumpSound.wav"
let runningSoundPath = 'sounds/running.wav'
let jumpSound = new Audio(jumpSoundPath)
let runningSound = new Audio(runningSoundPath)
let gameStartSound = new Audio('sounds/gameStartSound.mp3')
let audioContext;

function playGameStart() {
    gameStartSound.currentTime = 0
    gameStartSound.play()
}

function playGrab() {
    let randomPitch = getRandomPitch(0.2)
    playWithPitch(grabSoundPath2, randomPitch);
}

function playJump() {
    let randomPitch = getRandomPitch(0.2)
    playWithPitch(jumpSoundPath, randomPitch)
}

function playVictory() {
    victorySound.play()
}

function setAudioContext() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
}


// Step 2: Load the audio file
async function loadAudio(url) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    return await audioContext.decodeAudioData(arrayBuffer);
}

// Step 3: Play audio with a modified pitch
async function playWithPitch(url, pitch) {
    const audioBuffer = await loadAudio(url);
    
    // Create a source node
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;

    // Change the playback rate
    source.playbackRate.value = pitch;
    // Connect the source to the destination (speakers)
    source.connect(audioContext.destination);

    // Start playing the sound
    source.start();
}

// Usage: Provide a URL to an audio file and a pitch value
let pitchValue = 1.5; // 1.0 is normal pitch, 1.5 is higher, 0.5 is lower

function getRandomPitch(num) {
    return Math.random() * num + 1 - 0.1;
}

let isPlaying = false; // Tracks if the sound is currently playing

// Function to handle sound playback based on animation state
function handleSound() {
  if (currentAnimation === "run" && !isPlaying) {
    playSound()
  } else  if ((currentAnimation !== "run" && isPlaying) || gamePaused != -1) {
    stopSound()
  }
}

function playSound() {
    isPlaying = true;
    runningSound.currentTime = 0; // Restart the sound
    runningSound.loop = true; // Enable looping
    runningSound.play()
}

function stopSound() {
    runningSound.pause();
    runningSound.currentTime = 0; // Reset the sound
    isPlaying = false;
}
