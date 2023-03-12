const _view = ({ Notification }) => {
  return (info) => {
    const { refUser } = info;

    return new Promise(async (resolve, reject) => {
      try {
        let result = await Notification.find({ refUser }).sort({ _id: -1 });

        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  };
};

module.exports = { _view };
