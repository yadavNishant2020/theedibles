/* eslint-disable no-console */
<template>
    <div
            id="single-date-picker"
            class="single-date-picker__calendar-view"
    >
        <CalendarMonthHeader
                :year="year"
                :month="month"
                @toggleMonth="toggleMonth"
        />
        <CalendarMonth
                :dates-per-week="datesPerWeek"
                :is-today="isToday"
                :year="year"
                :month="month"
                :is-selected="isSelected"
                :selected="selected"
                :week-start-day="weekStartDay"
                @selectDate="selectDate"
        />
    </div>
</template>

<script>
    import CalendarMonthHeader from '~/components/calender/CalendarMonthHeader';
    import CalendarMonth from '~/components/calender/CalendarMonth';

    const NUM_DAYS_IN_WEEK = 7;

    export default {
        name: 'CalendarView',
        components: {
            CalendarMonthHeader,
            CalendarMonth
        },
        props: {
            disabledDates: {
                type: Array,
                default: () => []
            },
            selectionCount: {
                type: Number,
                default: 0,
            },
            dateSelected: {
                type: Array,
                default: () => []
            },
            date: {
                type: Object,
                default: () => null
            },
            firstDayOfWeek: {
                type: Number,
                default: 0,
                validator: value => value >= 0 && value <= 6
            }
        },
        data() {
            return {
                year: 0,
                month: 0,
                todayDate: 0,
                todayYear: 0,
                todayMonth: 0,
                selectedDate: null,
                selected: [],
                weekStartDay: 0
            };
        },
        computed: {
            numDays() {
                return new Date(this.year, this.month + 1, 0).getDate();
            },
            firstDay() {
                return new Date(this.year, this.month, 1).getDay() - this.weekStartDay;
            },
            lastDay() {
                return new Date(this.year, this.month + 1, 0).getDay();
            },
            numDaysInFirstWeek() {
                return NUM_DAYS_IN_WEEK - this.firstDay;
            },
            numDaysInLastWeek() {
                return this.lastDay + 1;
            },
            numWeeks() {
                const daysLeft =
                    this.numDays - this.numDaysInFirstWeek - this.numDaysInLastWeek;
                return daysLeft / 7 + 2;
            },
            numFullWeeks() {
                return this.numWeeks - 2;
            },
            datesInFirstWeek() {
                return this.generateDatesInWeek(
                    1,
                    this.firstDay,
                    this.numDaysInFirstWeek
                );
            },
            datesInLastWeek() {
                return this.generateDatesInWeek(
                    this.numDays - this.numDaysInLastWeek + 1,
                    0,
                    this.numDaysInLastWeek
                );
            },
            datesInMiddleWeeks() {
                const startDates = [];
                for (let i = 0; i < this.numFullWeeks; i += 1) {
                    startDates[i] = this.datesInFirstWeek[6] + 1 + i * 7;
                }
                return startDates.map(startDate => {
                    return this.generateDatesInWeek(startDate, 0, 7);
                });
            },
            datesPerWeek() {
                return [
                    this.datesInFirstWeek,
                    ...this.datesInMiddleWeeks,
                    this.datesInLastWeek
                ];
            },
            isCurrentMonth() {
                return this.todayMonth === this.month;
            },
            isCurrentYear() {
                return this.todayYear === this.year;
            },
            isToday() {
                return this.isCurrentMonth && this.isCurrentYear ? this.todayDate : 0;
            },


            isSelected() {
                if (this.selectedDate) {
                    return this.selectedDate.year === this.year &&
                    this.selectedDate.month === this.month
                        ? this.selectedDate.date
                        : 0;
                }
                return 0;
            }
        },
        watch: {
            date(val) {
                this.setDate(val);
            }
        },
        created() {
            this.selected = this.dateSelected;
            this.validateSelectedDate(this.disabledDates);
            const date = new Date();
            if (this.date) {
                this.setDate(this.date);
            } else {
                this.year = date.getFullYear();
                this.month = date.getMonth();
            }
            this.todayDate = date.getDate();
            this.todayYear = date.getFullYear();
            this.todayMonth = date.getMonth();

            this.weekStartDay =
                this.firstDayOfWeek >= 0 && this.firstDayOfWeek <= 6
                    ? this.firstDayOfWeek
                    : 0;
        },
        methods: {
            generateDatesInWeek(startDate, startDay, numDays) {
                const datesInWeek = new Array(7).fill(0);
                for (let i = 0; i < numDays; i += 1) {
                    datesInWeek[startDay + i] = startDate + i;
                }
                return datesInWeek;
            },
            toggleMonth(direction) {
                let newMonth = this.month + Number(direction);
                let newYear = this.year;
                if (newMonth < 0) {
                    newMonth = 11;
                    newYear -= 1;
                }
                if (newMonth > 11) {
                    newMonth = 0;
                    newYear += 1;
                }
                if (newYear >= 1970) {
                    this.month = newMonth;
                    this.year = newYear;
                }
            },
            selectIndex: function (item) {
                if (!this.selected) {
                    return -1;
                }
                for (let i = 0; i < this.selected.length; i++) {
                    if (
                        this.getDate(this.selected[i]).getTime() ==
                        this.getDate(item).getTime()
                    ) {
                        return i;
                    }
                }
                return -1;
            },
            getDate(d) {
                return new Date(d.year + '-' + (d.month + 1) + '-' + d.date);
            },
            toggleSelect: function (item) {
                let index = this.selectIndex(item);
                if (index < 0) {
                    if (!this.isWeekend(item.fullDate) && this.selected.length < this.selectionCount && this.checkDate(item.fullDate) && this.isThisDateDisabled(item.fullDate))
                        this.selected.push(item);
                    else
                        console.log('Old date / Allowed selection is ' + this.selectionCount);
                } else {
                    this.selected.splice(index, 1);
                    let month = item.month + 1 < 10 ? '0' + (item.month + 1) : (item.month + 1);
                    let datez = item.date < 10 ? '0' + item.date : item.date;
                    this.$emit('unselectedDateKey', item.year + '' + month + '' + datez);
                }
            },

            selectDate(date) {
                if (date) {
                    let curDate = new Date(this.year + '-' + (this.month + 1) + '-' + date);
                    this.selectedDate = {
                        year: this.year,
                        month: this.month,
                        week: this.getWeekNumber(curDate),
                        fullDate: curDate,
                        date
                    };
                    this.toggleSelect(this.selectedDate);
                    this.$emit('selectDate', this.selected);

                }
            },
            setDate(date) {
                this.year = date.year;
                this.month = date.month;
                this.selectedDate = this.date;
            },
            getWeekNumber(date) {
              let adjustedDate
              if (date.getDay()===6 || date.getDay()===5){
                adjustedDate = date.getDate()-2;

              }else
                adjustedDate = date.getDate()+date.getDay();

              let prefixes = ['0', '1', '2', '3', '4', '5'];
              return (parseInt(prefixes[0 | adjustedDate / 7])+1);

             },
            isWeekend(date) {

                let dt = date;

                if (dt.getDay() === 0) {
                    return 1;
                }
                return 0;
            },
            checkDate(date) {

                let dt = date;
                let today = new Date();


                if (today.getTime() >= dt.getTime()) {
                    return 0;
                }
                return 1;

            },
            isThisDateDisabled(date) {

                try {

                    return this.disabledDates.every(dt => {
                        if (new Date(dt).toLocaleDateString() === date.toLocaleDateString()) {
                            return false;
                        }
                        // Make sure you return true. If you don't return a value, `every()` will stop.
                        return true;
                    });

                } catch (e) {
                    console.log(e);
                    return true;
                }
            },
            validateSelectedDate(disabledDates) {

                try {
                    var that = this;
                    disabledDates.forEach((dt) => {

                        var curDate = new Date(dt);
                        that.selected.forEach((val, key) => {
                            if (val.fullDate.toDateString() === curDate.toDateString())
                                this.selected.splice(key, 1);
                        });

                    })
                } catch (e) {

                    console.log('Error while validate selected date');
                }
            }
        },

    };
</script>

<style scoped>
    #single-date-picker table {
        border-collapse: separate;
    }

    #single-date-picker {
        font-family: "Lato", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    .single-date-picker__calendar-view {
        max-width: 300px;
        background-color: white;
        border-radius: 10px;
        box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.1);
        color: #0d1e44;
    }
</style>
