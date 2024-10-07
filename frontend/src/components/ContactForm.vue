<template>
    <div class="category_contact row">

        <loading :active.sync="isLoading"
                 loader="dots"
                 color="rgb(47, 161, 47)"
                 :is-full-page="true"></loading>

        <div class="dark_overlay">
            <div class="container">
                <div class="col-sm-12">
                    <h3 class="mt-3 mb-3"> Feel Free to contact us for your customized meal plan </h3>
                    <ValidationObserver v-slot="{ handleSubmit }" ref="ccform">

                        <form action="" @submit.prevent="handleSubmit(onSubmit)">
                            <div class="row">
                                <div class="col-md-10">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label> Your Name * </label><br>
                                            <validation-provider rules="required" v-slot="{ errors }">
                                                <input v-model="contact.name" name="name" type="text"/>
                                                <span style="color: red">{{ errors[0] }}</span>
                                            </validation-provider>

                                        </div>
                                        <div class="col-md-6">
                                            <label> Your Email </label><br>
                                            <validation-provider rules="required|email" v-slot="{ errors }">
                                                <input v-model="contact.email" name="email" type="email"/>
                                                <span style="color: red">{{ errors[0] }}</span>
                                            </validation-provider>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label> Your Mobile No * </label><br>
                                            <validation-provider rules="required|numeric" v-slot="{ errors }">
                                                <input v-model="contact.phone" name="phone" type="text"/>
                                                <span style="color: red">{{ errors[0] }}</span>
                                            </validation-provider>
                                        </div>
                                        <div class="col-md-6">
                                            <label> Message </label><br>
                                            <validation-provider rules="required" v-slot="{ errors }">
                                                <input v-model="contact.message" name="message" type="text"/>
                                                <span style="color: red">{{ errors[0] }}</span>
                                            </validation-provider>
                                        </div>
                                    </div>

                                    <span class="alert-success p-2 "
                                          v-if="successMessage.length">{{successMessage}}</span>
                                    <span class="alert-danger p-2 " v-if="errorMessage.length">{{errorMessage}}</span>

                                </div>
                                <div class="col-md-2">
                                    <input value="Send Now" type="submit">

                                </div>
                            </div>


                        </form>
                    </ValidationObserver>


                </div>

            </div>


        </div>

    </div>
</template>

<script>
    import {extend, ValidationObserver, ValidationProvider} from 'vee-validate';
    import {email, numeric, required} from 'vee-validate/dist/rules';
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
    extend('numeric', {
        ...numeric,
        message: 'Enter a valid phone number'

    });


    export default {
        name: "ContactForm",
        components: {ValidationProvider, ValidationObserver, Loading},
        data() {
            return {
                isLoading: false,
                successMessage: '',
                errorMessage: '',
                contact: {name: '', email: '', phone: '', message: ''},
            }
        },
        methods: {

            async onSubmit() {
                this.isLoading = true;
                var resp = await api.sendMessage(this.contact);
                if (resp.success) {
                    this.contact = {name: '', email: '', phone: '', message: ''};
                    this.successMessage = 'Successfully Submitted';
                    this.errorMessage = '';
                   // console.log(this.$refs);
                    this.$refs.ccform.reset();
                } else {
                    this.errorMessage = 'Error while submitting form';
                    this.successMessage = '';
                }
                this.isLoading = false;
            }
        },

    }
</script>

<style scoped>

</style>
