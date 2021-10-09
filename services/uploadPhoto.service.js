const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
require('dotenv').config();
const mongoDbUrl = process.env.mongoDbUrl;

/**
 * Creates bucket of name "thumbnails" to at mongoDbUrl and upload file in that particular bucket
 */

const storage = new GridFsStorage({
    url: mongoDbUrl,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        return {
            bucketName: "thumbnails",
            filename: `${Date.now()}-thumbnail-${file.originalname}`
        }
    }
})

module.exports = multer({ storage })