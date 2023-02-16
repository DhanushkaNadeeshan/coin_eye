const { validateToken } = require("../util/jwt");

exports.cookieJwtAuth = (req, res, next) => {
  const token = req.cookies.key;
  if (token) {
    const { success } = validateToken(token);
    if(success){
      next();
    }else{
      res.status(200).json({
        success: false,
        message: "Unathorized",
      });
    }
  } else {
    res.status(200).json({
      success: false,
      message: "key not available",
    });
  }
};
