/* eslint-disable no-underscore-dangle */
const { RecipeService } = require('../services/index');

module.exports = class UserController {
  static async getPage(req, res) {
    const { keyword, pagenum, pagesize } = req.query;
    const data = await RecipeService.getPage({ keyword, pageNum: pagenum, pageSize: pagesize });

    return res.json(data);
  }
};
