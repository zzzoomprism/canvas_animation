import { BOUNDARY_SIZE } from './../constants';

export const boundary = ctx => {
  const centerWidth = window.innerWidth / 2;
  const centerHeight = window.innerHeight / 2;
  ctx.strokeStyle = '#3891A6';
  ctx.lineWidth = 4;
  ctx.strokeRect(
    centerWidth - BOUNDARY_SIZE.WIDTH / 2,
    centerHeight - BOUNDARY_SIZE.HEIGHT / 2,
    BOUNDARY_SIZE.WIDTH,
    BOUNDARY_SIZE.HEIGHT
  );
};
