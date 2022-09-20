/* eslint-disable no-underscore-dangle */
const crypto = require('crypto');
const { UserDao } = require('../daos/index');

module.exports = class UserService {
  static async getByUsernameAndPassword(username, password) {
    const res = await UserDao.getByUsernameAndPassword(username, password);

    if (res != null) return { userId: res._id };

    return res;
  }

  static async updateAuthToken(uid) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 1);

    const authToken = crypto.randomBytes(64).toString('hex');
    const tokenExpiredAt = expirationDate.toString();
    const res = await UserDao.update({ _id: uid, authToken, tokenExpiredAt });

    return res;
  }

  static async getActiveAuthToken(token) {
    if (token == null || token === '') return null;

    const currentDate = new Date();
    const data = await UserDao.getByToken(token);

    if (data == null || data.tokenExpiredAt <= currentDate) {
      return null;
    }

    return { userId: data._id };
  }
};
