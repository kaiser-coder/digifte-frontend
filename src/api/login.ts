/* eslint-disable */

import axios from 'axios';

const userLogin = ( data: any) => {
    console.log(axios.post('/api/auth', data ))
    return  axios.post('/api/auth', data );
};

export { userLogin }