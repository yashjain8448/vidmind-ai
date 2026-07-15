const axios = require("axios");

const PYTHON_API = "http://127.0.0.1:8000";

const processVideo = async (chatId, source, language = "english") => {
  const response = await axios.post(`${PYTHON_API}/process`, {
    chatId,
    source,
    language,
  });

  return response.data;
};

const askQuestion = async (chatId, question) => {
  const response = await axios.post(`${PYTHON_API}/chat`, {
    chatId,
    question,
  });

  return response.data;
};


module.exports = {
  processVideo,
  askQuestion,
};