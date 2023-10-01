let canvas;
let world = 10;
let ctx;
const keyboard = new Keyboard();
let gameStarted = false;

function init() {
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);
}

function startGame() {
  setStartElements();
  setupMobileControls();
  gameStarted = true;
}


function goAhead() {
  setScreenOnPausEnd();
}

function showMute() {
  document.getElementById('audio').classList.add('d-none');
  document.getElementById('mute').classList.remove('d-none');
}

function showAudio() {
  document.getElementById('mute').classList.add('d-none');
  document.getElementById('audio').classList.remove('d-none');
}

function reload() {
  window.location.reload();
}

document.addEventListener('contextmenu', function (event) {
  event.preventDefault();
});

function showKeyboardDesc() {
  document.getElementById('descriptionKeyboard').classList.add('d-none');
  document.getElementById('descriptionKeyboardIcons').classList.remove('d-none');
  document.getElementById('descBackground').classList.remove('d-none');
  document.getElementById('play-btn').classList.add('d-none');
  if (gameStarted) {
    document.getElementById('start-img').classList.add('descMobileOnPlay')
    document.getElementById('mobileDescStart').classList.remove('fullOpacity')
    document.getElementById('throwButtonDiv').classList.add('d-none')
  }

}


function closeMobileDesc() {
  if (gameStarted) {
    setScreenOnPlay();

  } else if (!gameStarted) {
    setScreenOnPause();
  }
}

const closeMobileDescription = document.getElementById('closeMobileDesc');
closeMobileDescription.addEventListener('pointerdown', () => {
  closeMobileDesc()
});

const keyboardDesc = document.getElementById('descriptionKeyboard');
keyboardDesc.addEventListener('pointerdown', () => {
  hideDescriptionMobile();
  showKeyboardDesc();

});

function exitFull() {
  resetDefaultScreen();
}

function canvasFull() {
  setFullScreen();
}

let hideKeyboardDesc = document.getElementById('hideKeyboardDesc');
hideKeyboardDesc.addEventListener('pointerdown', () => {
  showDescOptions();
});



function setupMobileControls() {
  const moveRightMobile = document.getElementById('moveRightMobile');
  const moveLeftMobile = document.getElementById('moveLeftMobile');
  const jumpRightMobile = document.getElementById('jumpRightMobile');
  const jumpLeftMobile = document.getElementById('jumpLeftMobile');
  const throwBottleMobile = document.getElementById('throwButtonDiv');

  throwMobile(throwBottleMobile);
  jumpRightMob(jumpRightMobile);
  jumpLeftMob(jumpLeftMobile);
  moveRightMob(moveRightMobile);
  moveLeftMob(moveLeftMobile);
}

/**
 * commands for keyboard
 */

window.addEventListener('keydown', (e) => {
  if (e.keyCode === 39) {
    keyboard.RIGHT = true;
  }

  if (e.keyCode === 68) {
    keyboard.D = true;
  }

  if (e.keyCode === 37) {
    keyboard.LEFT = true;
  }

  if (e.keyCode === 40) {
    keyboard.DOWN = true;
  }

  if (e.keyCode === 38) {
    keyboard.UP = true;
  }

  if (e.keyCode === 32) {
    keyboard.SPACE = true;
  }
});

window.addEventListener('keyup', (e) => {
  if (e.keyCode === 39) {
    keyboard.RIGHT = false;
  }
  if (e.keyCode === 37) {
    keyboard.LEFT = false;
  }
  if (e.keyCode === 40) {
    keyboard.DOWN = false;
  }

  if (e.keyCode === 38) {
    keyboard.UP = false;
  }

  if (e.keyCode === 32) {
    keyboard.SPACE = false;
  }

  if (e.keyCode === 68) {
    keyboard.D = false;
  }
});


// commands for touchscreen

function throwMobile(throwBottleMobile) {
  throwBottleMobile.addEventListener('touchstart', () => {
    keyboard.D = true;
  });

  throwBottleMobile.addEventListener('touchend', () => {
    keyboard.D = false;
  });
}

function jumpRightMob(jumpRightMobile) {
  jumpRightMobile.addEventListener('touchend', () => {
    keyboard.RIGHT = false;
    keyboard.UP = false;
  });

  jumpRightMobile.addEventListener('touchstart', () => {
    keyboard.RIGHT = true;
    keyboard.UP = true;
  });
}

function moveLeftMob(moveLeftMobile) {
  moveLeftMobile.addEventListener('touchstart', () => {
    keyboard.LEFT = true;
  });


  moveLeftMobile.addEventListener('touchend', () => {
    keyboard.LEFT = false;
  });
}

function moveRightMob(moveRightMobile) {


  moveRightMobile.addEventListener('touchstart', () => {
    keyboard.RIGHT = true;
  });

  moveRightMobile.addEventListener('touchend', () => {
    keyboard.RIGHT = false;
  });
}

function jumpLeftMob(jumpLeftMobile) {


  jumpLeftMobile.addEventListener('touchstart', () => {
    keyboard.UP = true;
    setTimeout(() => {
      keyboard.LEFT = true;
    }, 200);
  });

  jumpLeftMobile.addEventListener('touchend', () => {
    setTimeout(() => {
      keyboard.LEFT = false;
    }, 200);
    keyboard.UP = false;
  });

}


function hideDescriptionMobile() {
  document.getElementById('descriptionMobile').classList.add('d-none');
};



function showDescMobile() {
  setScreenMobileDesc();

}

function setStartElements() {
  document.getElementById('start-img').classList.add('d-none');
  document.getElementById('canvas').classList.remove('d-none');
  document.getElementById('play-btn').classList.add('d-none');
  document.getElementById('max').classList.remove('d-none');
  document.getElementById('audio').classList.remove('d-none');
  document.getElementById('pause').classList.remove('d-none');
  document.getElementById('throwButtonDiv').classList.remove('d-none');
  document.getElementById('description').classList.add('d-none');
  document.getElementById('throwButtonDiv').classList.remove('d-none');
  document.getElementById('mobileDescStart').classList.add('fullOpacity');

}

function setScreenOnPausEnd() {
  document.getElementById('goAhead').classList.add('d-none');
  document.getElementById('pause').classList.remove('d-none');
  document.getElementById('description').classList.add('d-none');
  document.getElementById('mobileDescStart').classList.add('fullOpacity')
}

function showDescOptions() {
  if (gameStarted) {
    document.getElementById('play-btn').classList.add('d-none');
    document.getElementById('descriptionKeyboardIcons').classList.add('d-none');
    document.getElementById('descriptionKeyboard').classList.remove('d-none');
    document.getElementById('descriptionMobile').classList.remove('d-none');
    document.getElementById('descBackground').classList.add('d-none');



  } else if (!gameStarted) {
    document.getElementById('descriptionKeyboardIcons').classList.add('d-none');
    document.getElementById('descriptionKeyboard').classList.remove('d-none');
    document.getElementById('descriptionMobile').classList.remove('d-none');
    document.getElementById('descBackground').classList.add('d-none');
    document.getElementById('play-btn').classList.remove('d-none');

  }

}

function setScreenOnPlay() {
  document.getElementById('mobileDescStart').classList.add('d-none');
  document.getElementById('description').classList.remove('d-none');
  document.getElementById('play-btn').classList.add('d-none');
  document.getElementById('throwButtonDiv').classList.remove('d-none')
}

function setScreenOnPause() {
  document.getElementById('mobileDescStart').classList.add('d-none');
  document.getElementById('play-btn').classList.remove('d-none');
  document.getElementById('description').classList.remove('d-none');
}

function showMobileDescription() {
  document.getElementById('moveRightStartImg').classList.remove('fullOpacity');
  document.getElementById('moveLeftStartImg').classList.remove('fullOpacity');

}

function setScreenMobileDesc() {
  document.getElementById('mobileDescStart').classList.remove('d-none');
  document.getElementById('play-btn').classList.add('d-none');
  document.getElementById('description').classList.add('d-none');
  if (gameStarted) {
    document.getElementById('start-img').classList.add('descMobileOnPlay')
    document.getElementById('mobileDescStart').classList.remove('fullOpacity')
    document.getElementById('throwButtonDiv').classList.add('d-none')

  } else {
    document.getElementById('start-img').classList.remove('start-img')
  }
}


function resetDefaultScreen() {
  const canvas = document.getElementById('canvas');
  canvas.style.height = '480px';
  canvas.style.width = '720px';
  const max = document.getElementById('max');
  const min = document.getElementById('min');
  min.classList.add('d-none');
  max.classList.remove('d-none');
}

function setFullScreen() {
  const canvas = document.getElementById('canvas');
  canvas.style.height = '100vh';
  canvas.style.width = '100vw';
  const min = document.getElementById('min');
  min.classList.remove('d-none');
}



