const route = ({ router, usersController }) => {
  // #####
  // GET
  router.get("/:id", usersController.selectController);

  return router;
};

module.exports = route;
