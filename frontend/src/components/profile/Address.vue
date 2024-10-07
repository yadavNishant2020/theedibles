<template>
<ValidationObserver v-slot="{ handleSubmit }">
<form action="" @submit.prevent="handleSubmit(onSubmit) " >
    <h3 class="single-edit-address">Delivery address</h3>
    <div class="">
        <div class="DeliveryEditaddress">
                <div class="col-md-12 mt-3">
                    <label for="">Full name<span class="required mb-3 mt-3"> *
                        </span></label><br>
                        <validation-provider rules="required" v-slot="{ errors }">
                            <input type="text" class="" name="full_name" id="full_name" value="" v-model="address.full_name">
                            <span style="color: red">{{ errors[0] }}</span>
                        </validation-provider>
                </div>

                <div class="col-md-12 mt-3">
                    <label for="">Street address</label><span class="required mb-3 mt-3"> *
                    </span><br>
                    <validation-provider rules="required" v-slot="{ errors }">
                        <input type="text" class="" name="address" id="address" value="" required="" placeholder="House number and street name" v-model="address.address">
                       <span style="color: red">{{ errors[0] }}</span>
                    </validation-provider>
                </div>
                <div class="col-md-12 mt-3">
                    <label for="">Town / City</label><span class="required mb-3 mt-3"> *
                    </span><br>
                    <validation-provider rules="required" v-slot="{ errors }">
                        <input type="text" class="" name="city" id="city" value="" required="" v-model="address.city"> 
                        <span style="color: red">{{ errors[0] }}</span>
                    </validation-provider>
                </div>
                <div class="col-md-12 mt-3">
                    <validation-provider rules="required|numeric" v-slot="{ errors }">
                        <label for="">Postcode / ZIP</label><span class="required mb-3 mt-3"> *
                        </span><br>
                        <input type="number" class="" name="pincode" id="pincode" value="" required="" v-model="address.pincode">
                        <span style="color: red">{{ errors[0] }}</span>
                    </validation-provider>
                </div>

                <div class="col-md-12 mt-3">
                    <label for="">Phone</label><span class="required mb-3 mt-3"> *
                    </span><br>
                    <validation-provider rules="required|numeric|max:10" v-slot="{ errors }">
                        <input type="tel" class="" name="phone" id="phone" value="" required="" v-model="address.phone">
                        <span style="color: red">{{ errors[0] }}</span>
                    </validation-provider>
                </div>

                <div class="col-md-12 mt-3">
                    <label for="">Email</label><span class="required mb-3 mt-3"> *
                    </span><br>
                    <validation-provider rules="required|email" v-slot="{ errors }">
                        <input type="email" class="" name="email" id="email" value="" required="" v-model="address.email">
                    <span style="color: red">{{ errors[0] }}</span>
                    </validation-provider>
                </div>
            </div>
        </div>
        <p class="mt-3 mb-5 DeliveryEditaddress">
            <button type="submit" class="button" name="save_address" value="Save address">Save address</button>
           
            <button type="button" class="btn float-right" @click="cancel"> Cancel</button>
        </p>

    </div>
</form>
 
</ValidationObserver>
</template>


<script>    
    import api from '~/utils/api'
    import {extend, ValidationObserver, ValidationProvider} from 'vee-validate';
    import {email, numeric, required, max} from 'vee-validate/dist/rules';


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
   
    export default {
        name: "Address",
        components: {ValidationProvider, ValidationObserver },
   		props:['address'],
        data() {
            return {}
        },
        methods: {
            async onSubmit() {
               // console.log("Submited data-address-",this.address)
                if (this.address.id && this.address.id != undefined ) {
                    // Update the current address
                    var response = await api.updateAddressById(this.address)
                }else {
                    // Insert new address
                    var response = await api.saveAddress(this.address);
                }
                if (response.success && response.success==true) {
                
                   
                const shouldOk =   await this.$swal.fire ({title: "Success", text: "Profile Update Successfully Completed", icon: "success"})
                    if (shouldOk) {
                        location.reload();
                    }
                } else {
                    if (response.response &&typeof (response.response.data.message[0].messages[0].message !== 'undefined')) {

                        this.$swal.fire ({text: response.response.data.message[0].messages[0].message, icon: 'error'})

                    } else {
                       
                        this.$swal.fire ({text: "Some error occured", icon: 'error'})

                    }
                }
            },
            async cancel() { 
                this.$emit('cancelBtnClicked',true);
            }
        }
	
    }


</script>
