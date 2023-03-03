const _remove = () => {
  // id: user id
  return ({ id, userId }) => {
    if (!id) {
      throw new Error("Please insert id");
    }

    if (!userId) {
      throw new Error("Please insert user id");
    }

    return Object.freeze({
      get_id: () => id,
      get_userId: () => userId,
    });
  };
};

module.exports = _remove;
