<template>


    <ValidationObserver v-slot="{ handleSubmit }">

        <form action="" @submit.prevent="handleSubmit(onSubmit)">
            <div class="container calcalory">

                <x-title :title="'Calculate Calorie'"/>


                <div class="row">
                    <div class="col-md-12 text-right">
                        <input class="proceedbutton" type="submit" value="Proceed" @click="proceedBtnClicked()">
                    </div>
                    <div class="col-md-3">
                        <p>Set your goal</p>

                        <span style="position: absolute;color: red;top: -2px;left: 120px;" v-if="goalValidation">Select goal</span>

                        <span class="setgoal">

              <goal @goalSelected="goalSelected($event)" :goals="goals" :selectedGoal="calorieForm.goal"/>

             </span>


                    </div>

                    <div class="col-md-9 calform">
                        <div class="row">

                            <div class="col-md-6 mb-4">
                                <label>Physical Activity <span class="required mb-3 mt-3"> *
                                    </span></label>

                                <validation-provider rules="required" v-slot="{ errors }">
                                    <select id="car2s" name="physical_activity" v-model="calorieForm.physical_activity">
                                        <option :value="activity.id" v-for="(activity,ind) in physicalActivities"
                                                :key="ind">{{ activity.title }}
                                        </option>
                                    </select>

                                    <span style="color: red">{{
                      errors[0] ? errors[0] : (formErrors.physical_activity ? formErrors.physical_activity : '')
                    }}</span>
                                </validation-provider>


                            </div>
                            <div class="col-md-6 mb-4">
                                <label>Gender <span class="required mb-3 mt-3"> *
                                    </span></label>

                                <validation-provider rules="required" v-slot="{ errors }">
                                    <select id="car3s" name="gender" v-model="calorieForm.gender">
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>

                                    <span style="color: red">{{
                      errors[0] ? errors[0] : (formErrors.gender ? formErrors.gender : '')
                    }}</span>
                                </validation-provider>


                            </div>
                            <div class="col-md-6 mb-4">
                                <label>DOB <span class="required mb-3 mt-3"> *
                                    </span></label>
                                <validation-provider rules="required" v-slot="{ errors }">
                                    <client-only>
                                        <datepicker v-model="calorieForm.dob" calendar-class="dob-calender-cls"
                                                    :disabledDates="{from:new Date( )}"
                                                    placeholder="DOB"></datepicker>
                                    </client-only>
                                    <span style="color: red">{{ errors[0] ? errors[0] : (formErrors.dob ? formErrors.dob : '') }}</span>
                                </validation-provider>


                            </div>
                            <div class="col-md-6 mb-4">
                                <label>Age <span class="required mb-3 mt-3"> *
                                    </span></label>
                                <validation-provider rules="required|numeric" v-slot="{ errors }">

                                    <input type="number" class="input-text" v-model="calorieForm.age">
                                    <span style="color: red">{{ errors[0] ? errors[0] : (formErrors.age ? formErrors.age : '') }}</span>

                                </validation-provider>


                            </div>
                            <div class="col-md-6 mb-4"><label>Height (in Cm) <span class="required mb-3 mt-3"> *
                                    </span></label>
                                <validation-provider rules="required|numeric" v-slot="{ errors }">

                                    <input type="number" class="input-text" v-model="calorieForm.height"/>

                                    <span style="color: red">{{
                      errors[0] ? errors[0] : (formErrors.height ? formErrors.height : '')
                    }}</span>
                                </validation-provider>


                            </div>
                            <div class="col-md-6 mb-4">
                                <label>Weight (in Kg) <span class="required mb-3 mt-3"> *
                                    </span></label>
                                <validation-provider rules="required|numeric" v-slot="{ errors }">

                                    <input type="number" class="input-text" v-model="calorieForm.weight">

                                    <span style="color: red">{{
                      errors[0] ? errors[0] : (formErrors.weight ? formErrors.weight : '')
                    }}</span>
                                </validation-provider>
                            </div>


                        </div>
                    </div>
                </div>
                <div class="row mb-5">
                    <div class="col-md-12 recommentedtxt text-center">
                        <h2>Your recommented calorie</h2>
                        <h1>{{ calorie }}<span> Calories</span></h1>
                        <button type="submit" class="button mb-3" @click="calculateBtnClicked()">Calculate</button>

                    </div>
                </div>

            </div>
        </form>
    </ValidationObserver>


</template>


<script>
    import {getStrapiMedia} from '~/utils/medias'
    import Chat from '~/components/Chat'
    import Goal from '~/components/Goal'
    import XTitle from '~/components/XTitle'
    import {extend, ValidationObserver, ValidationProvider} from 'vee-validate';
    import {email, numeric, required} from 'vee-validate/dist/rules';
    import api from "../../utils/api";


    extend('required', {
        ...required,
        message: 'This field is required'
    });
    extend('email', {
        ...email,
        message: 'Enter a valid email'
    });
    extend('numeric', {
        ...numeric,
        message: 'Enter a valid number'

    });


    export default {
        name: "CalculateCalorieCard",
        components: {
            Datepicker: () =>
                import ('vuejs-datepicker')
                    .then(m => {
                        return m
                    })
                    .catch(), Chat, Goal, XTitle, ValidationProvider, ValidationObserver
        },
        props: ['goals', 'physicalActivities', 'formErrors'],
        data() {
            return {
                calorieForm: {goal: ''},
                calorie: 0,
                goalValidation: false,
                calcCalorieBtnClicked: false,
            }
        },
        watch: {},
        async mounted() {
            let cartId;
            cartId = this.$route.query.renewal_cart_id ?this.$route.query.renewal_cart_id:'' ;

            var calorie = await api.getCalorieData('renewal_cart_id='+cartId);
            if (calorie.success)
                this.calorieForm = calorie.data ? calorie.data : {goal: ''};

            this.calorie = calorie.data.calorie;
        },
        methods: {
            getStrapiMedia,
            goalSelected(val) {
                this.calorieForm.goal = val;
                this.goalValidation = false;
            },
            calculateBtnClicked() {
                this.calcCalorieBtnClicked = true;
            },
            proceedBtnClicked() {

                this.calcCalorieBtnClicked = false;
            },
            async onSubmit() {

                try {
                    //  console.log('this.calorieForm=', this.calorieForm);
                    if (this.calorieForm.goal === undefined || this.calorieForm.goal === "") {
                        this.goalValidation = true;
                    } else {
                        this.goalValidation = false;
                        this.calculateCalorie();
                        if (!this.calcCalorieBtnClicked)
                            this.$emit('onCalorieCalculated', this.calorieForm);
                    }
                } catch (e) {
                    // alert(e)
                    this.$swal.fire ({text: e, icon: "error"})

                }
            },

            getActivityFactor(id) {

                var factor = 1;
                this.physicalActivities.forEach(function (val, key) {
                    if (val.id == id) {
                        factor = val.factor;
                    }
                });
                return factor;
            },

            calculateCalorie() {

                if (this.calorieForm.weight &&
                    this.calorieForm.height &&
                    this.calorieForm.age &&
                    this.calorieForm.dob &&
                    this.calorieForm.gender &&
                    this.calorieForm.physical_activity &&
                    this.calorieForm.goal) {

                    var factor = this.getActivityFactor(this.calorieForm.physical_activity);
                    var bmr = 0;

                    if (this.calorieForm.gender === 'female')
                        bmr = 655.1 + (9.563 * this.calorieForm.weight) + (1.85 * this.calorieForm.height) - (4.676 * this.calorieForm.age);
                    else {
                        bmr = (13.8 * this.calorieForm.weight) + (5 * this.calorieForm.height) - (6.8 * this.calorieForm.age) + 66.5;
                    }

                    //this.counter(0, calorie, 400);

                    this.calorieForm.calorie = this.calorie = (bmr * factor).toFixed(0);
                }

            },

            counter(start, end, duration) {
                let that = this,
                    current = start,
                    range = end - start,
                    increment = end > start ? 1 : -1,
                    step = Math.abs(Math.floor(duration / range)),
                    timer = setInterval(() => {
                        current += increment;
                        that.calorie = current;
                        if (current == end) {
                            clearInterval(timer);
                        }
                    }, step);
            }
        }
    }
</script>

<style>

    .dob-calender-cls {

        top: 54px;
    }

    .dob-calender-cls header {

        padding: 0px;
    }

    .calform span {
        color: #5f9434;
    }


</style>
