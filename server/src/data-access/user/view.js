const _view = ({ User }) => {
  return function getUser({ id }) {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await User.findOne({ _id: id });
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };
};

const _viewByEmail = ({ User }) => {
  return function getUser({ email }) {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await User.findOne({ email });
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };
};
module.exports = { _view, _viewByEmail };
