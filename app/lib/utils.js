/* eslint-disable class-methods-use-this */
const bcrypt = require('bcrypt');

class Utils {
  async hashPassword(password) {
    const hash = await bcrypt.hashSync(password, 10);
    return hash;
  }
}

module.exports = new Utils();
