import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const userLogin = ( data: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return  axios.post('/api/auth', data );
};

export { userLogin }