const local = require("./localStrategy");
const google = require("./googleStrategy");
const { User } = require("../models");

module.exports = (passport) => {
  passport.serializeUser(async (user, done) => {
    await done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    await User.findOne({
      where: { id },
      include: [
        {
          model: User,
          attributes: ["id", "nick"],
          as: "Followers",
        },
        {
          model: User,
          attributes: ["id", "nick"],
          as: "Followings",
        },
      ],
    })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });

  local(passport);
  google(passport);
};

/*
로그인 작동 원리
1. 로그인 요청이 들어옴
2. passport.authenticate 메소드 호출
3. 로그인 전략 수행
4. 로그인 성공 시, 사용자 정보 객체와 함께 req.login 호출
5. req.login 메소드가 passport.serializeUser 호출
6. req.session에 사용자 아이디만 저장
7. 로그인 완료

로그인 이후의 과정

1. 모든 요청에 passport.session() 미들웨어가 passport.deserializerUser 메소드 호출
2. req.session에 저장된 아이디로 데이터베이스에서 사용자 조회
3. 조회된 사용자 정보를 req.user에 저장
4. 라우터에서 req.user 객체 사용 가능
*/
