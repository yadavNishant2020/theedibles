const utility = require('../../../utility/utility');

const queue = utility.neQueue('orderMailQueue');

const sendOrderMailInQueue = (data) => {
  return queue.createJob(data).save();
};

queue.process(3, async (job, done) => {

  try {


    const templateId = process.env.NEW_ORDER_CONFIRMATION_EMAIL,
      to = job.data.order.customer_email,
      from = process.env.MAIL_FROM,
      replyTo = process.env.MAIL_NOREPLY,
      subject = "Edibles: New Order #ID-" + job.data.order.id,
      order = job.data.order;

    try {
      await strapi.plugins["email-designer"].services.email.send({
        templateId,
        to,
        from,
        replyTo,
        subject,
        data: {order, address: {}, order_items: {}},
      });
    } catch (err) {
      strapi.log.debug('📺: ', err);
      return ctx.badRequest(null, err);
    }

    console.log(`🧾  Mail queue  served 😋`);

    done();
  } catch (e) {
    strapi.log.fatal(e); // ctx.log.fatal(error);
    console.log('BG error', e);
  }


  // Notify the client via push notification, web socket or email etc.
});


module.exports.sendOrderMailInQueue = sendOrderMailInQueue;