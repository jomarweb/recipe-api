/* eslint-disable no-underscore-dangle */
/* eslint-disable no-empty */
/* eslint-disable no-undef */
const { expect } = require('chai');
const connectToDB = require('../src/daos/mongoose');

describe('Database', () => {
  it('should connect to database', async () => {
    const isConnected = await connectToDB();
    expect(isConnected).to.equal(true);
  });
});
