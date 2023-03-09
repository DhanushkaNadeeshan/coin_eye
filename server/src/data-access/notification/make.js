const _make = ({ Notification }) => {
  return (info) => {
    return new Promise(async (resolve, reject) => {
      try {
        let result = await Notification.create(info);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  };
};

const _findByAddressAndMake = ({ Notification, Account }) => {
  return (info) => {
    const { address, ...data } = info;

    return new Promise(async (resolve, reject) => {
      try {
        let { ref_user } = await Account.findOne({ wallet_address: address });

        if (ref_user) {
          data.refUser = ref_user;
          let result = await Notification.create(data);
          resolve(result);
        } else {
          reject("fail");
        }
      } catch (error) {
        reject(error);
      }
    });
  };
};

module.exports = { _make, _findByAddressAndMake };
