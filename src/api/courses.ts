import axios from 'axios';

// Fetch all courses
const fetchAll = (appToken: string) => {
    return axios.get('/api/courses', {
            headers: { 'x-access-token': appToken}
        })
        /*eslint-disable*/
        .then((response: any) => {
            return response.data;
        });
};

// Fetch courses details
const fetchDetails = (appToken: string, courseId: string) => {
    return axios.get(`/api/courses/${courseId}`, {
            headers: { 'x-access-token': appToken }
        })
        /*eslint-disable*/
        .then((response: any) => {
            return response.data;
        });
}

// Subscribe student
const subscribeStudent = (appToken: string, data: any) => {
    return axios.post('/api/courses/subscribe', data, { headers: { 'x-access-token': appToken } })
        .then((response: any) => {
            return response.data;
        });
};

export { fetchAll, fetchDetails, subscribeStudent };