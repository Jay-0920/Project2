module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("Post", {
    title: {
      type: DataTypes.STRING,
      validation: {
        len: [100]
      }
    },
    body: {
      type: DataTypes.TEXT,
      validation: {
        len: [1]
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validation: {
        len: [5]
      }
    }
  });

  Post.associate = function (models) {
    Post.hasMany(models.Comment, {
      onDelete: "cascade"
    });
    Post.belongsTo(models.User, {
      foreignKey: "author",
      targetKey: "username"
    });
  };

  return Post;
};