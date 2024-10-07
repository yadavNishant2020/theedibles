'use strict';
const cart = require('../../../plugins/checkout/controllers/cart/index');
const {sanitizeEntity} = require('strapi-utils');


module.exports = {


  async find(ctx) {
    let entities;
    ctx.query.customer_id = ctx.state.user.id;

    if (ctx.query._q) {
      entities = await strapi.services['customer-health'].search(ctx.query);

    } else {
      entities = await strapi.services['customer-health'].find(ctx.query);
    }

    return entities.map(entity => sanitizeEntity(entity, {model: strapi.models['customer-health']}));
  },

  async create(ctx) {
    try {
      let entity;
      if (ctx.is('multipart')) {
        const {data, files} = parseMultipartData(ctx);

        entity = await strapi.services['customer-health'].create(data, {files});
      } else {
        let cartData = await cart.getCart(ctx);
        if (!cartData)
          return utility.sendError(ctx, 'Cart is empty');

        var body = ctx.request.body;

        body.customer_id = ctx.state.user.id;
        body.cart_id = cartData.id;
        body.exercise_regularly = body.exercise_regularly !== 'no';

        await strapi.services['customer-health'].delete({
          customer_id: body.customer_id,
          cart_id: body.cart_id
        });

        entity = await strapi.services['customer-health'].create(body);
      }
      let resp = await cart.collectTotal(ctx);
      if (resp.success)
        return ctx.send({success: true, message: 'Successfully saved'});
      else
        return ctx.send(resp, 400);


    } catch (e) {
      console.log(e);
      if (e.message === 'ValidationError')
        return ctx.send({...e.data, success: false, message: e.message}, 422);
      else return null;
    }
  },
};
