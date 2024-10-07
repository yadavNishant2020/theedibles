<template>
  <td>
    <div
        v-show="date"
        class="single-date-picker__date"
        :class="{'single-date-picker__today': isToday,
               'single-date-picker__selected': isSelected(), 'single-date-picker__sunday': isSunday}"
        @click="selectDate"
    >
      {{ date }}
    </div>
  </td>
</template>

<script>
export default {
  props: {
    year: {
      type: Number,
      default: () => 1970
    },
    month: {
      type: Number,
      default: () => 0
    },
    date: {
      type: Number,
      default: () => 1
    },
    isSunday: {
      type: Boolean,
      default: false
    },
    isToday: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Array,
      default: () => []
    }
  },
  mounted() {


  },
  computed: {},
  methods: {
    isSelected() {
      var flag = 0;
      var that = this;

      this.selected.forEach(function (date) {
        var xdate = new Date(date.year + '-' + (date.month + 1) + '-' + date.date);
        var cdate = new Date(that.year + '-' + (that.month + 1) + '-' + that.date);
        if (!flag) flag = xdate.getTime() == cdate.getTime();
      });
      return flag;
    },
    selectDate() {
      this.$emit('selectDate', this.date);
    }
  }
};
</script>

<style scoped>
.single-date-picker__date {
  font-size: 10px;
  /*font-size: 14px;*/
  height: 30px;
  width: 30px;
  display: table-cell;
  vertical-align: middle;
  box-sizing: border-box;
  cursor: default;
}

.single-date-picker__date:hover, .single-date-picker__date.single-date-picker__selected {
  border-radius: 50%;
  border: 2px solid pink;
}

.single-date-picker__date.single-date-picker__today {
  border-radius: 50%;
  background-image: linear-gradient(to bottom right, #f1b4b9, #d2b0c3);
}
.single-date-picker__sunday{
  color: #cac9c9;
}
</style>
