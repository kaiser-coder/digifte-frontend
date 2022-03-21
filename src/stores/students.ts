/*eslint-disable*/

import { defineStore } from 'pinia';
import { fetchAll } from 'src/api/students';

export const useStudentStore = defineStore('lesson', {
    state: () => ({
        students: []
    }),
    actions: {
        async getAll(appToken: string, sfToken: string) {
            const result = await fetchAll(appToken, sfToken)
            return result;
        },
    },
});