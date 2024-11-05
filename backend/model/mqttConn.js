const mqtt = require("mqtt");

const MQTT_BROKER = "mqtt://192.168.1.6"; // Replace with your MQTT broker address(check lại ip address)
// const MQTT_TOPIC = 'datasensor';  // Replace with your topic if needed

// Connect to the MQTT broker
const client = mqtt.connect(MQTT_BROKER, {
  clientId: "nodejs_subscriber", // You can customize the client ID
  username: "mqtt", // Replace with your username if required
  password: "nguyenlequockhanh", // Replace with your password if required
});

client.on("connect", () => {
  console.log("Connected to MQTT broker");
});

client.on("error", (err) => {
  console.error("MQTT Connection error:", err);
});
module.exports = client;
