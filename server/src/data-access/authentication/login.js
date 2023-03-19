const _login = ({ User, Account, dataAccessNotification }) => {
  return ({ email }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          throw new Error("unavailable");
        }

        const account = await Account.find({
          ref_user: user._id,
          active: true,
        }).select("_id wallet_address  t_account_ETH total_ETH");

        const data = {
          id: user._id,
          name: user.name,
          email: user.email,
          total_USD: user.total_USD,
          t_account_USD: user.t_account_USD,
          cards: user.cards,
          account: account,
        };

        // create log informations
        const notificationSender = {
          type: "login",
          description: `User loged in the wallet`,
          refUser: user._id,
        };

        dataAccessNotification.make(notificationSender);
        // Mongodb v4 not working this
        // User.aggregate([
        //   {
        //     $match: {
        //       email,
        //     },
        //   },
        //   {
        //     $lookup: {
        //       from: "accounts",
        //       localField: "_id",
        //       foreignField: "ref_user",
        //       pipeline: [
        //         {
        //           $project: {
        //             wallet_address: 1,
        //             s_account_ETH: 1,
        //             t_account_ETH: 1,
        //             total_ETH: 1,
        //           },
        //         },
        //       ],
        //       as: "account",
        //     },
        //   },
        // ]).exec((err, data) => {
        //   if (err) reject(err);
        //   resolve(data);
        // });
        resolve(data);
      } catch (error) {
        console.log("🚀 ~ file: user.js:24 ~ returnnewPromise ~ error", error);
        reject(error);
      }
    });
  };
};

module.exports = _login;
