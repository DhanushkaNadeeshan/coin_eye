const dataAccess = require("../data-access/user");

exports.checkAthurization = async (req, res, next) => {
  const email = req.email;

  if (email) {
    try {
      let user = await dataAccess.viewByEmail({ email });

      if (user.accessibility.status === "block") {
        return res.status(401).json({
          success: false,
          message: "User is block",
        });
      }

      next();
    } catch (error) {
      console.log(
        "🚀 ~ file: checkAuthrization.js:12 ~ exports.checkAthurization= ~ error:",
        error
      );
      return res.status(500).json({
        success: false,
      });
    }
  } else {
    res.status(500).json({
      success: false,
      message: "can't find email",
    });
  }
};
