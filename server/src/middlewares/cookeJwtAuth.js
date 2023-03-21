const { validateToken } = require("../util/jwt");

exports.cookieJwtAuth = (req, res, next) => {
  const token = req.cookies.key;
  if (token) {
    const { success, result } = validateToken(token);
    if (success) {
      req.key = result.aesKey;
      req.email = result.email;
      next();
    } else {
      res.status(401).json({
        success: false,
        message: "Unathorized",
      });
    }
  } else {
    res.status(401).json({
      success: false,
      message: "key not available",
    });
  }
};
