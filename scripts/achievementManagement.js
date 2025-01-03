
function addBlock(achievement) {
    let imgToUse = achievement.img;
    let title = achievement.title;
    let text = achievement.desc;
    let id = achievement.id;
    let unlocked = achievement.unlocked;
    
    const miniBlock = document.createElement('div');
    miniBlock.className = 'mini-block';
    miniBlock.id = id
  
    const smallBlock1 = document.createElement('div');
    smallBlock1.className = 'small-block1';
  
    const img = document.createElement('img');
    img.src = imgToUse;
    if (!unlocked) {
        img.classList.add('grayscale');
    }
    smallBlock1.appendChild(img);
  
    const smallBlock2 = document.createElement('div');
    smallBlock2.className = 'small-block2';
  
    const titleElement = document.createElement('h4');
    titleElement.textContent = title;
  
    const textElement = document.createElement('p');
    textElement.textContent = text;
  
    smallBlock2.appendChild(titleElement);
    smallBlock2.appendChild(textElement);
  
    miniBlock.appendChild(smallBlock1);
    miniBlock.appendChild(smallBlock2);
  
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

    const block = document.createElement('div');
    block.classList.add('sliding-block');

    const img = document.createElement('img');
    img.src = achievement.img;
    
    const textContainer = document.createElement('div');
    textContainer.classList.add('text');
    textContainer.innerText = text;

    block.appendChild(img);
    block.appendChild(textContainer);

    const container = document.querySelector('.sliding-container');
    container.appendChild(block);

    setTimeout(() => {
        block.classList.add('show');
    }, 10);

    setTimeout(() => {
        block.classList.remove('show');
    }, 3000);

    setTimeout(() => {
        block.remove();
    }, 4000);
}

