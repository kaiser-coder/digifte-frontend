import { defineStore } from 'pinia';
import { fetchCourses, getCourseDetails } from 'src/api/courses';

export const useCourseStore = defineStore('course', {
    state: () => ({
        courses: [],
        activeCourse: {}
    }),
    actions: {
        getCourses(appToken: string) {
            /*eslint-disable*/
            return fetchCourses(appToken);
        },

        getDetails(appToken: string, courseId: string) {
            return getCourseDetails(appToken, courseId);
        }
    },
});