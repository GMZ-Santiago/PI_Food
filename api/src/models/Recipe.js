const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {

  const Recipe = sequelize.define(
    "recipe",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      summary: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      healthScore: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      steps: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
        allowNull: false,
        defaultValue: [],
        validate: {
          isValidate(value) {
            if (!Array.isArray(value) || value.length === 0) {
              throw new Error(
                "Steps must be an array with at least one element"
              );
            }
          },
        },
      },
      dietsName: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      created: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true, 
      },
    },
    {
      timestamps: false,
    }
  );

  return Recipe;
};
