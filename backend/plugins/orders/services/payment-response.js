'use strict';
var contentTypes = require('strapi-utils').contentTypes;

/**
 * `payment-response` service.
 */

var PaymentResponse = {
  verifyPayment: async (ctx, payment_method) => {

    return await strapi.plugins['orders'].services[payment_method].verifyPayment(ctx);
  },

  savePaymentResponse: async (ctx, cart, orderId, {transacting} = {}) => {

    let response = await PaymentResponse.transformResponse(ctx, cart);
    response.cart_id = cart.cart_id;
    response.order_id = orderId;
    return await PaymentResponse.create(response, {transacting});

  },

  transformResponse: async (ctx, cart) => {
    return await strapi.plugins['orders'].services[cart.payment_method].transform(ctx, cart);
  },

  async create(data, {transacting} = {}) {

    const isDraft = contentTypes.isDraft(data, strapi.models['payment-response']);
    const validData = await strapi.entityValidator.validateEntityCreation(
      strapi.models['payment-response'],
      data,
      {isDraft}
    );

    return await strapi.query('payment-response', 'orders').create(validData, {transacting});
  },

};

module.exports = PaymentResponse;