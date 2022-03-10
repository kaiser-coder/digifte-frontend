<template lang="">
  <div class="subcontent">
    <div class="row justify-center">
      <div style="display: flex; max-width: 250%; width: 100%;">
        <q-calendar-month
          ref="calendar"
          v-model="selectedDate"
          animated
          bordered
          focusable
          hoverable
          no-active-date
          :day-min-height="60"
          :day-height="0"
          @change="onChange"
          @moved="onMoved"
          @click-date="onClickDate"
          @click-day="onClickDay"
          @click-workweek="onClickWorkweek"
          @click-head-workweek="onClickHeadWorkweek"
          @click-head-day="onClickHeadDay"
        >
          <template #day="{ scope: { timestamp } }">
            <template
              v-for="event in eventsMap[timestamp.date]"
              :key="event.id"
            >
              <div
                :class="badgeClasses(event, 'day')"
                :style="badgeStyles(event, 'day')"
                class="my-event"
              >
                <div class="title q-calendar__ellipsis">
                  {{ event.title + (event.time ? ' - ' + event.time : '') }}
                </div>
              </div>
            </template>
          </template>
        </q-calendar-month>
      </div>
    </div>
  </div>
</template>

<script setup>
/*eslint-disable*/
import {
  QCalendarMonth,
  addToDate,
  parseDate,
  parseTimestamp,
  today
} from '@quasar/quasar-ui-qcalendar/src/index.js'
import '@quasar/quasar-ui-qcalendar/src/QCalendarVariables.sass'
import '@quasar/quasar-ui-qcalendar/src/QCalendarTransitions.sass'
import '@quasar/quasar-ui-qcalendar/src/QCalendarMonth.sass'
import { defineProps, ref, computed, defineExpose } from 'vue'

// The function below is used to set up our demo data
const CURRENT_DAY = new Date()
function getCurrentDay (day) {
  const newDay = new Date(CURRENT_DAY)
  newDay.setDate(day)
  const tm = parseDate(newDay)
  return tm.date
}

const props = defineProps({
  lessons: Array
})

const selectedDate = ref(today());
const calendar = ref(null);
const events = computed(() => {
  return props.lessons.map((d) => {
    const date = new Date(d.start_date);
    const t = new Date();
    const firstDate = new Date(t.getFullYear(), t.getMonth(), 1)
    const dateDiff = Math.floor((date - firstDate) / (1000*60*60*24));
    // console.log('Time => ', handleTime(date))
    // console.log('Diff =>', dateDiff);
    return {
      id: d._id,
      title: d.name,
      details: d.meeting,
      date: getCurrentDay(dateDiff + 1), // start_date
      time: handleTime(date),
      duration: d.meeting ? d.meeting.duration : 60,
      bgcolor: d.bgcolor
    }
  })
});    
const eventsMap = computed(() => {
  const map = {}
  if (events.value.length > 0) {
    events.value.forEach(event => {
      (map[ event.date ] = (map[ event.date ] || [])).push(event)
      if (event.days !== undefined) {
        let timestamp = parseTimestamp(event.date)
        let days = event.days
        // add a new event for each day
        // skip 1st one which would have been done above
        do {
          timestamp = addToDate(timestamp, { day: 1 })
          if (!map[ timestamp.date ]) {
            map[ timestamp.date ] = []
          }
          map[ timestamp.date ].push(event)
          // already accounted for 1st day
        } while (--days > 1)
      }
    })
  }
  console.log(map)
  return map
})

const handleTime = (dateD) => {
  let hrs = dateD.getHours()
  let mins = dateD.getMinutes()
  if(hrs<=9)
    hrs = '0' + hrs
  if(mins<10)
    mins = '0' + mins
  const postTime= hrs + ':' + mins
  return postTime
}

// onMounted(() => {
//   /* const today = new Date();
//   console.log('Tm', parseDate(today)) */
//   props.lessons.forEach((d) => {
//     const date = new Date(d.start_date);
//     const t = new Date();
//     const firstDate = new Date(t.getFullYear(), t.getMonth(), 1)
//     const dateDiff = Math.floor((date - firstDate) / (1000*60*60*24));
//     // console.log('Time => ', handleTime(date))
//     // console.log('Diff =>', dateDiff);
//     events.value.push({
//       id: d._id,
//       title: d.name,
//       details: d.meeting,
//       date: getCurrentDay(dateDiff + 1), // start_date
//       time: handleTime(date),
//       duration: d.meeting ? d.meeting.duration : 60,
//       bgcolor: d.bgcolor
//     })
//   })
// })

function badgeClasses (event, type) {
  return {
    [ `text-white bg-${ event.bgcolor }` ]: true,
    'rounded-border': true
  }
}

function badgeStyles (day, event) {
  const s = {}
  // s.left = day.weekday === 0 ? 0 : (day.weekday * this.parsedCellWidth) + '%'
  // s.top = 0
  // s.bottom = 0
  // s.width = (event.days * this.parsedCellWidth) + '%'
  return s
}
defineExpose({goPrev, goToday, goNext})

function goNext () {
  calendar.value.next()
}

function goToday () {
  calendar.value.moveToToday()
}

function goPrev () {
  calendar.value.prev()
}

</script>

<style lang="sass" scoped>
.my-event
  position: relative
  font-size: 12px
  width: 100%
  margin: 1px 0 0 0
  justify-content: center
  text-overflow: ellipsis
  overflow: hidden
  cursor: pointer
.title
  position: relative
  display: flex
  justify-content: center
  align-items: center
  height: 100%
.text-white
  color: white
.bg-blue
  background: blue
.bg-green
  background: green
.bg-orange
  background: orange
.bg-red
  background: red
.bg-teal
  background: teal
.bg-grey
  background: grey
.bg-purple
  background: purple
.rounded-border
  border-radius: 2px
</style>