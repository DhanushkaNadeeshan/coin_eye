const _question = ({ User }) => {
  return (info) => {
    const { id, securityQuestion, anwser } = info;
    return new Promise(async (resolve, reject) => {
      try {
        const user = await User.findOne({ _id: id });

        if (user.accessibility.failedAttempt === 3) {
          // TODO : make prefect msg
          user.accessibility.status = "block";
          user.accessibility.reason = "unable to give right anwser";

          await user.save();

          return resolve({
            success: false,
            msg: "exceaded attempt",
            status: "block",
          });
        }

        if (
          user.securityQuestion === securityQuestion &&
          user.anwser === anwser
        ) {
          user.accessibility.failedAttempt = 0;
          await user.save();
          return resolve({ success: true, msg: "user can tx" });
        } else {
          user.accessibility.failedAttempt++;

          await user.save();

          return resolve({
            success: false,
            msg: "anwser or question is not valide",
            status: "try",
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  };
};

const _recovery = ({ User }) => {
  return (info) => {
    const { id, securityQuestion } = info;

    return new Promise(async (resolve, reject) => {
      try {
        const user = await User.findOne({ _id: id });

        if (user.accessibility.status === "dined") {
          return resolve({
            success: false,
            msg: "Wallet is blocked forever",
            status: "dined",
          });
        }

        if (user.securityQuestion === securityQuestion) {
          user.accessibility.failedAttempt = 0;
          user.accessibility.status = "active";
          user.accessibility.reason = "";

          await user.save();

          return resolve({
            success: true,
            msg: "successfully recovery the wallet",
          });
        } else {
          user.accessibility.status = "dined";

          await user.save();

          return resolve({
            success: false,
            msg: "Wallet is blocked forever",
            status: "dined",
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  };
};

const _getRecoveryQuestion = ({ User }) => {
  return ({ id }) => {
    return new Promise(async (resolve, reject) => {
      let securityQuestions = [
        "What is your mother's maiden name?",
        "What is your father's middle name?",
        "What is the name of your first pet?",
        "What is the name of the street you grew up on?",
        "What is your favorite childhood memory?",
        "What is the name of your favorite teacher?",
        "What is your favorite color?",
        "What is your favorite movie?",
        "What is your favorite book?",
        "What is your favorite music artist?",
        "What is your favorite food?",
        "What is your favorite hobby?",
        "What is your favorite sport?",
        "What is your favorite vacation destination?",
        "What is the name of your first school?",
        "What is the name of your first employer?",
        "What is your favorite web browser?",
        "What is your favorite social media platform?",
        "What is your favorite mobile device brand?",
        "What is your favorite operating system?",
      ];
      try {
        const { securityQuestion } = await User.findOne({ _id: id });
        // remove current user saved question
        securityQuestions = securityQuestions.filter(
          (data) => data !== securityQuestion
        );

        const [q1, q2] = securityQuestions;
        const resonseData = [q1, securityQuestion, q2];

        resolve(resonseData);
      } catch (error) {
        reject(error);
      }
    });
  };
};

module.exports = { _question, _recovery, _getRecoveryQuestion };
