const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  creator: {
    type: String,
  },
  title: {
    type: String,
  },
  message: {
    type: String,
  },
  tags: {
    type: String,
  },
  selectedFile: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Posts = mongoose.model("Posts", postSchema);

module.exports = Posts;
