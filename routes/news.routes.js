const express = require('express');
const { getAllNewsCtrl, addNewsArticleCtrl, updateNewsArticleCtrl, deleteNewsArticleCtrl, getNewsArticleByIdCtrl } = require('../controllers/news.controller');
const { uploadThumbnailCtrl, getNewsArticleThumbnailByFileNameCtrl } = require('../controllers/thumbnails.controller');
const router = express.Router();
const upload = require("../services/uploadPhoto.service")

// Route to fetch all news
router.get('/getAllNews/:sort', getAllNewsCtrl);

// Get news article by id
router.get('/newsArticle/:articleId', getNewsArticleByIdCtrl);

// Create / Update / Delete news article
router.post('/newsArticle', addNewsArticleCtrl);
router.put('/newsArticle/:articleId', updateNewsArticleCtrl);
router.delete('/newsArticle/:articleId', deleteNewsArticleCtrl);

// Upload photo for news article
router.post("/newsThumbnail/upload/:articleId", upload.single("file"), uploadThumbnailCtrl)
router.get("/newsThumbnail/upload/:filename", getNewsArticleThumbnailByFileNameCtrl)

module.exports = router;