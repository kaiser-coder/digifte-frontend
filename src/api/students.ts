/*eslint-disable*/
import axios from 'axios';

const fetchAll = async (appToken: string, sfToken: string): Promise<any> => {
  const response = await axios.get(`/api/app/students/${sfToken}`, {
    headers: { 'x-access-token': appToken },
  });
  // console.log('Response from students', response )
  return response;
};

const getOne = async (appToken: string, sfToken: string, sfId: string): Promise<any> => {
  const response = await axios.get(`/api/salesforce/contacts/${sfId}`, {
    headers: { 
      'x-access-token': appToken,
      'sf_token': sfToken
    },
  });
  return response.data;
};

const update = async (appToken: string, sfToken: string, sfId: string): Promise<any> => {
  const response = await axios.patch(`/api/salesforce/contacts/${sfId}`, {
    headers: { 
      'x-access-token': appToken,
      'sf_token': sfToken
    },
  });
  return response.data;
};

export { fetchAll, getOne, update };
