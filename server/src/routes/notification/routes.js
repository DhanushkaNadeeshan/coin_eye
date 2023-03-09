const route = (router, controller) => {
    // #####
    // GET
    router.get("/:id", controller.view);
  
    router.patch("/read", controller.updateReadStatus);

  
    return router;
  };
  
  module.exports = route;
  