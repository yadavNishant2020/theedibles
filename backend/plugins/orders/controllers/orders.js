'use strict';

const { sendOrderMailInQueue } = require('../queue/mail');
const Cart = require('../../checkout/controllers/cart/index');
let Validator = require('validatorjs');
const _ = require('lodash');


/**
 * orders.js controller
 *
 * @description: A set of functions called "actions" of the `orders` plugin.
 */

var Order = {

	/**
	 * Default action.
	 *
	 * @return {Object}
	 */

	index: async (ctx) => {
		// Add your own logic here.

		let userId = ctx.state.user.id;
		let body = ctx.query;


		body._limit = 30;
		body._start = (body.page && !isNaN(body.page) && body.page != 0) ? (body.page - 1) * body._limit : 0;

		body.customer_id = userId;

		delete body.page;
		var orders = await strapi.plugins['orders'].services.orders.find(body);


		const data = orders.map((val) => {
			delete val.updated_by;
			delete val.created_by;
			return val
		});
		// Send 200 `ok`
		return ctx.send({
			data: data,
			success: true
		});
	},

	initOrder: async (ctx) => {

		try {

			await Cart.hasError(ctx);
			let $cart = await Cart.getCart(ctx);
			await Cart.collectTotal(ctx);

			let isSuccess = await Order.checkOrderSuccess(ctx, $cart.id);
			if (isSuccess)
				return ctx.send({
					message: 'Order already completed successfully'
				});
			var health = await strapi.services['customer-health'].findOne({ cart_id: $cart.id });
			var calorie = await strapi.plugins['checkout'].services.calorie.find({
				'cart_id': $cart.id
			});

			let data = Object.assign({}, $cart);
			data.cart_id = $cart.id;
			data.order_status = 'initialized';
			data.payment_status = 'initialized';
			data.calorie = (calorie && calorie.length) ? calorie[0].id : 0;
			data.customer_health = health ? health.id : '';
			data.menu_planner = data.meal_plan_id;
			data.subscription_from = (data.cart_items && data.cart_items.length) ? data.cart_items[0].subscription_from : '';
			data.subscription_to = (data.cart_items && data.cart_items.length) ? data.cart_items[0].subscription_to : '';

			delete data.id;
			delete data.created_at;
			delete data.updated_at;
			delete data.created_by;
			delete data.updated_by;
			let order;
			const res = await strapi.connections.default.transaction(async (transacting) => {
				order = await strapi.plugins['orders'].services.orders.createOrder(data, 'init', { transacting });
			});

			//sendOrderMailInQueue({});

			return ctx.send({
				message: 'order initialized',
				data: order
			});

		} catch (e) {
			console.log(e);
			strapi.log.fatal(e); // ctx.log.fatal(error);
			return ctx.send({
				message: e.message
			}, 400);
		}


	},
	completeOrder: async (ctx) => {
		try {

			let body = ctx.request.body;

			let rules = {
				razorpay_order_id: 'required',
				razorpay_payment_id: 'required',
				razorpay_signature: 'required',
			};
			let validation = new Validator(body, rules);
			if (validation.fails())
				return ctx.send(validation.errors, 422);


			let paymentStatus, orderStatus, payment_id;
			await Cart.hasError(ctx);
			let $cart = await Cart.getCart(ctx);

			let verified = await strapi.plugins['orders'].services['payment-response'].verifyPayment(ctx, $cart.payment_method);


			if (!verified) {
				paymentStatus = 'failed';
				orderStatus = 'initialized';
				payment_id = '';
			} else {
				paymentStatus = 'success';
				orderStatus = 'active';
				payment_id = ctx.request.body.razorpay_payment_id;
			}

			let isSuccess = await Order.checkOrderSuccess(ctx, $cart.id);
			if (isSuccess)
				return ctx.send({
					message: 'Order already completed successfully'
				});

			let data = Object.assign({}, $cart);
			data.cart_id = $cart.id;
			data.order_status = orderStatus;
			data.payment_status = paymentStatus;
			data.payment_id = payment_id;

			delete data.id;
			delete data.created_at;
			delete data.updated_at;
			delete data.created_by;
			delete data.updated_by;

			let $order;
			const res = await strapi.connections.default.transaction(async (transacting) => {
				$order = await strapi.plugins['orders'].services.orders.createOrder(data, 'completed', { transacting });
				await strapi.plugins['orders'].services['payment-response'].savePaymentResponse(ctx, data, $order.id, { transacting });
				await Cart.deActivateCart(ctx, { transacting });
				sendOrderMailInQueue({});
			});


			return ctx.send({
				message: 'order completed',
				data: $order
			});

		} catch (e) {
			console.log(e);
			strapi.log.fatal(e); // ctx.log.fatal(error);

			return ctx.send({
				details: e,
				message: e.message
			}, 400);
		}
	},
	async checkOrderSuccess(ctx, cart_id) {

		let $successfulOrder = await strapi.plugins['orders'].services.orders.findOne({
			cart_id: cart_id,
			payment_status: 'success'
		});
		if ($successfulOrder)
			await Cart.deActivateCart(ctx);

		return $successfulOrder ? 1 : 0;
	},

	async lineItemUpdate(ctx) {
		const lineitem_id = ctx.params.id;
		let body = ctx.request.body;

		var msg = ""
		var status= false
		let exist = []
		
		let order_id = body['order_id']
		var new_date = body.new_date
		var week_number = new_date["week"]
		console.log("new_date--",body)

		
		var date = new Date(Date.UTC(new_date["year"], new_date["month"], new_date["date"]));
		var date_res = date.toISOString().split('T')[0];
		console.log("result---",date_res)
		
		
		// var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		var d = new Date(date_res);
		var dayNumber = d.getDay()-1;
		console.log("Dayname----",dayNumber)

		// Check new meal_date is already exist in under same order id
		// if not exist : update else ignore 
		exist = await strapi.plugins['orders'].services.orders.findOrderItems({'order_id': order_id, meal_date: date_res });
		// console.log("Esxists-----",exist)
		
		if(Object.keys(exist).length === 0) {
			let weekly_data = await strapi.services['menu-week-planner'].findOne({'id': week_number });
			let breakfast_default = weekly_data['dishes'][dayNumber]['breakfast']['dishes'][0]['id']
			let lunch_default = weekly_data['dishes'][dayNumber]['lunch']['dishes'][0]['id']
			let snacks_default = weekly_data['dishes'][dayNumber]['snacks']['dishes'][0]['id']
			let dinner_default = weekly_data['dishes'][dayNumber]['dinner']['dishes'][0]['id']

			let a = await strapi.query('order-items', 'orders').update({order_id: order_id, id:lineitem_id}, {meal_date:date_res, breakfast_dish:breakfast_default, lunch_dish:lunch_default, snacks_dish: snacks_default, dinner_dish: dinner_default });
			
			msg = "Successfuly updated"
			status = true
		} else {
			msg = "Already Exist.."
		}

		return ctx.send({
			data: exist,
			message :msg,
			success: status
		});
	},
	async lineItemDishesUpdate(ctx) {
		try {
		console.log("hhhhh")
			const lineitem_id = ctx.params.id;
			let body = ctx.request.body.params;

			let order_id = body['order_id']

			let res = await strapi.query('order-items', 'orders').update({order_id: order_id, id:lineitem_id}, {breakfast_dish:body.breakfast_dish, lunch_dish:body.lunch_dish, snacks_dish: body.snacks_dish, dinner_dish: body.dinner_dish });
			return ctx.send({
				message: 'Successfully Completed.',
				status: 'success',
				data: res

			});
		
		} catch (e) {
			console.log(e);
			strapi.log.fatal(e); // ctx.log.fatal(error);

			return ctx.send({
				details: e,
				message: e.message,
				status: 'error',
			}, 400);
		}


		
		
	}


};

module.exports = Order;
