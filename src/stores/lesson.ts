import { defineStore } from 'pinia';
import { fetchAllByCourseId, updateLesson } from 'src/api/lessons';

export const useLessonStore = defineStore('lesson', {
    state: () => ({
        lessons: []
    }),
    actions: {
        getAllByCourseId(appToken: string, courseId: string) {
            /*eslint-disable*/
            return fetchAllByCourseId(appToken, courseId);
        },

        editLesson(appToken: string, lessonId: string, data: any) {
            return updateLesson(appToken, lessonId, data)
        }
    },
});