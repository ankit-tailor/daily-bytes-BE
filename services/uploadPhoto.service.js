const multer = require("multer");
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const { GridFsStorage } = require("multer-gridfs-storage");
require("dotenv").config();
const mongoDbUrl = process.env.mongoDbUrl;

const promise = mongoose.connect(mongoDbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const conn = mongoose.connection;
let gfs;

conn.once("open", () => {
  gfs = Grid(conn, mongoose.mongo);
  gfs.collection("uploads");
});

/**
 * Creates bucket of name "thumbnails" to at mongoDbUrl and upload file in that particular bucket
 */

const storage = new GridFsStorage({
  db: promise,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    return {
      bucketName: "thumbnails",
      filename: `${Date.now()}-thumbnail-${file.originalname}`,
    };
  },
});

module.exports = multer({ storage });
