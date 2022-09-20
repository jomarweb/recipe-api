/* eslint-disable no-underscore-dangle */
/* eslint-disable no-empty */
/* eslint-disable no-undef */
const { expect } = require('chai');
const connectToDB = require('../src/daos/mongoose');
const { RecipeService } = require('../src/services/index');

describe('Database', () => {
  it('should connect to database', async () => {
    const isConnected = await connectToDB();
    expect(isConnected).to.equal(true);
  });
});

describe('Recipe CRUD operation', () => {
  let testRecord = null;

  it('should create record', async () => {
    try {
      testRecord = await RecipeService.create({
        title: 'food',
        shortDescription: 'my recipe',
        stepsHTML: '<p>Steps</p>',
        ingredientsHTML: '<p>ingredients</p>',
        photoURL: 'https://mongodb-js.github.io/leaf/mongodb-leaf_128x128.png',
        createdBy: '6326a79c8eb9a4572d76053b',
      });
    } catch (e) {
      console.log(e);
    }

    expect(testRecord._id).to.not.equal(null);
  });

  it('should update record', async () => {
    try {
      testRecord = await RecipeService.update({
        _id: testRecord._id,
        title: 'salad',
      });
    } catch (e) {
      console.log(e);
    }

    expect(testRecord.title).to.equal('salad');
  });

  it('should get record by "_id"', async () => {
    try {
      testRecord = await RecipeService.getById(testRecord._id);
    } catch (e) {
      console.log(e);
    }

    expect(testRecord).to.not.equal(null);
  });

  it('should search for records', async () => {
    try {
      testRecord = await RecipeService.getPage({
        keyword: testRecord.title, pageNum: 0, pageSize: 10,
      });
    } catch (e) {
      console.log(e);
    }

    expect(testRecord.totalCount > 0).to.equal(true);
  });

  it('should delete record by "_id"', async () => {
    try {
      await RecipeService.deleteById(testRecord._id);
      testRecord = await RecipeService.getById(testRecord._id);
    } catch (e) {
      console.log(e);
    }

    expect(testRecord).to.equal(null);
  });
});
