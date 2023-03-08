const route = (router, controller) => {
  // #####
  // GET
  router.post("/ETH/request", controller.requestETH);

  router.get("/:address", controller.view);

  return router;
};

module.exports = route;
