const view = () => {
  // id: user id
  return ({ id }) => {
    if (!id) {
      throw new Error("Please insert id");
    }

    return Object.freeze({
      get_id: () => id,
    });
  };
};

module.exports = view;
