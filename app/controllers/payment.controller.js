const axios = require("axios");

exports.createOrder = async (req, res) => {
  try {
    const { order_id, order_amount, customer_details, order_meta } = req.body;

    // Cashfree Sandbox (Test) API URL
    const url = "https://sandbox.cashfree.com/pg/orders";

    // 👇 APNI CASHFREE SANDBOX KEYS YAHAN DAALO 👇
    const clientId = "TEST1056301882f9cbeea57681cea2f681036501"; 
    const clientSecret = "cfsk_ma_test_7619f22e5a8cac9ab7ac496cd65e15cb_e739ac03";

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
      message: "Failed to create Cashfree order",
      error: error.response ? error.response.data : error.message
    });
  }
};