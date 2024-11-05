const client = require("./model/mqttConn");
const DataSensor = require("./model/Datasensor"); // Mongoose model for datasensor
const ActionHistory = require("./model/Actionhistory");
const MQTT_TOPIC = "datasensor";
var express = require("express");
var app = express();
var server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Khởi động server WebSocket
server.listen(8080, () => {
  console.log("WebSocket server running on port 8080");
});

io.on("connection", (socket) => {
  console.log("Client connected");
});

client.subscribe(MQTT_TOPIC, (err) => {
  if (!err) {
    console.log(`Subscribed to topic: ${MQTT_TOPIC}`);
  }
});

client.subscribe("led/res", (err) => {
  if (!err) {
    console.log(`Subscribed to topic: led/res`);
  }
});
client.subscribe("fan/res", (err) => {
  if (!err) {
    console.log(`Subscribed to topic: fan/res`);
  }
});
client.subscribe("ac/res", (err) => {
  if (!err) {
    console.log(`Subscribed to topic: ac/res`);
  }
});

// Lắng nghe tin nhắn từ MQTT
client.on("message", async (topic, message) => {
  console.log(`Received message from ${topic}: ${message.toString()}`);

  let data;
  try {
    data = JSON.parse(message.toString());
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return;
  }

  if (topic === "datasensor") {
    const newData = new DataSensor({
      light: data.light,
      humidity: data.humidity,
      temperature: data.temperature,
    });

    try {
      const savedData = await newData.save();
      console.log("Data saved to MongoDB:", savedData);

      // Emit the latest data to frontend
      io.emit("newSensorData", savedData);
    } catch (err) {
      console.error("Error saving to MongoDB:", err);
    }
  }
});

module.exports = client;
