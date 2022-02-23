<template>
  <div class="subcontent">
    <!-- <navigation-bar
      @today="onToday"
      @prev="onPrev"
      @next="onNext"
    /> -->

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
                  <q-tooltip>
                    <ul style="list-style: none;">
                      <li>Durée: {{ event.details[0] }}</li>
                      <li>Lien du Meeting: {{ event.details[1] }}</li>
                      <li>Date de début: {{ event.details[2] }}</li>
                    </ul>
                  </q-tooltip>
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
  /* eslint-disable */
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

  import { computed, defineProps } from 'vue'

  //import NavigationBar from '../components/NavigationBar.vue'

  const props = defineProps({
    lessons: Array,
  })

  // This function define random colors
  const COLORS = ['primary', 'secondary', 'accent', 'positive', 'negative', 'info', 'warning'];
  function setColor() {
    return COLORS[Math.floor(Math.random() * 8)]
  }

  // The function below is used to set up our demo data
  const CURRENT_DAY = new Date()
  function getCurrentDay (day) {
    const newDay = new Date(CURRENT_DAY)
    newDay.setDate(day)
    const tm = parseDate(newDay)
    return tm.date
  }

  const selectedDate = today();

  const events = computed(() => {
    // Format data
    let custom = [];
    props.lessons.forEach((d) => {
      const date = new Date(d.start_date);
      custom.push({
        id: d._id,
        title: d.name,
        details: [d.duration, d.zoom_url, date],
        date: getCurrentDay(date.getDate()), // start_date
        bgcolor: setColor()
      })
    })
    return custom
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
    // console.log(map)
    return map
  })

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
