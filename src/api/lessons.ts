import axios from 'axios';

const fetchAllByCourseId = async (appToken: string, courseId: string) => {
    /*eslint-disable*/
    const response = await axios.get(`/api/lessons/courses/${courseId}`, { headers: { 'x-access-token': appToken } });
    return response.data;
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

const createMeeting = async (appToken: string, lessonId: string, data: any) => {
    const response = await axios.post(`/api/lessons/meeting/${lessonId}/create`, data, { headers: { 'x-access-token': appToken } });
    return response.data;
}


export { fetchAllByCourseId, createLessons, updateLesson, createMeeting }
