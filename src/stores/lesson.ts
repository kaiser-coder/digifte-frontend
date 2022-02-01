import { defineStore } from 'pinia';
import { fetchLesson } from 'src/api/lessons';

export const useLessonStore = defineStore('lesson', {
    state: () => ({
        lessons: []
    }),
    actions: {
        getLesson(appToken: string, courseId: string) {
            /*eslint-disable*/
            return fetchLesson(appToken, courseId);
        }
    },
});