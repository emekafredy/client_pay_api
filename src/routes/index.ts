import NotFoundError from '../lib/errors/NotFoundError';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';

const apiPrefix = '/api';
const definedRoutes = [authRoutes, userRoutes];

const routes = (app) => {
  definedRoutes.forEach((route) => app.use(apiPrefix, route));

  app.get(apiPrefix, (_req, res) =>
    res.status(200).json({
      message: 'Client Pay API',
    }),
  );

  app.use(() => {
    throw new NotFoundError('Route');
  });

  return app;
};

export default routes;
