import React from "react";
import { deletePost } from "../../../api/api";
import { makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import moment from "moment";

const Styles = makeStyles((theme) => ({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    [theme.breakpoints.down("500")]: {
      margin: "10px 20px",
    },
  },
  media: {
    paddingTop: "56.25%",
  },
  overlay: {
    position: "absolute",
    top: "6px",
    left: "16px",
    color: "white",
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

export function Post(props) {
  const classes = Styles();

  const handleClick = () => {
    deletePost(props.id).then((response) => {
      if (response) {
        props.delete(props.id);
      } else {
        alert("Check your console for know about unexpected behaviour");
      }
    });
  };

  return (
    <Card className={classes.root} raised>
      <CardMedia
        className={classes.media}
        image={
          props.imageSrc ||
          "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
        }
        title={props.title}
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{props.creator}</Typography>
        <Typography variant="body2">
          {moment(props.createdAt).fromNow()}
        </Typography>
      </div>
      <CardContent className={classes.cardContent}>
        <Typography variant="body2" color="textSecondary">
          {props.tags}
        </Typography>
        <Typography
          gutterBottom
          variant="h5"
          component="h2"
          className={classes.title}
        >
          {props.title}
        </Typography>

        <Typography variant="body2" color="textSecondary" component="p">
          {props.message}
        </Typography>
      </CardContent>
      <CardActions className={classes.footer}>
        <Button
          size="small"
          color="primary"
          onClick={() => props.update(props.id)}
        >
          Update
        </Button>
        <Button size="small" color="primary" onClick={handleClick}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
