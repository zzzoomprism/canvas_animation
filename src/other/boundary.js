import { BOUNDARY_SIZE, CANVAS } from './../constants';

export const boundary = ctx => {
  const centerWidth = CANVAS.WIDTH / 2;
  const centerHeight = CANVAS.HEIGHT / 2;
  ctx.strokeStyle = '#3891A6';
  ctx.lineWidth = 4;
  ctx.strokeRect(
    centerWidth - BOUNDARY_SIZE.WIDTH / 2,
    centerHeight - BOUNDARY_SIZE.HEIGHT / 2,
    BOUNDARY_SIZE.WIDTH,
    BOUNDARY_SIZE.HEIGHT
  );
};
