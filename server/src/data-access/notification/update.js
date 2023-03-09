const _updateReadStatus = ({ Notification }) => {
  return (info) => {
    const { id, read } = info;

    return new Promise(async (resolve, reject) => {
      try {
        await Notification.findOneAndUpdate({ _id: id }, { read });

        resolve({ id, read });
      } catch (error) {
        reject(error);
      }
    });
  };
};

module.exports = { _updateReadStatus };
