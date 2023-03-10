const route = (router, controller) => {
  // #####
  // GET

  router.get("/ETH/:address", controller.viewETHController);

  router.put("/ETH/transaction", controller.updateTransactionETHController);

  router.put("/USD/topup", controller.updateSavingUSDController);

  router.put("/USD/transaction", controller.updateTransactionUSDController);

  return router;
};

module.exports = route;
