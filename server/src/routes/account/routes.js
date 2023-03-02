const route = (router, controller) => {
  // #####
  // GET
  router.get("/ETH/:id", controller.viewETHController);

  router.put("/ETH/transaction", controller.updateTransactionETHController);

  router.put("/USD/saving", controller.updateSavingUSDController);

  router.put("/USD/transaction", controller.updateTransactionUSDController);

  return router;
};

module.exports = route;
