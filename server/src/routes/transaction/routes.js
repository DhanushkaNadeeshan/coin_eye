const route = (router, controller) => {
  // #####
  // GET
  router.get("/:id", controller.selectController);

  return router;
};

module.exports = route;
