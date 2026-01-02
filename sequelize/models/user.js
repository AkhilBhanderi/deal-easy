module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "users",
    {
      mobile_no: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      otp: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "users",
    }
  );

  return User;
};
