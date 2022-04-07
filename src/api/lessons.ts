import axios from 'axios';

const fetchAllByCourseId = async (appToken: string, courseId: string) => {
    /*eslint-disable*/
    const response = await axios.get(`/api/app/lessons/courses/${courseId}`, { headers: { 'x-access-token': appToken } });
    return response;
}

//Create lesson
const createLessons = async (appToken: string, data: any) => {
    const response = await axios.post('/api/app/lessons', data, { headers: { 'x-access-token': appToken }});
    return response;
}

// Update lesson
const updateLesson = async (appToken: string, lessonId: string, data: any) => {
    const response = await axios.put(`/api/app/lessons/${lessonId}`, data, { headers: { 'x-access-token': appToken } });
    return response;
}

const createMeeting = async (appToken: string, lessonId: string, data: any) => {
    const response = await axios.post(`/api/app/lessons/meeting/${lessonId}/create`, data, { headers: { 'x-access-token': appToken } });
    return response;
}

const fetchAll = async (appToken: string) => {
  const response = await axios.get(`/api/app/lessons`, { headers: { 'x-access-token': appToken } })
  return response;
}


export { fetchAllByCourseId, createLessons, updateLesson, createMeeting, fetchAll }
