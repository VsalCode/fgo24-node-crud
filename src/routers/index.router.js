const routers = require("express").Router();

routers.use("/users", require("./users.router"));
// routers.use("/auth", require("./auth.router"));

module.exports = routers;
