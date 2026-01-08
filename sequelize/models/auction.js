module.exports = (sequelize, DataTypes) => {
  const Auction = sequelize.define("auctions", {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    owner_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });

  Auction.associate = (models) => {
    Auction.belongsTo(models.items, { foreignKey: "item_id", as: "item" });
    Auction.belongsTo(models.users, { foreignKey: "user_id" });
  };

  return Auction;
};
