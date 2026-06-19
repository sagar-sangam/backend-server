module.exports = app => {
  const supports = require("../controllers/support.controller.js");

  var router = require("express").Router();

  // Create a new support ticket
  router.post("/", supports.create);

  // Retrieve all support tickets
  router.get("/", supports.findAll);

  // Retrieve all open tickets
  router.get("/open", supports.findAllOpen);

  // Retrieve all tickets of a user
  router.get("/user/:userId", supports.findByUser);

  // Retrieve a single ticket with id
  router.get("/:id", supports.findOne);

  // Update a ticket with id
  router.put("/:id", supports.update);

  // Reply to a ticket
  router.put("/reply/:id", supports.reply);

  // Delete a ticket with id
  router.delete("/:id", supports.delete);

  // Delete all tickets
  router.delete("/", supports.deleteAll);

  app.use("/api/support", router);
};