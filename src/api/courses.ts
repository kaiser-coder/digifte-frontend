import axios from 'axios';

// Fetch all courses
const fetchAll = async (appToken: string) => {
    const response = await axios.get('/api/app/courses', { headers: { 'x-access-token': appToken}})
    /*eslint-disable*/
    return response;
}

// Fetch courses details
const fetchDetails = async (appToken: string, courseId: string) => {
    const response = await axios.get(`/api/app/courses/${courseId}`, {headers: {'x-access-token': appToken}})
    /*eslint-disable*/
    return response;
}

// Subscribe student
const subscribeStudent = async (appToken: string, data: any) => {
    const response = await axios.post('/api/app/courses/subscribe', data, { headers: { 'x-access-token': appToken }})
    return response;
}

const createCourse = async (appToken: string, data: any) => {
    const response = await  axios.post('/api/app/courses/create', data, { headers: { 'x-access-token': appToken }})
    return response;
}

export { fetchAll, fetchDetails, subscribeStudent, createCourse };
