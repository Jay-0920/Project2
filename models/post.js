module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    author: {
      type: DataTypes.STRING,
      default: "anonymous",
      len: [50]
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [100]
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [250]
    }
  });

  Post.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Post.belongsTo(models.Post, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Post;
};
