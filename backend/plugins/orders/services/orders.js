'use strict';
const {addOrderItems} = require("../queue/order");

var utility = require('../../../utility/utility');

var contentTypes = require('strapi-utils').contentTypes;

/**
 * orders.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

var Order = {

  async createOrder(data, status, {transacting} = {}) {

    let entity;

    let $order = await this.findOne({cart_id: data.cart_id});
    if ($order) {
      //update
      entity = await this.update({id: $order.id}, data, {transacting});
    } else {
      entity = await this.create(data, {transacting});
    }
    if (status === 'init') {

      let mealsData = data.cart_items[0].meal_plan_details,
        mealsDataKeys = Object.keys(mealsData);

      /*
            const campaigns = await strapi.connections.default.raw(
              "delete  FROM order_items where order_id= "+entity.id+";"
            );*/

      const knex = strapi.connections.default;


      //  console.log(campaigns);
      //  await strapi.query('order-items', 'orders').delete({order_id: entity.id});

      var bgData = [];
      for (const val of mealsDataKeys) {
        let mealDate = utility.convertToDate(val);
        var item = {
          order_id: entity.id,
          meal_date: mealDate,
          lunch_dish: mealsData[val].lunch,
          breakfast_dish: mealsData[val].breakfast,
          snacks_dish: mealsData[val].snacks,
          dinner_dish: mealsData[val].dinner,
          menu_planner: data.meal_plan_id,
          price: data.sub_total
        };
        bgData.push(item)
      }

      console.log('Before insert = ' + new Date());
      const result = await knex('order_items')
        .where('order_id', entity.id).del()
        .then(function () {
          return knex('order_items').insert(bgData);
        });
      console.log('Before after = ' + new Date());

      // addOrderItems(bgData);

    }


    return entity;

  },

  async createOrderItems(data, {transacting} = {}) {


    const isDraft = contentTypes.isDraft(data, strapi.models['order-items']);
    const validData = await strapi.entityValidator.validateEntityCreation(
      strapi.models['order-items'],
      data,
      {isDraft}
    );

    return await strapi.query('order-items', 'orders').create(validData, {transacting});
  },

  findOne(params, populate) {
    return strapi.query('order', 'orders').findOne(params, populate);
  },
  find(params, populate) {
    return strapi.query('order', 'orders').find(params, populate);
  },

  findOrderItems2(param) {


    const knex = strapi.connections.default;
    var query = knex('order_items')
      .join('menu_planners', 'menu_planners.id', 'order_items.menu_planner');
    /*   .join('property_types', 'properties.property_type', 'property_types.id')*/


    query.select('order_items.*')

    if (param.plan_type)
      query.where('menu_planners.plan_type', param.plan_type)


    if (param.date_from && param.date_to)
      query.whereBetween('order_items.meal_date', [param.date_from, param.date_to])


    return query;


  },

  findOrderItems(params, populate) {

    return strapi.query('order-items', 'orders').find(params, populate);

  },

  async update(params, data, {files, transacting} = {}) {

    const existingEntry = await strapi.query('order', 'orders').findOne(params);

    const isDraft = contentTypes.isDraft(existingEntry, strapi.models['order-items']);

    const validData = await strapi.entityValidator.validateEntityUpdate(
      strapi.models.order,
      data,
      {isDraft}
    );

    const entry = await strapi.query('order', 'orders').update(params, validData, {transacting});

    if (files) {
      // automatically uploads the files based on the entry and the model
      await strapi.entityService.uploadFiles(entry, files, {
        model: 'order',
        // if you are using a plugin's model you will have to add the `source` key (source: 'users-permissions')
      });
      return this.findOne({id: entry.id});
    }

    return entry;
  },

  async create(data, {files, transacting} = {}) {
    const isDraft = contentTypes.isDraft(data, strapi.models['order-items']);
    const validData = await strapi.entityValidator.validateEntityCreation(
      strapi.models.order,
      data,
      {isDraft}
    );

    const entry = await strapi.query('order', 'orders').create(validData, {transacting});

    if (files) {
      // automatically uploads the files based on the entry and the model
      await strapi.entityService.uploadFiles(entry, files, {
        model: 'order',
        // if you are using a plugin's model you will have to add the `source` key (source: 'users-permissions')
      });
      return this.findOne({id: entry.id});
    }

    return entry;
  },
};

module.exports = Order;