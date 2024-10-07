<template>
    <div class="col-md-12 Browseproducts" v-if="OrderItemId===0">

        <div class="d-flex flex-row" v-if="!myOrders.length">
            <h5 class="mr-auto"> No active order has been made yet. </h5>
            <a class="verlinksEdit" href="/select-your-plans">Browse products</a>
        </div>
        <div class="row" v-else>

            <table class="table table-responsive">
                <thead>
                <tr>
                    <th scope="col">#ORDER ID</th>
                    <th scope="col">MEAL PLAN NAME</th>
                    <th scope="col">DIET PLAN</th>
                    <th scope="col">SUBSCRIPTION DATE</th>
                    <th scope="col">ACTION</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for=" (order,indx) in myOrders">
                    <th scope="row">{{order.id}}</th>
                    <td>{{ (order.menu_planner && order.menu_planner.name) ? order.menu_planner.name:'' }}</td>
                    <td>{{(order.menu_planner && order.menu_planner.plan_type) ? order.menu_planner.plan_type:''}}</td>
                    <td v-html="subscriptionDateHtml(order.order_items)"></td>
                    <td>
                        <a href="javascript:void(0)" class="btn btn-secondary mt-1" @click="edit(order)">Edit</a>
                        <br>
                        <a :href="'/select-your-plans?quantity=1&mealPlanId='+order.menu_planner.id+'&renewal_cart_id='+order.cart_id.id+'&end_date='+subscriptionDates(order.order_items)['ends']"
                           v-if="checkSubscriptionAndEnableBtn(order.order_items)"
                           class="btn btn-success mt-1">Renew</a>


                    </td>
                </tr>

                </tbody>
            </table>

        </div>
    </div>
    <order-items v-else :item="OrderItem" :itemId="OrderItemId"></order-items>
</template>

<script>
    import api from "../../utils/api";
    import OrderItems from "./OrderItems";

    export default {
        components: {OrderItems},
        props: ['orderTabClicked'],
        data() {
            return {
                myOrders: [],
                OrderItemId: 0,
                OrderItem: {},
            }

        },

        name: "MyOrders",
        async mounted() {
            this.$emit('isLoading', true);
            this.OrderItemId = this.orderTabClicked;
            var myOrders = await api.getMyOrders('');

            if (myOrders.success)
                this.myOrders = myOrders.data.data;
            this.$emit('isLoading', false);
        },
        watch: {
            orderTabClicked: function (val) {
                this.OrderItemId = 0;
               // console.log('orderTabClicked');
            },
        },
        methods: {
            subscriptionDateHtml(items) {

                return '<span>Starting: ' + this.subscriptionDates(items)['starts'] + '</span><br/><span>Ending: ' + this.subscriptionDates(items)['ends'] + '</span>';
            },

            subscriptionDates(items) {
                let starts, ends;
                if (items.length) {
                    starts = items[0].meal_date;
                    ends = items[items.length - 1].meal_date
                }

                return {starts, ends};
            },
            edit(order) {
                this.OrderItemId = order.id;
                this.OrderItem = order;
            }
            ,
            checkSubscriptionAndEnableBtn(items) {
                var datez = this.subscriptionDates(items);
                var endDate = new Date(datez['ends']);

                var threeDaysBack = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate() - 3);
                return (threeDaysBack <= new Date());

            }
        }
    }
</script>

<style scoped>

</style>
