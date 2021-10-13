const mongoose = require("mongoose");
const conn = mongoose.connection;
const Grid = require("gridfs-stream");
let gfs;

conn.once("open", function () {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("thumbnails");
});

/**
 *
 * @param {*} filename - name of the photo in GFS bucket
 * @returns
 */

const getPhotoService = async (filename) => {
  try {
    console.log(filename);
    const file = await gfs.files.findOne({ filename: filename });
    const readStream = gfs.createReadStream(file.filename);
    return readStream;
  } catch (err) {
    console.log("Error while getting photo ", err);
  }
};

/**
 *
 * @param {*} filename name of the photo in GFS bucket
 */

const deletePhotoService = async (filename) => {
  try {
    console.log(filename);
    const res = await gfs.files
      .deleteOne({ filename: filename })
      .then((res) => res)
      .catch((err) => {
        console.log("Error while deleting photo", err);
      });
    return res;
  } catch (err) {
    console.log("Error while deleting photo ", err);
  }
};

module.exports = {
  getPhotoService,
  deletePhotoService,
};
