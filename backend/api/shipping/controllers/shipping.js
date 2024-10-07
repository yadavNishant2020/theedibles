'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {

  async findShippingInfo(meals_per_day, duration_type) {
    let entities;
    entities = await strapi.services.shipping.findOne({meals_per_day, duration_type});
    return entities;
  }
};
