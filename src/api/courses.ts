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
    return axios.get(`http://localhost:3000/api/courses/${courseId}`, {
            headers: { 'x-access-token': appToken }
        })
        /*eslint-disable*/
        .then((response: any) => {
            return response.data;
        });
}

// Subscribe student
const subscribeStudent = (appToken: string, data: any) => {
    return axios.post('/api/courses/subscribe', data, { headers: { 'x-access-token': appToken }})
        .then((response: any) => {
            return response.data;
        });
};

const createCourse = (appToken: string, data: any) => {
    return axios.post('http://localhost:3000/api/courses/create', data, { headers: { 'x-access-token': appToken }})
        .then((response: any) => {
            return response.data;
        });
}

export { fetchAll, fetchDetails, subscribeStudent, createCourse };
