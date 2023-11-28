import express, { Router } from 'express';
import { CheckRouter } from '../modules/check/check.route';
import { UserRouter } from '../modules/user/user.route';

const appRouter = express.Router();

const routes = [
  {
    path: '/users',
    route: UserRouter,
  },
  {
    path: '/check',
    route: CheckRouter,
  },
];

routes.forEach((el: { path: string; route: Router }) =>
  appRouter.use(el.path, el.route)
);

export default appRouter;
