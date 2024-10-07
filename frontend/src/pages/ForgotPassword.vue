<template>

    <Layout>
        <loading :active.sync="isLoading"
                 loader="dots"
                 color="rgb(47, 161, 47)"
                 :is-full-page="true"></loading>
        <chat></chat>

        <section class="register_left" v-if="reset_password===false">
            <section class="register_right">
                <div class="container">
                    <ValidationObserver v-slot="{ handleSubmit }">
                        <form action="" @submit.prevent="handleSubmit(onSubmit)">
                            <div class="row">

                                <div class="col-md-12 whiregisterback">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <h2>Lost your password? Please enter your username or email address. You
                                                will
                                                receive a
                                                link to create a new password via email.</h2>
                                        </div>
                                        <div class="col-md-6"><label for="email">Email<span
                                                class="required mb-3 mt-3"> *
                                        </span></label><br>

                                            <validation-provider rules="required|email" v-slot="{ errors }">
                                                <input type="text" class="" name="email" id="email" value=""
                                                       v-model="formData.email">

                                                <span style="color: red">{{ errors[0] }}</span>
                                            </validation-provider>

                                        </div>
                                        <div class="col-md-12 text-center mt-3">
                                            <input type="submit" value="RESET PASSWORD">

                                        </div>


                                    </div>

                                </div>
                            </div>
                        </form>
                    </ValidationObserver>
                </div>


            </section>

        </section>
        <section class="register_left" v-else>
            <section class="register_right">
                <div class="container">
                    <ValidationObserver v-slot="{ handleSubmit }">
                        <form action="" @submit.prevent="handleSubmit(onSubmit)">
                            <div class="row">

                                <div class="col-md-12 whiregisterback">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <h2>Reset Your password</h2>
                                        </div>
                                          <!-- <input type="hidden" name= "token1" id= "token1" :value="token">  -->
                                         <div class="col-md-6"><label for="password">New Password <span
                                                class="required mb-3 mt-3"> *
                                        </span></label><br>


                                            <validation-provider rules="required|strongPassword" v-slot="{ errors }" name="confirm">
                                                <input type="password" class="" name="password" id="password" value="" v-model="formData.password">
                                                <span style="color: red">{{ errors[0] }}</span>
                                            </validation-provider>


                                        </div>
                                        <div class="col-md-6">
                                            <label for="password_confirmation">Confirm Password <span
                                                    class="required mb-3  mt-3"> *
                                        </span></label><br>
                                            <validation-provider  rules="required|strongPassword"  v-slot="{ errors }">
                                                <input type="password" class="input-text" name="password_confirmation" id="password_confirmation" value=""  v-model="formData.password_confirmation">
                                                <span style="color: red">{{ errors[0] }}</span>
                                            </validation-provider>
                                        </div>
                                       
                                        <div class="col-md-12 text-center mt-3">
                                            <input type="submit" value="Change PASSWORD">

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

    extend('required', {
        ...required,
        message: 'This field is required'
    });
    extend('email', {
        ...email,
        message: 'Enter a valid email'
    });

    extend('password', {
        params: ['target'],
        validate(value, { target }) {
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
        name: "ForgotPassword",
        data() {
            return {
                formData: {},
                isLoading: false,
                reset_password: false,
                token :'',

            }
        },
        async mounted() {
            const { code } = this.$route.query
            if (code) {
                this.token = code
                this.reset_password = true
            }
        },
        components: {Chat, ValidationProvider, ValidationObserver,Loading},
        methods: {
            async onSubmit() {
                this.isLoading = true;
            //    console.log(this.formData)
                if (this.reset_password === false ) {
                    var result = await api.forgotPassword(this.formData);
                  //  console.log("mail sent--", result)
                    if (result.success === true ) {
                        this.$swal.fire ({text: "An email has sent to the supplied email address. Follow the instruction in the email to reset your password", icon: 'success'})
                    } else {
                        this.$swal.fire ({text: "Some error occured. Please try again after sometime", icon: 'error'})
                    }

                } else if (this.reset_password=== true) {
                    var response = await api.PasswordReset(this.formData, this.token);
                  //  console.log("final---",response)
                    
                    if (response.success === true ) {
                        this.$swal.fire ({text: "Password Reset Successfully Completed", icon: 'success'})
                        this.$router.push('/sign-in')
                    } else {
                        this.$swal.fire ({text: "Some error occured. Please try again after sometime.", icon: 'error'})
                    }
                }

                this.isLoading = false;                    

            }
        }
    }
</script>

<style scoped>

</style>
