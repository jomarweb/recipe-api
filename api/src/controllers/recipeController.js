/* eslint-disable no-underscore-dangle */
const { RecipeService } = require('../services/index');

module.exports = class RecipeController {
  static async getPage(req, res) {
    const { keyword, pagenum, pagesize } = req.query;
    const data = await RecipeService.getPage({ keyword, pageNum: pagenum, pageSize: pagesize });

    return res.json(data);
  }

  static async create(req, res) {
    try {
      const data = await RecipeService.create(req.body);

      res.json(data);
    } catch (e) {
      res.status(400).send(e._message);
    }
  }

  static async update(req, res) {
    try {
      if (req.body._id == null) {
        return res.status(400).send('Error occured: record "_id" field is required.');
      }

      const data = await RecipeService.update(req.body);
      if (data === null) {
        return res.status(404).send('Error occured: record was not found.');
      }

      return res.json(data);
    } catch (e) {
      return res.status(400).send(e._message);
    }
  }

  static async deleteById(req, res) {
    const { id } = req.params;
    const isSuccess = await RecipeService.deleteById(id);

    if (isSuccess) {
      res.json({ success: true });
    } else {
      res.status(400).send('Error occured: id not supported or record not found.');
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const data = await RecipeService.getById(id);

      if (data == null) {
        res.status(404).send(`Error occured: record with id ${id} was not found.`);
      }

      res.json(data);
    } catch (e) {
      res.status(500).send('Error occured');
    }
  }
};
