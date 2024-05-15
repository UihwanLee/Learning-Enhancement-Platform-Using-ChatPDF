const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");
require('dotenv').config();

async function fileUpload(filePath) {
    const formData = new FormData();
    formData.append(
      "file",
      fs.createReadStream(filePath)
    );

    const options = {
      headers: {
        "x-api-key": process.env.Mon,
        ...formData.getHeaders(),
      },
    };    

    try {
      const response = await axios.post("https://api.chatpdf.com/v1/sources/add-file", formData, options);
      console.log("Source ID:", response.data.sourceId);
      return response.data.sourceId;
    } catch (error) {
      console.log("Error:", error.message);
      console.log("Response:", error.response.data);
      return null;
    }
  }

module.exports = { fileUpload };




