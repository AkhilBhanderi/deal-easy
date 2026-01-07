module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define(
    "carts",
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      item_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "items",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      modelName: "carts",
      indexes: [
        {
          unique: true,
          fields: ["user_id", "item_id"],
        },
      ],
    }
  );

  // 🔗 Associations
  Cart.associate = (models) => {
    Cart.belongsTo(models.items, { foreignKey: "item_id" });
    Cart.belongsTo(models.users, { foreignKey: "user_id" });
  };

  return Cart;
};
