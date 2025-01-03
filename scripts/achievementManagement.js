
function addBlock(achievement) {
    let imgToUse = achievement.img;
    let title = achievement.title;
    let text = achievement.desc;
    let id = achievement.id;
    let unlocked = achievement.unlocked;
    
    // Create a new mini block
    const miniBlock = document.createElement('div');
    miniBlock.className = 'mini-block';
    miniBlock.id = id
  
    // Create the first small block (image container)
    const smallBlock1 = document.createElement('div');
    smallBlock1.className = 'small-block1';
  
    const img = document.createElement('img');
    img.src = imgToUse;
    if (!unlocked) {
        img.classList.add('grayscale');
    }
    smallBlock1.appendChild(img);
  
    // Create the second small block (text container)
    const smallBlock2 = document.createElement('div');
    smallBlock2.className = 'small-block2';
  
    const titleElement = document.createElement('h4');
    titleElement.textContent = title;
  
    const textElement = document.createElement('p');
    textElement.textContent = text;
  
    smallBlock2.appendChild(titleElement);
    smallBlock2.appendChild(textElement);
  
    // Append small blocks to the mini block
    miniBlock.appendChild(smallBlock1);
    miniBlock.appendChild(smallBlock2);
  
    // Append the mini block to the big block container
    bigBlock.appendChild(miniBlock);
}
  
function setAchievementName(achievement, name) {
    let id = achievement.id;
    const block = document.getElementById(id);
    const child = block.getElementsByTagName('h4')
    child[0].textContent = name;
    achievement.title = name;
} 
  
function setAchievementDesc(achievement, desc) {
    let id = achievement.id;
    const block = document.getElementById(id);
    const child = block.getElementsByTagName('p')
    child[0].textContent = desc;
    achievement.desc = desc
}
  
function setAchievementImage(achievement, img) {
    let id = achievement.id;
    const block = document.getElementById(id);
    const child = block.getElementsByTagName('img')
    child[0].src = img;
    achievement.img = img
}
  
function setAchievementUnlocked(achievement, bool) {
    let id = achievement.id;
    const block = document.getElementById(id);
    const child = block.getElementsByTagName('img')[0];
    if (bool) {
      child.classList.remove('grayscale')
    }
    else {
      child.classList.add('grayscale')
    }
    achievement.unlocked = bool
}

function checkAchievements() {
    checkBreadSandwichAch();
    checkEnoughBreadAch();
    checkLactoseAch();
    checkBalancedAch();
    checkSandwichlessAch();
    checkMeatAch()
    checkCheeseAch()
    checkAfkAch()
    checkWasteAch()
    checkTowerAch()
    checkSteaksAch()
    checkRedAch()
    checkGreenAch()
    checkKrabbyAch()
}

function addAchievement(achievement) {
    achievementList.push(achievement);
    addBlock(achievement)
}

function createAchievementNotif(achievement, text) {

    // Create the sliding block element
    const block = document.createElement('div');
    block.classList.add('sliding-block');

    // Create the image element
    const img = document.createElement('img');
    img.src = achievement.img;
    
    // Create the text container
    const textContainer = document.createElement('div');
    textContainer.classList.add('text');
    textContainer.innerText = text;

    // Append the image and text to the block
    block.appendChild(img);
    block.appendChild(textContainer);

    // Append the block to the sliding container
    const container = document.querySelector('.sliding-container');
    container.appendChild(block);

    // Show the block with the slide-in effect
    setTimeout(() => {
        block.classList.add('show');
    }, 10); // Ensure class is added after render

    // After a few seconds, hide the block with slide-out effect
    setTimeout(() => {
        block.classList.remove('show');
    }, 3000); // Block slides out after 5 seconds

    // Remove the block from the DOM after it has slid out
    setTimeout(() => {
        block.remove();
    }, 4000); // Wait for the block to slide out completely before removing it
}

