'use strict';
const cart = require('./cart/index');
const utility = require('../../../utility/utility');
const address = require('../../../api/addresses/controllers/addresses');
const {sanitizeEntity} = require('strapi-utils');
let Validator = require('validatorjs');
/**
 * checkout.js controller
 *
 * @description: A set of functions called "actions" of the `checkout` plugin.
 */

module.exports = {

  /**
   * Default action.
   *
   * @return {Object}
   */

  index: async (ctx) => {

    let cartData = await cart.getCart(ctx);
    cartData.success = true;
    return sanitizeEntity(cartData, {model: strapi.plugins['checkout'].models.cart});

  },
  create: async (ctx) => {

    let data = ctx.request.body;

    let rules = {
      quantity: 'required|numeric|min:1',
      mealPlanId: 'required|numeric',
    };
    let validation = new Validator(data, rules);
    if (validation.fails())
      return ctx.send(validation.errors, 422);

    let resp = await cart.addToCart(ctx);
    if (resp.success) {
      let cartData = await cart.getCart(ctx);
      data = {'success': true, data: cartData}
    } else {
      return ctx.send(resp, 400);
    }
    return sanitizeEntity(data, {model: strapi.plugins['checkout'].models.cart});
  },

  clearCart: async (ctx) => {
    // Add your own logic here.

    // Send 200 `ok`
    ctx.send({
      message: 'clearCart'
    });
  },
  removeItem: async (ctx) => {
    // Add your own logic here.

    // Send 200 `ok`
    ctx.send({
      message: 'removeItem'
    });
  },

  addCartAddress: async (ctx) => {


    let data = ctx.request.body;

    let rules = {
      dinner: 'required',
      breakfast: 'required|numeric',
      lunch_snacks: 'required|numeric',
    };
    let validation = new Validator(data, rules);
    if (validation.fails())
      return ctx.send(validation.errors, 422);


    var body = Object.assign({}, ctx.request.body);
    let addressTypes = ['selected_address_breakfast', 'selected_address_lunch_snacks', 'selected_address_dinner'];
    let addressTypesKeys = {
      'breakfast': 'selected_address_breakfast',
      'lunch_snacks': 'selected_address_lunch_snacks',
      'dinner': 'selected_address_dinner'
    };


    let cartData = await cart.getCart(ctx);

    if (!cartData)
      return utility.sendError(ctx, 'Cart is empty');

    let cartId = cartData.id;

    let selectedAddType = addressTypesKeys[body.address_type];


    for (const val of Object.keys(addressTypesKeys)) {


      await address.deleteByAddressType(ctx, addressTypesKeys[val], cartId);


      let addressResult = await address.findOneById(ctx, body[val]);
      if (!addressResult)
        return utility.sendError(ctx, 'Address not found');

      delete addressResult.created_at;
      delete addressResult.updated_at;
      delete addressResult.address_type;
      delete addressResult.id;

      ctx.request.body = Object.assign(body, addressResult);
      ctx.request.body['address_type'] = addressTypesKeys[val];
      ctx.request.body.cart_id = cartId;


      var pincode = addressResult.pincode;


      let isServiceable = await utility.checkPincodeServiceable(pincode);
      if (!isServiceable) {
        return utility.sendError(ctx, 'Pincode not serviceable ', 400)
      }

      address.create(ctx).then((resp) => {

        if (typeof resp.errors === 'object') {
          return utility.sendError(ctx, resp.errors, 400)
        }

      }).catch(err => {
        strapi.log.fatal(e); // ctx.log.fatal(error);
        return utility.sendError(ctx, err, 400)
      })

    }


    // Send 200 `ok`
    ctx.send({
      message: 'Address Saved Successfully'
    });
  },

  async collectTotal(ctx) {

    let resp = await cart.collectTotal(ctx);
    if (resp.success)
      return ctx.send({success: true, message: 'Successfully saved'});
    else
      return ctx.send(resp, 400);

  }
};
