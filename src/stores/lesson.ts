import { defineStore } from 'pinia';
import { fetchAllByCourseId, createLessons, createMeeting, fetchAll } from 'src/api/lessons';

export const useLessonStore = defineStore('lesson', {
    state: () => ({
        lessons: []
    }),
    actions: {
        async getAllByCourseId(appToken: string, courseId: string) {
            /*eslint-disable*/
            const result = await fetchAllByCourseId(appToken, courseId)
            return result.data;
        },

        /* editLesson(appToken: string, lessonId: string, data: any) {
            return updateLesson(appToken, lessonId, data)
        }, */

        async submitLesson(appToken: string, data: any) {
            const result = await createLessons(appToken, data);
            return result
        },

        async submitMeeting(appToken: string, lessonId: string, data: any) {
            const result = await createMeeting(appToken, lessonId, data);
            return result;
        },

        async getAll(appToken: string) {
          const result = await fetchAll(appToken);
          return result;
        }
    },
});
