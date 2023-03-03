const route = (router, controller) => {
  // #####
  // GET
  router.get("/ETH/:address", controller.selectController);

  return router;
};

module.exports = route;
