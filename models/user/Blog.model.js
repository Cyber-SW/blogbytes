const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userBlogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: false,
      trim: true,
    },
    // topic: {
    //   type: String,
    //   required: true,
    //   enum: ["Select Topic", "Mobile", "Software", "Hardware", "Gadgets", "Cybersecurity", "Artificial Intelligence", "Cloud Computing", "Internet of Things", "Data Science", "Programming"],
    //   default: "Select Topic"
    // },
    entry: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
    },
    comments: {
      type: String,
      trim: true
    },
    topic: [
      {
      type: Schema.Types.ObjectId,
      ref: "Topic"
    }
  ]
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Blog = model("Blog", userBlogSchema);

module.exports = Blog;
