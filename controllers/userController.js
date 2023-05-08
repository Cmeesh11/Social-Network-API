const { User } = require('../models');

module.exports = {
  
  async getUsers(req, res) {
    try {
    const user = await User.find();
    res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getUserById(req, res) {
    try {
      const user = await User.find({ _id: req.params.id });
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteUser(req, res) {
    try {
      await User.findOneAndDelete({ _id: req.params.id });
      res.status(200).json({ message: "Successfully Deleted!"});
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $push: { friends: await User.findOne({ _id: req.params.friendId }) } },
        { new: true }
        );
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteFriend(req, res) {
    try {
      await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: await User.findOneAndDelete({ _id: req.params.friendId }) } },
        { new: true }
      )
      res.status(200).json({ message: "Successfully removed friend" });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}