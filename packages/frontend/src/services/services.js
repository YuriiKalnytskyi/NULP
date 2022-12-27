import axios from 'axios';

const options = {
  baseURL: 'http://localhost:4200',
};
const axiosInstance = axios.create(options);

export default axiosInstance

// ================= signal =========================

export const getAllSignalServer = async (page =1, limit=5) => {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await axiosInstance.get(`/clubData/signals?page=${page}&limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (e) {
    console.log(e);
    // alert(JSON.stringify(e.response?.data, null, 2));
    return e.response.data;
  }
};

// ================= news =========================

export const getAllNewsServer = async () => {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await axiosInstance.get('/clubData/news', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.news;

  }catch (e) {
    return e.response.data
  }
}

// ================= teaching =========================

export const getAllTeachingServer = async () => {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await axiosInstance.get('/clubData/teaching', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.teaching;

  }catch (e) {
    return e.response.data
  }
}


// ================= notification =========================

export const getAllNotification = async () => {
  try {
    const token = localStorage.getItem('accessToken');

    const response = await axiosInstance.get(`/clubData/notification`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.notification;
  }catch (e) {
    console.log(e.response.data);
    return e.response.data
  }
}











