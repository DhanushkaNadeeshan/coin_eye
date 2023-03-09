const _view = ({ Notification }) => {
  return (info) => {
    const { refUser } = info;

    return new Promise(async (resolve, reject) => {
      try {
        let result = await Notification.find({ refUser });

        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  };
};

module.exports = { _view };
