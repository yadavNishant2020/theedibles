'use strict';


async function mail(data) {
  console.log(process.env);
  const templateId = 2,
    to = data.customer_email,
    from = process.env.MAIL_FROM,
    replyTo = process.env.MAIL_NOREPLY,
    subject = "Edibles: Subscription notification";

  try {
    await strapi.plugins["email-designer"].services.email.send({
      templateId,
      to,
      from,
      replyTo,
      subject,
      data: data,
    });
  } catch
    (err) {
    console.log(err);
    strapi.log.debug('📺: ', err);
    // return ctx.badRequest(null, err);
  }

}


module.exports = {
  run: async () => {

    const yesterday = new Date();

    yesterday.setDate(yesterday.getDate() + 3);


    var month = (yesterday.getMonth() + 1);
    month = month <= 9 ? '0' + month : month;
    var cdate = yesterday.getDate();
    cdate = cdate <= 9 ? '0' + cdate : cdate;
    var returnKey = yesterday.getFullYear() + '-' + month + '-' + cdate;

    var orders = await strapi.plugins['orders'].services.orders.find({subscription_to: returnKey});

    if (orders) {

      for (let order of orders) {
        //console.log(order);
        await mail(order);
      }
    }

    console.log('Subscription mail completed');

  }
};