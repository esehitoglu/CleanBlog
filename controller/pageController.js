const Data = require('../models/Data')

exports.getIndexPage = async (req, res) => {
  const sayfayaYaz = await Data.find({});
  res.render('index', {
    sayfayaYaz: sayfayaYaz,
  });
};

exports.getAboutPage = (req, res) => {
  res.render('about');
};

exports.getAddpostPage = (req, res) => {
  res.render('add_post');
};

exports.getPostPage = (req, res) => {
  res.render('post');
};
