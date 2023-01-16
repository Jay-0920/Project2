module.exports = function (sequelize, DataTypes) {
  const Comment = sequelize.define("Comment", {
    author: {
      type: DataTypes.STRING,
      default: "anonymous",
      validation: {
        len: [50]
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      validation: {
        len: [1]
      }
    }
  });

  Comment.associate = function (models) {
    Comment.belongsTo(models.Post, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Comment;
};
