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

                                <div class="col-md-6 whiregisterback">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <p>Sign in to Edibles</p>
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
                                                <input type="password" class="" name="password" id="password" value=""
                                                       v-model="signin.password">

                                                <span style="color: red">{{ errors[0] }}</span>
                                            </validation-provider>


                                        </div>


                                    </div>
                                    <div class="row">
                                        <div class="col-md-12 mt-4 text-center">
                                            <input type="submit" value="Sign in">
                                        </div>
                                        <div class="col-md-12 text-center">
                                            <div class="d-flex justify-content-center  mb-3">
                                                <a :href="getStrapiMedia('/connect/facebook')"
                                                   title="Login with facebook"><i class="fa fa-facebook"></i>
                                                </a>
                                                <a :href="getStrapiMedia('/connect/google')"
                                                   title="Login with google">
                                                    <i class="fa fa-google"></i>
                                                </a>

                                            </div>
                                            <p class="lost_password">
                                                <g-link to="/forgot-password">Lost your password?</g-link>
                                            </p>
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

    import {extend, ValidationObserver, ValidationProvider} from 'vee-validate';
    import {email, required} from 'vee-validate/dist/rules';
    import Chat from '~/components/Chat'
    import api from "../utils/api";
    import Loading from 'vue-loading-overlay';
    import {getStrapiMedia} from "../utils/medias";
    import globals from "../utils/globals";


    extend('required', {
        ...required,
        message: 'This field is required'
    });
    extend('email', {
        ...email,
        message: 'Enter a valid email'
    });

    export default {
        name: "SignIn",
        data() {
            return {
                signin: {},
                isLoading: false,
            }
        },
        components: {Chat, ValidationProvider, ValidationObserver, Loading},
        async created() {


        },
        mounted() {
            globals.redirectIfLoggedIn(this.$router);
        },
        methods: {
            getStrapiMedia,
            async onSubmit() {
                this.isLoading = true;
                var response = await api.login(this.signin)
                if (response.success) {
                    this.$router.push('/')
                } else {
                    // alert('invalid login')
                    this.$swal.fire ({text: "Username or password is incorrect", icon: 'error'})

                }
                this.isLoading = false;

            }
        }
    }
</script>

<style scoped>

</style>
