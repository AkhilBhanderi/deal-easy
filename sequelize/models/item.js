module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define(
    "items",
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
        type: DataTypes.ENUM("rent", "sell"), // Assuming these are the only two possible values
        allowNull: false,
      },
      pet_type: {
        type: DataTypes.STRING,
        allowNull: true, // This can be null if not provided
      },
      description_1: {
        type: DataTypes.TEXT,
        allowNull: true, // This can be null if not provided
      },
      description_2: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      description_3: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      description_4: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      description_5: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      latitude: {
        type: DataTypes.FLOAT, // Geolocation (latitude)
        allowNull: false,
      },
      longitude: {
        type: DataTypes.FLOAT, // Geolocation (longitude)
        allowNull: false,
      },
      main_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      property_type: {
        type: DataTypes.STRING, // Type of property (e.g., house, apartment)
        allowNull: false,
      },
      location_url: {
        type: DataTypes.STRING, // Link to the location on a map or external platform
        allowNull: true, // This can be null if not provided
      },
      auction: {
        type: DataTypes.INTEGER, // True if property is being auctioned, otherwise false
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
      sequelize,
      modelName: "items", // Model name used for table
      timestamps: true, // Automatically adds createdAt and updatedAt
    }
  );

  return Item;
};
