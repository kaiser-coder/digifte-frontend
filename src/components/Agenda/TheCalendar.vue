<template>
  <div class="subcontent">
    <!-- <navigation-bar
      @today="onToday"
      @prev="onPrev"
      @next="onNext"
    /> -->

    <div class="q-ma-sm q-gutter-sm row justify-center">
      <q-select
        v-model="selectedView"
        label="Calendar View"
        outlined
        dense
        options-dense
        :disable="selectedCalendar === 'month'"
        :options="[
          'day',
          'week',
          'month'
        ]"
        class="button"
        style="min-width: 180px;"
      />
    </div>

    <div class="row">
      <div style="display: flex; max-width: 100%; width: 100%; max-height: 400px;">
        <q-calendar
          ref="calendar"
          v-model="selectedDate"
          :mode="selectedCalendar"
          resource-key="id"
          resource-label="name"
          :view="selectedView"
          :day-min-height="70"
          animated
          bordered
          :task-width="240"
          :min-weekday-length="2"
          @change="onChange"
        >
          <template #resource-days="{ scope }">
            <template
              v-for="(event, index) in getEvents(scope)"
              :key="index"
            >
              <q-badge
                outline
                color="primary"
                :label="event.title"
                :style="getStyle(event)"
              />
            </template>
          </template>
        </q-calendar>
      </div>
    </div>
  </div>
</template>

<script>
/*eslint-disable*/
import { defineComponent, ref, computed, reactive, onBeforeMount } from 'vue'
import {
  QCalendar,
  today,
  padNumber,
  isBetweenDates,
  parsed
} from '@quasar/quasar-ui-qcalendar/src/index.js'
import '@quasar/quasar-ui-qcalendar/src/QCalendarVariables.sass'
import '@quasar/quasar-ui-qcalendar/src/QCalendarTransitions.sass'
import '@quasar/quasar-ui-qcalendar/src/QCalendar.sass'

// import NavigationBar from '../components/NavigationBar.vue'

// import Done from '@carbon/icons-vue/es/checkmark--outline/16'
// import Pending from '@carbon/icons-vue/es/pending/16'
// import Blocking from '@carbon/icons-vue/es/undefined/16'

export default defineComponent({
  name: 'CalendarAll',
  components: {
    QCalendar,
  },
  setup () {
    const
      selectedCalendar = ref('day'),
      selectedView = ref('day'),
      calendar = ref(null),
      selectedDate = ref(today()),
      events = reactive([
        {
          id: 1,
          title: 'Vacation',
          details: 'Time at the cabin',
          date: '',
          days: 2,
          allDay: true,
          bgcolor: 'orange'
        },
        {
          id: 2,
          title: 'Training',
          details: 'Javascript 101',
          date: '',
          days: 2,
          allDay: true,
          bgcolor: 'green'
        }
      ]),
      startDate = ref(today()),
      endDate = ref(today());

    function onChange (data) {
      startDate.value = data.start
      endDate.value = data.end
    }

    function onToday () {
      calendar.value.moveToToday()
    }
    function onPrev () {
      calendar.value.prev()
    }
    function onNext () {
      calendar.value.next()
    }

    function getEvents (scope) {
      const events = []
      if (this.events[ scope.resource.id ]) {
        // get events for the specified resource
        const resourceEvents = this.events[ scope.resource.id ]
        // make sure we have events
        if (resourceEvents && resourceEvents.length > 0) {
          // for each event figure out start position and width
          for (let x = 0; x < resourceEvents.length; ++x) {
            events.push({
              left: this.getLeft(scope, resourceEvents[ x ]),
              width: this.getWidth(scope, resourceEvents[ x ]),
              title: resourceEvents[ x ].title
            })
          }
        }
      }
      return events
    }

    function getStyle (event) {
      return {
        position: 'absolute',
        background: 'white',
        left: event.left,
        width: event.width
      }
    }

    return {
      selectedCalendar,
      selectedView,
      selectedDate,
      calendar,
      events,
      onToday,
      onPrev,
      onNext,
      onChange,
      getEvents,
      getStyle
    }
  }
})
</script>

<style lang="sass" scoped>

.header
  display: flex
  justify-content: space-between
  align-items: center
  width: 100%
  padding: 2px
  font-size: .9em
  .issue
    display: flex
    justify-content: flex-start
    align-items: center
    width: 80%
  .key
    display: flex
    justify-content: center
    width: 80px
  .logged
    display: flex
    justify-content: flex-end
    width: 80px
.summary
  display: flex
  justify-content: space-between
  align-items: center
  padding: 2px
  font-size: .9em
  font-weight: 700
  width: 100%
  .title
    display: flex
    justify-content: flex-start
  .total
    display: flex
    justify-content: flex-end
.done
  color: blue
.pending
  color: green
.blocking
  color: redsubcontent
.logged-time
  display: flex
  justify-content: center
  align-items: center
  padding: 0
  margin: 0
  height: 100%
</style>

<style lang="sass">
.task__weekday--style
  font-size: 0.8em !important
  font-weight: 600
.task__day--style
  font-size: 0.8em !important
.task__footer--day__style
  font-size: 0.8em !important
  font-weight: 600
</style>