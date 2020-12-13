exports.signUp = (req, res, next) => {
  res.render("join", {
    title: "SNS signup",
    user: req.user,
    joinError: req.flash("joinError"),
  });
};

exports.mainPage = (req, res, next) => {
  res.render("main", {
    title: "SNS Service",
    user: req.user,
    loginError: req.flash("loginError"),
  });
};
