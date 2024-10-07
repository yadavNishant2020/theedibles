'use strict';
const Cart = require('../../../plugins/checkout/controllers/cart/index');

const {parseMultipartData, sanitizeEntity} = require('strapi-utils');

module.exports = {
  /**
   * Create a record.
   *
   * @return {Object}
   */

  async create(ctx) {
    try {
      let entity;
      if (ctx.is('multipart')) {
        const {data, files} = parseMultipartData(ctx);
        if (data.address_type == null) {
          data.address_type = 'normal';
        }
        entity = await strapi.services.addresses.create(data, {files});
      } else {
        var body = ctx.request.body;
        if (body.address_type == null) {
          body.address_type = 'normal';
        }

        body.customer_id = ctx.state.user.id;
        entity = await strapi.services.addresses.create(body);
      }
      return sanitizeEntity(entity, {model: strapi.models.addresses});
    } catch (e) {
      // console.log(e.data);
      return e.data;
    }
  },

  async find(ctx) {
    let entities;
    if (typeof ctx.state.user === 'object')
      ctx.query.customer_id = ctx.state.user.id;
    if (ctx.query._q) {

      entities = await strapi.services.addresses.search(ctx.query);
    } else {
      entities = await strapi.services.addresses.find(ctx.query);
    }

    return entities.map(entity => sanitizeEntity(entity, {model: strapi.models.addresses}));
  },

  async findOneById(ctx, addressId) {
    var userId = ctx.state.user.id;
    return await strapi.services.addresses.findOne({'customer_id': userId, id: addressId});
  },

  async deleteByAddressType(ctx, addressType, cartId) {
    var userId = ctx.state.user.id;
    return await strapi.services.addresses.delete({'customer_id': userId, address_type: addressType, cart_id: cartId});
  },

  count(ctx) {

    if (typeof ctx.state.user === 'object')
      ctx.query.customer_id = ctx.state.user.id;

    if (ctx.query._q) {
      return strapi.services.addresses.countSearch(ctx.query);
    }
    return strapi.services.addresses.count(ctx.query);
  },

  // alter address-delete api for checking customer id and logined user as same
  async delete(ctx) {
    var userId = ctx.state.user.id; 
    const  id  = ctx.params.id;  
    if (userId && userId != undefined && id && id != undefined) {
      return await strapi.services.addresses.delete({'customer_id': userId, id: id});
    }
    return
  },

  async getCartAddress(ctx) {
    let userId;
    if (typeof ctx.state.user === 'object')
      userId = ctx.state.user.id;

    let cart = await Cart.getCart(ctx);

    const result = await strapi
      .query('addresses')
      .model.query(qb => {
        qb.where('customer_id', userId)
          .andWhere('cart_id', cart.id)
          .andWhere('address_type', 'LIKE', '%selected_address_%');
      })
      .fetchAll();

    const fields = result.toJSON();

    return ctx.send({success: true, data: fields})
  },
};
