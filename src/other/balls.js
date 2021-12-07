import { BOUNDARY_SIZE } from '../constants';

const BALLS_COUNT = 15;
const BALLS_RADIUS = 10;
const BALLS_PADDING = 20;
const LEFT_MARGIN = 100;

const BEGIN_X_PART = (window.innerWidth - BOUNDARY_SIZE.WIDTH) / 2 + LEFT_MARGIN;
let BOUNDARY_X_POSITIONS = [];

const EMPTY_VALUES = [undefined, null, ''];

let ballsConfig = indexArray => {
  const ballsArray = [];
  for (let i = 0; i < BALLS_COUNT; i++) {
    if (!EMPTY_VALUES.includes(indexArray) && indexArray.includes(i)) {
      ballsArray.push({
        position: BEGIN_X_PART + (BALLS_RADIUS * 2 + BALLS_PADDING) * i,
        isVisible: false
      });
    } else {
      ballsArray.push({
        position: BEGIN_X_PART + (BALLS_RADIUS * 2 + BALLS_PADDING) * i,
        isVisible: true
      });
    }
  }
  return ballsArray;
};

export const balls = (ctx, collisionParam) => {
  ctx.fillStyle = '#49B6FF';

  BOUNDARY_X_POSITIONS = [];

  let b;
  if (collisionParam) {
    b = ballsConfig(collisionParam);
  } else {
    b = ballsConfig();
  }
  b.forEach(el => {
    BOUNDARY_X_POSITIONS.push([el.position, el.position + BALLS_RADIUS * 2]);
    if (el.isVisible) {
      ctx.beginPath();
      ctx.arc(el.position, window.innerHeight / 2, BALLS_RADIUS, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fill();
    }
  });
};

const isBetween = (number, arrayPair) => {
  if (number >= arrayPair[0] && number <= arrayPair[1]) return true;
  return false;
};

let result = [];
export const collision = pacmanPosition => {
  BOUNDARY_X_POSITIONS.forEach((el, index) => {
    if (isBetween(pacmanPosition, el) && !result.includes(index)) {
      result.push(index);
      return;
    }
  });
  return result;
};

export const ballsClearData = () => {
  BOUNDARY_X_POSITIONS = [];
  result = [];
};
