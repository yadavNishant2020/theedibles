<template>

  <div class="container Choosingmenu">
    <div class="row">
      <div class="col-md-12">
        <div class="text-center mt-5 mb-1">


          <x-title title="Choose your Dishes">
            <p>As per your recommended calorie, choose your dishes from below</p>
          </x-title>

        </div>
      </div>

    </div>
    <div class="row">

      <div class="col-md-3 chhosehead mb-3 col-3">


        <x-modal :isModalOpen="isModalOpen">

          <a class="x-modal-close-btn" href="javascript:void(0)" @click="closeModal()">X</a>
          <calendar-view @selectDate="calendarDateSelected($event)"
                         @unselectedDateKey="unselectedDate($event)" :dateSelected="dateSelected"
                         :selectionCount="defaultMealCount[currentPlan]"
                         :disabledDates="[]"

          />
        </x-modal>
        <!--        <input class="proceedbutton" type="button" @click="openModal()" value="Select Date">-->
        <input class="proceedbutton" type="button" @click="back()" value="Back">

      </div>
      <div class="col-md-9 mb-3 col-9">
        <div class="checkback float-right">
          <label class="checkmain">
            <input type="checkbox" @change="resetAllDishes()" :checked="isDefaultMenu?'checked':''">Choose
            Default Menu
            <span class="checkmark"></span>
          </label>
        </div>
      </div>
    </div>


    <div class="row">
      <div class="col-md-2 datelist  mb-3 pt-3 pb-3">
        <div class="row dateonnly">
          <div class="col-md-12 col-6 p-0 mt-1" style="height: 43px;" v-if="dateSelected.length"
               v-for="(date,ind) in dateSelected">
            <div class="trasformh backgroundcolornone" @click="changeDate(ind,date)">
              <label class="mb-0 d-flex flex-row">
                <div class="mr-2">

                </div>
                <input type="checkbox" checked="checked">{{
                  formatNumber(date.date) + '-' + formatNumber(date.month + 1) + '-' + date.year
                }}
                <div class="ml-2">
                  <i class="fa fa-times" aria-hidden="true" @click="removeDate(ind,date)"></i>

                </div>

              </label>
            </div>
            <i class="fa fa-caret-right maindivsele" aria-hidden="true" :id="getKey(date.fullDate)"
               v-if="getKey(date.fullDate)==dayIndexSelected"></i>

          </div>


        </div>

        <div class="chhosehead mb-3">
          <button @click="openModal()">Select Custom Dates</button>
        </div>


      </div>


      <div class="col-md-9 datelistimg mb-3">
        <div class="row">

          <div class="col-md-3 text-center"
               v-if="defaultSelectedMeals[dayIndexSelected] && getDishes(meal) != null && allDishData && defaultSelectedMealsDishIds && defaultSelectedMealsDishIds[dayIndexSelected] && defaultSelectedMealsDishIds[dayIndexSelected][meal] && allDishData['id_'+defaultSelectedMealsDishIds[dayIndexSelected][meal]] "
               v-for=" (meal,ind) in meals">

            <p>{{ meal.toUpperCase() }} </p>

            <div class="maincard mt-4">

              <g-image class="imgOne" @error="imageError($event)"
                       :src="validateImage(meal,dayIndexSelected)"
                       alt=""/>
              <div class="switch"
                   :style="'width:'+64*defaultSelectedMeals[dayIndexSelected][meal].dishes.length+'px'">
                <div v-for=" (dish,ind) in defaultSelectedMeals[dayIndexSelected][meal].dishes">
                  <input type="radio" class="switch-input" :name="meal"
                         :data-value="dish.id+'-'+ defaultSelectedMealsDishIds[dayIndexSelected][meal]"
                         :checked="defaultSelectedMealsDishIds[dayIndexSelected][meal]===dish.id ? 'checked': ''">
                  <label class="switch-label switch-label-off"
                         @click="changeDish(meal,dish.id)">{{ menuLetter[ind] }}</label>
                </div>

              </div>

            </div>

            <div class="dishnans">
              <p class="Adishname">{{
                  allDishData['id_' + defaultSelectedMealsDishIds[dayIndexSelected][meal]].name
                }}</p>
            </div>

          </div>
          <div v-else class="col-md-3 text-center">
            <p>{{ meal.toUpperCase() }}</p>
          </div>

          <div
              v-if="defaultSelectedMeals[dayIndexSelected] && !Object.keys(defaultSelectedMeals[dayIndexSelected]).length "
              class="w-100">

            <p class="p-5 text-center w-100">
              No Dishes found for this week
            </p>
          </div>

        </div>

      </div>


      <div class="col-md-12 text-center mt-2 mb-3">
        <a class="proceedbutton" href="javascript:void(0)" @click="proceed()"
           style="color: white">Proceed</a>
      </div>

    </div>


  </div>


</template>

<script>

import CalendarView from '~/components/calender/CalendarView';
import XModal from '~/components/Modal';
import api from '~/utils/api'
import {getStrapiMedia} from "../../utils/medias";
import XTitle from "../XTitle";

export default {
  name: "ChooseYourDishes",
  data() {
    return {
      Index: {},
      cart: {},
      meals: ['breakfast', 'lunch', 'dinner', 'snacks'],
      menuLetter: ['A', 'B', 'C', 'D'],
      isDefaultMenu: true,
      breakfastIndex: 0,
      dayIndexSelected: new Date(),
      dateSelected: [],
      isModalOpen: false,
      selectedMealPlan: {},
      mealGroup: [],
      mealGroupObj: {},
      currentPlan: 'Monthly',
      defaultSelectedMeals: {},
      defaultSelectedMealsDishIds: {},
      allDishData: {},
      defaultMealCount: {'Weekly': 6, 'Monthly': 26}
    }
  },
  components: {XTitle, CalendarView, XModal},
  async mounted() {

    this.$emit('isLoading', true);
    var chosenDishes = await api.getDishesChosen();
    var cart = await api.getCart();
    let planId = this.$route.query.mealPlanId;

    if (cart.success) {
      this.cart = cart.data;
    }


    if (chosenDishes.success) {
      this.defaultSelectedMealsDishIds = (chosenDishes.data && Object.keys(chosenDishes.data).length) ? this.validateCartDate(chosenDishes.data) : {};
      this.defaultSelectedMealsDishIds = this.$route.query.end_date ? {} : this.defaultSelectedMealsDishIds;
    }


    var that = this,
        today = this.getToday(),
        tomarrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
        dayAfterTomarrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2);
    this.dayIndexSelected = this.isWeekend(tomarrow) ? this.getKey(dayAfterTomarrow) : this.getKey(tomarrow);

    const mealPlan = await api.getMealPlan('id=' + planId);

    var weekPlannerDishIds = {
      "string": "",
      "object": {},
      "weeklyDishesObject": {},
    };
    if (mealPlan[0] && mealPlan[0].Dishes && mealPlan[0].Dishes[0]) {

      weekPlannerDishIds = (mealPlan[0].Dishes && mealPlan[0].Dishes.length) ? this.getWeeklyDishesIds(mealPlan[0].Dishes[0]) : weekPlannerDishIds;

      //  console.log(weekPlannerDishIds,1)

    }

    this.currentPlan = mealPlan[0].duration_type;
    this.mealGroup = await api.getDishes(weekPlannerDishIds['string']);
    var mealGroupWithIdKey = {};

   // console.log("this.mealGroup", this.mealGroup)
    if (this.mealGroup) {
      this.mealGroup.forEach((val, key) => {
        mealGroupWithIdKey['id_' + val.id] = val.dishes;
      });
      Object.keys(weekPlannerDishIds['weeklyDishesObject']).forEach((val, key) => {
        that.mealGroupObj[val] = mealGroupWithIdKey['id_' + weekPlannerDishIds['weeklyDishesObject'][val]]
      })

    }


    this.preFillDate();
    this.$emit('isLoading', false);

   // console.log('this.defaultSelectedMeals=', this.allDishData);
  },

  watch: {},

  created() {

  },
  methods: {
    getStrapiMedia,

    validateImage(meal, dayIndexSelected) {
      let imageArray = this.allDishData['id_' + this.defaultSelectedMealsDishIds[dayIndexSelected][meal]].images;
      if (imageArray.length && imageArray[0] && imageArray[0].formats && imageArray[0].formats.thumbnail && imageArray[0].formats.thumbnail.url) {
        return this.getStrapiMedia(imageArray[0].formats.thumbnail.url);
      } else
        return '';
    },
    getWeeklyDishesIds(dishes) {

      let weeklyDishesIds = [];
      let weeklyDishesIdsObject = {};
      let weeklyDishesObject = {};
      for (var i = 1; i < 6; i++) {
        if (dishes['week' + i]) {
          var dish = dishes['week' + i];

          if (dish.menu_week_planner) {
            weeklyDishesIdsObject['id_' + dish.menu_week_planner.id] = 'week' + i;
            weeklyDishesObject['week' + i] = dish.menu_week_planner.id;
            weeklyDishesIds.push('id_in=' + dish.menu_week_planner.id)
          }
        }
      }
      return {'string': weeklyDishesIds.join('&'), 'object': weeklyDishesIdsObject, weeklyDishesObject};
    },

    changeDish(type, indx) {
      this.isDefaultMenu = false;

      //to rerender changes :P
      this.dayIndexSelected++;
      this.dayIndexSelected--;

      this.defaultSelectedMealsDishIds[this.dayIndexSelected][type] = this.allDishData['id_' + indx].id;

    },

    resetAllDishes() {
      this.isDefaultMenu = !this.isDefaultMenu;
      if (this.isDefaultMenu) {
        this.dateSelected = [];
        this.Index = {};
        this.defaultSelectedMeals = {};
        this.defaultSelectedMealsDishIds = {};
        this.preFillDate();
      }
    },

    getDishes(type) {
      //  console.log('getDishes ', this.defaultSelectedMealsDishIds,this.defaultSelectedMeals[this.dayIndexSelected][type]);

      return this.defaultSelectedMeals[this.dayIndexSelected][type]
    },


    rebuildDefaultSelectedMeals() {
      var that = this;

      this.dateSelected.forEach((val, key) => {

        let dkey = that.getKey(val.fullDate);
        if (!key)
          this.dayIndexSelected = dkey;


        let currentWeek = that.getWeekTextFromDate(val.fullDate);


        // console.log("this.mealGroupObj=", this.mealGroupObj)
        //console.log(">>>>>>>>>>>>>>>>>>>>>>>>2.", dkey, 'week' + val.week, currentWeek, 1)
        let meal = that.defaultSelectedMeals[dkey] = this.mealGroupObj['week' + val.week] ? this.mealGroupObj['week' + val.week][currentWeek] : {};


        //      console.log("dkey,", dkey, val.week)
        //     console.log("this.mealGroupObj['week' + val.week],", this.mealGroupObj)
        //  console.log("meal", meal, currentWeek)

        that.meals.forEach(function (el, key) {
          if (meal[el] && typeof meal[el].dishes === 'object' /* && meal[el].selectedDishId === undefined*/) {
            meal[el].dishes.forEach((dsh, key2) => {
              that.allDishData['id_' + dsh.id] = dsh;
            });

            if (meal[el].dishes[0]) {

              if (typeof that.defaultSelectedMealsDishIds[dkey] !== 'object')
                that.defaultSelectedMealsDishIds[dkey] = {};

              that.defaultSelectedMealsDishIds[dkey][el] = (that.defaultSelectedMealsDishIds[dkey] && that.defaultSelectedMealsDishIds[dkey][el]) ? that.defaultSelectedMealsDishIds[dkey][el] : (meal[el] && meal[el].dishes[0]) ? meal[el].dishes[0].id : 0;

            }
          }
        });
      })

      this.removeUnwantedDates()

    },

    removeUnwantedDates() {
      let keys = Object.keys(this.defaultSelectedMealsDishIds);
      var that = this;
      if (keys.length) {
        keys.forEach((val, ind) => {
          if (!that.defaultSelectedMeals[val]) {
            delete that.defaultSelectedMealsDishIds[val];
          }
        })
      }

    },
    isWeekend(date) {
      if (date.getDay() === 0) {
        return 1;
      }
      return 0;
    },

    getWeekNumber(date) {

      let adjustedDate
      if (date.getDay() === 6 || date.getDay() === 5) {
        adjustedDate = date.getDate() - 2;

      } else
        adjustedDate = date.getDate() + date.getDay();

      let prefixes = ['0', '1', '2', '3', '4', '5'];
      return (parseInt(prefixes[0 | adjustedDate / 7]) + 1);

    },

    getWeekTextFromDate(date) {
      var days = ['0', '0', '1', '2',
        '3', '4', '5'];
      return days[date.getDay()];
    },

    validateCartDate(cartData) {

      var dateKey = Object.keys(cartData)
      // console.log('cartData', dateKey);
      var that = this;
      var newCartObj = {};
      dateKey.forEach((date, k) => {
        let thisDate = that.getDateFromKey(date);
        let today = new Date();
        if (today.getTime() >= thisDate.getTime()) {
          delete cartData[date];
        }
      });

      return cartData;
    },

    getDateFromKey(date) {
      let year = date.substr(0, 4);
      let month = date.substr(4, 2);
      let day = date.substr(6, 2);
      return new Date(year + '-' + month + '-' + day);
    },
    getKey(date) {
      var month = (date.getMonth() + 1);
      month = month <= 9 ? '0' + month : month;
      var cdate = date.getDate();
      cdate = cdate <= 9 ? '0' + cdate : cdate;
      var returnKey = date.getFullYear() + '' + month + '' + cdate;
      return returnKey;
    },

    getNextDate(currentDate, key) {
      return new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + key + 1);
    },

    preFillDate() {

      var OldDatesKeys = Object.keys(this.defaultSelectedMealsDishIds),
          that = this,
          today = this.getToday();

      let mealType = this.currentPlan,
          quantity = this.$route.query.quantity,
          i = 0,
          mealCount = this.defaultMealCount[mealType] * quantity;

      if (OldDatesKeys.length) {

        OldDatesKeys.forEach((val, ind) => {
          let dt = that.getDateFromKey(val);
          if (dt.getTime() > today.getTime())
            that.pushSelectedDate(dt);
        });
      } else {

        let sundaySkip = 0;
        for (i; i < mealCount + sundaySkip; i++) {
          var tomorrow = that.getNextDate(today, i);
          if (this.isWeekend(tomorrow)) {
            sundaySkip++;
          } else {
            that.pushSelectedDate(tomorrow);
          }
        }
      }

      that.fillBalanceDate(mealCount);
      that.rebuildDefaultSelectedMeals()
    },

    pushSelectedDate(date) {

      this.dateSelected.push({
        year: date.getFullYear(),
        month: date.getMonth(),
        fullDate: date,
        week: this.getWeekNumber(date),
        date: date.getDate()
      });
    },

    fillBalanceDate(mealCount) {

      var that = this,
          dateSelectedLength = that.dateSelected.length,
          lastDay = that.dateSelected[dateSelectedLength - 1].fullDate;

      var flag = that.dateSelected.length < mealCount;

      if (flag) {

        let sundaySkip = 0, cnt = mealCount - that.dateSelected.length;

       // console.log('fillBalanceDate 23', cnt);

        for (var i = 0; i < cnt + sundaySkip; i++) {
       //   console.log('fillBalanceDate', lastDay);
          var tomorrow = that.getNextDate(lastDay, i);
          if (this.isWeekend(tomorrow)) {
            sundaySkip++;
          } else {
          //  console.log('filling balance date', tomorrow);
            that.pushSelectedDate(tomorrow);
          }
        }
      }


    },

    removeDate(index, date) {
      if (this.dateSelected.indexOf(date) >= 0) {
        let key = this.getKey(date.fullDate);
        this.dateSelected.splice(index, 1);
        delete this.defaultSelectedMealsDishIds[key];
        //  console.log('removeDate before delete=', JSON.parse(JSON.stringify(this.defaultSelectedMeals)));
        delete this.defaultSelectedMeals[key];
        //   console.log('removeDate after delete=', JSON.parse(JSON.stringify(this.defaultSelectedMeals)));

        // var nkeys = Object.keys(this.defaultSelectedMealsDishIds);


        //  this.dayIndexSelected = this.getKey(date.fullDate)

      }

    },

    changeDate(index, date) {
      //  console.log('defaultSelectedMeals=', this.defaultSelectedMeals);
      if (this.dateSelected.indexOf(date) >= 0) {
        this.dayIndexSelected = this.getKey(date.fullDate)
        //  console.log('this.dayIndexSelected=', this.dayIndexSelected);

      }
    },
    closeModal() {
      this.isModalOpen = false;
    },
    openModal() {
      this.isModalOpen = true;
    },
    sortByDate(arr) {
      arr.sort(function (a, b) {
        return Number(new Date(a.fullDate)) - Number(new Date(b.fullDate));
      });

      return arr;
    },
    calendarDateSelected(val) {

      this.dateSelected = this.sortByDate(val);
      this.rebuildDefaultSelectedMeals();
    },
    unselectedDate(val) {
      if (this.defaultSelectedMealsDishIds[val])
        delete this.defaultSelectedMealsDishIds[val];
      if (this.defaultSelectedMeals[val]) {
        // console.log('unselectedDate before delete=', JSON.parse(JSON.stringify(this.defaultSelectedMeals)), val, JSON.parse(JSON.stringify(this.dateSelected)));
        delete this.defaultSelectedMeals[val];

        // console.log('unselectedDate after delete=', JSON.parse(JSON.stringify(this.defaultSelectedMeals)), val, JSON.parse(JSON.stringify(this.dateSelected)));

      }

    },
    formatNumber(number) {
      if (number.toString().length === 1) {
        number = "0" + number;
      }

      return number;
    },
    proceed() {

      let mealType = this.currentPlan,
          quantity = this.$route.query.quantity,
          mealCount = this.defaultMealCount[mealType] * quantity;

      this.$emit('onChooseYourDish', {
        dishes: this.defaultSelectedMeals,
        'dishIds': this.defaultSelectedMealsDishIds,
        mealCount
      })
    },
    back() {
      this.$emit('onGoBack', 'showCalorieCard')
    }
    ,
    imageError(ev) {
      ev.target.src = process.env.GRIDSOME_STRAPI_URL + '/uploads/no_image_8fa8e1f0c3.png';
    },
    getToday() {
      var today;
      var ToDate = new Date();

      try {
        today = this.$route.query.end_date ? new Date(this.$route.query.end_date) : new Date();
        if (today.getTime() < ToDate.getTime()) {
          today = new Date();
        }

      } catch (e) {
        today = new Date();

      }

    //  console.log(today);

      return today;
    }
  }
}
</script>

<style>
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

.Choosingmenu .datelist {
  height: 400px;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
