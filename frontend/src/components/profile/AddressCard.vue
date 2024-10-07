<template>
	
	<div class="row savedadres mt-5" v-if="address_form==false">
			<div class="col-md-6 mb-2" v-for="data in this.addresses" :key="data.id">
			<div class="checkcard" >
				<div class="textofadd">
					<h1>{{ data.full_name }}</h1>
					<p>{{ data.phone }}, {{ data.email}}, {{ data.address }}, {{ data.city }} - {{ data.pincode}} </p>
				</div>
				<div class="editdel text-center">
					<button @click="editAddress(data.id)"><i class="fa fa-pencil" aria-hidden="true" ></i> Edit</button>
					<button @click="deleteAddress(data.id)" ><i class="fa fa-trash" aria-hidden="true"></i>Delete </button>
				</div>
			</div>
		</div>
	</div>
	<div v-else>
	  <Address :address="address" @cancelBtnClicked="onCancelBtnClicked($event)"> </Address>
	</div>
	
</template>
<script>
    import api from '~/utils/api'
	import Address from '~/components/profile/Address'

    export default {
        name: "AddressCard",
		components: {Address},
		props:['addresses'],
     data() {
            return {
				address_form: false,
				address :{},
				hideAddressForm:true
            }
        },
	async mounted() {
			//console.log(this.addresses)
        },
		methods: {
           async deleteAddress(address_id) { 
				const shouldDelete = await this.$swal.fire( { 
					title:"Delete Address?",
					text: "You won't be able to revert this!",
					icon: 'warning',
					showCancelButton: true,
				});
				
				if (shouldDelete.isConfirmed===true) { 
					var response = await api.deleteAddressById(address_id);
					if (response.success && response.success==true) {
						// this.$swal('Address Successfully Deleted')
						location.reload()
					} else {
						if (response.response &&typeof (response.response.data.message[0].messages[0].message !== 'undefined')) {
							alert(response.response.data.message[0].messages[0].message)
						} else {
							alert("Some error occured.")
						}
					}
				}
			},
			async editAddress(addr_id) { 
				this.address = await api.getAddressbyId(addr_id)
				this.address_form=true
				this.hideAddressForm=false
			},
			onCancelBtnClicked(val){
				this.address_form=false;
			}

		 },
    }
</script>






