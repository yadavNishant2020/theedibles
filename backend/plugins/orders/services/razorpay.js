'use strict';
const Razorpay = require('razorpay');

/**
 * `razorpay` service.
 */

var razorpay = {
  instance() {
    return new Razorpay({
      key_id: process.env.RAZORPAY_KEY,
      key_secret: process.env.RAZORPAY_SECRET
    });
  },
  transform: (ctx, cart) => {
    return {
      reference_id: cart.payment_id,
      method: cart.payment_method,
      status: cart.payment_status,
      response: ctx.request.body
    };
  },

  verifyPayment: (ctx) => {

    const crypto = require("crypto");
    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET);
    hmac.update(ctx.request.body.razorpay_order_id + "|" + ctx.request.body.razorpay_payment_id);
    let generatedSignature = hmac.digest('hex');
    return generatedSignature === ctx.request.body.razorpay_signature;
  }


};

module.exports = razorpay;