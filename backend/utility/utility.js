module.exports = {

  sendError: (ctx, message, code) => {

    if (typeof message === 'object') {
      return ctx.send({
        'success': false,
        errors: message
      }, code || 404);
    }

    return ctx.send({
      'success': false,
      message: message || 'Unknown Error'
    }, code || 404);

  },
  convertToDate(dateNum) {

    try {
      let year = dateNum.substr(0, 4),
        month = dateNum.substr(4, 2),
        day = dateNum.substr(6, 2);

      return year + '-' + month + '-' + day;
    } catch (e) {
      return '';

    }
  },
  neQueue(Qname) {

    const Queue = require('bee-queue');

    const options = {
      removeOnSuccess: true,
      redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD,
      },
    };
    return new Queue(Qname, options);
  },
  async checkPincodeServiceable(pincode) {

    let seviceablePincodes = await strapi.api.pincodes.services.pincodes.findOne();
    var pincodeArray = seviceablePincodes.codes.split(',');

    var flag = 0;
    if (pincodeArray.length) {
      pincodeArray.forEach(pin => {

        if (pin == pincode) {
          flag = 1;
          return 1;
        }
      })
    }

    return flag;

  }
};
