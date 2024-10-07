<template>
    <ValidationObserver v-slot="{ handleSubmit }">

        <form action="" @submit.prevent="handleSubmit(onSubmit)" class="row">
            <div class="container">
                <div class="row">

                    <div class="col-md-12">
                        <div class="text-center mt-5 mb-1">
                            <h2 style="font-size: 30px;color: #000000;text-align: center" class="">Your Health &amp;
                                Food
                                details</h2>
                            <img width="293" height="14"
                                 src="http://theedibles.in//wp-content/uploads/2020/07/group_159.png"
                                 class="vc_single_image-img attachment-full" alt="">
                            <div class="vc_empty_space" style="height: 12px"><span class="vc_empty_space_inner"></span>
                            </div>
                        </div>


                    </div>
                </div>
                <div class="col-md-2 mb-2">
                    <input class="proceedbutton" type="button" @click="back()" value="Back">
                </div>
                <div class="row YourHealthFooddetails mt-3">


                    <div class="offset-md-1 mb-4">

                    </div>
                    <div class="col-md-10 mb-4">
                        <label>Please list any food allergies or food intolerances. *</label>
                        <validation-provider rules="required" v-slot="{ errors }">
                            <input type="text" class="" v-model="healthForm.food_allergies">
                            <span style="color: red">{{ errors[0] }}</span>
                        </validation-provider>
                    </div>
                    <div class="offset-md-1 mb-4">

                    </div>
                    <div class="offset-md-1 mb-4">

                    </div>
                    <div class="col-md-10 mb-4">
                        <label>Please list any medical conditions or health concerns. *</label>
                        <validation-provider rules="required" v-slot="{ errors }">
                            <input type="text" class="" v-model="healthForm.medical_conditions">
                            <span style="color: red">{{ errors[0] }}</span>
                        </validation-provider>
                    </div>
                    <div class="offset-md-1 mb-4">

                    </div>
                    <div class="offset-md-1 mb-4">

                    </div>
                    <div class="col-md-10 mb-4">
                        <label>What is your biggest challenge when it comes to eating healthy food as
                            part
                            of your lifestyle? *</label>
                        <validation-provider rules="required" v-slot="{ errors }">
                            <input type="text" class="" v-model="healthForm.biggest_challenge">
                            <span style="color: red">{{ errors[0] }}</span>
                        </validation-provider>
                    </div>
                    <div class="offset-md-1 mb-4">

                    </div>
                    <div class="offset-md-1 mb-4">

                    </div>
                    <div class="col-md-10 mb-4">
                        <label>List any foods you enjoy or would like to include more of in your plan.
                            *</label>
                        <validation-provider rules="required" v-slot="{ errors }">
                            <input type="text" class="" v-model="healthForm.foods_you_enjoy">
                            <span style="color: red">{{ errors[0] }}</span>
                        </validation-provider>
                    </div>
                    <div class="offset-md-1 mb-4">

                    </div>
                    <div class="offset-md-1 mb-4">

                    </div>
                    <div class="col-md-3 mb-4">
                        <label>Do you exercise regularly? *</label>
                        <div class="d-flex flex-row mt-5 ">
                            <label class="yesorno mr-5">Yes
                                <input type="radio" name="radio" value="yes"
                                       v-model="healthForm.exercise_regularly">
                                <span class="checkmarkTow"></span>
                            </label>
                            <label class="yesorno">No
                                <input type="radio" name="radio" value="no" v-model="healthForm.exercise_regularly">
                                <span class="checkmarkTow"></span>
                            </label>
                        </div>

                    </div>

                    <div class="col-md-7 mb-4">
                        <label>If yes please describe what type of work out you do and for how long you
                            do
                            and how often? (optional)</label>
                        <input type="text" class="" v-model="healthForm.type_of_work_out">

                    </div>

                    <div class="offset-md-1 mb-4">

                    </div>
                    <div class="offset-md-1 mb-4">

                    </div>
                    <div class="col-md-10 mb-4">
                        <label>What is your goal for our meal planning session? *</label>
                        <validation-provider rules="required" v-slot="{ errors }">
                            <input type="text" class="" v-model="healthForm.your_goal">
                            <span style="color: red">{{ errors[0] }}</span>
                        </validation-provider>
                    </div>
                    <div class="offset-md-1 mb-4">

                    </div>
                    <div class="offset-md-1 mb-4">

                    </div>
                    <div class="col-md-10 mb-4">
                        <label>Additional comments (optional)</label>
                        <input type="text" v-model="healthForm.comments">
                    </div>
                    <div class="col-md-12 text-center mt-2 mb-3">
                        <input class="proceedbutton" type="submit" value="Proceed">
                    </div>


                </div>


            </div>
        </form>
    </ValidationObserver>
</template>

<script>
    import {extend, ValidationObserver, ValidationProvider} from 'vee-validate';
    import {email, numeric, required, max} from 'vee-validate/dist/rules';
    import api from "../../utils/api";
    // import Loading from "vue-loading-overlay";

    extend('required', {
        ...required,
        message: 'This field is required'
    });
    extend('max', {
        ...max,
        message: 'Number must be a 10 digit'

    });
    extend('email', {
        ...email,
        message: 'Enter a valid email'
    });
    extend('numeric', {
        ...numeric,
        message: 'Enter a valid phone number'

    });


    export default {
        name: "HealthAndFoodForm",
        data() {
            return {
                healthForm: {
                    exercise: 'yes',
                }
            }
        },
        components: {ValidationProvider, ValidationObserver},
        async mounted() {

            let cartHealthData = await api.getHealthAndFoodDetails('_sort=id:desc&_limit=1');
           // console.log(cartHealthData);
            if (cartHealthData.success)
                this.healthForm = (cartHealthData.data && cartHealthData.data.length) ? cartHealthData.data[0] : {
                    exercise: 'yes',
                };

        },
        methods: {
            onSubmit() {
                this.$emit('onHealthAndFood', this.healthForm)
            },
            back() {
                this.$emit('onGoBack', 'showAddressCard')
            }
        }

    }
</script>

<style scoped>

</style>
