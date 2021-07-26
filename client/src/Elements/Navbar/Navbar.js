import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import logo from "../assets/icon_.png";

const useStyles = makeStyles((theme) => ({
  appbar: {
    backgroundColor: "#212529",
    margin: "20px 0",
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    [theme.breakpoints.down("500")]: {
      width: "100%",
    },
  },
  font: {
    [theme.breakpoints.down("500")]: {
      fontSize: "25px",
    },
  },
  logo: {
    height: "50px",
    width: "60px",
    [theme.breakpoints.down("500")]: {
      width: "30px",
      height: "27px",
    },
  },
}));

export default function Navbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar} color="primary">
        <Toolbar>
          <Typography variant="h4" className={classes.font}>
            Moments
          </Typography>
          <img src={logo} alt="logo" className={classes.logo}></img>
        </Toolbar>
      </AppBar>
    </div>
  );
}
