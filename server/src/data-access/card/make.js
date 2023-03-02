const _make = ({ User }) => {
  return (info) => {
    return new Promise(async (resolve, reject) => {
      const { id, ...cardInfo } = info;

      User.findOne({ _id: id })
        .then((user) => {
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
                resolve(rs);
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
