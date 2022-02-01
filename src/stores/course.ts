import { defineStore } from 'pinia';
import { fetchCourses } from 'src/api/courses';

export const useCourseStore = defineStore('course', {
    state: () => ({
        courses: []
    }),
    actions: {
        getCourses(appToken: string) {
            /*eslint-disable*/
            return fetchCourses(appToken);
        }
    },
});