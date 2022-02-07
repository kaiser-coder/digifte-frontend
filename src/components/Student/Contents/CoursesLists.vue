<template>
    <div>
      <h4 class="titleContent">Listes cours</h4> <br>
      <div class="tableCoursesLists">
        <q-markup-table>
            <thead>
                <tr>
                  <th class="text-center">Titre</th>
                  <th class="text-center">Description</th>
                </tr>
            </thead>
            <tbody>
                <tr class="cursor-pointer" v-for="(course, index) in courses" :key="index" @click="this.selectCourse(course)">
                  <td class="text-center" v-text="course.title" ></td>
                  <td class="text-center" v-text="course.description" ></td>
                </tr>
            </tbody>
        </q-markup-table>
      </div>
    </div>
</template>

<script>
    
import { ref } from 'vue';
import { useCourseStore } from 'src/stores/course';

const data = [
  {
    Titre: '',
    Description: '',
  }
]

const columns = [
  {name: 'Titre', label: 'Titre', field: 'Titre', sortable: true, align: 'left'},
  {name: 'Description', label: 'Description', field: 'Description', sortable: true, align: 'left'},
  {name: 'Action', label: 'Action', field: 'Action', sortable: false, align: 'center'}
];

export default {
  name: 'CoursesLists',

  data() {
    return {
      title: '',
      description: '',
      professor_id: '',
      coursesDetails: [],
    }
  },

  beforeMount() {
    /*eslint-disable*/
    if (!this.$q.sessionStorage.getItem('current_user')) {}
  },

  setup () {
    const courseStore = useCourseStore()
    let courses = ref(courseStore.courses)
    return {
      text: ref(''),
      small: ref(false),
      ph: ref(''),
      dense: ref(false),
      model: ref(null),
      data,
      columns,
      courses
    }
  },

  mounted() {
    this.getCoursesDetails();
  },

  methods: {
    selectCourse (course) {
      const { _id } = course
      this.$router.push({ path: `/home-student/course-details/${_id}`})
    },

    getCoursesDetails() {
      const courseStore = useCourseStore()
      const appToken = this.$q.sessionStorage.getItem('app_token');
      courseStore.getAll(appToken).then((result) => {
        console.log(result.data);
        result.data.map((d) => courseStore.courses.push(d))
        this.coursesDetails = result.data.data
      })
    },

    formatCoursesDetails(courses) {
      for (let key in courses) {
        this.coursesDetails.push({ ...courses[key], id:key})
      }
    },
  }
}

</script>


<style scoped>

  .titleContent {
    text-align: center;
    margin-top: 20px;
    line-height: 0.5;
  }

  .tableCoursesLists {
    margin-right: 5em;
    margin-left: 5em;
  }

</style>