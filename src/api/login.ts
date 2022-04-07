/* eslint-disable */

import axios from 'axios';

const userLogin = ( data: any) => {
    console.log(axios.post('/api/app/auth', data ))
    return  axios.post('/api/app/auth', data );
};

export { userLogin }