const ActionHistory = require("../model/Actionhistory");

let search = async (req, res) => {
  const { value, device, page = 1, pagesize = 10 } = req.query;
  const skip = (page - 1) * Math.min(parseInt(pagesize), 10);

  let query = {};

  if (value) {
    const inputTime = new Date(value);
    if (!isNaN(inputTime)) {
      const startTime = new Date(inputTime);
      const endTime = new Date(inputTime);

      if (value.length === 19) {
        endTime.setSeconds(endTime.getSeconds() + 1);
      } else if (value.length === 16) {
        endTime.setMinutes(endTime.getMinutes() + 1);
      } else if (value.length === 13) {
        endTime.setHours(endTime.getHours() + 1);
      } else {
        endTime.setDate(endTime.getDate() + 1);
      }

      query.timestamp = {
        $gte: startTime,
        $lt: endTime,
      };
    }
  }

  if (device) {
    query.device = { $regex: device, $options: "i" };
  }

  try {
    const results = await ActionHistory.find(query)
      .sort({ timestamp: "desc" })
      .skip(skip)
      .limit(pagesize);

    const totalRecords = await ActionHistory.countDocuments(query);
    const totalPages = Math.ceil(totalRecords / pagesize);

    res.json({
      pagination: {
        currentPage: page,
        totalPages: Math.min(totalPages, 20),
        totalRecords: totalRecords,
      },
      data: results,
    });
  } catch (error) {
    console.error("Error executing search query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { search };
