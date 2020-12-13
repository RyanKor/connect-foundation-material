module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "hashtag",
    {
      title: {
        type: DataTypes.STRING(15),
        allowNull: false,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );
// hashtag 모델을 따로 두는 이유는 나중에 태그로 검색을 하기 위함이다.
