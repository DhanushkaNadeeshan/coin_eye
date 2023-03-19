const route = (router, controller, cookieJwtAuth) => {
  // #####
  // GET
  router.get("/:id", cookieJwtAuth, controller.selectController);

  router.post("/signup/google", controller.makeWithGoogle);

  router.post("/question", cookieJwtAuth, controller.question);

  router.put("/recovery", cookieJwtAuth, controller.recovery);

  router.get("/recovery/:id", cookieJwtAuth, controller.getRecoveryQuestion);

  router.put("/", cookieJwtAuth, controller.update);

  return router;
};

module.exports = route;
