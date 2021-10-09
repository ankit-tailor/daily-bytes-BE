const { updateNewsArticleService } = require('../services/news.services');
const { getPhotoService } = require('../services/thumbnails.service');

/**
 * 
 * @param {*} req.file - image file from frontend form 
 * @param {*} req.params.articleId - _id of particular news article
 */
const uploadThumbnailCtrl = async (req, res) => {
    try {
        console.log(req.file, "FILE")
        const data = {
            thumbnail: req.file.filename
        }
        const result = await updateNewsArticleService(req.params.articleId, data);
        console.log(result)
        if (!res) {
            res.status(404).json({ error: "Failed to update thumbnail in article, something went wrong!!" });
        } else {
            res.json(result)
        }
    } catch (err) {
        res.status(500).json({ error: err })
    }
}


/**
 * 
 * @param {*} req.params.filename -  get thumbnail by filename
 */

const getNewsArticleThumbnailByFileNameCtrl = async (req, res) => {
    try {
        const { filename } = req.params
        const readStream = await getPhotoService(filename);
        readStream.pipe(res)
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

module.exports = {
    uploadThumbnailCtrl,
    getNewsArticleThumbnailByFileNameCtrl
}