import { defineStore } from 'pinia';
import { fetchAll, fetchDetails, subscribeStudent, createCourse } from 'src/api/courses';

export const useCourseStore = defineStore('course', {
    state: () => ({
        courses: [],
        details: {}
    }),
    actions: {
        getAll(appToken: string) {
            /*eslint-disable*/
            fetchAll(appToken).then((result) => {
                console.log('All courses => ', result.data);
                this.courses = result.data
            });
        },

        getCourseDetails(appToken: string, courseId: string) {
            fetchDetails(appToken, courseId)
                .then((result) => {
                    this.details = Object.assign(this.details, result.data);
                });
        },

        subscribeToCourse(appToken: string, data: any) {
            return subscribeStudent(appToken, data);
        },

        submitCourse(appToken: string, data: any) {
            return createCourse(appToken, data)
        }
    },
});