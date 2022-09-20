const { RecipeDao } = require('../daos/index');

module.exports = class RecipeService {
  static async getPage({ keyword, pageNum, pageSize }) {
    const list = await RecipeDao.getPage({ keyword, pageNum, pageSize });
    const totalCount = await RecipeDao.getPageCount({ keyword });

    return {
      list, totalCount, pageNum: parseInt(pageNum, 10), pageSize: parseInt(pageSize, 10),
    };
  }

  static async getPageByUser({
    userId, keyword, pageNum, pageSize,
  }) {
    const list = await RecipeDao.getPage({
      userId, keyword, pageNum, pageSize,
    });
    const totalCount = await RecipeDao.getPageCount({ userId, keyword });

    return {
      list, totalCount, pageNum: parseInt(pageNum, 10), pageSize: parseInt(pageSize, 10),
    };
  }

  static async create(postdata) {
    const res = await RecipeDao.create(postdata);
    return res;
  }

  static async update(postdata) {
    const res = await RecipeDao.update(postdata);
    return res;
  }

  static async deleteById(id) {
    const res = await RecipeDao.deleteById(id);

    return res;
  }

  static async getById(id) {
    const res = await RecipeDao.getById(id);

    return res;
  }
};
