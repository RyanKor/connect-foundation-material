const passport = require("passport");
const bcrypt = require("bcrypt");

const { User } = require("../models");

exports.userSignup = async (req, res, next) => {
  const { email, nick, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      req.flash("joinError", "Already Signup Email");
      return res.redirect("/join");
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      nick,
      password: hash,
    });
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

exports.localLogin = (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      req.flash("loginError", info.message);
      return res.redirect("/");
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect("/");
    });
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
};

exports.logOut = (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect("/");
};

exports.getGoogleLogin = passport.authenticate("google", {
  scope: ["profile", "email"],
});

(exports.SignupGoogleLogin = passport.authenticate("google", {
  failureRedirect: "/login",
  successRedirect: "/",
})),
  (req, res) => {
    res.redirect("/");
  };
