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

  import { ref, computed, onMounted } from 'vue'
  import { useLessonStore } from 'src/stores/lesson'
  import { useQuasar } from 'quasar'

  //import NavigationBar from '../components/NavigationBar.vue'

  // The function below is used to set up our demo data
  const CURRENT_DAY = new Date()
  function getCurrentDay (day) {
    const newDay = new Date(CURRENT_DAY)
    newDay.setDate(day)
    const tm = parseDate(newDay)
    return tm.date
  }

  // This function define random colors
  const COLORS = ['primary', 'secondary', 'accent', 'positive', 'negative', 'info', 'warning'];
  function setColor() {
    return COLORS[Math.floor(Math.random() * 8)];
  }

  const selectedDate = today();
  /* const events = ref([
      {
        id: 1,
        title: '1st of the Month',
        details: 'Everything is funny as long as it is happening to someone else',
        date: getCurrentDay(1),
        bgcolor: 'orange'
      },
      {
        id: 2,
        title: 'Sisters Birthday',
        details: 'Buy a nice present',
        date: getCurrentDay(4),
        bgcolor: 'green',
        icon: 'fas fa-birthday-cake'
      },
      {
        id: 3,
        title: 'Meeting',
        details: 'Time to pitch my idea to the company',
        date: getCurrentDay(10),
        time: '10:00',
        duration: 120,
        bgcolor: 'red',
        icon: 'fas fa-handshake'
      },
      {
        id: 4,
        title: 'Lunch',
        details: 'Company is paying!',
        date: getCurrentDay(10),
        time: '11:30',
        duration: 90,
        bgcolor: 'teal',
        icon: 'fas fa-hamburger'
      },
      {
        id: 5,
        title: 'Visit mom',
        details: 'Always a nice chat with mom',
        date: getCurrentDay(20),
        time: '17:00',
        duration: 90,
        bgcolor: 'grey',
        icon: 'fas fa-car'
      },
      {
        id: 6,
        title: 'Conference',
        details: 'Teaching Javascript 101',
        date: getCurrentDay(22),
        time: '08:00',
        duration: 540,
        bgcolor: 'blue',
        icon: 'fas fa-chalkboard-teacher'
      },
      {
        id: 7,
        title: 'Girlfriend',
        details: 'Meet GF for dinner at Swanky Restaurant',
        date: getCurrentDay(22),
        time: '19:00',
        duration: 180,
        bgcolor: 'teal',
        icon: 'fas fa-utensils'
      },
      {
        id: 8,
        title: 'Rowing',
        details: 'Stay in shape!',
        date: getCurrentDay(27),
        bgcolor: 'purple',
        icon: 'rowing',
        days: 2
      },
      {
        id: 9,
        title: 'Fishing',
        details: 'Time for some weekend R&R',
        date: getCurrentDay(27),
        bgcolor: 'purple',
        icon: 'fas fa-fish',
        days: 2
      },
      {
        id: 10,
        title: 'Vacation',
        details: 'Trails and hikes, going camping! Don\'t forget to bring bear spray!',
        date: getCurrentDay(29),
        bgcolor: 'purple',
        icon: 'fas fa-plane',
        days: 5
      }
  ]); */

  const events = ref([]);

  const lessonStore = useLessonStore();
  const $q = useQuasar();

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

  onMounted(() => {
    const appToken = $q.sessionStorage.getItem('app_token')
    // Get lessons with courseId
    lessonStore.getAllByCourseId(appToken, '61f914861956f9f78d5065f9').then((result) => {
      console.log('Lessons of "61f914861956f9f78d5065f9" => ', result)
    })

    // Get all lessons
    lessonStore.getAll(appToken).then((result) => {
      // Format data
      result.data.forEach((d) => {
        const date = new Date(d.start_date);
        events.value.push({
          id: d._id,
          title: d.name,
          details: [d.duration, d.zoom_url, date],
          date: getCurrentDay(date.getDate()), // start_date
          bgcolor: setColor()
        })
      })
    })
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
