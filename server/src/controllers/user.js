const User = require("../models/User");

function getUsers() {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await User.find({});
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

function findUser(params) {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await User.findOne(params).exec();
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

function createUser(userData) {
  return new Promise((resolve, reject) => {
    User.create(userData, (err, result) => {
      if (err) reject(err);

      resolve(result);
    });
  });
}

module.exports = {
  getUsers,
  createUser,
  findUser,
};
