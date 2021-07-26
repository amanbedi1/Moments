import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { Filebase64 } from "./FileBase64/FileBase64.js";
import { sendPosts, updatePost } from "../../api/api.js";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: "auto",
    width: "55%",
    [theme.breakpoints.down("1100")]: {
      width: "100%",
    },
  },
  form_: {
    margin: "10px 20px",
    display: "flex",
    flexDirection: "column",
    alignContent: "flex-start",
  },
  heading: {
    margin: "21px 10px",
    alignSelf: "center",
    color: "#212529",
  },
  fileButton: {
    margin: "14px 0px",
  },
  button: {
    margin: "14px 0px",
    padding: "10px",
  },
}));

const initialState = {
  creator: "",
  title: "",
  message: "",
  tags: "",
  selectedFile: "",
};

export function Postform(props) {
  const classes = useStyles();

  const [state, setState] = useState(props.post ? props.post : initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setState((prevstate) => ({
      ...prevstate,
      [name]: value,
    }));
  };

  const setFile = (data) => {
    setState((prevstate) => ({
      ...prevstate,
      selectedFile: data,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (state.selectedFile === "") {
      alert("Please Select file");
      return;
    } 

    if (props.post) {
      updatePost(state, props.post._id).then(() => {
        props.setUpdatedPost(state);
        setState(initialState);
      });
    } else {
      sendPosts(state).then(() => { 
        setState(initialState);
        props.setForm(false);
      });
    }
  };

  return (
    <Paper variant="elevation" elevation={5} className={classes.container}>
      <form
        className={classes.form_}
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Typography variant="h5" className={classes.heading} align="center">
          {props.message}
        </Typography>
        <TextField
          name="creator"
          placeholder="Creator"
          fullWidth
          margin="normal"
          variant="outlined"
          required
          onChange={handleChange}
          value={state.creator}
        />
        <TextField
          name="title"
          placeholder="Title"
          fullWidth
          margin="normal"
          required
          variant="outlined"
          onChange={handleChange}
          value={state.title}
        />
        <TextField
          name="message"
          placeholder="Message"
          multiline
          rows={6}
          fullWidth
          margin="normal"
          variant="outlined"
          required
          onChange={handleChange}
          value={state.message}
        />
        <TextField
          name="tags"
          placeholder="Tags (space seperated)"
          fullWidth
          margin="normal"
          variant="outlined"
          onChange={handleChange}
          value={state.tags}
        />
        <div className={classes.fileButton}>
          <Filebase64 setFile={setFile}></Filebase64>
        </div>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          type="submit"
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={() => setState(initialState)}
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
}
