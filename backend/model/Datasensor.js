const mongoose = require("mongoose");

// Hàm tạo ID ngẫu nhiên gồm cả chữ và số
const generateId = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; // Ký tự có thể dùng
  let result = "";
  const length = 4; // Độ dài ID mong muốn

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result; // Trả về ID ngẫu nhiên
};

const dataSensorSchema = new mongoose.Schema({
  id: {
    type: String,
    default: generateId, // ID ngẫu nhiên có cả chữ và số
    unique: true,
  },
  temperature: {
    type: Number,
    required: true, // Nhiệt độ cảm biến đo được
  },
  humidity: {
    type: Number,
    required: true, // Độ ẩm cảm biến đo được
  },
  light: {
    type: Number,
    required: true, // Độ sáng cảm biến đo được
  },
  timestamp: {
    type: Date,
    default: Date.now, // Thời gian ghi lại dữ liệu
  },
});

module.exports = mongoose.model("DataSensor", dataSensorSchema);
