<template>
  <table class="single-date-picker__calendar-month">
    <thead>
    <CalendarWeekHeader
        v-for="(day, index) in daysInWeek"
        :key="index"
        :day="day"
    />
    </thead>
    <tbody>
    <CalendarWeek
        v-for="(week, index) in datesPerWeek"
        :key="index"
        :week="week"
        :year="year"
        :month="month"
        :is-today="isToday"
        :is-selected="isSelected"
        :selected="selected"
        @selectDate="selectDate"
    />
    </tbody>
  </table>
</template>

<script>
import CalendarWeekHeader from '~/components/calender/CalendarWeekHeader';
import CalendarWeek from '~/components/calender/CalendarWeek';

export default {
  components: {
    CalendarWeekHeader,
    CalendarWeek
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
    datesPerWeek: {
      type: Array,
      default: () => []
    },
    isToday: {
      type: Number,
      default: 0
    },
    selected: {
      type: Array,
      default: () => []
    },
    isSelected: {
      type: Number,
      default: 0
    },
    weekStartDay: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      daysInWeek: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
    };
  },
  created() {
    this.rotateDaysInWeek(this.daysInWeek, this.weekStartDay);
  },
  methods: {
    selectDate(date) {
      this.$emit('selectDate', date);
    },
    rotateDaysInWeek(daysInWeek, shifts) {
      while (shifts--) {
        var temp = daysInWeek.shift();
        daysInWeek.push(temp);
      }
    }
  }
};
</script>

<style scoped>
.single-date-picker__calendar-month {
  width: 100%;
  padding: 10px;
}
</style>
