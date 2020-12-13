const { Post, User } = require("../models");

exports.profile = (req, res, next) => {
  res.render("profile", { title: "My Info", user: req.user });
};
exports.signUp = (req, res, next) => {
  res.render("join", {
    title: "SNS signup",
    user: req.user,
    joinError: req.flash("joinError"),
  });
};

exports.mainPage = async (req, res, next) => {
  try {
    const postLists = await Post.findAll({
      include: {
        model: User,
        attributes: ["id", "nick"],
      },
      order: [["createdAt", "DESC"]],
    });
    return res.render("main", {
      title: "SNS Service",
      contents: postLists,
      user: req.user,
      loginError: req.flash("loginError"),
    });
  } catch (err) {
    console.error(error);
    next(error);
  }
};
