import axiosInstance from './services';

// ================= news =========================

export const addNewsServer = async (data) => {
  try {
    const token = localStorage.getItem('accessToken');

    const response = await axiosInstance.post('news/add/newsNews', data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (e) {
    return e.response.data;
  }
};
export const deleteNewsServer = async (newsId) => {
  try {
    const response = await axiosInstance.delete(`/admin/teaching?newsId=${newsId}`);
    return response.data;
  } catch (e) {
    return e.response.data;
  }
};

// ================= teaching =========================

export const addTeachingServer = async (data) => {
  try {
    const token = localStorage.getItem('accessToken');

    const response = await axiosInstance.post('/teaching/add/newTeaching', data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (e) {
    return e.response.data;
  }
};
export const deleteTeachingServer = async (teachingId) => {
  try {
    const response = await axiosInstance.delete(
      `/teaching/delete/teaching?teachingId=${teachingId}`
    );
    return response.data;
  } catch (e) {
    return e.response.data;
  }
};

// ================= notification =========================
export const addNotificationServer = async (data) => {
  try {
    const token = localStorage.getItem('accessToken');

    const response = await axiosInstance.post(`/admin/add/notification`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (e) {
    return e.response.data;
  }
};
