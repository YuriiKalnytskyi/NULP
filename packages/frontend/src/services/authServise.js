import axiosInstance from './services';

export const registerServer = async (data) => {
  try {
    const response = await axiosInstance.post('auth/registration', data);
    return response.data;
  } catch (e) {
    return e.response.data;
  }
};

export const loginServer = async (data) => {
  try {
    const response = await axiosInstance.post('auth/login', data);
    return response.data;
  } catch (e) {
    return e.response.data;
  }
};

export const logoutServer = async () => {
  try {
    const token = localStorage.getItem('accessToken');
    await axiosInstance.post(
      '/auth/logout',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  } catch (e) {
    return e.response.data;
  }
};
export const forgotPasswordStep1Server = async (email) => {
  try {
    const response = await axiosInstance.post(`/auth/forgot/password?email=${email}`);
    return response.data;
  } catch (e) {
    alert(JSON.stringify(e.response?.data?.message, null, 2));
  }
};
export const forgotPasswordStep2Server = async (code) => {
  try {
    const response = await axiosInstance.post(`/auth/verify/code`, {
      code
    });
    return response.data;
  } catch (e) {
    return e.response.data;
  }
};
export const forgotPasswordStep3Server = async (data) => {
  try {
    const response = await axiosInstance.post(
      `/auth/change/password?email=${data.email}&newPassword=${data.password}&repeatNewPassword=${data.repeatPassword}`
    );
    return response.data;
  } catch (e) {
    alert(JSON.stringify(e.response?.data?.message, null, 2));
  }
};
