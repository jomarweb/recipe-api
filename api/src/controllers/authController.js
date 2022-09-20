/* eslint-disable no-underscore-dangle */
const md5 = require('md5');
const { UserService } = require('../services/index');

module.exports = class UserController {
  static async authenticate(req, res) {
    // parse login and password from headers
    const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');
    const thisUser = await UserService.getByUsernameAndPassword(login, md5(password));

    // Verify login and password are set and correct
    if (thisUser !== null) {
    // Access granted...
    // eslint-disable-next-line no-restricted-syntax, guard-for-in
      for (const key in req.query) {
        req.query[key.toLowerCase()] = req.query[key];
      }

      const { authToken, tokenExpiredAt } = await UserService.updateAuthToken(thisUser.userId);

      return res.json({ authToken, tokenExpiredAt });
    }

    return res.status(401).send('Authentication required.');
  }
};
