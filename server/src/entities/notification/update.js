const _updateReadStatus = () => {
  // id: user id
  return ({ id, read }) => {
    if (!id) {
      throw new Error("Please insert refUser");
    }

    if (!read) {
      throw new Error("Please insert read");
    }

    return Object.freeze({
      get_id: () => id,
      get_read: () => read,
    });
  };
};

module.exports = { _updateReadStatus };
