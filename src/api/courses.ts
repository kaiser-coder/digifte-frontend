import axios from 'axios';

// Fetch all courses
const fetchCourses = (appToken: string) => {
    return axios.get('/api/courses', {
            headers: { 'x-access-token': appToken}
        })
        /*eslint-disable*/
        .then((response: any) => {
            return response.data;
        });
};

/* const subscribeStudent = (data: any) => {
    return axios.post('/api/courses/subscribe', data, { headers: { 'x-access-token': appToken } })
        .then((response: any) => {
            return response.data;
        });
}; */

export { fetchCourses };