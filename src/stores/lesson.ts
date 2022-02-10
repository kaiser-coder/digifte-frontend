import { defineStore } from 'pinia';
import { fetchAllByCourseId, updateLesson, createLessons } from 'src/api/lessons';

export const useLessonStore = defineStore('lesson', {
    state: () => ({
        lessons: []
    }),
    actions: {
        async getAllByCourseId(appToken: string, courseId: string) {
            /*eslint-disable*/
            const result = await fetchAllByCourseId(appToken, courseId)
            this.lessons = result.data;
        },

        editLesson(appToken: string, lessonId: string, data: any) {
            return updateLesson(appToken, lessonId, data)
        },

        async submitLesson(appToken: string, data: any) {
            const result = await createLessons(appToken, data);
            return result.data
        }
    },
});