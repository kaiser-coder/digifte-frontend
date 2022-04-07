/*eslint-disable*/

import axios from 'axios';

const fetchAll = async (appToken: string, sfToken: string): Promise<any> => {
    const response = await axios.get(`/api/app/students/${sfToken}`, { headers: { 'x-access-token': appToken } });
    // console.log('Response from students', response )
    return response;
}

export { fetchAll }