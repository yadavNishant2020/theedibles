'use strict';
var contentTypes = require('strapi-utils').contentTypes;

/**
 * checkout.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

module.exports = {

  find(params, populate) {
    return strapi.query('cart', 'checkout').find(params, populate);
  },
  fetch(params, populate) {
    return strapi.query('cart', 'checkout').findOne(params, populate);
  },
  async create(data, {files} = {}) {
    const isDraft = contentTypes.isDraft(data, strapi.models.restaurant);
    const validData = await strapi.entityValidator.validateEntityCreation(
      strapi.models.restaurant,
      data,
      {isDraft}
    );

    const entry = await strapi.query('cart', 'checkout').create(validData);

    if (files) {
      // automatically uploads the files based on the entry and the model
      await strapi.entityService.uploadFiles(entry, files, {
        model: 'cart',
        // if you are using a plugin's model you will have to add the `source` key (source: 'users-permissions')
      });
      return this.findOne({id: entry.id});
    }

    return entry;
  },

  async update(params, data, {files} = {}) {
    const existingEntry = await strapi.query('cart', 'checkout').findOne(params);

    const isDraft = contentTypes.isDraft(existingEntry, strapi.models.restaurant);
    const validData = await strapi.entityValidator.validateEntityUpdate(
      strapi.models.restaurant,
      data,
      {isDraft}
    );

    const entry = await strapi.query('cart', 'checkout').update(params, validData);

    if (files) {
      // automatically uploads the files based on the entry and the model
      await strapi.entityService.uploadFiles(entry, files, {
        model: 'cart',
        // if you are using a plugin's model you will have to add the `source` key (source: 'users-permissions')
      });
      return this.findOne({id: entry.id});
    }

    return entry;
  },
};
