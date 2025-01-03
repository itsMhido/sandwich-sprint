let blocks = []; // Store all blocks
const gravity = 0.6; // Default gravity strength 0.6
const ingredientGravity = 0.2; // Gravity for ingredient blocks
const friction = 0.9; // Friction for slowing down 0.9
const bounce = 0.7; // Bounce effect 0.7
const moveSpeed = 2; // Horizontal acceleration 2
const jumpForce = -15; // Force of the jump 15
let stack = ["bun-bottom"];
let dropped = 0
let moved = false
const ingredientList = [["cheese", "#edd72d"], ["lettuce", "#8ad43f"], ["tomato", "#c22f33"], ["patty", "#4f2e1c"], ["bun-middle", "#e3a32d" ],["onion", "#d28bee"],["bun-top", "#e3a32d"] ,["bun-bottom", "#e3a32d"]];  
const colorMatcher = {"cheese":  "#edd72d", "lettuce": "#8ad43f", "tomato": "#c22f33", "patty": "#4f2e1c","bun-top": "#e3a32d", "bun-middle": "#e3a32d"  ,"bun-bottom": "#e3a32d", "onion": "#d28bee"}
let physicsInterval;
let blockSpawnInterval;
const burgerView = document.getElementById('burgerView');
const bigBlock = document.getElementById('big-block');
const burgerDisplay = document.getElementById('burger-display')
const countdown = document.getElementById('counter');
const menu = document.getElementById('menu');
const toggleBtn = document.getElementById('toggleBtn');
const arrow = toggleBtn.querySelector('span');
let gamePaused = -1
let gameStarted = false
let cooldown = 0;
let maxCooldown = 1000;
let currentThemeNumber = 0;

let currentWindow = "game" // game, catalog, achievements
let imgPath = "images/block.jpg"


const keys = {
    ArrowLeft: false,
    ArrowRight: false,
    ArrowUp: false,
};

