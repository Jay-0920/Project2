module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("Post", {
    author: {
      type: DataTypes.STRING,
      default: "anonymous",
      validation: {
        len: [50]
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validation: {
        len: [100]
      }
    },
    zipCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validation: {
        len: [5]
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

  Post.associate = function(models) {
    Post.hasMany(models.Comment, {
      onDelete: "cascade"
    });
  };

  return Post;
};
