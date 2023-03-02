const update = () => {
  return function _update({ id, number, cvc, expiryYear, expiryMonth }) {
    if (!id) {
      throw new Error("Please insert id");
    }
    if (!number) {
      throw new Error("Please insert number");
    }

    if (!cvc) {
      throw new Error("Please insert cvc");
    }

    if (!expiryYear) {
      throw new Error("Please insert expiryYear");
    }

    if (!expiryMonth) {
      throw new Error("Please insert expiryMonth");
    }

    return Object.freeze({
      get_id: () => id,
      get_number: () => number,
      get_cvc: () => cvc,
      get_expiryYear: () => expiryYear,
      get_expiryMonth: () => expiryMonth,
    });
  };
};
module.exports = update;
