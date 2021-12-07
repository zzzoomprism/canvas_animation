import { Pacman } from './characters/pacman';
import { POSITION } from './constants';
import { ballsClearData } from './other/balls';
import { boundary } from './other/boundary';

const canvas = document.getElementById('root');
let isPressed = false;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
const pacman = new Pacman();

var lastDownTarget;
window.onload = function () {
  document.addEventListener(
    'mousedown',
    function (event) {
      lastDownTarget = event.target;
    },
    false
  );
  pacman.init(ctx, POSITION.RIGHT);

  document.addEventListener(
    'keydown',
    e => {
      if (lastDownTarget == canvas && !isPressed) {
        switch (e.code) {
          case 'ArrowRight':
            pacman.drawRef = window.requestAnimationFrame(() => pacman.draw(ctx, POSITION.RIGHT));
            break;
          case 'ArrowLeft':
            pacman.drawRef = window.requestAnimationFrame(() => pacman.draw(ctx, POSITION.LEFT));
            ballsClearData();
            break;
        }

        isPressed = true;
      }
    },
    false
  );
  document.addEventListener(
    'keyup',
    () => {
      if (lastDownTarget == canvas) {
        isPressed = false;
        cancelAnimationFrame(pacman.drawRef);
      }
    },
    false
  );
};

boundary(ctx);
