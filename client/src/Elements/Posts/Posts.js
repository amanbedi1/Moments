import React, { useEffect, useState } from "react";
import { Post } from "./Post/Post.js";
import { makeStyles } from "@material-ui/core";
import { Postform } from "../Postform/Postform.js";
import { fetchPosts, getPost } from "../../api/api.js";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  center: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

export const Posts = (props) => {
  const classes = useStyles();

  const [posts, setPosts] = useState([]);

  const [updatedPost, setUpdatedPost] = useState({});

  const removePost = (id) => {
    let remainingPost = posts.filter((post) => post._id !== id);

    setPosts(remainingPost);
  };

  useEffect(() => {
    fetchPosts()
      .then((data) => setPosts(data))
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleUpdatedPost = (data) => {
    let index = posts.findIndex((obj) => obj._id === updatedPost._id);

    let arr = posts;

    arr[index] = data;

    setPosts(arr);

    setUpdatedPost({});
  };

  const handleUpdate = (id) => {
    console.log("update called");

    getPost(id)
      .then((data) => {
        setUpdatedPost(data);
      })
      .catch((err) => {
        console.errFor(err);
      });
  };

  return Object.entries(updatedPost).length !== 0 ? (
    <Postform
      message="Update Moment"
      post={updatedPost}
      setUpdatedPost={handleUpdatedPost}
    ></Postform>
  ) : posts.length < 1 ? (
    <div className={classes.center}>
      <CircularProgress size={70} className={classes.center} />
    </div>
  ) : (
    <Grid container spacing={4}>
      {posts.map((post) => (
        <Grid item xs={12} sm={6} md={4} key={post._id}>
          <Post
            imageSrc={post.selectedFile}
            title={post.title}
            creator={post.creator}
            tags={post.tags}
            message={post.message}
            id={post._id}
            createdAt={post.createdAt}
            delete={removePost}
            update={handleUpdate}
          ></Post>
        </Grid>
      ))}
    </Grid>
  );
};
