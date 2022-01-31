const Data = require('../models/Data');

exports.createPost = async (req, res) => {
  await Data.create(req.body);
  res.redirect('/');
};

exports.getPost = async (req, res) => {
  const postx = await Data.findById(req.params.id);
  res.render('post', {
    postx,
  });
};

exports.getEditPost = async (req, res) => {
  const editRout = await Data.findOne({ _id: req.params.id });
  res.render('edit', {
    editRout,
  });
};

exports.updatePost = async (req, res) => {
  console.log(req.params.id);
  const x = await Data.findOne({ _id: req.params.id });
  x.title = req.body.title;
  x.detail = req.body.detail;
  x.save();

  res.redirect(`/posts/${req.params.id}`);
};

exports.deletePost = async (req, res) => {
  const deletePost = await Data.findOne({ _id: req.params.id });
  await Data.findByIdAndRemove(req.params.id);
  res.redirect('/');
};
