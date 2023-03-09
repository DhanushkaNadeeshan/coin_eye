const route = (router, controller) => {
  // #####
  // GET
  router.post("/ETH/request", controller.requestETH);

  router.get("/:address", controller.view);

  router.put("/ETH/request", controller.update);

  return router;
};

module.exports = route;
