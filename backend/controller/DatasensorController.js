const DataSensor = require("../model/Datasensor");

// Lấy dữ liệu với phân trang
let getdata = async (req, res) => {
  const page = Math.min(parseInt(req.query.page) || 1, 20);
  const pageSize = parseInt(req.query.pagesize) || 10;
  const skip = (page - 1) * pageSize;

  try {
    const totalRecords = await DataSensor.countDocuments();
    const totalPages = Math.min(Math.ceil(totalRecords / pageSize), 20);

    const results = await DataSensor.find()
      .sort({ timestamp: "desc" })
      .skip(skip)
      .limit(pageSize);

    res.json({
      pagination: {
        currentPage: page,
        totalPages: totalPages,
        totalRecords: totalRecords,
      },
      data: results,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Tìm kiếm dữ liệu theo loại hoặc thời gian
// Tìm kiếm dữ liệu theo loại hoặc thời gian
let search = async (req, res) => {
  const { type, value, time } = req.query;
  const page = Math.min(parseInt(req.query.page) || 1, 20);
  const pageSize = parseInt(req.query.pagesize) || 10;
  const skip = (page - 1) * pageSize;

  let query = {};

  // Tìm kiếm theo loại dữ liệu
  if (type && value) {
    query[type] = parseFloat(value);
  }

  // Tìm kiếm theo thời gian
  if (time) {
    const inputTime = new Date(time);

    if (!isNaN(inputTime)) {
      const startTime = new Date(inputTime);
      const endTime = new Date(inputTime);

      if (time.length === 19) {
        // Định dạng yyyy-MM-ddTHH:mm:ss
        endTime.setSeconds(endTime.getSeconds() + 1);
      } else if (time.length === 16) {
        // Định dạng yyyy-MM-ddTHH:mm
        endTime.setMinutes(endTime.getMinutes() + 1);
      } else if (time.length === 13) {
        // Định dạng yyyy-MM-ddTHH
        endTime.setHours(endTime.getHours() + 1);
      } else {
        // Định dạng yyyy-MM-dd
        endTime.setDate(endTime.getDate() + 1);
      }

      query.timestamp = {
        $gte: startTime,
        $lt: endTime,
      };
    }
  }

  try {
    const results = await DataSensor.find(query)
      .sort({ timestamp: "desc" })
      .skip(skip)
      .limit(pageSize);

    const totalRecords = await DataSensor.countDocuments(query);
    const totalPages = Math.min(Math.ceil(totalRecords / pageSize), 20);

    res.json({
      pagination: {
        currentPage: page,
        totalPages: totalPages,
        totalRecords: totalRecords,
      },
      data: results || [],
    });
  } catch (error) {
    console.error("Error executing search query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getdata, search };
