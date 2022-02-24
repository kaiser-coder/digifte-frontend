<template lang="">
  <div>
    <h4 class="titleThree">Listes cours</h4>
    <br />
    
    <NewCourseButton 
      v-if="userRole == 'professor'"
      @onSubmitForm="submitFormCreationCourse"
    />
    
    <div>
      <q-markup-table>
        <thead>
          <tr>
            <th class="text-center">Titre</th>
            <th class="text-center">Description</th>
            <th class="text-center" colspan="2">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(course, index) in courses"
            :key="index"
          >
            <td class="text-center" v-text="course.title"></td>
            <td class="text-center" v-text="course.description"></td>
            <td class="text-center">
              <SubscribeCourseButton 
                @onSubscribeStudent="handleSubscribeStudent(course._id)"
                :isSubscribed="checkSubscribeStatus(course)"
                v-if="userRole == 'student'"
              />
            </td>
            <td>
              <q-btn 
                label="Voir les détails"
                :disabled="!checkSubscribeStatus(course)"
                @click="handleViewDetail(course._id)"
              />
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import { useQuasar } from 'quasar';
  import { useRouter } from 'vue-router';
  import { useCourseStore } from 'src/stores/course';
  import { storeToRefs } from 'pinia';

  import NewCourseButton from 'src/components/courses/NewCourseButton.vue';
  import SubscribeCourseButton from 'src/components/courses/SubscribeCourseButton.vue';

  /* Stores*/
  const courseStore = useCourseStore();

  /* Plugins imports */
  const $router = useRouter();
  const $q = useQuasar();

  /* States */
  /*eslint-disable*/
  const {courses} = storeToRefs(courseStore);
  const appToken = ref($q.sessionStorage.getItem('app_token'));
  /*eslint-disable*/
  const userRole = ref($q.sessionStorage.getItem('current_user').roles[0])
  const userId = ref($q.sessionStorage.getItem('user_id'));

  function checkSubscribeStatus(course) {
    if(userRole.value == 'student') {
      return course.students.includes(userId.value)
    }

    return true
  }

  // Functions
  function handleViewDetail(courseId) {
    /*eslint-disable*/
    $router.push(`/app/courses/details/${courseId}`);
  }

  function submitFormCreationCourse(formContents) {
    console.log('Form fields => ', formContents)
    courseStore.submitCourse(appToken.value, {...formContents, professor_id: userId.value}).then((result) => {
      console.log('New course => ', result);
      courseStore.courses.push(result.data)
    })
  }

  function handleSubscribeStudent(courseId) {
    // console.log('Submited student =>', {courseId, student: userId.value});
    // throw '';

    courseStore.subscribeToCourse(appToken.value, {courseId, student: userId.value})
      .then((result) => {
        console.log('Subscribed student =>', result);
        
        $q.notify({
            type: 'positive',
            message: result.message,
            position: 'top-right'
        })
      })
      .catch((error) => {
        $q.notify({
            type: 'negative',
            message: error.message,
            position: 'top-right'
        })
      })
  }

  onMounted(() => {
    courseStore.getAll(appToken.value).then((result) => {
      console.log('All courses => ', result)
      if(userRole === 'professor') {
        courses.value = result.data.filter((d) => professor_id === userId.value )
      } else {
        courses.value = result.data
      }
    })
  });
</script>

<style scoped>
  .titleOne {
    text-align: center;
    margin-top: 20px;
    line-height: 0;
  }

  .titleTwo {
    text-align: center;
    margin-top: 20px;
    line-height: 0;
  }

  .titleThree {
    text-align: center;
    margin-top: 20px;
    line-height: 0.5;
  }

  form {
    display: block;
    position: relative;
  }

  .form-meeting {
    height: 50vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  form .form-inner {
    position: relative;
    border-radius: 8px;
    display: block;
    background-color: #fff;
    z-index: 2;
  }

  form .form-inner .form-group-meet {
    display: block;
    width: 400px;
    margin-bottom: 15px;
  }

  .form-group-meet {
    border: none;
    padding: 10px 15px;
    background-color: #c9c6c687;
    border-radius: 5px;
  }

  form .form-inner .form-group-meet input {
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
  }

  .form-inner .form-group-meet label {
    margin-left: 0.5rem;
    color: #fff;
    font-size: 12px;
    margin-bottom: 5px;
  }
</style>
