const _question = (usecaseQuestion) => {
  return async (req, res) => {
    try {
      const body = req.body;
      const result = await usecaseQuestion(body);
      console.log("🚀 ~ file: question.js:6 ~ return ~ result:", result);
      res.status(200).json({ result });
    } catch (error) {
      // TODO: make error stander
      res.status(400).json({ msg: "viewing error" });
    }
  };
};

const _recovery = (usecaseRecovery) => {
  return async (req, res) => {
    try {
      const body = req.body;
      const result = await usecaseRecovery(body);
      res.json({ success: true, result });
    } catch (error) {
      // TODO: make error stander
      res.status(400).json({ msg: "viewing error" });
    }
  };
};

const _getRecoveryQuestion = (usecaseGetRecoveryQuestion) => {
  return async (req, res) => {
    try {
      const id = req.params.id;
      const result = await usecaseGetRecoveryQuestion({ id });
      res.json({ success: true, result });
    } catch (error) {
      // TODO: make error stander
      res.status(400).json({ msg: "viewing error" });
    }
  };
};

module.exports = { _question, _recovery, _getRecoveryQuestion };
