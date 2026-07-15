import api from "./api";

export async function analyzeYoutube(url) {
  const response = await api.post("/video/youtube", {
    url,
  });

  return response.data;
}

export async function getVideo(chatId) {
  const response = await api.get(`/video/${chatId}`);
  return response.data;
}

export async function sendMessage(chatId, question) {
  const response = await api.post(`/video/${chatId}/chat`, {
    question,
  });

  return response.data;
}

export const chatWithVideo = async (id, question) => {
  const response = await api.post(`/video/${id}/chat`, {
    question,
  });

  return response.data;
};

export const getMessages = async (id) => {
  const response = await api.get(`/video/${id}/messages`);
  return response.data;
};

export const getHistory = async () => {
  const response = await api.get("/video/history");
  return response.data;
};

export const deleteVideo = async (id) => {
  const response = await api.delete(`/video/${id}`);
  return response.data;
};
