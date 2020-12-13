const { Post, Hashtag, User } = require("../models");

exports.textUpload = async (req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      img: req.body.url,
      userId: req.user.id,
    });
    const hashtags = req.body.content.match(/#[^\s#]*/g);
    if (hashtags) {
      const result = await Promise.all(
        hashtags.map((tag) =>
          Hashtag.findOrCreate({
            where: { title: tag.slice(1).toLowerCase() },
          })
        )
      );
      await post.addHashtags(result.map((ans) => ans[0]));
    }
    res.redirect("/");
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.imgUpload = (req, res, next) => {
  res.json({ url: `/img/${req.file.filename}` });
};

exports.hashtagSearch = async (req, res, next) => {
  const query = req.query.hashtag;
  if (!query) {
    return res.redirect("/");
  }
  try {
    const hashtag = await Hashtag.findOne({ where: { title: query } });
    let contents = [];
    if (hashtag) {
      contents = await hashtag.getPosts({ include: [{ model: User }] });
    }
    return res.render("main", {
      title: `${query} | SNS Clone`,
      user: req.user,
      contents: contents,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};
