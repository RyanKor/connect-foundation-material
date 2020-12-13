const mongoose = require("mongoose");
module.exports = () => {
  const connect = () => {
    if (process.env.NODE_ENV !== "production") {
      mongoose.set("debug", true);
    }
    mongoose.connect(
      "mongodb://root:1234@localhost:27017/admin",
      {
        dbName: "todo-app",
      },
      (error) => {
        if (error) {
          console.log("mongodb error", error);
        } else {
          console.log("mongodb success");
        }
      }
    );
  };
  connect();
  mongoose.connection.on("error", (error) => {
    console.error("mongodb error", error);
  });
  mongoose.connection.on("disconnected", () => {
    console.error("mongodb disconnected");
    connect();
  });
  require("./todo");
};
