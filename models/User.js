const { Schema, model } = require('mongoose');
const { thoughtSchema } = require('./Thought');

const userSchema = new Schema( 
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /(.)+@(.)+\.([a-z\.]){2,6}/
    },
    thoughts: [thoughtSchema],
    friends: [this]
  },
  {
    toJSON: {
      virtuals: true
    }
  }
)

userSchema.virtual('friendCount')
.get(function () {
  return this.friends.length;
})

const User = model('user', userSchema);

module.exports = User;