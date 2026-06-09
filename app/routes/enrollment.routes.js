module.exports = (app) => {
  const enrollment = require("../controllers/enrollment.controller");

  const router = require("express").Router();

  router.post("/", enrollment.create);

  router.put("/:id/success", enrollment.paymentSuccess);

  router.put("/:id/failed", enrollment.paymentFailed);

  router.get("/", enrollment.findAll);

  router.get("/:id", enrollment.findOne);

  router.get("/user/:userId", enrollment.findByUser);

  router.put("/:id/progress", enrollment.updateProgress);

  router.delete("/:id", enrollment.delete);

  app.use("/api/enrollments", router);
};