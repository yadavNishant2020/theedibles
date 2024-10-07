import axios from "axios";
import {getStrapiMedia} from '~/utils/medias'
import api from "./api";

export default {
    async createOrder(vueScope) {

        try {
            const results = await axios.post(
                getStrapiMedia('/orders/razorpay/order')
            );

            results.data["handler"] = function (response) {

                api.completeOrder(response)
            };

            results.data["modal"] = {
                "ondismiss": function () {
                  //  console.log('Checkout form closed');
                    vueScope.isLoading = false;
                    vueScope.isPaymentDisabled = false;
                }
            };


            this.pay(results.data);
            return results.data;

        } catch (error) {

            console.log(error);
            return [];
        }


    },
    pay(options) {
        var rzp1 = new Razorpay(options);
        rzp1.on('payment.failed', function (response) {
            console.log(response.error);
        });

        rzp1.open();
    }
}
