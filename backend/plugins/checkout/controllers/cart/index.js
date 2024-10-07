'use strict';
const utility = require("../../../../utility/utility");
const mealPlan = require('../../../../api/menu-planner/controllers/menu-planner');
const shipping = require('../../../../api/shipping/controllers/shipping');

var xcart = {
  async getCart(ctx) {
    let entity;
    let userId = ctx.state.user.id;

    entity = await strapi.plugins['checkout'].services.cart.find({'customer_id': userId, 'is_active': 1});
    return entity.length ? entity[0] : null;
  },

  async addToCart(ctx) {
    var body = ctx.request.body;
    let entity;
    let userId = ctx.state.user.id;
    let mealPlanId = body.mealPlanId;
    let meal = await mealPlan.getThisMeal(mealPlanId);
    let cart = await xcart.getCart(ctx);

    if (meal) {
      let cartData = {
        'customer_id': userId,
        'customer_email': ctx.state.user.email,
        'customer_name': ctx.state.user.full_name,
        'items_count': 1,
        'items_qty': body.quantity ? body.quantity : 1,
        'grand_total': meal.price,
        'sub_total': meal.price,
        'tax_total': 0,
        'is_active': 1,
        'meal_plan_id': mealPlanId,
      };
      if (!cart) {
        entity = await strapi.plugins['checkout'].services.cart.create(cartData);

      } else {
        if (cart.meal_plan_id != mealPlanId) {
          //clear old dishes data
          await xcart.clearCart(cart.id);
          console.log('clear old dishes data');
        }


        entity = await strapi.plugins['checkout'].services.cart.update({id: cart.id}, cartData);

      }

      return {'success': true}
    } else {
      return {'success': false, 'message': 'Meal not found'}
    }
  },

  async addCartItems(ctx) {
    var body = ctx.request.body;
    let entity;
    let userId = ctx.state.user.id;

    let cart = await xcart.getCart(ctx);
    let mealPlanId = cart.meal_plan_id;
    let meal = await mealPlan.getThisMeal(mealPlanId);
    let keys = Object.keys(body.selected_dishes);
    let key_last = keys.length - 1;

    let from_year = keys[0].substr(0, 4)
    let from_month = keys[0].substr(4, 2)
    let from_day = keys[0].substr(6, 2)

    let to_year = keys[key_last].substr(0, 4)
    let to_month = keys[key_last].substr(4, 2)
    let to_day = keys[key_last].substr(6, 2)

    if (meal && cart) {
      let cartData = {
        'quantity': cart.items_qty,
        'name': meal.name,
        'cart_id': cart.id,
        'diet': '',
        'subscription_from': from_year + '-' + from_month + '-' + from_day,
        'subscription_to': to_year + '-' + to_month + '-' + to_day,
        'meal_plan_details': body.selected_dishes,
      };
      var cartItems = await strapi.plugins['checkout'].services['cart-items'].find({cart_id: cart.id});

      if (!cartItems.length) {
        entity = await strapi.plugins['checkout'].services['cart-items'].create(cartData);
      } else {
        entity = await strapi.plugins['checkout'].services['cart-items'].update({cart_id: cart.id}, cartData);
      }

      return {'success': true}
    } else {
      return {'success': false, 'message': 'Meal not found'}
    }
  },

  async clearCart(cartId) {

    await strapi.plugins['checkout'].services['cart-items'].delete({cart_id: cartId});

  },

  async removeItem() {

  },
  async hasError(ctx, validatePincode = true) {

    let cart = await this.getCart(ctx);
    if (!cart) {
      throw new Error('Cart empty');
    }


    if (validatePincode) {
      let addresses = await strapi.api.addresses.services.addresses.find({cart_id: cart.id});

      if (addresses && addresses.length) {

        for (let address of addresses) {

          let isServiceable = await utility.checkPincodeServiceable(address.pincode);

          console.log('isServiceable=' + isServiceable);
          if (!isServiceable) {
            throw new Error('Pincode not serviceable ' );
          }

        }
      }

    }

  },
  async collectTotal(ctx) {

    try {
      await this.hasError(ctx);
      let cart = await this.getCart(ctx);


      let selectedMealPlan = await mealPlan.getThisMeal(cart.meal_plan_id);

      let tax = await this.calculateTax(selectedMealPlan.tax, cart);
      let delivery = await this.calculateDeliveryCharge(selectedMealPlan.duration_type, selectedMealPlan.per_day_meals);

      let grand_total = cart.sub_total + tax + delivery;
      await strapi.plugins['checkout'].services.cart.update({id: cart.id}, {
        tax_total: tax,
        delivery_charge: delivery,
        grand_total: grand_total
      });
      return {success: true};
    } catch (e) {
      console.log(e);
      return {success: false, message: e.message};
    }


  },
  async calculateTax(tax, cart) {

    let taxPercentage = (tax && tax.tax_per) ? tax.tax_per : 5;
    return (cart.sub_total * taxPercentage) / 100;
  },
  async calculateDeliveryCharge(duration_type, per_day_meals) {

    //meals_per_day, duration_type
    let shippingDetails = await shipping.findShippingInfo(per_day_meals, duration_type);
    if (shippingDetails) {
      var shippingTax = (shippingDetails.price * shippingDetails.tax_per) / 100;
      return shippingTax + shippingDetails.price;
    } else {
      console.log('No shipping details found for per day meals=' + per_day_meals + ' , Duration =' + duration_type);
    }

    return 0;

  },

  async deActivateCart(ctx, {transacting} = {}) {
    let $cart = await this.getCart(ctx);
    await strapi.plugins['checkout'].services.cart.update({id: $cart.id}, {is_active: 0});
    return 1;
  },

  async updatePaymentProviderOrderId(ctx, id) {

    await this.hasError(ctx);
    let $cart = await this.getCart(ctx);
    var idsObj = $cart.payment_provider_order_id;
    if (idsObj !== null && typeof idsObj['orderIds'] === 'object')
      idsObj['orderIds'].push(id);
    else
      idsObj = {'orderIds': [id]};

    await strapi.plugins['checkout'].services.cart.update({id: $cart.id}, {payment_provider_order_id: idsObj});
    return 1;

  }
};

module.exports = xcart;