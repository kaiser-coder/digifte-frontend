import axios from 'axios';

const fetchAllByCourseId = (appToken: string, courseId: string) => {
    return axios.get(`/api/lessons/courses/${courseId}`, {
            headers: { 'x-access-token': appToken }
        })
        /*eslint-disable*/
        .then((response: any) => {
            return response.data;
        });
}

//Create lessons
const createLessons = async (appToken: string, data: any) => {
    const response = await axios.post('/api/lessons', data, { headers: { 'x-access-token': appToken }});
    return response.data;
}

export { fetchAllByCourseId, createLessons }