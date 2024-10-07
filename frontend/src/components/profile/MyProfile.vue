<template>
	<form method="post">
                            <div class="">
                                <div class="DeliveryEditaddress">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label for="">First name<span class="required mb-3 mt-3"> *
                                                </span></label><br>
                                            <input type="text" class="" name="first_name" id="first_name" required="" v-bind:value="userData.firstname">
                                        </div>

                                        <div class="col-md-6">
                                            <label for="">Last
                                                name<span class="required mb-3 mt-3"> *
                                                </span></label><br>
                                            <input type="text" class="" name="last_name" id="last_name" required="" v-bind:value="userData.lastname">
                                            
                                        </div>
                                        <div class="col-md-12 mt-3">
                                            <label for="">Display name <span class="required mb-3 mt-3"> *
                                            </span></label><br>
                                            <input type="text" class="" name="display_name" id="full_name" required="" v-bind:value="userData.full_name" >
                                            <em>This will be how your name will be displayed in the account section and in reviews</em>
                                            
                                        </div>
                                        <div class="col-md-6 mt-3">
                                            <label for="">Email address </label><span class="required mb-3 mt-3"> *
                                            </span><br>
                                            <input type="email" class="" name="email" id="email" required="" v-bind:value="userData.email">
                                           
                                        </div>
                                        <div class="col-md-6 mt-3">
                                            <label for="">Mobile</label><span class="required mb-3 mt-3">
                                            </span><br>
                                            <input type="tel" class="" name="email" id="email" required="" v-bind:value="userData.mobile">
                                           
                                        </div>
                                        <div class="col-md-12 mt-3">
                                           
                                            <h3 class="single-edit-address">Password change</h3>
                                            <label for="">Current password (leave blank to leave unchanged)</label><span class="required mb-3 mt-3"> *
                                            </span><br>
                                            <input type="password" class="" name="password" id="password" value="" required="" >
                                           
                                        </div>
                                        <div class="col-md-12 mt-3">
                                            <label for="">New password (leave blank to leave unchanged)</label><span class="required mb-3 mt-3"> *
                                            </span><br>
                                            <input type="password" class="" name="new_password" id="new_password" value="" required="" >
                                           
                                        </div>
                                        <div class="col-md-12 mt-3">
                                            <label for="">Confirm new password</label><span class="required mb-3 mt-3"> *
                                            </span><br>
                                            <input type="password" class="" name="confirm_password" id="confirm_password" value="" required="" >
                                           
                                        </div>
                                    </div>
                                </div>


                                <p class="mt-3 mb-5 DeliveryEditaddress">
                                    <button type="submit" class="button" name="save_address" value="Save address">Save
                                        address</button>
                                   
                                </p>
                            </div>

                        </form>


	
</template>

<script>
    import api from '~/utils/api'

    export default {
        name: "MyProfile",
     data() {
            return {
                addresses: [],
				address_count:0,
            }
        },
	async mounted() {
		    this.addresses = await api.getMyProfile();

            this.address_count = this.addresses.length;
        },
    }
	
</script>
