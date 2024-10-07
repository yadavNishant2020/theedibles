<template>
    <Layout>

        <loading :active.sync="isLoading"
                 loader="dots"
                 color="rgb(47, 161, 47)"
                 :is-full-page="true"></loading>
        <chat></chat>
        <section class="register_left">
            <section class="register_right">
                <div class="container">
                    <ValidationObserver v-slot="{ handleSubmit }">
                        <form action="" @submit.prevent="handleSubmit(onSubmit)">
                            <div class="row">
                                <div class="col-md-1">

                                </div>
                                <div class="col-md-10 whiregisterback">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <p>Sign up to Edibles. Start eating now.</p>
                                        </div>
                                        <div class="col-md-6">
                                            <label for="first_name">First name<span
                                                    class="required mb-3 mt-3"> *
                                        </span></label><br>

                                            <validation-provider rules="required" v-slot="{ errors }">
                                                <input type="text" class="" name="first_name" id="first_name" value=""
                                                       v-model="register.first_name">

                                                <span style="color: red">{{ errors[0] }}</span>
                                            </validation-provider>


                                        </div>
                                        <div class="col-md-6">
                                            <label for="last_name">Last name<span
                                                    class="required mb-3  mt-3"> * </span></label><br>

                                            <validation-provider rules="required" v-slot="{ errors }">
                                                <input type="text" class="input-text" name="last_name" id="last_name"
                                                       value=""
                                                       v-model="register.last_name">

                                                <span style="color: red">{{ errors[0] }}</span>
                                            </validation-provider>


                                        </div>
                                        <div class="col-md-6">
                                            <label for="mobile">Mobile</label><br>


                                            <validation-provider rules="numeric" v-slot="{ errors }">
                                                <input type="tel" class="" name="mobile" id="mobile" value=""
                                                       v-model="register.mobile">

                                                <span style="color: red">{{ errors[0] }}</span>
                                            </validation-provider>


                                        </div>
                                        <div class="col-md-6">
                                            <label for="email">Email<span class="required mb-3  mt-3"> * </span></label><br>


                                            <validation-provider rules="required|email" v-slot="{ errors }">
                                                <input type="text" class="input-text" name="email" id="email" value=""
                                                       v-model="register.email">

                                                <span style="color: red">{{ errors[0] }}</span>
                                            </validation-provider>


                                        </div>
                                        <div class="col-md-6"><label for="password">Choose Password <span
                                                class="required mb-3 mt-3"> *
                                        </span></label><br>


                                            <validation-provider rules="required|strongPassword" v-slot="{ errors }"
                                                                 name="confirm">
                                                <input type="password" class="" name="password" id="password" value=""
                                                       v-model="register.password">

                                                <span style="color: red">{{ errors[0] }}</span>
                                            </validation-provider>


                                        </div>
                                        <div class="col-md-6">
                                            <label for="password_confirmation">Repeat Password <span
                                                    class="required mb-3  mt-3"> *
                                        </span></label><br>
                                            <validation-provider rules="required|password:@confirm" v-slot="{ errors }">
                                                <input type="password" class="input-text" name="password_confirmation"
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
                                        <div class="col-md-12 text-center">
                                            <div class="d-flex justify-content-center  mb-3">
                                                <a href="https://theedibles.in/wp-login.php?apsl_login_id=facebook_login&amp;state=cmVkaXJlY3RfdG89aHR0cHMlM0ElMkYlMkZ0aGVlZGlibGVzLmlu"
                                                   title="Login with facebook"><i class="fa fa-facebook"></i>
                                                </a>
                                                <a href="https://theedibles.in/wp-login.php?apsl_login_id=google_login&amp;state=cmVkaXJlY3RfdG89aHR0cHMlM0ElMkYlMkZ0aGVlZGlibGVzLmlu"
                                                   title="Login with google">
                                                    <i class="fa fa-google"></i>
                                                </a>

                                            </div>
                                            <div class="social-networks">


                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </form>
                    </ValidationObserver>
                </div>


            </section>
        </section>
    </Layout>
</template>

<script>


    import {extend, ValidationProvider, ValidationObserver} from 'vee-validate';
    import {email, numeric, required, alpha_num, min} from 'vee-validate/dist/rules';
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
        name: "Register",
        data() {
            return {
                register: {},
                isLoading: false,
            }
        },
        mounted() {
            globals.redirectIfLoggedIn(this.$router);
        },
        components: {Chat, ValidationProvider, ValidationObserver, Loading},

        methods: {
            async onSubmit() {
                this.isLoading = true;
                var response = await api.register(this.register);
                if (response.success && response.success == true) {
                    this.$swal.fire({text: "Registration Successfully Completed", icon: 'success'})
                    this.isLoading = false

                    this.$router.push('/sign-in')
                } else {
                    if (response.response && response.response.data.message[0] && typeof (response.response.data.message[0].messages[0].message !== 'undefined')) {
                        this.$swal.fire({text: response.response.data.message[0].messages[0].message, icon: 'error'})
                    } else {
                        this.$swal.fire({text: "Some error occurred.", icon: 'error'})
                    }
                    this.isLoading = false
                }
            }
        }

    }
</script>

<style scoped>

</style>
