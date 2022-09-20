/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const { RecipeModel } = require('../models/index');

module.exports = class Recipe {
  static searchQuery(keyword) {
    const keywordQueryValue = { $regex: `.*${keyword}.*` };
    return { $or: [{ title: keywordQueryValue }, { shortDescription: keywordQueryValue }] };
  }

  static async create(postdata) {
    const recipe = new RecipeModel(postdata);
    const res = await recipe.save();
    return res;
  }

  // Update record by document id.
  static async update(postdata) {
    const id = postdata._id;

    delete postdata._id;
    const res = await RecipeModel.findOneAndUpdate({ _id: id }, postdata, { new: true });

    return res;
  }

  // Get record by document id.
  static async getById(id) {
    const res = await RecipeModel.findById(id);

    return res;
  }

  // Delete record by document id.
  static async deleteById(id) {
    try {
      await RecipeModel.deleteOne({ _id: id });

      return true;
    } catch (e) {
      return false;
    }
  }

  // Search for documents.
  static async getPage({ keyword, pageNum, pageSize }) {
    const query = this.searchQuery(keyword);
    const list = await RecipeModel.find(query).sort('title').skip((pageNum - 1) * pageSize).limit(pageSize);

    return list;
  }

  static async getPageCount({ keyword }) {
    const query = this.searchQuery(keyword);
    const totalCount = await RecipeModel.count(query);

    return totalCount;
  }
};
