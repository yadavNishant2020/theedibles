'use strict';
const Cart = require('../../checkout/controllers/cart/index');
const Address = require('../../../api/addresses/controllers/addresses');

/**
 * A set of functions called "actions" for `razorpay`
 */

var razorpay = {
  instance() {
    return strapi.plugins['orders'].services['razorpay'].instance();
  },

  createOrder: async (ctx, next) => {
    try {

      let cartData = await Cart.getCart(ctx);
      var userId = ctx.state.user.id;
      let singleAddress = await strapi.services.addresses.findOne({'customer_id': userId, cart_id: cartData.id});

      let $receiptId = cartData.id;

      var options = {
        amount: cartData.grand_total * 100,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_" + $receiptId,
        payment_capture: 1 //optional
      };

      const response = await razorpay.instance().orders.create(options);

      await Cart.updatePaymentProviderOrderId(ctx, response.id);
      let resp = {
        "key": "rzp_test_XcBPDn0XtQZ8TE",
        "amount": response.amount,
        "currency": response.currency,
        "name": process.env.APP_NAME,
        "description": "Transaction towards service",
        "image": "https://theedibles.in//wp-content/uploads/2020/03/logo.png",
        "order_id": response.id,
        "prefill": {
          "name": singleAddress.full_name,
          "email": singleAddress.email,
          "contact": singleAddress.phone
        },
        "notes": {
          "address": "Edibles Corporate Office"
        },
        "theme": {
          "color": "#4caf50"
        }
      };
      ctx.send(resp);

    } catch (err) {
      console.log(err);
      ctx.send({success: false, message: err.message}, 400);

    }
  },

};

module.exports = razorpay;
