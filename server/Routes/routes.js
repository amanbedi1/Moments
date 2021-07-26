const routes = require("express").Router();

const controllers = require("../controllers/controllers.js");

routes.get("/", controllers.getPosts);

routes.post("/", controllers.createPost);

routes.delete("/:id", controllers.deletePost);

routes.patch("/:id", controllers.updatePost);

routes.get("/:id", controllers.getPost);

module.exports = routes;
