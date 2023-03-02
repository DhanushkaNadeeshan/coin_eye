const make = () => {
  return function _make({ number, cvc, expiryYear, expiryMonth }) {
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
      get_number: () => number,
      get_cvc: () => cvc,
      get_expiryYear: () => expiryYear,
      get_expiryMonth: () => expiryMonth,
    });
  };
};

module.exports = make;
