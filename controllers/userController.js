const { User } = require('../models');

module.exports = {
  
  async getUsers(req, res) {
    try {
    const user = await User.find();
    res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }

}