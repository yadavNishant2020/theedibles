<template>
    <div>
        <loading :active.sync="isLoading"
                 :can-cancel="true"
                 :on-cancel="onCancel"
                 loader="dots"
                 color="rgb(47, 161, 47)"
                 :is-full-page="true"></loading>

        <div class="container">
            <div class="row">


                <div class="col-md-12">
                    <x-title :title="title">
                        <div style="height: 12px">
                        </div>
                        <h2 style="font-size: 25px;color: #2fa12f;text-align: center; " class="pb-3">{{subtitle}}</h2>
                    </x-title>
                </div>

            </div>

        </div>

        <div class="container">
            <div class="row tab mb-4">
                <div class="col-md-1  col-0  tabbackwhite  pr-0 pl-0">

                </div>
                <div class="col-md-2 col-6 pr-0 pl-0" v-if="diets.length" v-for="(diet,ind) in diets">
                    <button class="tablinks_mont" :class="activeTab===diet.code?'active':''" :id="diet.code"
                            @click="changeMealPlan(diet.code)"> {{diet.name}}
                    </button>

                </div>

                <div class="col-md-1  col-0  tabbackwhite  pr-0 pl-0">

                </div>

            </div>

            <div id="ketM" class="tabcontent_mont">
                <div class="row">


                    <div class="col-lg-3 mb-4 col-md-4" v-if="currentMealPlan.length"
                         v-for="(product,ind) in currentMealPlan" :key="ind">
                        <product-card :product="product"/>
                    </div>
                    <div v-if="!currentMealPlan.length" style="width: 100%">
                        <p class="text-center p-5">No meals in {{activeTab}}</p>
                    </div>

                </div>

            </div>

        </div>

    </div>
</template>

<script>
    import ProductCard from '~/components/ProductCard'
    import XTitle from '~/components/XTitle'
    import api from '~/utils/api'
    import Loading from 'vue-loading-overlay';

    export default {
        name: "MealPlanCard",
        components: {ProductCard, XTitle, Loading},
        data() {
            return {
                currentMealPlan: [],
                activeTab: '',
                isLoading: false,
            }
        },
        props: ['title', 'subtitle', 'diets', 'mealPlans', 'type', 'loader'],
        created() {

        },
        watch: {
            loader: function (newVal, oldVal) { // watch it
                this.isLoading = newVal;
            },
            mealPlans: function (newVal, oldVal) { // watch it
                this.currentMealPlan = newVal;
            },
            diets: function (newVal, oldVal) { // watch it
                this.activeTab = newVal[0].code;
            },
        },
        mounted() {

        },
        methods: {
            onCancel() {
            },

            async changeMealPlan(code) {
                this.activeTab = code;
                this.isLoading = true;
                this.currentMealPlan = await api.getMealPlan('plan_type=' + code + '&duration_type=' + this.type + '&_limit=5');
                this.isLoading = false;

            },
            back() {
                this.$emit('onGoBack', 'showCalorieCard')
            }
        }
    }
</script>


