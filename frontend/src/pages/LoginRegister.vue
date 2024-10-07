<template>
    <layout>
        <loading :active.sync="isLoading"
                 loader="dots"
                 color="rgb(47, 161, 47)"
                 :is-full-page="true"></loading>
        <chat></chat>
        <section class="register_left">
            <section class="register_right">
                <div class="container">
                    <div class="row">
                        <div class="col-md-5 ">
                            <ValidationObserver v-slot="{ handleSubmit }">
                                <form action="" @submit.prevent="handleSubmit(onSignIn)">
                                    <div class="Signinorsignup">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <p>Sign in to Edibles</p>

                                                <p><span style="color: red">{{loginErrorMsg}}</span>
                                                </p>
                                            </div>
                                            <div class="col-md-12"><label for="email">Email<span
                                                    class="required mb-3 mt-3"> *
                                            </span></label><br>
                                                <validation-provider rules="required" v-slot="{ errors }">
                                                    <input type="text" class="" name="email" id="email" value=""
                                                           v-model="signin.email">

                                                    <span style="color: red">{{ errors[0] }}</span>
                                                </validation-provider>
                                            </div>
                                            <div class="col-md-12">
                                                <label for="password">Password <span
                                                        class="required mb-3  mt-3"> * </span></label><br>
                                                <validation-provider rules="required" v-slot="{ errors }">
                                                    <input type="password" class="" name="password" id="password"
                                                           value=""
                                                           v-model="signin.password">

                                                    <span style="color: red">{{ errors[0] }}</span>
                                                </validation-provider>
                                            </div>


                                        </div>
                                        <div class="row">
                                            <div class="col-md-12 mt-4 text-center">
                                                <input type="submit" value="SIGN IN">
                                            </div>
                                            <div class="col-md-12 text-center">
                                                <p class="">
                                                    or <br>Sign In Using
                                                </p>
                                                <div class="d-flex justify-content-center  mb-3">

                                                    <a href="#"
                                                       title="Login with google">
                                                        <i class="fa fa-google"></i>
                                                    </a>
                                                    <a href="#"
                                                       title="Login with facebook"><i class="fa fa-facebook"></i>
                                                    </a>

                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </ValidationObserver>

                        </div>

                        <div class="col-md-7 ">
                            <ValidationObserver v-slot="{ handleSubmit }">
                                <form action="" @submit.prevent="handleSubmit(OnRegister)">

                                    <div class="Signinorsignup">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <p>Sign up to Edibles. Start eating now.</p>
                                            </div>
                                            <div class="col-md-6"><label for="">First name<span
                                                    class="required mb-3 mt-3"> *
                                            </span></label><br>
                                                <validation-provider rules="required" v-slot="{ errors }">
                                                    <input type="text" class="" name="first_name" id="first_name"
                                                           value=""
                                                           v-model="register.first_name">

                                                    <span style="color: red">{{ errors[0] }}</span>
                                                </validation-provider>

                                            </div>
                                            <div class="col-md-6">
                                                <label for="">Last name<span
                                                        class="required mb-3  mt-3"> * </span></label><br>
                                                <validation-provider rules="required" v-slot="{ errors }">
                                                    <input type="text" class="input-text" name="last_name"
                                                           id="last_name"
                                                           value=""
                                                           v-model="register.last_name">

                                                    <span style="color: red">{{ errors[0] }}</span>
                                                </validation-provider>

                                            </div>
                                            <div class="col-md-6">
                                                <label for="">Mobile</label><br>
                                                <validation-provider rules="numeric" v-slot="{ errors }">
                                                    <input type="tel" class="" name="mobile" id="mobile" value=""
                                                           v-model="register.mobile">

                                                    <span style="color: red">{{ errors[0] }}</span>
                                                </validation-provider>
                                            </div>
                                            <div class="col-md-6">
                                                <label for="">Email<span
                                                        class="required mb-3  mt-3"> * </span></label><br>
                                                <validation-provider rules="required|email" v-slot="{ errors }">
                                                    <input type="text" class="input-text" name="email" id="remail"
                                                           value=""
                                                           v-model="register.email">

                                                    <span style="color: red">{{ errors[0] }}</span>
                                                </validation-provider>

                                            </div>
                                            <div class="col-md-6"><label for="">Choose Password <span
                                                    class="required mb-3 mt-3"> *
                                            </span></label><br>
                                                <validation-provider rules="required|strongPassword" v-slot="{ errors }"
                                                                     name="confirm">
                                                    <input type="password" class="" name="password" id="rpassword"
                                                           value=""
                                                           v-model="register.password">

                                                    <span style="color: red">{{ errors[0] }}</span>
                                                </validation-provider>
                                            </div>
                                            <div class="col-md-6">
                                                <label for="">Repeat Password <span class="required mb-3  mt-3"> *
                                            </span></label><br>
                                                <validation-provider rules="required|password:@confirm"
                                                                     v-slot="{ errors }">
                                                    <input type="password" class="input-text"
                                                           name="password_confirmation"
                                                           id="password_confirmation"
                                                           value="" v-model="register.password_confirmation">

                                                    <span style="color: red">{{ errors[0] }}</span>
                                                </validation-provider>

                                            </div>


                                        </div>
                                        <div class="row">
                                            <div class="col-md-12 mt-4 text-center">
                                                <input type="submit" value="Sign up">
                                            </div>

                                        </div>

                                    </div>


                                </form>
                            </ValidationObserver>
                        </div>
                    </div>

                </div>

            </section>
        </section>
    </layout>
</template>

<script>

    import {extend, ValidationObserver, ValidationProvider} from 'vee-validate';
    import {email, numeric, required} from 'vee-validate/dist/rules';
    import Chat from '~/components/Chat'
    import api from "../utils/api";
    import Loading from 'vue-loading-overlay';
    import globals from "../utils/globals";

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
        message: 'Enter a valid phone number'

    });

    extend('password', {
        params: ['target'],
        validate(value, {target}) {
            return value === target;
        },
        message: 'Password confirmation does not match'
    });

    extend('strongPassword', {
        validate(value) {
            var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
            return re.test(value);
        },
        message: 'Password must be min 8, with at least a symbol, upper and lower case letters and a number'
    });


    export default {
        name: "LoginRegister",
        data() {
            return {
                signin: {},
                register: {},
                loginErrorMsg: '',
                RegisterErrorMsg: '',
                isLoading: false,
            }
        },
        mounted() {
            globals.redirectIfLoggedIn(this.$router);
        },
        components: {Chat, ValidationProvider, ValidationObserver, Loading},
        methods: {
            async onSignIn() {
                var response = await api.login(this.signin);
                if (response.success) {
                    this.loginErrorMsg = '';
                    this.$router.push('/select-your-plans');
                } else {
                    var messageStringArray = [];
                    if (typeof response.response.response.data.message === 'object') {
                        var messages = response.response.response.data.message[0].messages;
                        messages.forEach(function (val, key) {
                            messageStringArray.push(val.message);
                        });
                        this.loginErrorMsg = messageStringArray.join(' | ');
                    } else this.loginErrorMsg = 'invalid login';
                }
            }
            , async OnRegister() {
                this.isLoading = true;
                var response = await api.register(this.register);
                if (response.success && response.success == true) {
                    alert('Registration Successfully Completed')
                    this.isLoading = false;

                    this.$router.push('/sign-in')
                } else {
                    this.isLoading = false;
                    alert('An error occured')
                }
            }
        }
    }
</script>

<style scoped>

</style>
