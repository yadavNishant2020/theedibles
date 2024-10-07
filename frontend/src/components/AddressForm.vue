<template>
    <div class="row white_back" :class="tabName" v-if="!showSavedAddress[tabName]">

        <loading :active.sync="isLoading"
                 :can-cancel="true"
                 :on-cancel="onCancel"
                 loader="dots"
                 color="rgb(47, 161, 47)"
                 :is-full-page="true"></loading>

        <ValidationObserver v-slot="{ handleSubmit }">

            <form action="" @submit.prevent="handleSubmit(saveAddress)" class="row">
                <div class="col-md-6"><label>Full Name</label><br>

                    <validation-provider rules="required" v-slot="{ errors }">
                        <input type="text" class="" v-model="addressForm[tabName].full_name">
                        <span style="color: red">{{ errors[0] ? errors[0] : (serverErrors[tabName]['full_name'] ? serverErrors[tabName]['full_name'][0]:'')  }}</span>
                    </validation-provider>

                </div>
                <div class="col-md-6">
                    <label>Phone Number</label><br>
                    <validation-provider rules="required|numeric|max:10" v-slot="{ errors }">
                        <input type="tel" class="input-text" v-model="addressForm[tabName].phone">
                        <span style="color: red">{{ errors[0] ? errors[0] : (serverErrors[tabName]['phone'] ? serverErrors[tabName]['phone'][0]:'') }}</span>

                    </validation-provider>
                </div>
                <div class="col-md-6">
                    <label>Email</label><br>
                    <validation-provider rules="required|email" v-slot="{ errors }">
                        <input type="email" class="" v-model="addressForm[tabName].email">
                        <span style="color: red">{{ errors[0] ? errors[0] : (serverErrors[tabName]['email'] ? serverErrors[tabName]['email'][0]:'' )}}</span>

                    </validation-provider>
                </div>
                <div class="col-md-6">
                    <label>Post code / ZIP</label><br>
                    <validation-provider rules="required|numeric" v-slot="{ errors }">
                        <input type="number" class="" v-model="addressForm[tabName].pincode">
                        <span style="color: red">{{ errors[0] ? errors[0] : (serverErrors[tabName]['pincode'] ? serverErrors[tabName]['pincode'][0]:'' )}}</span>

                    </validation-provider>

                </div>
                <div class="col-md-6"><label>Street Address</label><br>
                    <validation-provider rules="required" v-slot="{ errors }">
                        <input type="text" class="" v-model="addressForm[tabName].address">
                        <span style="color: red">{{ errors[0] ? errors[0] : (serverErrors[tabName]['address'] ? serverErrors[tabName]['address'][0]:'') }}</span>

                    </validation-provider>
                </div>
                <div class="col-md-6">
                    <label>Town / City</label><br>
                    <validation-provider rules="required" v-slot="{ errors }">
                        <input type="text" class="" v-model="addressForm[tabName].city">
                        <span style="color: red">{{ errors[0] ? errors[0] : (serverErrors[tabName]['city'] ? serverErrors[tabName]['city'][0]:'' )}}</span>

                    </validation-provider>

                </div>

                <div class="col-md-12 text-center mt-5">

                    <button class="proceedbutton">Next</button>

                </div>
            </form>
        </ValidationObserver>


    </div>
    <div v-else>
         <div class="row savedadres mt-5" >
			<div class="col-md-6 mb-2" v-for="data in this.address" :key="data.id" >
			<div class="checkcard" :class="isSelectedAddress(data.id)" @click="addressSelected(data)" >
				<div class="textofadd">
					<h1>{{ data.full_name }}</h1>
					<p>{{ data.phone }}, {{ data.email}}, {{ data.address }}, {{ data.city }} - {{ data.pincode}} </p>
				</div>

			</div>
		</div>
	    </div>
        <!-- <div class="card text-center" :class="isSelectedAddress(ad.id)" style="width: 18rem;" v-if="address.length"
             v-for=" (ad,ind) in address">

            <div class="card-body">
                <h1 class="card-title">{{ad.full_name}}</h1>
                <p class="card-text"><i class="fa fa-phone"></i> {{ad.phone}}</p>
                <p class="card-text"><i class="fa fa-map-pin"></i> {{ad.pincode}}</p>
                <p class="card-text"><i class="fa fa-building"></i> {{ad.city}}</p>
                <p class="card-text"><i class="fa fa-address-book"></i> {{ad.address}}</p>
                <a href="#" class="btn btn-primary mt-2" @click="addressSelected(ad)">Select</a>
            </div>
        </div> -->
    </div>
</template>

<script>

    import {extend, ValidationObserver, ValidationProvider} from 'vee-validate';
    import {email, numeric, required, max} from 'vee-validate/dist/rules';
    import api from '~/utils/api'
    import Loading from 'vue-loading-overlay';

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
        name: "AddressForm",
        props: ['tabName', 'address', 'showSavedAddress', 'isSameAddress'],
        data() {
            return {
                addressForm: {'breakfast': {}, 'dinner': {}, 'lunch_snacks': {}},
                serverErrors: {'breakfast': {}, 'dinner': {}, 'lunch_snacks': {}},
                timer: null,
                isLoading: false,
            }
        },
        components: {ValidationProvider, ValidationObserver, Loading},

        watch: {},
        async mounted() {
           // this.addressForm = {'breakfast': {}, 'dinner': {}, 'lunch_snacks': {}};
        },
        computed: {},
        methods: {
            isSelectedAddress(id) {
                if (this.addressForm[this.tabName].id && this.addressForm[this.tabName].id === id)
                    return 'selected_address';
            },
            addressSelected(ad) {
                if (this.isSameAddress) {
                    this.addressForm = {'breakfast': ad, 'dinner': ad, 'lunch_snacks': ad};
                } else
                    this.addressForm[this.tabName] = ad;
                this.$emit('addressSelected', this.addressForm);
            },
            onCancel() {
            },
            async saveAddress() {

                this.isLoading = true;
                var response = await api.saveAddress(this.addressForm[this.tabName]);
                if (response.success) {
                    var oldAddress = await api.getAddress("address_type=normal");
                    this.serverErrors = {'breakfast': {}, 'dinner': {}, 'lunch_snacks': {}};
                    this.addressForm[this.tabName] = {};

                    this.$emit('onSaveAddress', oldAddress);
                } else {
                    try {
                        this.serverErrors[this.tabName] = response.data.response.data.data.errors;
                    } catch (e) {
                        // alert('validation error: ' + e)
                        this.$swal.fire ({text: e, icon: "error"})
                    }
                }
                this.isLoading = false;
            }
        }
    }
</script>

<style scoped>
    .selected_address {
        background-color: #4ca6af47;
    }
</style>
