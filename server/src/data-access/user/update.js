const _update = ({ User }) => {
  return (info) => {
    const { id, ...data } = info;
    return new Promise((resolve, reject) => {
      User.findOneAndUpdate({ _id: id }, data)
        .then((rs) => {
          resolve(rs);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
};

module.exports = _update;
