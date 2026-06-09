module.exports = function(app) {
  const payment = require("../controllers/payment.controller.js");
  
  var router = require("express").Router();

  // Create order wali API
  router.post("/create-order", payment.createOrder);

  router.post("/verify", payment.verifyPayment);
  // Is route ka base URL /api/payment hoga
  app.use('/api/payment', router);
};