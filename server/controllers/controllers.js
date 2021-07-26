const Posts = require("../models/posts.js");
const mongoose = require("mongoose");

const getPosts = (req, res) => {
  Posts.find((err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    res.send(data);
  });
};

const getPost = (req, res) => {
  const id = req.params["id"];

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  Posts.findById(id, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(404).json({ message: err });
    }
    res.send(data);
  });
};

const createPost = (req, res) => {
  const body = {
    creator: req.body.creator,
    title: req.body.title,
    message: req.body.message,
    tags: req.body.tags,
    selectedFile: req.body.selectedFile,
    createdAt: new Date(),
  }; 

  const post = new Posts(body);

  post.save((err) => {
    if (err) {
      console.log(err);
      return res.status(404).json({ message: "Bad Request" });
    }

    return res.status(201).json({ message: "Created" });
  });
};

const deletePost = (req, res) => {
  const id = req.params["id"];

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  Posts.countDocuments((err, totalPosts) => {
    if (err) {
      console.error(err);
      return res.status(400).json({ message: "Cant delete Bad Request" });
    }
    if (totalPosts < 4) {
      return res
        .status(400)
        .json({ message: "Minimum Posts Reached you cant delete any posts" });
    } else {
      Posts.findByIdAndRemove(id, (err) => {
        if (err) {
          console.log(err);
          return res.status(400).json({ message: "Cant delete Bad request" });
        }
      });

      res.status(200).json({ message: "Deleted Successfully" });
    }
  });
};

const updatePost = (req, res) => {
  const id = req.params["id"];

  const { creator, title, message, tags, selectedFile, createdAt } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatedPost = {
    creator,
    title,
    message,
    tags,
    selectedFile,
    createdAt,
    _id: id,
  };

  Posts.findByIdAndUpdate(id, updatedPost, (err) => {
    if (err) {
      console.log(err);
      res.send(404).json({ message: err });
    }
  });

  res.status(200).json({ message: "Updated Successfully" });
};

module.exports = {
  getPosts: getPosts,
  createPost: createPost,
  deletePost: deletePost,
  updatePost: updatePost,
  getPost: getPost,
};
