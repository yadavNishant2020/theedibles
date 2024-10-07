'use strict';
const cart = require('./cart/index');
const menuPlanner = require('../../../api/menu-planner/controllers/menu-planner');
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
    // Add your own logic here.

    // Send 200 `ok`
    ctx.send({
      message: 'ok'
    });
  },

  calorie: async (ctx) => {
    try {
      let body = ctx.request.body;

      let rules = {
        goal: 'required|string',
        physical_activity: 'required|numeric',
        gender: 'required|string',
        age: 'required|numeric',
        dob: 'required|date',
        height: 'required|numeric',
        weight: 'required|numeric',
      };
      let validation = new Validator(body, rules);
      if (validation.fails())
        return ctx.send(validation.errors, 422)

      let cartData = await cart.getCart(ctx);
      if (cartData) {
        let userId = ctx.state.user.id;
        let entity, calorie_entity;

        entity = await strapi.plugins['checkout'].services.calorie.find({
          'customer_id': userId,
          'cart_id': cartData.id
        });
        entity = entity && entity.length ? entity[0] : null;

        if (!entity) {
          body.customer_id = userId;
          body.cart_id = cartData.id;
          calorie_entity = await strapi.plugins['checkout'].services.calorie.create(body);
        } else {
          calorie_entity = await strapi.plugins['checkout'].services.calorie.update({id: entity.id}, body);
        }

        ctx.send({
          message: 'Saved Successfully',
          success: true
        });
      }
    } catch (e) {
      console.log(e);
      strapi.log.fatal(e); // ctx.log.fatal(error);

      ctx.send({
        message: e,
        success: false
      }, 400);
    }
  },

  getCalorie: async (ctx) => {
    try {

      await cart.hasError(ctx, false);
      let cartData = await cart.getCart(ctx);
      if (cartData) {
        let userId = ctx.state.user.id;
        let renewal_cart_id = ctx.query.renewal_cart_id;

        let entity;
        entity = await strapi.plugins['checkout'].services.calorie.find({
          'customer_id': userId,
          'cart_id': renewal_cart_id ? renewal_cart_id : cartData.id
        });
        entity = entity && entity.length ? entity[0] : null;

        if (!entity) {
          console.log('here');
          entity = await strapi.plugins['checkout'].services.calorie.findOne({
            'customer_id': userId,
            '_sort': 'cart_id:DESC'
          });
        }

        console.log(entity);

        if (entity)
          delete entity.cart_id;
        ctx.send({
          data: entity,
          success: true
        });
      }
    } catch (e) {
      strapi.log.fatal(e); // ctx.log.fatal(error);
      ctx.send({
        message: e,
        success: false
      }, 400);
    }
  },

  dishes: async (ctx) => {
    try {
      var defaultMealCount = {'Weekly': 6, 'Monthly': 26};

      let body = ctx.request.body;

      await cart.hasError(ctx, false);
      let cartData = await cart.getCart(ctx);

      let mealPlan = await menuPlanner.getThisMeal(cartData.meal_plan_id);
      let dishsCount = defaultMealCount[mealPlan.duration_type];
      let rules = {
        selected_dishes: 'required'
      };
      let validation = new Validator(body, rules);
      if (validation.fails())
        return ctx.send(validation.errors, 422)

      var selectedDishesLength = Object.keys(body.selected_dishes).length;
      if (dishsCount !== selectedDishesLength)
        throw new Error('Please select ' + dishsCount + ' Dish');

      if (cartData) {
        await cart.addCartItems(ctx);
        ctx.send({
          message: 'Saved Successfully',
          success: true
        });
      }
    } catch (e) {
      console.log(e)
      strapi.log.fatal(e); // ctx.log.fatal(error);

      ctx.send({
        message: e.message,
        success: false
      }, 400);
    }
  },

  getDishes: async (ctx) => {
    try {

      await cart.hasError(ctx, false);
      let cartData = await cart.getCart(ctx);

      return ctx.send({
        data: (cartData.cart_items && cartData.cart_items.length) ? cartData.cart_items[0].meal_plan_details : [],
        success: true
      });

    } catch (e) {
      console.log(e)
      strapi.log.fatal(e); // ctx.log.fatal(error);
      return ctx.send({
        message: e.message,
        success: false
      }, 400);
    }
  },

}
;
