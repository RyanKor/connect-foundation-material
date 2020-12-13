module.exports = (sequelize, DataTypes) =>
  // models 오타 주의하기
  sequelize.define(
    "user",
    {
      email: {
        type: DataTypes.STRING(40),
        allowNull: true,
        unique: true,
      },
      nick: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      provider: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: "local",
      },
      snsId: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );
// 사용자 정보 저장 - 이메일, 아이디, 비밀번호 및 sns로그인 저장
// timestamps & paranoid => createdAt, updatedAt, DeletedAt
