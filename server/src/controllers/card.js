const User = require("../models/User");

function getCards(id) {
  return new Promise((resolve, reject) => {
    User.findOne({ _id: id })
      .then((result) => {
        resolve(result.cards);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function updateCard(info) {
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
}

function removeCard({ id, userId }) {
  return new Promise((resolve, reject) => {
    User.findByIdAndUpdate(
      { _id: userId },
      { $pull: { cards: { _id: id } } },
      { new: true }
    )
      .then((rs) => {
        resolve(rs.cards);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

module.exports = { getCards, updateCard, removeCard };
