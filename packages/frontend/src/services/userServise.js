import axiosInstance from "./services";

export const getProfileInfoServer = async () => {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await axiosInstance.get(`profile/info`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (e) {
    alert(JSON.stringify(e.response?.data?.message, null, 2));
  }
};
export const changePasswordServer = async (data) => {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await axiosInstance.post(`/profile/change/password`, data,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (e) {
    // alert(JSON.stringify(e.response?.data?.message, null, 2));
    return e.response.data
  }
}

