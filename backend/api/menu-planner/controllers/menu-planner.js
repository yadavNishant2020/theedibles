'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async getThisMeal(menuPlanId) {
    let data;
    data = await strapi.services['menu-planner'].findOne({id: menuPlanId});
    return data;
  },
};
