module.exports = (sequelize, DataTypes) => {
  const Vote = sequelize.define("Vote", {
    vote: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validation: {
        isBoolean: true
      }
    }
  });

  Vote.associate = function(models) {
    Vote.belongsTo(models.Post, {
      foreignKey: {
        allowNull: false
      }
    });
    Vote.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Vote;
};
