const {
  getAllNewsService,
  addNewsArticleService,
  updateNewsArticleService,
  deleteNewsArticleService,
  getNewsArticleByIdService,
} = require("../services/news.services");

/**
 *
 * @param {*} req - req.params.sort is sort key i.e. -1 or 1
 * @returns all news articles
 */

const getAllNewsCtrl = async (req, res) => {
  try {
    const { sort } = req.params;
    const allNews = await getAllNewsService(sort);
    res.json(allNews);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

/**
 *
 * @param {*} req - req.params.articleId - _id of particular news articleId
 * @returns news article by id
 */

const getNewsArticleByIdCtrl = async (req, res) => {
  try {
    const { articleId } = req.params;
    const data = req.body;
    const result = await getNewsArticleByIdService(articleId, data);
    if (!res) {
      res
        .status(400)
        .json({
          error: "Failed to update news article, something went wrong!!!",
        });
    } else {
      res.json(result);
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

/**
 *
 * @param {*} req - req.body - object from frontend to be uplaoded
 *
 */

const addNewsArticleCtrl = async (req, res) => {
  try {
    const result = await addNewsArticleService(req.body);
    console.log(result);
    if (!res) {
      console.log(result, "INSIDE ELSE");
      res
        .status(404)
        .json({
          error: "Failed to add new news article, something went wrong!!",
        });
    } else {
      console.log(result, "INSIDE ELSE");
      res.json(result);
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

/**
 *
 * @param {*} req - req.params.articleId - _id of particular news article to be updated
 * req.params.body - updated data from the frontend to be updated
 *
 */

const updateNewsArticleCtrl = async (req, res) => {
  try {
    const { articleId } = req.params;
    const data = req.body;
    const result = await updateNewsArticleService(articleId, data);
    if (!res) {
      res
        .status(400)
        .json({
          error: "Failed to update news article, something went wrong!!!",
        });
    } else {
      res.json(result);
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

/**
 *
 * @param {*} req - req.params.articleId - _id of the article to be deleted
 *
 */

const deleteNewsArticleCtrl = async (req, res) => {
  try {
    const { articleId } = req.params;
    const result = await deleteNewsArticleService(articleId);
    if (!res) {
      res
        .status(400)
        .json({
          error: "Failed to delete news article, something went wrong!!!",
        });
    } else {
      res.json(result);
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

module.exports = {
  getAllNewsCtrl,
  addNewsArticleCtrl,
  updateNewsArticleCtrl,
  deleteNewsArticleCtrl,
  getNewsArticleByIdCtrl,
};
