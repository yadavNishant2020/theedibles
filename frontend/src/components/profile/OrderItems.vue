<template>
<div class="container">
	 <x-modal :isModalOpen="isModalOpen">
		<a class="x-modal-close-btn" href="javascript:void(0)" @click="closeModal()">X</a>
		<!-- <a class="x-modal-ok-btn" href="javascript:void(0)" @click="closeModal()">X</a> -->
		<calendar-view :selectionCount="1" @selectDate="calendarSelectedDate($event)" 
		:disabledDates="disabledDates" />
		
	</x-modal>
	<!-- <div class="row mb-2 order-items-row"  v-if="lineItemId===0"> -->
	<div class="row mb-2 order-items-row" v-if="editDishes==false" >
		<div class="col-md-6 mb-2 order-items" v-for=" (data,index) in order_items">
			<div class="p-1 border" >
				<div >
					<button type="button" class="btn btn-sm float-right " v-if="data.meal_date > todayDate" @click="changeDate(data)"><span class="fa fa-pencil"></span> Change</button>
					<h4 class="text-center font-weight-bold p-1">{{data.meal_date | formatDate}}</h4>
				</div>
			<div class="row">
				<div class="col-md-3 pr-0">
					<g-image class="rounded img-fluid" :src="getStrapiMedia(item.menu_planner.image.formats.thumbnail.url)" alt=""/>
				</div>
				<div class="col-md-9">
					<p class=""><b>Breakfast:</b> {{ (dishDetails[data.breakfast_dish] && dishDetails[data.breakfast_dish].name) ? dishDetails[data.breakfast_dish].name:'' }}</p>
					<p class=""><b>Lunch: </b>{{ (dishDetails[data.lunch_dish] && dishDetails[data.lunch_dish].name) ? dishDetails[data.lunch_dish].name:'' }}</p>
					<p class=""><b>Snacks:</b> {{ (dishDetails[data.snacks_dish] && dishDetails[data.snacks_dish].name) ? dishDetails[data.snacks_dish].name:'' }}</p>
					<p class=""><b>Dinner:</b> {{ (dishDetails[data.dinner_dish] && dishDetails[data.dinner_dish].name) ? dishDetails[data.dinner_dish].name:'' }}</p>
					
					<button type="button" class="btn btn-sm btn-brand" v-if="data.meal_date <= todayDate">Completed</button>
					<button type="button" class="btn btn-success" v-else @click="editDishDetails(data)">Change Dishes</button>
				</div>
			</div>
			</div>      
		</div>
	</div>
	<!-- <div v-else><p>Edit Lineitem</p> -->
	<button type="button" class="btn btn-success "  href="javascript:void(0)" @click="backButton()"> Back</button>

	<div v-if="editDishes==true">
		<div class="datelistimg mb-3">
			<div class="row">
				<div class="col-md-3 text-center" v-for=" (meal,ind) in meals"> 
					<p>{{ meal.toUpperCase() }}</p>
					<div class="maincard mt-4">
						<!-- {{ dishData[meal] }} -->
						<!-- {{dishDetails[dishData[meal]]['name']}} -->
						{{dishDetails[dishData[meal+'_dish']]['name']}}

						<g-image class="imgOne" :src=" getStrapiMedia(dishDetails[dishData[meal+'_dish']].images[0].formats.thumbnail.url)" alt=""/>  
					
					</div>
					
					<div class="switch">
						<!-- <div v-for="(dish,ind) in day_dishes["breakfast"]" > -->
							<div v-for="(dish, id) in day_dishes[meal].dishes" >
							<input type="radio" class="switch-input" :name="meal"
											:data-value="dish.id"
											:checked="dishData[meal+'_dish']==dish.id ? 'checked': ''">
									<label class="switch-label switch-label-off" @click="changeDish(meal,dish.id)">{{alphabets[id]}}</label>
						</div>
					</div>
				</div>
			</div>		
		</div>
	<button type="button" class="btn btn-brand  float-right mt-5 "  href="javascript:void(0)" @click="saveConfiguration()"> Save Configuration</button>
	</div>
	</div>

</div>
</template>

<script>

	import Loading from 'vue-loading-overlay';
	import api from "../../utils/api";
	import {getStrapiMedia} from "../../utils/medias";
	import CalendarView from '~/components/calender/CalendarView';
	import XModal from '~/components/Modal';
	import global from "../../utils/globals";




	export default {
		components: {Loading,CalendarView, XModal},
		props: ['item', 'itemId'],
		computed: { 
		},
		data() {
			return {
				dishDetails : [],
				todayDate : new Date().toISOString().slice(0, 10),
				lineItemId :0 ,
				lineItem : {},
				order_items : {},
				dateSelected: [],
				isModalOpen : false,
				disabledDates : [],
				editDishes : false,
				meals: ['breakfast', 'lunch', 'dinner', 'snacks'],
				day_dishes : {},
				alphabets : ['A', 'B', 'C']
			}
		},
		methods: {
			getStrapiMedia,
			changeDate(lineItem) { 
				this.lineItemId = lineItem.id
				this.lineItem = lineItem    
				this.isModalOpen = true;
			},
			async editDishDetails(lineItem) {
				
				this.editDishes = true 
				this.dishData = lineItem                
				let meal_date = this.dishData.meal_date
			//	console.log("initial---", this.dishData)
				var d = new Date(meal_date);
				let week_number = global.getWeekNumber(d)

				var week_dishes =  await api.getDishes('id='+week_number)
				var dayNumber = d.getDay() - 1;
				
				this.day_dishes = week_dishes[0]['dishes'][dayNumber]
		//		console.log("day_dishes----", this.day_dishes)

			},
			
			async  closeModal() {
				// console.log("Closed:",this.dateSelected)
				if (this.dateSelected != undefined && Object.keys(this.dateSelected).length != 0) {
					var params = []
					params["order_id"] = this.itemId
					params["current_date"] = this.lineItem["meal_date"]
					params["new_date"] = this.dateSelected
					var response = await api.lineItemUpdate(this.lineItemId, params);
					var  icon = "success"
					if (response.data["success"] === false) {
						icon= "error"
					} else{
						var myOrders = await api.getMyOrders('id='+this.itemId);
						var lineItems = myOrders.data.data[0].order_items;
						lineItems.sort((lineItems, b) => new Date(lineItems['meal_date']) - new Date(b['meal_date']));
						this.order_items = lineItems
					}
					this.$swal.fire ({text: response.data["message"], icon: icon})

				//	console.log("api RESPONSE--",response.data["success"])
				}else {
					this.$swal.fire ( {text:"Please Choose one date."} )
				}
				this.isModalOpen = false                
			},
			calendarSelectedDate(val){  
			//	console.log("calendarSelectedDate:-", val[0])
				this.dateSelected =  val[0]
			},
			changeDish(type, indx) {
                this.dishData[type+'_dish'] = indx;

            },
			async saveConfiguration(){
				var response = await api.lineItemDishUpdate(this.dishData.id, this.dishData);
				this.$swal.fire ({text: response.data["message"], icon: response.data['status']})
				this.editDishes= false
			},
			backButton(){
				this.editDishes = false
			},

		},
		async mounted() {
		   
			let dish_array = []
			let meal_dates = []
			$.each(this.item.order_items, function(key, value) {                
				dish_array.push(value.lunch_dish)
				dish_array.push(value.snacks_dish)
				dish_array.push(value.dinner_dish)
				dish_array.push(value.breakfast_dish)
				// let exist = dish_array.includes(value.breakfast_dish);
				// if (!exist) {
					// dish_array.push(value.breakfast_dish)
				// }
				meal_dates.push(value.meal_date)
			});            
			// console.log("--101----------",meal_dates)
			this.disabledDates = meal_dates
			let uniqueDishes = [...new Set(dish_array)];
			var filter = ""
			for (var i = 0; i < uniqueDishes.length; i++) {
				filter += "&id_in="+uniqueDishes[i]
			}
			filter = filter.slice(1);
			const dishes =  await api.findDishes(filter);
			this.dishDetails = dishes.reduce((a,x)=>{
				a[x.id] = x;
				return a;
			},{})
			// Sort order items using meal date
			var lineItems = this.item.order_items
			lineItems.sort((lineItems, b) => new Date(lineItems['meal_date']) - new Date(b['meal_date']));
			this.order_items = lineItems
		}
	}


</script>
<style scoped>
  .order-items-row .order-items .textofadd {
		padding-top: 5px;;
  }  
  .v--modal {
		background-color: #cccccc00;
		text-align: left;
		border-radius: 15px;
		/* box-shadow: 0 20px 60px -2px rgb(27 33 58 / 40%); */
		padding: 0;
	}
	.maincard img {
		border: 1px solid #f3f3f3;
	}

	.btn.btn-brand {
		color: #000;
		background-color: #F6E200;
		border-color: #F6E200;
	}
	.x-modal-close-btn {
		width: 25px;
		height: 25px;
		position: absolute;
		right: -6px;
		top: -6px;
		border-radius: 15px;
		background-color: #e8d600;
		text-align: center;
		padding: 2px;
		color: white;
	}
  @media (max-width: 767px) { 
	  .order-items-row .order-items {text-align: center;}

  }
</style>
