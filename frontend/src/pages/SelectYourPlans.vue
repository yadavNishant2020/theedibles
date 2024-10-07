<template>
    <layout>
        <loading :active.sync="isLoading"
                 loader="dots"
                 color="rgb(47, 161, 47)"
                 :is-full-page="true"></loading>
        <chat></chat>


        <div v-if="showMealPlanCard && isLoggedIn">

            <meal-plan-card :title="'Choose Your Package'" :subtitle="'MONTHLY PLAN'"
                            :diets="diets" :mealPlans="mealPlansMonthly" :type="'Monthly'"
                            :loader="isLoader"></meal-plan-card>

            <meal-plan-card :title="'Choose Your Package'" :subtitle="'WEEKLY PLAN'"
                            :diets="diets" :mealPlans="mealPlansWeekly" :type="'Weekly'"></meal-plan-card>
        </div>

        <calculate-calorie-card v-if="showCalorieCard && isLoggedIn" :goals="goals"
                                :physicalActivities="physicalActivities"
                                :formErrors="formErrors"
                                @onCalorieCalculated="calorieData" @onGoBack="goBack($event)"></calculate-calorie-card>

        <choose-your-dishes v-if="showChooseYourDishes && isLoggedIn"
                            @onChooseYourDish="dishesChosen($event)" @onGoBack="goBack($event)"
                            @isLoading="changeLoader($event)"></choose-your-dishes>

        <Address v-if="showAddressCard && isLoggedIn" @addressChosen="addressChosen($event)"
                 @onGoBack="goBack($event)"></Address>

        <HealthAndFoodForm v-if="showHealthAndFoodCard && isLoggedIn"
                           @onHealthAndFood="healthAndFoodData($event)" @onGoBack="goBack($event)"></HealthAndFoodForm>

        <PaymentCard v-if="showPaymentCard && isLoggedIn" :cartData="cart" @processPayment="pay($event)"
                     @onGoBack="goBack($event)"
                     :isPaymentDisabled="isPaymentDisabled"></PaymentCard>

    </layout>
</template>


<page-query>
    query {
    strapi {
    physicalActivities{
    id
    title
    factor
    }
    goals{
    title
    code
    icon{
    url
    formats
    }
    }

    }
    }
</page-query>

<script>

    import Chat from '~/components/Chat'
    import Address from '~/components/steps/Address'
    import HealthAndFoodForm from '~/components/steps/HealthAndFoodForm'
    import CalculateCalorieCard from '~/components/steps/CalculateCalorieCard'
    import ChooseYourDishes from '~/components/steps/ChooseYourDishes'
    import MealPlanCard from '~/components/steps/MealPlanCard'
    import PaymentCard from '~/components/steps/PaymentCard'
    import api from '~/utils/api'
    import globals from '~/utils/globals'
    import Loading from 'vue-loading-overlay';
    import razorpay from "../utils/razorpay";


    export default {
        name: "SelectYourPlans",
        components: {
            Chat,
            CalculateCalorieCard,
            MealPlanCard,
            ChooseYourDishes,
            Address,
            HealthAndFoodForm,
            PaymentCard,
            Loading
        },
        data() {
            return {
                goals: [],
                physicalActivities: [],
                mealPlansMonthly: [],
                mealPlansWeekly: [],
                diets: [],
                isPaymentDisabled: false,
                showMealPlanCard: false,
                showChooseYourDishes: false,
                showCalorieCard: false,
                showAddressCard: false,
                showPaymentCard: false,
                showHealthAndFoodCard: false,
                isLoader: false,
                isLoading: false,
                formErrors: {},
                cart: {},
                cartData: {'mealPlan': {}, 'calorie': {}, 'dishes': {}, 'address': {}, 'healthAndFood': {}}

            }
        },
        props: [],
        watch: {
            '$route.query'(val, val2) {

                this.changeStatus();
            }
        },
        computed: {
            ...globals
        },

        async mounted() {

            globals.redirectIfLogout(this.$router);

            this.changeStatus();
            this.goals = this.$page.strapi.goals;
            this.physicalActivities = this.$page.strapi.physicalActivities;

            let status = await api.addToCart(parseInt(this.$route.query.quantity), parseInt(this.$route.query.mealPlanId));

            if (!status.success) {
                this.showMealPlanCard = true;
                return 1;
            }


        },
        methods: {


            async changeStatus() {
                this.showMealPlanCard = !(this.$route.query.mealPlanId !== undefined);
                this.showCalorieCard = (this.$route.query.mealPlanId !== undefined);
                this.isLoader = true;
                this.showChooseYourDishes = false;
                this.diets = await api.getDiets('');
                this.mealPlansMonthly = await api.getMealPlan('plan_type=' + this.diets[0].code + '&duration_type=Monthly&_limit=5');
                this.mealPlansWeekly = await api.getMealPlan('plan_type=' + this.diets[0].code + '&duration_type=Weekly&_limit=5');
                this.isLoader = false;
            },
            async calorieData(val) {
                try {
                    this.isLoading = true;
                    let response = await api.saveCalorieData(val);
                    if (!response.success && typeof response.data.response === 'object' && typeof response.data.response.data === 'object') {
                        if (typeof response.data.response.data.errors === 'object')
                            this.formErrors = globals.transformErrorResponse(response.data.response.data.errors);
                    } else {
                        if (response.success) {
                            this.resetAll();
                            this.showChooseYourDishes = true;
                            this.cartData.calorie = val;
                            this.cartData.mealPlan = this.$route.query;
                        }
                    }
                } catch (e) {
                    alert(e)
                }
                this.isLoading = false;
            },

            async dishesChosen(dishes) {

                try {
                    this.isLoading = true;
                    let response = await api.saveDishesChosen(dishes);
                    if (!response.success && typeof response.data.response === 'object' && typeof response.data.response.data === 'object') {
                        if (typeof response.data.response.data.errors === 'object')
                            this.formErrors = globals.transformErrorResponse(response.data.response.data.errors);
                        else {
                            var msg = response.data?.response?.data?.message;
                            msg = msg ? msg : 'Some thing went wrong';
                            this.$swal.fire({text: msg, icon: 'error'});
                        }

                    } else {
                        if (response.success) {
                            this.resetAll();
                            this.showAddressCard = true;
                            this.cartData.dishes = dishes.dishIds;
                        }
                    }
                } catch (e) {
                    alert(e)

                }
                this.isLoading = false;


            },

            async addressChosen(addresses) {

                this.cartData.address = addresses;

                this.isLoading = true;

                try {
                    let result = await api.saveAddressToCart({
                        'same_address': 0,
                        'breakfast': addresses.breakfast.id,
                        'dinner': addresses.dinner.id,
                        'lunch_snacks': addresses.lunch_snacks.id
                    });

                    if (result.success) {
                        this.resetAll();
                        this.showHealthAndFoodCard = true;
                    } else {
                        this.$swal.fire({text: result.data.data.message, icon: 'error'})

                    }
                    this.isLoading = false;

                } catch (e) {

                    console.log(e);
                    this.isLoading = false;

                }

            },

            async healthAndFoodData(healthData) {
                this.cartData.healthAndFood = healthData;

                this.isLoading = true;

                try {
                    await api.saveHealthAndFoodDetails(healthData);

                    this.cart = await api.getCart();
                    this.isLoading = false;
                    this.resetAll();
                    this.showPaymentCard = true;
                } catch (e) {

                    console.log(e);
                    this.isLoading = false;

                }
            },

            async pay() {
                this.isLoading = true;
                this.isPaymentDisabled = true;

                try {


                    var resp = await api.initOrder();
                    if (resp.success) {
                        await razorpay.createOrder(this);
                    } else {
                     //   console.log(resp);
                        var msg = resp.data?.response?.data?.message;
                        msg = msg ? msg : 'Some thing went wrong';
                        this.$swal.fire({text: msg, icon: 'error'});

                        this.isLoading = false;
                        this.isPaymentDisabled = false;
                    }

                    //   this.isLoading = false;
                    // this.isPaymentDisabled = false;

                } catch (e) {

                    console.log(e);
                    this.isLoading = false;
                    this.isPaymentDisabled = false;

                }
            },
            goBack(backTo) {
                this.resetAll();
                switch (backTo) {
                    case 'showMealPlanCard':
                        this.showMealPlanCard = true;
                        break;
                    case 'showChooseYourDishes':

                        this.showChooseYourDishes = true;
                        break;
                    case 'showCalorieCard':
                        this.showCalorieCard = true;
                        break;
                    case 'showAddressCard':
                        this.showAddressCard = true;
                        break;
                    case 'showHealthAndFoodCard':
                        this.showHealthAndFoodCard = true;
                        break;
                    case 'showPaymentCard':
                        this.showPaymentCard = true;
                        break;

                }
            },
            resetAll() {
                this.showMealPlanCard = false;
                this.showChooseYourDishes = false;
                this.showCalorieCard = false;
                this.showAddressCard = false;
                this.showHealthAndFoodCard = false;
                this.showPaymentCard = false;
            },
            changeLoader(val) {
                this.isLoading = val;
            }
        },
        metaInfo() {
            // const {title, description, shareImage} = this.$page.strapi.home.seo
            // const image = getStrapiMedia(shareImage.url);
            return {
                title: 'Select your plan',
                script: [
                    {src: 'https://checkout.razorpay.com/v1/checkout.js', async: true, defer: true}
                ],
            }
        },
    }
</script>

<style>


</style>
