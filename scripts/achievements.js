let achievementList = []
class achievement {
    constructor(img, title, text, id, unlocked) {
        this.img = img
        this.title = title
        this.desc = text
        this.id = id
        this.unlocked = unlocked
    }
}

let breadSandwichAch = new achievement("images/breadSandwich.png", "Bread Sandwich", "make the bread sandwich", "breadSandwich", false);
let enoughBreadAch = new achievement("images/thatsEnoughBread.png", "THAT'S ENOUGH BREAD", "have 10 or more bread slices in your burger", "enoughBread", false);
let lactoseAch = new achievement("images/lactoseIntollerant.png", "Lactose Intolerance", "have no cheese in your burger", "Lactose", false);
let balancedAch = new achievement("images/balancedBurger.png", "Perfectly Balanced", "have exactly 1 of each ingredient", "balanced", false);
let sandwichlessAch = new achievement("images/sandwichlessSandwich.png", "Sandwichless Sandwich", "did you forget my order?", "sandwichless", false);
let meatYouAch = new achievement("images/niceToMeatYou.png", "Nice To Meat You", "have only meat in your burger", "meat", false);
let cheeseAch = new achievement("images/grilledCheese.png", "Grilled Cheese", "have only cheese in your burger", "cheese", false);
let wasteAch = new achievement("images/whatAWaste.png", "What A Waste", "drop at least 32 ingredients in 1 game", "waste", false);
let towerAch = new achievement("images/burgerTower.png", "Burger Tower", "make a burger that's 64 ingredients long", "tower", false);
let afkAch = new achievement("images/yuDidntEvenMove.png", "U Still There?", "complete a burger without moving at all", "afk", false);
let steaksAch = new achievement("images/highSteaks.png", 'The Steaks Are Very High', 'make a burger with 10 patties in a row', 'steaks', false)
let redAch = new achievement("images/red.png", 'Red', 'red', 'red', false)
let krabbyAch = new achievement("images/krabby.png", 'I Dont Have The Copyright For This', 'make the krabby patty', "krabby", false)
let greenAch = new achievement("images/green.png", 'Green', '"your elemental power is........ greeen"', 'green', false)

addAchievement(breadSandwichAch);
addAchievement(enoughBreadAch);
addAchievement(lactoseAch);
addAchievement(balancedAch);
addAchievement(sandwichlessAch);
addAchievement(meatYouAch);
addAchievement(cheeseAch);
addAchievement(wasteAch);
addAchievement(towerAch);
addAchievement(afkAch);
addAchievement(steaksAch);
addAchievement(redAch);
addAchievement(krabbyAch);
addAchievement(greenAch);

function checkKrabbyAch() {
    if (krabbyAch.unlocked == false) {
        if (JSON.stringify(stack) == JSON.stringify(['bun-bottom', 'patty', 'lettuce', 'cheese', 'onion', 'tomato','bun-top'])) {
            setAchievementUnlocked(krabbyAch, true)
            createAchievementNotif(krabbyAch, 'achievement unlocked :D')
        }
    }
}

function checkGreenAch() {
    if (greenAch.unlocked == false) {
        let a = 0;
        for (i = 1; i < stack.length - 1; i++) {
            if (stack[i] == 'lettuce') {
                a++;
            }
        }
        if (a == stack.length - 2 && stack.length > 2) {
            setAchievementUnlocked(greenAch, true)
            createAchievementNotif(greenAch, 'achievement unlocked :D')
        }
    }
}

function checkRedAch() {
    if (redAch.unlocked == false) {
        let a = 0;
        for (i = 1; i < stack.length - 1; i++) {
            if (stack[i] == 'tomato') {
                a++;
            }
        }
        if (a == stack.length - 2 && stack.length > 2) {
            setAchievementUnlocked(redAch, true)
            createAchievementNotif(redAch, 'achievement unlocked :D')
        }
    }
}

function checkSteaksAch() {
    if (steaksAch.unlocked == false) {
        let a = 0;
        for (i = 1; i < stack.length - 1; i++) {
            if (stack[i] == 'patty') {
                a++;
                if (a == 10) {
                    setAchievementUnlocked(steaksAch, true)
                    createAchievementNotif(steaksAch, 'achievement unlocked :D')
                    break;
                }
            }
            else {a = 0}
        }
    }
}

function checkAfkAch() {
    if (afkAch.unlocked == false) {
        if (moved == false && stack[stack.length - 1] == 'bun-top') {
            setAchievementUnlocked(afkAch, true)
            createAchievementNotif(afkAch, 'achievement unlocked :D')
        }
    }
}

function checkTowerAch() {
    if (towerAch.unlocked == false) {
        if (stack.length > 63) {
            setAchievementUnlocked(towerAch, true)
            createAchievementNotif(towerAch, 'achievement unlocked :D')
        }
    }
}

function checkWasteAch() {
    if (wasteAch.unlocked == false) {
        if (dropped > 31) {
            setAchievementUnlocked(wasteAch, true)
            createAchievementNotif(wasteAch, 'achievement unlocked :D')
        }
    }
}

function checkCheeseAch() {
    if (cheeseAch.unlocked == false) {
        let a = 0;
        for (i = 1; i < stack.length - 1; i++) {
            if (stack[i] == 'cheese') {
                a++;
            }
        }
        if (a == stack.length - 2 && stack.length > 2) {
            setAchievementUnlocked(cheeseAch, true)
            createAchievementNotif(cheeseAch, 'achievement unlocked :D')
        }
    }
}

function checkMeatAch() {
    if (meatYouAch.unlocked == false) {
        let a = 0;
        for (i = 1; i < stack.length - 1; i++) {
            if (stack[i] == 'patty') {
                a++;
            }
        }
        if (a == stack.length - 2 && stack.length > 2) {
            setAchievementUnlocked(meatYouAch, true)
            createAchievementNotif(meatYouAch, 'achievement unlocked :D')
        }
    }
}

function checkBalancedAch() {
    if (balancedAch.unlocked == false) {
        if (equals([...new Set(stack)], stack) && stack.length == ingredientList.length) {
            setAchievementUnlocked(balancedAch, true)
            createAchievementNotif(balancedAch, 'achievement unlocked :D')
        }
    }
}

function checkSandwichlessAch() {
    if (sandwichlessAch.unlocked == false) {
        if (equals(stack, ['bun-bottom', 'bun-top'])) {
            setAchievementUnlocked(sandwichlessAch, true)
            createAchievementNotif(sandwichlessAch, 'achievement unlocked :D')
        }
    }
}

function checkLactoseAch() {
    if (lactoseAch.unlocked == false) {
        let a = 0;
        for (i = 0; i < stack.length; i++) {
            if (stack[i] == 'cheese') {
                a = 1
            }
        }
        if (a == 0 && stack[stack.length - 1] == 'bun-top') {
            setAchievementUnlocked(lactoseAch, true)
            createAchievementNotif(lactoseAch, 'achievement unlocked :D')
        }
    }
}

function checkBreadSandwichAch(){
    if (breadSandwichAch.unlocked == false) {
        if (JSON.stringify(stack) == JSON.stringify(['bun-bottom', 'bun-middle', 'bun-top'])) {
            setAchievementUnlocked(breadSandwichAch, true)
            createAchievementNotif(breadSandwichAch, 'achievement unlocked :D')
        }
    }
}

function checkEnoughBreadAch() {
    if (enoughBreadAch.unlocked == false){
        let a = 0
        for (i = 0; i < stack.length; i++) {
            if (stack[i] == 'bun-middle') {
                a++;
            }
        }
        if (a > 7) {
            setAchievementUnlocked(enoughBreadAch, true)
            createAchievementNotif(enoughBreadAch, 'achievement unlocked :D')
        }
    }
}

