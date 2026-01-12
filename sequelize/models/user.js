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
        type: DataTypes.STRING,
        allowNull: false,
      },
      fcm_token: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      modelName: "users",
    }
  );

  // 🔗 Associations
  User.associate = (models) => {
    User.hasMany(models.carts, { foreignKey: "user_id" });
    User.hasMany(models.auctions, { foreignKey: "user_id" });
  };

  return User;
};
