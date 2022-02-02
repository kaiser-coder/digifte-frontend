import { defineStore } from 'pinia';
import { fetchAll, fetchDetails, subscribeStudent } from 'src/api/courses';

export const useCourseStore = defineStore('course', {
    state: () => ({
        courses: [],
        activeCourse: {}
    }),
    actions: {
        getAll(appToken: string) {
            /*eslint-disable*/
            return fetchAll(appToken);
        },

        getCourseDetails(appToken: string, courseId: string) {
            return fetchDetails(appToken, courseId);
        },

        subscribeToCourse(appToken: string, data: any) {
            return subscribeStudent(appToken, data);
        }
    },
});