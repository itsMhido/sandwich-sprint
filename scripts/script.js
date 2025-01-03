
// Create a block
function createBlock(id, x, y, color, isDynamic = true, isIngredient = false, ingredientType = "draggable-block") {
    const block = document.createElement('div');
    block.id = id;
    block.className = ingredientType;
    block.classList.add('draggable-block');
    block.style.left = `${x}px`;
    block.style.top = `${y}px`;
    block.style.backgroundColor = color;

    // Physics properties
    block.velocityX = 0;
    block.velocityY = 0;
    block.isGrounded = false; // Whether the block is on the ground
    block.isDynamic = isDynamic; // Whether the block interacts with physics
    block.ingredient = isIngredient; 
    block.ingredientType = ingredientType;

    document.body.appendChild(block);
    blocks.push(block);
}

function setPlayerPosition() {
    let position = getBlockInfo();
    let playerImage = document.getElementById("player");
    playerImage.style.left = `${position[0] - 25}px`;
    playerImage.style.top = `${position[2] -50}px`;
}

// Apply physics to all blocks
function applyPhysics() {
    if (keys.ArrowLeft || keys.ArrowRight || keys.ArrowUp) {
        moved = true;
    }
    const containerWidth = window.innerWidth;
    const containerHeight = window.innerHeight;

    // Iterate through blocks in reverse to safely remove them during iteration
    for (let i = blocks.length - 1; i >= 0; i--) {
        const block = blocks[i];
        const rect = block.getBoundingClientRect();

        // Apply gravity
        const blockGravity = block.ingredient ? ingredientGravity : gravity;
        block.velocityY += blockGravity;

        // Update position
        let nextX = block.offsetLeft + block.velocityX;
        let nextY = block.offsetTop + block.velocityY;

        // Collision with container edges
        if (nextX <= 0 || nextX + rect.width >= containerWidth) {
            block.velocityX = -block.velocityX * bounce;
            nextX = Math.max(0, Math.min(containerWidth - rect.width, nextX));
        }

        if (nextY + rect.height >= containerHeight) {
            if (block.ingredient) {
                dropped ++;
                let tempxLeft = rect.left
                let tempxRight = rect.right
                let tempyDown = rect.bottom
                let particleType = block.ingredientType
                let particleColor = colorMatcher[particleType]
                createTinyCubes((tempxLeft + tempxRight)/2,tempyDown, 5, 14, particleColor)
                // Remove ingredient blocks when they hit the ground
                block.remove(); // Remove from HTML
                blocks.splice(i, 1); // Remove from array
                continue; // Skip further updates for this block
            } else {
                block.velocityY = 0; // Stop falling
                block.isGrounded = true; // On the ground
                nextY = containerHeight - rect.height;
            }
        } else {
            block.isGrounded = false; // In the air
        }

        // Apply friction
        block.velocityX *= friction;

        // Handle keyboard input for block1
        if (block.id === 'block1') {
            if (keys.ArrowLeft) block.velocityX -= moveSpeed; // Accelerate left
            if (keys.ArrowRight) block.velocityX += moveSpeed; // Accelerate right
            if (keys.ArrowUp && block.isGrounded) {
                block.velocityY = jumpForce; // Jump upwards
                block.isGrounded = false; // No longer on the ground
            }
        }

        // Update position
        block.style.left = `${nextX}px`;
        block.style.top = `${nextY}px`;
        
        // Detect collisions
        blocks.forEach((otherBlock, j) => {
            if (block.isDynamic && i !== j) detectCollision(block, otherBlock);
        });
    }
    setPlayerPosition();
    animationManager();
}

// Detect and log collisions
function detectCollision(blockA, blockB) {
    const rectA = blockA.getBoundingClientRect();
    const rectB = blockB.getBoundingClientRect();

    if (
        rectA.left < rectB.right &&
        rectA.right > rectB.left &&
        rectA.top < rectB.bottom &&
        rectA.bottom > rectB.top
    ) {
        //console.log(`Collision detected between ${blockA.id} and ${blockB.id}`);
        if (blockA.id === 'block1' || blockB.id === 'block1') {
            const otherBlock = blockA.id === 'block1' ? blockB : blockA;
            const otherRect = otherBlock.getBoundingClientRect()
            const ingredient = document.createElement('div');
            ingredient.className = otherBlock.ingredientType; // Match CSS class (e.g., 'lettuce')
            burgerView.appendChild(ingredient);
            let tempxLeft = otherRect.left
            let tempxRight = otherRect.right
            let tempyUp = otherRect.top
            let tempyDown = otherRect.bottom
            let particleType = otherBlock.ingredientType
            let particleColor = colorMatcher[particleType]
            createTinyCubes((tempxLeft + tempxRight)/2,(tempyUp + tempyDown)/2, 5, 15, particleColor)

            //let blockWidth = removePx(otherBlock.style.right) - tempx
            //let blockHeight = removePx(otherBlock.style.bottom) - tempy
            
            stack.push(particleType)
            console.log(stack)
            if (otherBlock.ingredientType == "bun-top") {
                endGame2();
            }
            else {
                playGrab()
                otherBlock.remove();
                blocks.splice(blocks.indexOf(otherBlock), 1);
            }
            
        }
    }
}

function generateRandomBlock() {
    let rand;
    const randomX = Math.random() * (window.innerWidth - 50); // Random X position
    const blockId = `block${blocks.length + 1}`;

    rand = Math.floor(Math.random() * (ingredientList.length - 1));


    //let randomColor = `hsl(${Math.random() * 360}, 80%, 60%)`; // Random color
    blockType = ingredientList[rand][0];

    let color = ingredientList[rand][1];

    // Create a falling ingredient block
    createBlock(blockId, randomX, 0, color, true, true, blockType);
}

function createTinyCubes(x, y, strength, number, color = "random") {
    const cubes = [];
    const boundary = {
        width: window.innerWidth,
        height: window.innerHeight,
    };
    const gravity = 0.2; // Gravity constant

    // Helper function to generate random values in a range
    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    // Create cubes
    for (let i = 0; i < number; i++) {
        const cube = document.createElement('div');
        cube.className = 'tiny-cube';
        cube.style.position = 'absolute';
        cube.style.width = '10px';
        cube.style.height = '10px';

        // Set cube color (random if not specified)
        if (color === "random") {
            cube.style.backgroundColor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
        } else {
            cube.style.backgroundColor = color;
        }

        cube.style.left = `${x}px`;
        cube.style.top = `${y}px`;
        
        // Add cube to the document
        document.body.appendChild(cube);

        // Assign random velocity
        const angle = randomInRange(0, 2 * Math.PI); // Random direction
        const velocity = randomInRange(strength / 8, strength); // Random speed
        const vx = Math.cos(angle) * velocity; // X velocity
        const vy = Math.sin(angle) * velocity; // Y velocity

        // Add cube to the array with its properties
        cubes.push({ element: cube, x, y, vx, vy });
    }

    // Physics simulation
    function update() {
        for (let i = cubes.length - 1; i >= 0; i--) {
            const cube = cubes[i];

            // Apply gravity to vertical velocity
            cube.vy += ingredientGravity/4;

            // Update position
            cube.x += cube.vx;
            cube.y += cube.vy;

            // Update cube's CSS position
            cube.element.style.left = `${cube.x}px`;
            cube.element.style.top = `${cube.y}px`;

            // Remove cube if it leaves the boundaries
            if (
                cube.x < 0 ||
                cube.x > boundary.width ||
                cube.y > boundary.height
            ) {
                cube.element.remove();
                cubes.splice(i, 1); // Remove from array
            }
        }

        // Continue the simulation if cubes remain
        if (cubes.length > 0) {
            requestAnimationFrame(update);
        }
    }

    // Start the physics simulation
    update();
}

function removePx(value) {
    return parseFloat(value.replace("px", ""));
}

// Handle key press
document.addEventListener('keydown', (e) => {
    if (e.key in keys) keys[e.key] = true;
});

// Handle key release
document.addEventListener('keyup', (e) => {
    if (e.key in keys) keys[e.key] = false;
});

function equals(arr1, arr2) {
    return JSON.stringify(arr1) == JSON.stringify(arr2)
}

function getBlockInfo() {
    const block = blocks[0];
    const rect = block.getBoundingClientRect();
    let left = block.offsetLeft
    let top = block.offsetTop
    let bottom = rect.bottom
    let right = rect.right
    /*
    console.log("block left: " + left)
    console.log("block right: " + right)
    console.log("block top: " + top)
    console.log("block bottom: " + bottom)
    console.log("block speed x: " + block.velocityX)
    console.log("block speed y: " + block.velocityY)
    */
    return [left, right, top, bottom, block.velocityX, block.velocityY, block.isGrounded]
}

function showPlayer() {
    let playerDoc = document.getElementById('player')
    playerDoc.classList.remove('hidden')
}

function hidePlayer() {
    let playerDoc = document.getElementById('player')
    playerDoc.classList.add('hidden')
}