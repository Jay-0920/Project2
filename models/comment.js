module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define("Comment", {
    author: {
      type: DataTypes.STRING,
      default: "anonymous",
      len: [50]
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  });

  Comment.associate = function(models) {
    
    Comment.belongsTo(models.Post, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Comment;
};
