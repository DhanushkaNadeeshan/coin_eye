const _login = ({ User }) => {
  return ({ email }) => {
    return new Promise(async (resolve, reject) => {
      try {
        User.aggregate([
          {
            $match: {
              email,
            },
          },
          {
            $lookup: {
              from: "accounts",
              localField: "_id",
              foreignField: "ref_user",
              pipeline: [
                {
                  $project: {
                    wallet_address: 1,
                    s_account_ETH: 1,
                    t_account_ETH: 1,
                    total_ETH: 1,
                  },
                },
              ],
              as: "account",
            },
          },
        ]).exec((err, data) => {
          if (err) reject(err);
          resolve(data);
        });
      } catch (error) {
        console.log("🚀 ~ file: user.js:24 ~ returnnewPromise ~ error", error);
        reject(error);
      }
    });
  };
};

module.exports = _login;
