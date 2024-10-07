
const injectReducer = require('./utils/injectReducer').default;
const injectSaga = require('./utils/injectSaga').default;
const useInjectReducer = require('./utils/injectReducer').useInjectReducer;
const useInjectSaga = require('./utils/injectSaga').useInjectSaga;
const { languages } = require('./i18n');

window.strapi = Object.assign(window.strapi || {}, {
  node: MODE || 'host',
  backendURL: BACKEND_URL === '/' ? window.location.origin : BACKEND_URL,
  languages,
  currentLanguage:
  window.localStorage.getItem('strapi-admin-language') ||
  window.navigator.language ||
  window.navigator.userLanguage ||
  'en',
  injectReducer,
  injectSaga,
  useInjectReducer,
  useInjectSaga,
});

module.exports = {
  'activitylog': require('../../plugins/strapi-plugin-activitylog/admin/src').default,
'content-manager': require('../../plugins/strapi-plugin-content-manager/admin/src').default,
'content-type-builder': require('../../plugins/strapi-plugin-content-type-builder/admin/src').default,
'email': require('../../plugins/strapi-plugin-email/admin/src').default,
'email-designer': require('../../plugins/strapi-plugin-email-designer/admin/src').default,
'graphql': require('../../plugins/strapi-plugin-graphql/admin/src').default,
'upload': require('../../plugins/strapi-plugin-upload/admin/src').default,
'users-permissions': require('../../plugins/strapi-plugin-users-permissions/admin/src').default,
  'checkout': require('../../../plugins/checkout/admin/src').default,
'kitchen-reports': require('../../../plugins/kitchen-reports/admin/src').default,
'orders': require('../../../plugins/orders/admin/src').default,
'subscriptions': require('../../../plugins/subscriptions/admin/src').default
}
  