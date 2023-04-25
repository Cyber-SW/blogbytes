const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userBlogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
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
    topic: {
      type: String,
      required: true,
      enum: ["Mobile", "Software", "Hardware", "Gadgets", "Artificial Intelligence", "Cloud Computing", "Internet of Things", "Data Science", "Programming", "Other"]
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Blog = model("Blog", userBlogSchema);

module.exports = Blog;
