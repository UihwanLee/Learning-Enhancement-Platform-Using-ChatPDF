const axios = require("axios");
const { fileUpload } = require('./fileUpload');

async function chatPDF(filePath, prompt){
  const sourceId = await fileUpload(filePath);
  console.log("Returned Source ID:", sourceId);

  const config = {
    headers: {
      "x-api-key": "sec_wbV7QqbCwy8sey31myjMz8GI7eq1mkjN",
      "Content-Type": "application/json",
    },
  };
  
  const data = {
    sourceId: sourceId,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  }; 

  try {
    const response = await axios.post("https://api.chatpdf.com/v1/chats/message", data, config);
    console.log("Result:", response.data.content);
    return response.data.content;
  } catch (error) {
    console.log("Error:", error.message);
    console.log("Response:", error.response.data);
    return null;
  }
}

module.exports = { chatPDF };
