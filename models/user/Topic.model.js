const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const blogTopicSchema = new Schema(
  {
    topic: {
      type: String,
      required: true,
      unique: true
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Topic = model("Topic", blogTopicSchema);

module.exports = Topic;