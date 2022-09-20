/* eslint-disable no-underscore-dangle */
/* eslint-disable no-empty */
/* eslint-disable no-undef */
const md5 = require('md5');
const { expect } = require('chai');
const { UserService } = require('../src/services/index');

describe('Authentication', () => {
  it('should generate auth token', async () => {
    const thisUser = await UserService.getByUsernameAndPassword('iam-user', md5('mypassword'));
    const { authToken } = await UserService.updateAuthToken(thisUser.userId);

    expect(authToken).to.not.equal(null);
  });
});
