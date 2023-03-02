const _remove = ({ User }) => {
  return ({ id, userId }) => {
    return new Promise((resolve, reject) => {
      User.findByIdAndUpdate(
        { _id: userId },
        { $pull: { cards: { _id: id } } },
        { new: true }
      )
        .then((rs) => {
          resolve(rs.cards);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
};

module.exports = _remove;
