const mongoose = require("mongoose");

// Hàm tạo ID ngẫu nhiên có cả chữ và số
const generateId = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
};

const actionHistorySchema = new mongoose.Schema({
  id: {
    type: String,
    default: generateId, // ID ngẫu nhiên
  },
  device: {
    type: String,
    required: true, // Tên thiết bị
  },
  action: {
    type: String,
    required: true, // Hành động
  },
  timestamp: {
    type: Date,
    default: Date.now, // Thời gian hành động
  },
  onTime: Date, // Nếu bạn cần lưu On time (bắt đầu)
  offTime: Date, // Nếu bạn cần lưu Off time (kết thúc)
});

module.exports = mongoose.model("ActionHistory", actionHistorySchema);
