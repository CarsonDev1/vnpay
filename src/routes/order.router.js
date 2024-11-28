const express = require('express');
const orderController = require('../controller/order.controller');

const router = express.Router();

router.post('/payment/vnpay', orderController.initiateVnpayPayment);

module.exports = router;
