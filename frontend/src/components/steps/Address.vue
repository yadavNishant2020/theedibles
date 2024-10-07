<template>
    <section class="address-card">

        <div class="container">
            <x-title :title="'Delivery Address'"/>


            <div class="row ">
                <div class="col-md-2 mb-2 d-none d-md-block">
                    <input class="proceedbutton" type="button" @click="back()" value="Back">
                </div>

                <div class="col-md-8 mb-2 col-12">
                    <div class="backgroundcolor tabz">
                        <div class="row ">
                            <div class="col-md-4 text-center mt-2 mb-2">
                                <input type="radio" id="BreakFast" name="address_type" value="breakfast"
                                       :class="activeTab==='breakfast'?'active':''"
                                       :checked="activeTab==='breakfast'?'checked':''"
                                       @change="changeTab('breakfast')">
                                <label for="BreakFast">Breakfast</label>

                            </div>
                            <div class="col-md-4  text-center mt-2 mb-2">
                                <input type="radio" id="Eveninge" name="address_type" value="lunch_snacks"
                                       :disabled="isSameAddress" :checked="activeTab==='lunch_snacks'?'checked':''"

                                       @change="changeTab('lunch_snacks')">
                                <label for="Eveninge" :class="isActive">Lunch &amp; Evening Snacks</label>

                            </div>
                            <div class="col-md-4  text-center mt-2 mb-2">
                                <input type="radio" id="Dinnere" name="address_type" value="dinner"
                                       :disabled="isSameAddress" :checked="activeTab==='dinner'?'checked':''"

                                       @change="changeTab('dinner')">
                                <label for="Dinnere" :class="isActive">Dinner</label>

                            </div>
                        </div>
                    </div>


                </div>

                <div class="col-md-2 col-12 mt-2 mt-md-0">
                    <div class="row">
                        <div class="col-md-12 col-6 d-sm-block d-md-none">
                            <input class="proceedbutton" type="button" @click="back()" value="Back">
                        </div>
                        <div class="col-md-12 col-6">
                            <a href="#" class="svedadresbtn h-txt-blk float-right" v-if="!showSavedAddress[activeTab]"
                               @click="showHideAddressForm()">Saved Addresses</a>
                            <a href="#" class="svedadresbtn h-txt-blk float-right" v-else
                               @click="showHideAddressForm()">New Address</a>

                        </div>
                    </div>
                </div>

            </div>
            <div class="row">
                <div class="col-md-2">

                </div>
                <div class="col-md-8">
                    <div class="backgroundcolor">
                        <div class="row ">
                        </div>
                    </div>

                    <address-form :tabName="activeTab"
                                  :address="oldAddress"
                                  :isSameAddress="isSameAddress"
                                  :showSavedAddress="showSavedAddress"
                                  @addressSelected="addressSelected($event)"
                                  @onSaveAddress="saveAddress($event)"/>
                    <div class="col-md-12 mt-4  mb-5">

                        <label class="checkmainTow">
                            <input type="checkbox" :checked="isSameAddress"
                                   @change="changeSameAddress()">Same Address for
                            Breakfast, Lunch & Dinner
                            <span class="checkmark"></span>
                        </label>


                    </div>
                    <div class="col-md-12 text-center mt-2 mb-3">
                        <a class="proceedbutton h-txt-blk" type="submit" @click="proceed()" href="#"
                           v-if="showSavedAddress[activeTab]">Proceed</a>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="row">

                    </div>
                </div>

            </div>
        </div>
    </section>
</template>

<script>
    import AddressForm from '~/components/AddressForm'
    import XTitle from '~/components/XTitle'
    import api from '~/utils/api'

    export default {
        name: "Address",
        props: [],
        components: {XTitle, AddressForm},
        data() {
            return {
                isSameAddress: true,
                activeTab: 'breakfast',
                addressTypes: ['breakfast', 'lunch_snacks', 'dinner'],
                showSavedAddress: {'breakfast': false, 'lunch_snacks': false, 'dinner': false},
                oldAddress: [],
                cartAddress: [],
                selectedAddress: {'breakfast': {}, 'lunch_snacks': {}, 'dinner': {}},
            }
        },
        watch: {},
        computed: {
            isActive() {
                return this.isSameAddress ? 'active' : 'inactive'
            }
        },
        async mounted() {
            /* let cartAddress = await api.getCartAddress();
             if (cartAddress.success)
                 this.cartAddress = cartAddress.data;
             console.log('this.cartAddress', this.cartAddress);
             */

            this.oldAddress = await api.getAddress("address_type=normal");
            var hasOldAddress = !!this.oldAddress.length;
            this.showSavedAddress = {
                'breakfast': hasOldAddress,
                'lunch_snacks': hasOldAddress,
                'dinner': hasOldAddress
            };
        },
        methods: {
            changeSameAddress() {
                this.isSameAddress = !this.isSameAddress;
                if (this.isSameAddress)
                    this.activeTab = 'breakfast';
            },

            changeTab(type) {
                this.activeTab = type;
                if (!this.isSameAddress || type === 'breakfast') {
                    //alert(type)
                }
            },
            showHideAddressForm() {
                var tab = this.activeTab;
                this.showSavedAddress[tab] = !this.showSavedAddress[tab];
            },
            addressSelected(addrs) {
              //  console.log(addrs);
                this.selectedAddress = addrs;
            },
            saveAddress(savedAddresses) {
                this.oldAddress = savedAddresses;
                this.showHideAddressForm();
            },
            proceed() {
                if (this.selectedAddress.breakfast.id && this.selectedAddress.dinner.id && this.selectedAddress.lunch_snacks.id) {
                    this.$emit('addressChosen', this.selectedAddress)
                } else {
                    this.$swal.fire ( {text:"Please Choose one address."} )
                }
            },

            back() {
                this.$emit('onGoBack', 'showChooseYourDishes')
            }
        }
    }
</script>

<style>


    a.h-txt-blk:hover {
        color: #fff;
        text-decoration: none;
    }

</style>
