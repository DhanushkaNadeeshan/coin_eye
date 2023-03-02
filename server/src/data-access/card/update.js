const _update = ({ User }) => {
  return (info) => {
    return new Promise((resolve, reject) => {
      const { id, ...cardInfo } = info;

      User.updateOne(
        { "cards._id": id },
        {
          $set: {
            "cards.$.number": cardInfo.number,
            "cards.$.cvc": cardInfo.cvc,
            "cards.$.expiryYear": cardInfo.expiryYear,
            "cards.$.expiryMonth": cardInfo.expiryMonth,
          },
        }
      )
        .then((rs) => {
          resolve(cardInfo);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
};

module.exports = _update;
