<template lang="" >
  <div class="subcontent">
    <div class="row full-width justify-center q-pt-md">
        <q-btn-group>
            <q-btn label="Prev" icon="navigate_before" @click="onPrev" />
            <q-btn label="Today" @click="onToday" />
            <q-btn label="Next" icon-right="navigate_next" @click="onNext" />
        </q-btn-group>
    </div>
    <div class="row justify-center">
      <div style="display: flex; max-width: 250%; width: 100%;">
        <q-calendar-month
          ref="calendar"
          v-model="selectedDate"
          animated
          bordered
          focusable
          hoverable
          transition-next="slide-left"
          transition-prev="slide-right"
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
                  {{ event.title + (event.time ? ' - ' + event.time : '') }} &nbsp;
                  <q-icon
                    name="launch"
                    @click="launchMeeting(event.details.join_url)"
                    v-if="event.details !== undefined"
                  />
                </div>
              </div>
            </template>
          </template>
        </q-calendar-month>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable */
import {
  Timestamp,
  QCalendarMonth,
  addToDate,
  parseDate,
  parseTimestamp,
  today
} from '@quasar/quasar-ui-qcalendar';

import { computed, ref, Ref } from 'vue';
import { Lesson } from './types/lesson';
import { Meeting } from './types/meeting';

interface Props {
  lessons: Lesson[];
}

const props = defineProps<Props>()

const emits = defineEmits(['onLaunchMeeting']);

const calendar: Ref<QCalendarMonth | null> = ref(null);

// The function below is used to set up our demo data
const CURRENT_DAY = new Date()
function getCurrentDay(day: number) {
  const newDay = new Date(CURRENT_DAY)
  newDay.setDate(day)
  const tm = <Timestamp>parseDate(newDay)
  return tm.date
}

const selectedDate = ref(today());

type Event = {
        id: string;
      title: string;
      details: Meeting;
      days?: number;
      date: string;
      bgcolor?: string;
}
const events = computed(() => {
  // Format data
  let custom:Event[] = [];
  props.lessons.forEach((d) => {
    const date = new Date(d.start_date);
    custom.push({
      id: d._id,
      title: d.name,
      details: d.meeting,
      date: getCurrentDay(date.getDate()), // start_date
      bgcolor: d.bgcolor,
    })
  })
  return custom
});

const eventsMap = computed(() => {
  const map:{[key: string]: Event[]} = {}
  if (events.value.length > 0) {
    events.value.forEach(event => {
      (map[event.date] = (map[event.date] || [])).push(event)
      if (event.days !== undefined) {
        let timestamp = <Timestamp>parseTimestamp(event.date)
        let days = event.days
        // add a new event for each day
        // skip 1st one which would have been done above
        do {
          timestamp = addToDate(timestamp, { day: 1 })
          if (!map[timestamp.date]) {
            map[timestamp.date] = []
          }
          map[timestamp.date].push(event)
          // already accounted for 1st day
        } while (--days > 1)
      }
    })
  }
  // console.log(map)
  return map
})

function badgeClasses(event: Event, type: string) {
  return {
    [`text-white bg-${event.bgcolor}`]: true,
    'rounded-border': true
  }
}

function badgeStyles(day: number, event: Event) {
  const s = {}
  // s.left = day.weekday === 0 ? 0 : (day.weekday * this.parsedCellWidth) + '%'
  // s.top = 0
  // s.bottom = 0
  // s.width = (event.days * this.parsedCellWidth) + '%'
  return s
}

function launchMeeting(url: string) {
  emits('onLaunchMeeting', url)
}

function onToday() {
  calendar.value?.moveToToday()
}
function onPrev() {
  calendar.value?.prev()
}
function onNext() {
  calendar.value?.next()
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
