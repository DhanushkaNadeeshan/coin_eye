const route = (router, controller) => {
  router.post("/login/google", controller.loginWithGoogle);

  return router;
};

module.exports = route;
