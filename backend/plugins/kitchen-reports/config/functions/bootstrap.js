'use strict';

const _ = require('lodash');


module.exports = async () => {

  // Add permissions
  const actions = [
    {
      section: 'plugins',
      // category: 'kitchen-reports',
      displayName: 'Access the kitchen-reports page',
      uid: 'kitchen-reports.read',
      pluginName: 'kitchen-reports',
    },
  ];

  const { actionProvider } = strapi.admin.services.permission;
  actionProvider.register(actions);
};
