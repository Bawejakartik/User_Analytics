const Event = require("../models/EventModel");

exports.getSessions = async (req, res) => {
  try {
    const sessions = await Event.aggregate([
      {
        $group: {
          _id: "$session_id",
          total_events: { $sum: 1 },
          first_visit: { $min: "$timestamp" },
          last_visit: { $max: "$timestamp" }
        }
      },
      {
        $project: {
          _id: 0,
          session_id: "$_id",
          total_events: 1,
          first_visit: 1,
          last_visit: 1
        }
      },
      {
        $sort: {
          last_visit: -1
        }
      }
    ]);

    res.status(200).json({
      success: true,
      sessions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getSessionEvents = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const events = await Event.find({
      session_id: sessionId,
    }).sort({
      timestamp: 1,
    });

    res.status(200).json({
      success: true,
      events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};