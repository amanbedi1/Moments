const mongoose = require("mongoose");

const CONNECTION_URL =
  "mongodb+srv://aman_bedi:devil%404444@momentsdatabase.uh8yx.mongodb.net/MomentsDatabase?retryWrites=true&w=majority";

const dbConnector = () => {
  console.log(mongoose.connection.readyState);
  mongoose.connection.on("connecting", () => {
    console.log("connecting");
    console.log(mongoose.connection.readyState);
  });
  mongoose.connection.on("connected", () => {
    console.log("connected");
    console.log(mongoose.connection.readyState);
  });
  mongoose.connection.on("disconnecting", () => {
    console.log("disconnecting");
    console.log(mongoose.connection.readyState);
  });
  mongoose.connection.on("disconnected", () => {
    console.log("disconnected");
    console.log(mongoose.connection.readyState);
  });

  mongoose
    .connect(CONNECTION_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err) => console.log(err));

  mongoose.set("useCreateIndex", true);
};

mongoose.set("useFindAndModify", false);

module.exports = dbConnector;
