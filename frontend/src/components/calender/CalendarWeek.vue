<template>
  <tr>
    <CalendarDate
      v-for="(date, index) in week"
      :key="index"
      :date="date"
      :month="month"
      :year="year"
      :is-today="isToday === date"
      :is-sunday="isSunday(date)"
      :is-selected="isSelected === date"
      :selected="selected"
      @selectDate="selectDate"
    />
  </tr>
</template>

<script>
import CalendarDate from '~/components/calender/CalendarDate';
export default {
  components: {
    CalendarDate
  },
  props: {
      year: {
      type: Number,
      default: () => 1970
    },
    month: {
      type: Number,
      default: () => 0
    },
    week: {
      type: Array,
      default: () => []
    },
    isToday: {
      type: Number,
      default: 0
    },
    isSelected: {
      type: Number,
      default: 0
    },
    selected: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    isSunday(date) {
      var dd = new Date(this.year + '-' + (this.month + 1) + '-' + date)
      //console.log(this.year + '-' + (this.month + 1) + '-' + date)
       return dd.getDay() === 0;
    },
    selectDate(date) {
      this.$emit('selectDate', date);
    }
  }
}
</script>

<style scoped>
tr {
  color: #614a52;
}
</style>
