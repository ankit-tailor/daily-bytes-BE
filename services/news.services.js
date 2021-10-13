const News = require("../models/News");

/**
 *
 * @param {*} sort sort key i.e. 1 for ascending, -1 for descending
 * @returns all the list of news articles
 */

const getAllNewsService = async (sort) => {
  try {
    const allNewsArticles = await News.find().sort({ date: sort });
    return allNewsArticles;
  } catch (err) {
    console.log("Error while fetching all news articles ", err);
  }
};

/**
 *
 * @param {*} id - _id of particular news article
 * @returns news article
 */

const getNewsArticleByIdService = async (id) => {
  try {
    const newsArticle = await News.findOne({ _id: id });
    console.log(newsArticle);
    return newsArticle;
  } catch (err) {
    console.log("Error while fetching all news articles ", err);
  }
};
/**
 *
 * @param {*} payload - data to be added to mongodb
 * @returns response object
 */

const addNewsArticleService = async (payload) => {
  try {
    const res = await new News(payload).save();
    return res;
  } catch (err) {
    console.log("Error while adding news article ", err);
  }
};

/**
 *
 * @param {*} _id - _id of particular news article
 * @param {*} payload - data to be updated in mongodb
 * @returns updated response object
 */

const updateNewsArticleService = async (_id, payload) => {
  try {
    console.log(payload, "PAYLOAD");
    const result = await News.findOneAndUpdate(
      { _id: _id },
      { $set: payload },
      { returnOriginal: false }
    )
      .then((res) => {
        console.log(res, "res from service");
        return res;
      })
      .catch((err) => {
        console.log("Failed to update news article ", err);
        return null;
      });
    return result;
  } catch (err) {
    console.log("Error while updating news article ", err);
  }
};

/**
 *
 * @param {*} _id - _id of particular new article
 * @returns deleted object
 */

const deleteNewsArticleService = async (_id) => {
  try {
    console.log(_id, "PAYLOAD");
    const result = await News.findOneAndDelete({ _id: _id })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log("Failed to update news article ", err);
        return null;
      });
    return result;
  } catch (err) {
    console.log("Error while updating news article ", err);
  }
};

module.exports = {
  getAllNewsService,
  addNewsArticleService,
  updateNewsArticleService,
  deleteNewsArticleService,
  getNewsArticleByIdService,
};
