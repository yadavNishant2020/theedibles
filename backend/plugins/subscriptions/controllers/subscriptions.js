'use strict';
var childProcess = require('child_process');

/**
 * subscriptions.js controller
 *
 * @description: A set of functions called "actions" of the `subscriptions` plugin.
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
  buildHook: async (ctx) => {

    childProcess.exec('sh /var/www/theedibles/backend/build.sh', function (err, stdout, stderr) {
      if (err) {

        console.error(err);
        console.log('Error Execution completed');


      } else {

        var shell = require('shelljs');
        shell.cd('..');
        shell.cd('frontend');
        shell.exec('rm -rf distBkp');
        shell.exec('cp -r dist distBkp');


        console.log('Execution completed');

      }
    });

    return ctx.send({
      message: 'Build executed'
    });
  },

};
