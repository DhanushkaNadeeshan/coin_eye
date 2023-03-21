const route = (router, controller, checkAthurization) => {
  // #####
  // GET

  router.get("/ETH/:address", controller.viewETHController);

  router.put(
    "/ETH/transaction",
    checkAthurization,
    controller.updateTransactionETHController
  );

  router.put("/USD/topup", controller.updateSavingUSDController);

  router.put(
    "/USD/transaction",
    checkAthurization,
    controller.updateTransactionUSDController
  );

  router.post("/ETH/recovery", controller.recoveryETHController);

  return router;
};

module.exports = route;
