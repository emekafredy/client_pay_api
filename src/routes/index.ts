import userRoutes from "./user.routes";

const apiPrefix = "/api";
const definedRoutes = [userRoutes];

const routes = (app) => {
  definedRoutes.forEach((route) => app.use(apiPrefix, route));

  app.get(apiPrefix, (_req, res) =>
    res.status(200).json({
      message: "Client Pay API",
    })
  );

  return app;
};

export default routes;
