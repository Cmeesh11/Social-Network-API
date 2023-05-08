const { Thought } = require("../models");
const { ObjectId } = require('mongoose').Types;
module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      
      if (!thoughts) {
        return res.status(404).json({ error: 'No thoughts found' });
      }
      
      res.status(200).json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getThoughtById(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.id });
      
      if (!thought) {
        return res.status(404).json({ error: 'Thought not found' });
      }      

      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body); 
      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true } );
     
      if (!thought) {
        return res.status(404).json({ error: 'Thought not found' });
      }
     
      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.id });
      
      if (!thought) {
        return res.status(404).json({ error: 'Thought not found' });
      }

      res.status(200).json({ message: "Successfully Deleted!"})
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async createReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body }},
        { new: true }
      )

      if (!thought) {
        return res.status(404).json({ error: 'Thought not found' });
      }

      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: new ObjectId(req.params.reactionId) } } }
      );

      if (!thought) {
        return res.status(404).json({ error: 'Thought not found' });
      }

      res.status(200).json({ message: "Successfully Deleted!" })
    } catch (err) {
      res.status(500).json(err);
    }
  }
};
