const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require("./users")(sequelize, Sequelize);
db.Post = require("./post")(sequelize, Sequelize);
db.Hashtag = require("./hashtag")(sequelize, Sequelize);

db.User.hasMany(db.Post);
db.Post.belongsTo(db.User); //belongTo -> 1:N 관계
db.Post.belongsToMany(db.Hashtag, { through: "PostHashTag" }); // belongToMany -> 다대다 관계
db.Hashtag.belongsToMany(db.Post, { through: "PostHashTag" });
db.User.belongsToMany(db.User, {
  foreignKey: "followerId",
  as: "Followers",
  through: "Follow",
});
db.User.belongsToMany(db.User, {
  foreignKey: "followingId",
  as: "Followings",
  through: "Follow",
});
module.exports = db;
