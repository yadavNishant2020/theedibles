'use strict';
var contentTypes = require('strapi-utils').contentTypes;

/**
 * checkout.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

module.exports = {

  find(params, populate) {
    return strapi.query('calorie', 'checkout').find(params, populate);
  },
  findOne(params, populate) {
    return strapi.query('calorie', 'checkout').findOne(params, populate);
  },
  fetch(params, populate) {
    return strapi.query('calorie', 'checkout').findOne(params, populate);
  },
  async create(data, {files} = {}) {
    const isDraft = contentTypes.isDraft(data, strapi.models.calorie);
    const validData = await strapi.entityValidator.validateEntityCreation(
      strapi.models.calorie,
      data,
      {isDraft}
    );

    const entry = await strapi.query('calorie', 'checkout').create(validData);

    if (files) {
      // automatically uploads the files based on the entry and the model
      await strapi.entityService.uploadFiles(entry, files, {
        model: 'calorie',
        // if you are using a plugin's model you will have to add the `source` key (source: 'users-permissions')
      });
      return this.findOne({id: entry.id});
    }

    return entry;
  },
  async update(params, data, {files} = {}) {
    const existingEntry = await strapi.query('calorie', 'checkout').findOne(params);

    const isDraft = contentTypes.isDraft(existingEntry, strapi.models.calorie);
    const validData = await strapi.entityValidator.validateEntityUpdate(
      strapi.models.calorie,
      data,
      {isDraft}
    );

    const entry = await strapi.query('calorie', 'checkout').update(params, validData);

    if (files) {
      // automatically uploads the files based on the entry and the model
      await strapi.entityService.uploadFiles(entry, files, {
        model: 'calorie',
        // if you are using a plugin's model you will have to add the `source` key (source: 'users-permissions')
      });
      return this.findOne({id: entry.id});
    }

    return entry;
  },
};
