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
      len: [250]
    }
  });

  Comment.associate = function(models) {
    // We're saying that a Comment should belong to an Author
    // A Comment can't be created without an Author due to the foreign key constraint
    Comment.belongsTo(models.Post, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Comment;
};
