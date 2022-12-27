import axiosInstance from "./services";


// ================= signal =========================
export const signalCreateServer = async (data) => {
  try {
    const { createSignal, creteTakeSignal } = data;
    const token = localStorage.getItem("accessToken");


    const signalData = await axiosInstance.post("/admin/add/signal", {
      pairName: createSignal.pairName,
      condition: createSignal.order,
      enterPrice: createSignal.enter_price
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const signal = signalData.data.signal;

    if (createSignal?.stop_loss !== "") {
      await axiosInstance.post("/admin/add/stop_loss", {
        signalId: signal.id,
        stopLoss: createSignal.stop_loss
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    if (creteTakeSignal.length) {
      for (let i = 0; i < creteTakeSignal.length; i++) {
        await axiosInstance.post("/admin/add/takes", {
          signalId: signal.id,
          take: creteTakeSignal[i][1]
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
    }
  } catch (e) {
    alert(JSON.stringify(e.response?.data?.message, null, 2));
  }
};
export const addTakeServer = async (data) => {
  try {
    const token = localStorage.getItem("accessToken");

    await axiosInstance.post("/admin/add/takes", data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (e) {
    console.log(e.response.data);
  }
};
export const updateSignalServer = async (value, change) => {
  try {
    const token = localStorage.getItem("accessToken");

    if (value.title === "STOP LOSS") {
      await axiosInstance.post("/admin/update/stop_loss", {
        "signalId": value.signalId,
        "stopLoss": change,
        "title": `stoploss changed ${change}`
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } else {
      await axiosInstance.post("/admin/update/takes", {
        "signalId": value.signalId,
        "takeId": value.takeId,
        "take": change,
        "title": `take was changed ${change}`
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    }

  } catch (e) {
    console.log(e.response.data);
  }
};
export const closeSignalServer = async (data) => {
  try {
    const token = localStorage.getItem("accessToken");

    await axiosInstance.post("/admin/close/signal", data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (e) {
    console.log(e.response.data);
  }
};


// ================= news =========================

export const addNewsServer = async (data) => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await axiosInstance.post("/admin/add/news", data, {
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
    const token = localStorage.getItem("accessToken");

    const response = await axiosInstance.post("/admin/add/teaching", data, {
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
    const response = await axiosInstance.delete(`/admin/teaching?teachingId=${teachingId}`);
    return response.data;
  } catch (e) {
    return e.response.data;
  }
};


// ================= notification =========================
export const addNotificationServer = async (data) => {
  try {
    const token = localStorage.getItem("accessToken");

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

// ================= one/payments =========================
export const addOneServer = async (data) => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await axiosInstance.post(`/admin/add/one/payments`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (e) {
    return e.response.data;
  }
};
