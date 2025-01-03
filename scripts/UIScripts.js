function openMainMenu() {
  menu.classList.remove('open'); // Close the menu
  toggleBtn.classList.remove('menu-open'); // Update the toggle button state
  arrow.textContent = '→'; // Reset the arrow
}

function closeMainMenu() {
   // document.getElementById('start-menu').classList.add('hidden');
    //startGame()
    menu.classList.remove('open'); // Close the menu
    toggleBtn.classList.remove('menu-open'); // Update the toggle button state
    arrow.textContent = '→'; // Reset the arrow
  
}

function closeGameMenu() {
  burgerDisplay.classList.add("hidden")
  endGame()
}

function closeAchievementsMenu() {
  bigBlock.classList.add("hidden")
}

 toggleBtn.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('open');
      arrow.textContent = isOpen ? '←' : '→';
 })

const startButton = document.querySelector('#start');
const achievementsButton = document.querySelector('#catalog');

startButton.addEventListener('click', function() {
  closeMainMenu()
  currentWindow = "game";
  burgerDisplay.classList.remove("hidden")
  closeAchievementsMenu()
});
achievementsButton.addEventListener('click', function() {
  burgerDisplay.classList.add('hidden')
  countdown.classList.add('hidden')
  cancelGame()
  closeMainMenu()
  currentWindow = "catalog";
  bigBlock.classList.remove("hidden")
  hidePlayer()
});


document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && cooldown == 0) {
      
      //cooldown = maxCooldown;
      //wait(setCooldown, maxCooldown)
      const isOpen = menu.classList.contains('open');
      if (isOpen) {
        menu.classList.remove('open'); // Close the menu
        toggleBtn.classList.remove('menu-open'); // Update the toggle button state
        arrow.textContent = '→'; // Reset the arrow
        pauseManager(3000)
      }
      else {
        menu.classList.add('open'); // Close the menu
        toggleBtn.classList.add('menu-open'); // Update the toggle button state
        arrow.textContent = '←'; // Reset the arrow
        pauseManager(3000)
      }
    }
});

function setSceneToAchievements() {

}

function setCooldown() {
  cooldown = 0
}

function wait(func, time) {
  setTimeout(func, time);
}

let colorPaletteBlack = ["rgb(20, 20, 20)", "rgb(25, 25, 25)", "rgb(30, 30, 30)", "rgb(37, 37, 37)", "#555", "#777", "rgb(203, 203, 203)", "rgb(150, 150, 150)", "#d8d8d8", "#a5a4a4"]
let colorPaletteTest = ["rgb(20, 20, 20)", "rgb(20, 20, 20)", "rgb(20, 20, 20)", "rgb(20, 20, 20)", "rgb(20, 20, 20)", "rgb(20, 20, 20)", "rgb(20, 20, 20)", "rgb(20, 20, 20)", "rgb(20, 20, 20)", "rgb(20, 20, 20)"]
let colorPaletteWhite = ['rgb(242, 242, 242)','rgb(235, 235, 235)', 'rgb(227, 227, 227)' ,"rgb(220, 220, 220)", "rgb(210, 210, 210)","rgb(200, 200, 200)", "rgb(25, 25, 25)", "rgb(20, 20, 20)", "rgb(25, 25, 25)", "rgb(20, 20, 20)"]
let cssVariables = ["--color0", "--color1", "--color2", "--color3", "--color4", "--color5", "--fontColor1", "--fontColor2", "--fontColor3", "--fontColor4"]
let colorPaletteList = [colorPaletteBlack, colorPaletteWhite]

const root = document.documentElement;

function changeColorPalette(colorPalette) {
  for (i = 0; i < colorPalette.length; i++) {
    root.style.setProperty(cssVariables[i], colorPalette[i]);
  }
}

changeColorPalette(colorPaletteBlack)

function switchTheme() {
  currentThemeNumber = (currentThemeNumber + 1) % colorPaletteList.length
  changeColorPalette(colorPaletteList[currentThemeNumber])
}