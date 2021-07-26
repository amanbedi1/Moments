import React, { useState } from "react";
import { Posts } from "../Posts/Posts.js";
import { Postform } from "../Postform/Postform.js";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  button: {
    position: "absolute",
    top: "16px",
    right: "20px",
    backgroundColor: "#212529",
    color: "white",
    [theme.breakpoints.down("500")]: {
      top: "12px",
    },
  },
}));

export default function Main() {
  const classes = useStyles();

  const [showForm, setshowForm] = useState(false);

  const handleForm = () => {
    setshowForm(false);
  };

  return (
    <>
      <Button
        color="primary"
        className={classes.button}
        onClick={() => setshowForm(!showForm)}
      >
        {showForm ? "Show Moments" : "Create Moment"}
      </Button>
      {showForm ? (
        <Postform message="Create Moment" setForm={handleForm}></Postform>
      ) : (
        <Posts setState={handleForm}></Posts>
      )}
    </>
  );
}
