import { defineStore } from 'pinia';
import { fetchAll, fetchDetails, subscribeStudent, createCourse } from 'src/api/courses';

export const useCourseStore = defineStore('course', {
    state: () => ({
        courses: [],
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
        },

        submitCourse(appToken: string, data: any) {
            return createCourse(appToken, data)
        }
    },
});