const route = (router, controller) => {
  router.post("/login/google", controller.loginWithGoogle);

  router.post("/logout", controller.logout);

  return router;
};

module.exports = route;
