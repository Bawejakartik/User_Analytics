const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    session_id: {
      type: String,
      required: true,
      index: true,
    },

    event_type: {
      type: String,
      required: true,
      enum: ["page_view", "click"],
      index: true,
    },

    page_url: {
      type: String,
      required: true,
      index: true,
    },

    timestamp: {
      type: Date,
      default: Date.now,
      index: true,
    },

    click_position: {
      x: {
        type: Number,
        default: null,
      },
      y: {
        type: Number,
        default: null,
      },
    },

    metadata: {
      user_agent: {
        type: String,
        default: null,
      },

      referrer: {
        type: String,
        default: null,
      },

      viewport_width: {
        type: Number,
        default: null,
      },

      viewport_height: {
        type: Number,
        default: null,
      },
    },
  },
  {
    timestamps: true,
    collection: "events",
  }
);

eventSchema.index({ session_id: 1, timestamp: 1 });

eventSchema.index({ page_url: 1, event_type: 1 });

module.exports = mongoose.model("Event", eventSchema);