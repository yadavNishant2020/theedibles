'use strict';
const subscription = require('../../plugins/subscriptions/crons/subscription')
/**
 * Cron config that gives you an opportunity
 * to run scheduled jobs.
 *
 * The cron format consists of:
 * [SECOND (optional)] [MINUTE] [HOUR] [DAY OF MONTH] [MONTH OF YEAR] [DAY OF WEEK]
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/concepts/configurations.html#cron-tasks
 */

module.exports = {
  /**
   * Simple example.
   * Every monday at 1am.
   */
  // '0 1 * * 1': () => {
  //
  // }
  //
  /**
   * Simple example.
   * Every day at 1am.
   */
  '00 00 12 * * 0-6': () => {

    subscription.run();
    console.log('running cron JOB every min', new Date());


  }
};
