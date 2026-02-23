module.exports = (sequelize, DataTypes) => {
  const PropertyFeatures = sequelize.define(
    "property_features",
    {
      property_feature: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      modelName: "property_features",
      timestamps: true,
    },
  );

  return PropertyFeatures;
};
