const route = (router, controller) => {
  // #####
  // GET
  router.get("/:id", controller.selectController);

  router.post("/signup/google", controller.makeWithGoogle);

  router.post("/question", controller.question);

  router.put("/recovery", controller.recovery);

  router.get("/recovery/:id", controller.getRecoveryQuestion);

  router.put("/", controller.update);

  return router;
};

module.exports = route;
