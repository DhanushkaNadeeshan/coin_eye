const route = (router, controller) => {
  // #####
  // GET
  router.get("/:id", controller.selectController);

  router.post("/", controller.makeController);

  router.put("/", controller.updateController);

  router.delete("/", controller.removeController);

  return router;
};

module.exports = route;
