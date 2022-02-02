import { defineStore } from 'pinia';
import { fetchAllByCourseId } from 'src/api/lessons';

export const useLessonStore = defineStore('lesson', {
    state: () => ({
        lessons: []
    }),
    actions: {
        getAllByCourseId(appToken: string, courseId: string) {
            /*eslint-disable*/
            return fetchAllByCourseId(appToken, courseId);
        }
    },
});