<template>
    <Layout>
        <loading :active.sync="isLoading"
                 loader="dots"
                 color="rgb(47, 161, 47)"
                 :is-full-page="true"></loading>
        <section class="my_account">
            <div class="container mt-5 mb-5">
                <div class="row">
                    <div class="col-md-3 ">
                        <div class="usertop">
                            <div class="d-flex">
                                <div class="my-account-details">
                                    <i class="fa fa-user" aria-hidden="true"></i>
                                    <span v-if="userData.full_name">{{ userData.full_name }}</span>
                                    <span v-else>{{ userData.username }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="ver">
                            <button class="verlinks active" v-on:click="vernext($event,'SavedAddresses')"
                                    id="defaultOpenk">Saved
                                Addresses
                            </button>
                            <button class="verlinks" @click="vernext($event,'YourActiveMealPlan')">Your Active Meal
                                Plan
                            </button>
                            <button class="verlinks" v-on:click="vernext($event,'ChangeMyDetails')">Change My Details
                            </button>
                            <button class="verlinks"><a href="/logout">Logout</a></button>
                        </div>
                    </div>
                    <div class="col-md-9">
                        <div id="SavedAddresses" class="vercontent" style="display: block;">

                            <div v-if="hideAddressForm==true">
                                <div class="d-flex flex-row mt-3">
                                    <h5 class="mr-auto"></h5>
                                    <button @click="newAddress()" class="verlinksNew"><span>+</span>New</button>
                                </div>
                                <AddressCard :addresses="addresses"></AddressCard>
                            </div>
                            <div v-else>
                                <Address :address={}></Address>
                            </div>
                        </div>
                        <div id="YourActiveMealPlan" class="vercontent" style="display: none;">
                            <div class="row">
                                <my-orders :orderTabClicked="orderTabClicked" @isLoading="changeLoader($event)"/>
                            </div>

                        </div>

                        <div id="ChangeMyDetails" class="vercontent" style="display: none;">
                            <ValidationObserver v-slot="{ handleSubmit }">
                                <form action="" @submit.prevent="handleSubmit(onSubmit)">
                                    <div class="">

                                        <div class="DeliveryEditaddress">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <label for="">First name<span class="required mb-3 mt-3"> *
                                                </span></label><br>

                                                    <validation-provider rules="required" v-slot="{ errors }">
                                                        <input type="text" class="" name="first_name" id="first_name"
                                                               required="" v-model="profile.firstname">
                                                        <span style="color: red">{{ errors[0] }}</span>
                                                    </validation-provider>

                                                </div>

                                                <div class="col-md-6">
                                                    <label for="">Last name</label><br>
                                                    <validation-provider rules="required" v-slot="{ errors }">
                                                        <input type="text" class="" name="last_name" id="lastname"
                                                               required="" v-model="profile.lastname">
                                                        <span style="color: red">{{ errors[0] }}</span>
                                                    </validation-provider>

                                                </div>
                                                <div class="col-md-12 mt-3">
                                                    <label for="">Display name </label><br>
                                                    <validation-provider rules="required" v-slot="{ errors }">
                                                        <input type="text" class="" name="display_name" id="full_name"
                                                               required="" v-model="profile.full_name">
                                                        <em>This will be how your name will be displayed in the account
                                                            section and in reviews</em>
                                                        <span style="color: red">{{ errors[0] }}</span>
                                                    </validation-provider>

                                                </div>
                                                <div class="col-md-6 mt-3">
                                                    <label for="">Email address </label><br>
                                                    <validation-provider rules="required|email" v-slot="{ errors }">
                                                        <input type="email" class="" name="email" id="email" required=""
                                                               v-model="profile.email">
                                                        <span style="color: red">{{ errors[0] }}</span>
                                                    </validation-provider>

                                                </div>
                                                <div class="col-md-6 mt-3">
                                                    <label for="">Mobile</label><br>
                                                    <validation-provider rules="numeric" v-slot="{ errors }">
                                                        <input type="tel" class="" name="mobile" id="mobile" required=""
                                                               v-model="profile.mobile">
                                                        <span style="color: red">{{ errors[0] }}</span>
                                                    </validation-provider>
                                                </div>
                                                <div class="col-md-12 mt-3">

                                                    <h3 class="single-edit-address">Password change</h3>
                                                    <label for="">Current password (leave blank to leave
                                                        unchanged)</label><br>
                                                    <input type="password" class="" name="password" id="password"
                                                           value="" v-model="profile.password">

                                                </div>
                                                <div class="col-md-12 mt-3">
                                                    <label for="">New password (leave blank to leave
                                                        unchanged)</label><br>
                                                    <input type="password" class="" name="new_password"
                                                           id="new_password" v-model="profile.new_password">
                                                </div>
                                                <div class="col-md-12 mt-3">
                                                    <label for="">Confirm new password</label><br>
                                                    <input type="password" class="" name="confirm_password"
                                                           id="confirm_password" v-model="profile.cnf_password">
                                                </div>
                                            </div>
                                        </div>
                                        <p class="mt-3 mb-5 DeliveryEditaddress">
                                            <button type="submit" class="button" name="save_address"
                                                    value="Save address">Save
                                                address
                                            </button>
                                        </p>
                                    </div>

                                </form>
                            </ValidationObserver>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    </Layout>
</template>

<script>
    import {extend, ValidationProvider, ValidationObserver} from 'vee-validate';
    import AddressCard from '~/components/profile/AddressCard'
    import Address from '~/components/profile/Address'
    import MyProfile from '~/components/profile/MyProfile'
    import MyOrders from '~/components/profile/MyOrders'
    import api from "../utils/api";
    import Loading from 'vue-loading-overlay';
    import {email, numeric, required, alpha_num, min} from 'vee-validate/dist/rules';
    import globals from '~/utils/globals'

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
        name: "MyAccount",
        components: {AddressCard, MyProfile, ValidationProvider, ValidationObserver, Loading, Address, MyOrders},
        metaInfo: {
            title: 'My Account'
        },
        data() {
            return {
                userData: {},
                profile: {},
                isLoading: false,
                addresses: [],
                address_count: 0,
                orderTabClicked: 0,
                hideAddressForm: false

            }
        },
        computed: {
            ...globals
        },
        async mounted() {
            globals.redirectIfLogout(this.$router);

            var response = await api.getMyProfile();
            this.userData = response.data
            this.profile = Object.assign({}, this.userData);
            this.addresses = await api.getAddress("address_type=normal");
            this.address_count = this.addresses.length
            this.hideAddressForm = (this.address_count > 0) ? true : false

        },

        methods: {
            // document.getElementById("defaultOpenk").click(),
            vernext: function (evt, tabName) {
                this.hideAddressForm = true
                var i, vercontent, verlinks;
                vercontent = document.getElementsByClassName("vercontent");
                for (i = 0; i < vercontent.length; i++) {
                    vercontent[i].style.display = "none";
                }
                verlinks = document.getElementsByClassName("verlinks");
                for (i = 0; i < verlinks.length; i++) {
                    verlinks[i].className = verlinks[i].className.replace(" active", "");
                }
                document.getElementById(tabName).style.display = "block";
                evt.currentTarget.className += " active";

                if (tabName === 'YourActiveMealPlan') {
                    this.clearOrderItem();
                }
            },
            clearOrderItem() {
                this.orderTabClicked = new Date().getTime();

            },
            async onSubmit() {
                this.isLoading = true
                  //  console.log("Submited Profile Data---", this.profile)
                var next_status = true
                if (this.profile.password && this.profile.new_password && this.profile.cnf_password) {
                    var response = await api.resetPassword(this.profile);
                    if (response.success && response.success == true) {
                        alert('Password change is  successfully completed')
                    } else {
                        next_status = false
                        if (response.data && typeof (response.data.data.message[0].messages[0].message !== 'undefined')) {
                            alert(response.data.data.message[0].messages[0].message)
                        } else {
                            alert("Some error occured in password changes")
                        }
                        this.isLoading = false
                    }
                }

                if (next_status == true) {
                    // Check any data is edited then call the api otherwise ignore
                    // console.log("userdate: ",JSON.stringify(this.userData))
                    // console.log("profile-", JSON.stringify(this.profile))
                    // if ( JSON.stringify(this.userData) != JSON.stringify(this.profile) ) {
                    var response = await api.updateProfile(this.profile.id, this.profile);
                    this.isLoading = false

                    if (response.success && response.success == true) {
                        alert('Successfully Completed')
                        this.isLoading = false
                    } else {
                        if (response.response && typeof (response.response.data.message[0].messages[0].message !== 'undefined')) {
                            alert(response.response.data.message[0].messages[0].message)
                        } else {
                            alert("Some error occured.")
                        }
                        this.isLoading = false
                    }
                    // } else {
                    //     alert("no change")
                    //     this.isLoading = false
                    // }
                }


            },
            async newAddress() {
                this.hideAddressForm = false
            },

            changeLoader(val) {
                this.isLoading = val;
            }

        },
    }

</script>
