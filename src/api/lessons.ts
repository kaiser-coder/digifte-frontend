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

//Create lesson
const createLessons = async (appToken: string, data: any) => {
    const response = await axios.post('/api/lessons', data, { headers: { 'x-access-token': appToken }});
    return response.data;
}

// Update lesson
const updateLesson = async (appToken: string, lessonId: string, data: any) => {
    const response = await axios.put(`/api/lessons/${lessonId}`, data, { headers: { 'x-access-token': appToken } });
    return response.data;
}


export { fetchAllByCourseId, createLessons, updateLesson }