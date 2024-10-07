const utility = require('../../../utility/utility');

const orderItemsQueue = utility.neQueue('orderItems');


const addOrderItems = (order) => {
  return orderItemsQueue.createJob(order).save();
};

orderItemsQueue.process(3, async (job, done) => {

  try {
    var items = job.data;
    for (const item of items) {
      var $orderItem = await strapi.plugins['orders'].services.orders.createOrderItems(item, 'completed');
      console.log(`🧾 ${item.order_id} x ${item.meal_date} - ${$orderItem.id} ready to be served 😋`);
    }

    done();
  } catch (e) {
    strapi.log.fatal(e); // ctx.log.fatal(error);
    console.log('BG error', e);
  }


  // Notify the client via push notification, web socket or email etc.
});


module.exports.addOrderItems = addOrderItems;