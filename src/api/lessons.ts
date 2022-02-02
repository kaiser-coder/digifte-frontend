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

export { fetchAllByCourseId }