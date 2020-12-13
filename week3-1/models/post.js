module.exports = (sequelize, DataTypes) =>
  (sequelize.define(
    "post",
    {
      content: {
        type: DataTypes.STRING(140),
        allowNull: false,
      },
      img: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  ));
// 게시글 및 이미지 저장
