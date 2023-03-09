const _update = () => {
  return ({ id, status }) => {
    if (!id) {
      throw new Error("Please insert id");
    }

    if (!status) {
      throw new Error("Please insert status");
    }

    return Object.freeze({
      get_id: () => id,
      get_status: () => status,
    });
  };
};

module.exports = { _update };
