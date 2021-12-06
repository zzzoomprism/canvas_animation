import { Pacman } from './characters/pacman';
import { POSITION } from './constants';
import { boundary } from './other/boundary';

let clickCount = 0;
const canvas = document.getElementById('root');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
const pacman = new Pacman();

const animate = () => {
  canvas.addEventListener(
    'mousedown',
    e => {
      clickCount++;
      pacman.drawRef = window.requestAnimationFrame(() => pacman.draw(ctx, POSITION.RIGHT));
    },
    false
  );
  canvas.addEventListener('mouseout', e => {
    window.cancelAnimationFrame(pacman.drawRef);
  });
};

boundary(ctx);
animate();
