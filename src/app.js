const express = require("express");
const userRouter = require("./users/users.router");
const { port } = require("./config");
const db = require("./utils/database");
const authRouter = require("./auth/auth.router");
const initModels = require("./models/initModels");

const app = express();

app.use(express.json());

db.authenticate()
  .then(() => console.log("DB authenticated"))
  .catch((err) => console.log(err));

db.sync()
  .then(() => {
    console.log("Database Synced");
  })
  .catch((err) => {
    console.log(err);
  });

initModels();

app.get(
  "/",
  (req, res, next) => {
    console.log("Se esta ejecutando un middleware", req.method);
    next();
  },
  (req, res) => {
    res.status(200).json({
      message: "OK!",
      users: `localhost: ${port}/api/v1/users`,
    });
  }
);

app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
