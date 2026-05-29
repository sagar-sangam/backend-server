module.exports = app => {

  const courseSyllabus = require("../controllers/courseSyllabus.controller.js");

  var router = require("express").Router();

  // Create
  router.post("/", courseSyllabus.createSyllabus);

  // Get all
  router.get("/", courseSyllabus.getAllSyllabus);

  // Get one
  router.get("/:id", courseSyllabus.getSyllabusById);

  // Update
  router.put("/:id", courseSyllabus.updateSyllabus);

  // Delete
  router.delete("/:id", courseSyllabus.deleteSyllabus);

  app.use("/api/courseSyllabus", router);

};