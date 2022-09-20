/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const { UserModel } = require('../models/index');

module.exports = class Recipe {
  static searchQuery(keyword) {
    const keywordQueryValue = { $regex: `.*${keyword}.*` };
    return { $or: [{ title: keywordQueryValue }, { shortDescription: keywordQueryValue }] };
  }

  static async save(postdata) {
    const recipe = new UserModel(postdata);
    const res = await recipe.save();

    return res;
  }

  // Get record by document id.
  static async getByUsernameAndPassword(username, password) {
    const res = await UserModel.findOne({ username, password });

    return res;
  }

  static async update(postdata) {
    const id = postdata._id;

    delete postdata._id;
    const res = await UserModel.findOneAndUpdate({ _id: id }, postdata, { new: true });

    return res;
  }

  static async getByToken(authToken) {
    const res = await UserModel.findOne({ authToken });

    return res;
  }
};
