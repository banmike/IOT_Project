const client = require("../model/mqttConn");
const ActionHistory = require("../model/Actionhistory"); // Mongoose model for action history

let controll = (req, res) => {
  const topic = req.body.device;
  const message = req.body.action;

  // Publish MQTT message to request the device action
  client.publish(`${topic}/req`, message, (err) => {
    if (err) {
      return res.status(500).json({
        device: topic,
        action: message,
        error: "Failed to send MQTT message",
      });
    }
  });

  client.once("message", async (responseTopic, mqttMessage) => {
    if (responseTopic === `${topic}/res`) {
      console.log(
        `Received message from ${responseTopic}: ${mqttMessage.toString()}`
      );

      let data;
      try {
        data = JSON.parse(mqttMessage.toString());
      } catch (err) {
        return res.status(500).json({ error: "Invalid MQTT response" });
      }

      const newAction = new ActionHistory({
        device: topic,
        action: data.action,
        timestamp: new Date(), // Thêm trường timestamp
      });

      try {
        await newAction.save();
        console.log("Action saved to MongoDB:", newAction);
        return res.status(200).json({ device: topic, action: data.action });
      } catch (err) {
        return res
          .status(500)
          .json({ error: "Failed to save action to MongoDB" });
      }
    }
  });
};

module.exports = { controll };
