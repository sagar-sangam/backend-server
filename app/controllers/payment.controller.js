const axios = require("axios");

// 1. CREATE ORDER API
exports.createOrder = async (req, res) => {
  try {
    const { order_id, order_amount, customer_details, order_meta } = req.body;

    // Cashfree Sandbox (Test) API URL
    const url = "https://sandbox.cashfree.com/pg/orders";

    const clientId = process.env.CASHFREE_APP_ID;
    const clientSecret = process.env.CASHFREE_SECRET_KEY;

    // Cashfree ko jo data chahiye wo prepare kar rahe hain
    const payload = {
      order_id: order_id,
      order_amount: order_amount,
      order_currency: "INR",
      customer_details: {
        customer_id: customer_details.customer_id,
        customer_name: customer_details.customer_name,
        customer_phone: customer_details.customer_phone,
      },
      order_meta: {
        return_url: order_meta.return_url
      }
    };

    const headers = {
      "x-client-id": clientId,
      "x-client-secret": clientSecret,
      "x-api-version": "2023-08-01",
      "Content-Type": "application/json"
    };

    // Cashfree ko request bhejo
    const response = await axios.post(url, payload, { headers });

    // Cashfree se jo payment_session_id aaya, use Frontend ko wapas bhej do
    res.status(200).send(response.data);

  } catch (error) {
    console.error("Cashfree Create Order Error:", error.response ? error.response.data : error.message);
    res.status(500).send({
      success: false,
      message: "Failed to create Cashfree order"
    });
  }
};

// 2. VERIFY PAYMENT API (Ye wala missing tha!)
exports.verifyPayment = async (req, res) => {
  try {
    const { order_id } = req.body;
    
    // Cashfree Verify API URL
    const url = `https://sandbox.cashfree.com/pg/orders/${order_id}`;

    const headers = {
      "x-client-id": process.env.CASHFREE_APP_ID, 
      "x-client-secret": process.env.CASHFREE_SECRET_KEY,
      "x-api-version": "2023-08-01",
      "Content-Type": "application/json"
    };

    // Backend se Cashfree ko request bhejo (Yahan CORS nahi lagta)
    const response = await axios.get(url, { headers });

    // Cashfree ka data seedha frontend ko bhej do
    res.status(200).send(response.data);

  } catch (error) {
    console.error("Cashfree Verify Error:", error.response ? error.response.data : error.message);
    res.status(500).send({
      success: false,
      message: "Failed to verify payment with Cashfree"
    });
  }
};