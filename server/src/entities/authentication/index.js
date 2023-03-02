const loginWithGoogle = require("./loginWithGoogle");
const signupWithGoogle = require("./signupWithGoogle");

const _loginWithGoogle = loginWithGoogle();
const _signupWithGoogle = signupWithGoogle();

module.exports = { _loginWithGoogle, _signupWithGoogle };
