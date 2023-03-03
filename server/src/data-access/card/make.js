const _make = ({ User }) => {
  return (info) => {
    return new Promise(async (resolve, reject) => {
      const { id, ...cardInfo } = info;
      console.log("🚀 ~ file: make.js:5 ~ returnnewPromise ~ id:", id);

      User.findOne({ _id: id })
        .then((user) => {
          if (!user) {
            return reject("User can't find");
          }
          const existingCard = user.cards.find((card) => {
            return card.number == cardInfo.number;
          });

          if (existingCard) {
            reject("card is exixt");
          } else {
            user.cards.push(cardInfo);
            user
              .save()
              .then((rs) => {
                resolve(rs.cards);
              })
              .catch((error) => {
                reject(error);
              });
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
};

module.exports = _make;
