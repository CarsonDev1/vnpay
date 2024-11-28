// payment.controller.js
const { createVnpayPayment } = require('../service/vnpay.service.js');

const initiateVnpayPayment = async (req, res) => {
	try {
		const { orderId, amount, orderDescription, bankCode } = req.body;
		const ipAddr = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

		const vnpayResponse = await createVnpayPayment(orderId, amount, ipAddr, orderDescription, bankCode);

		if (vnpayResponse.payUrl) {
			res.status(200).json({ payUrl: vnpayResponse.payUrl });
		} else {
			throw new Error('Failed to generate VNPAY payment URL');
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = {
	initiateVnpayPayment,
};
