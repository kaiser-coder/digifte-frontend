import { defineStore } from 'pinia';
import { userLogin } from 'src/api/login';

export const useUserStore = defineStore('user', {
    state: () => ({
        currentUser: {}
    }),
    
    actions: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        userSignin( data: any) {
            return userLogin(data)
        }
    }
})

