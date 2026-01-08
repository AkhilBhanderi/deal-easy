module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define(
    "items",
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      owner_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pincode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      advance_money: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      deal_type: {
        type: DataTypes.ENUM("rent", "sell"),
        allowNull: false,
      },
      pet_type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      latitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      longitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      main_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      property_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      auction: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      images: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      modelName: "items",
      timestamps: true,
    }
  );

  // 🔗 Associations
  Item.associate = (models) => {
    Item.hasMany(models.carts, { foreignKey: "item_id" });
    Item.belongsTo(models.users, { foreignKey: "user_id", as: "user" });
    Item.hasMany(models.auctions, { foreignKey: "item_id", as: "auctions" });
  };

  return Item;
};
