import axios from 'axios';

// Fetch all courses
const fetchAll = async (appToken: string) => {
    const response = await axios.get('/api/courses', { headers: { 'x-access-token': appToken}})
    /*eslint-disable*/
    return response.data;
};

// Fetch courses details
const fetchDetails = async (appToken: string, courseId: string) => {
    const response = await axios.get(`/api/courses/${courseId}`, {headers: {'x-access-token': appToken}})
    /*eslint-disable*/
    return response.data;
}

// Subscribe student
const subscribeStudent = async (appToken: string, data: any) => {
    const response = await axios.post('/api/courses/subscribe', data, { headers: { 'x-access-token': appToken }})
    return response.data;
};

const createCourse = async (appToken: string, data: any) => {
    const response = await  axios.post('/api/courses/create', data, { headers: { 'x-access-token': appToken }})
    return response.data;
}

export { fetchAll, fetchDetails, subscribeStudent, createCourse };
