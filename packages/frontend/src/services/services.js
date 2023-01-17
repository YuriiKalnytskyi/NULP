import axios from 'axios';

const options = {
  // baseURL: process.env.REACT_APP_API_URL,
  baseURL: 'http://localhost:4000/'
};
const axiosInstance = axios.create(options);

export default axiosInstance;

// ================= news =========================

export const getAllNewsServer = async () => {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await axiosInstance.get('/clubData/news', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.news;
  } catch (e) {
    return e.response.data;
  }
};

// ================= teaching =========================

export const getAllTeachingServer = async () => {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await axiosInstance.get('/teaching/', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.teachings;
  } catch (e) {
    return e.response.data;
  }
};

// ================= notification =========================

export const getAllNotification = async () => {
  try {
    const token = localStorage.getItem('accessToken');

    const response = await axiosInstance.get(`/clubData/notification`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.notification;
  } catch (e) {
    console.log(e.response.data);
    return e.response.data;
  }
};
