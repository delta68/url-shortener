import mongoose from "mongoose";

/* urls will correspond to a collection in your MongoDB database. */
const urls = new mongoose.Schema({
  url: {
    type: String,
  },
  shortURL: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
  },
});

urls.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.models.urls || mongoose.model("urls", urls);
