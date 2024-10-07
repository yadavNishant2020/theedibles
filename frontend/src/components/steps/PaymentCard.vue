<template>
    <section class="Proceedtopayment ">
        <div class="container ">
            <div class="row">
                <div class="col-md-3">
                    <h3 class="mt-5 mb-5">Checkout</h3>


                </div>
                <div class="col-md-9">
                    <g-image src="~/assets/img/6960.resized.png" alt="background image"/>
                </div>
            </div>
            <div class="contentinproceed">
                <h3 class="mt-1 mb-1 text-center mobCheckout">Checkout</h3>

                <div class="d-flex flex-row firline ">
                    <h6 class="mr-auto mt-3 mb-4 ">{{cartData.data ? cartData.data.cart_items[0].name:''}} </h6>
                    <h6 class="mt-3 mb-4 ml-4"><strong> ₹{{cartData.data ? cartData.data.sub_total: ''}} </strong></h6>
                </div>
                <div class="d-flex flex-row mt-3 ">
                    <h6 class="mr-auto "><strong>Bill Details</strong></h6>

                </div>
                <div class="d-flex flex-row mt-3">
                    <h6 class="mr-auto ">Item Total</h6>
                    <h6><strong>₹{{cartData.data ? cartData.data.sub_total:''}}</strong></h6>
                </div>
                <div class="d-flex flex-row mt-3">
                    <h6 class="mr-auto ">Delivery Fee</h6>
                    <h6><strong>₹{{cartData.data ? cartData.data.delivery_charge:''}}</strong></h6>
                </div>
                <div class="d-flex flex-row mt-3 mb-5 firline">
                    <h6 class="mr-auto mb-5">Tax</h6>
                    <h6 class=" mb-5"><strong>₹{{cartData.data ? cartData.data.tax_total:''}}</strong></h6>
                </div>
                <div class="d-flex flex-row mt-3">
                    <h6 class="mr-auto "><strong>Amount Payable</strong></h6>
                    <h6><strong>₹{{cartData.data ? cartData.data.grand_total:''}}</strong></h6>
                </div>
                <div class="d-flex flex-row mt-3">
                    <a href="#" @click="pay()" :disabled="isPaymentDisabled">Proceed to payment</a>
                </div>


            </div>
        </div>


    </section>
</template>

<script>

    import XTitle from '~/components/XTitle'
    import api from '~/utils/api'
    import Loading from 'vue-loading-overlay';

    export default {
        name: "PaymentCard",
        components: {XTitle, Loading},
        data() {
            return {}
        },
        props: ['cartData', 'isPaymentDisabled'],
        created() {

        },
        watch: {},
        async mounted() {
           // console.log('cartData', this.isPaymentDisabled);

        },
        methods: {
            pay() {
                if (!this.isPaymentDisabled)
                    this.$emit('processPayment', 'sales')
            },
            back() {
                this.$emit('onGoBack', 'showHealthAndFoodCard')
            }
        }
    }
</script>

<style scoped>

</style>
