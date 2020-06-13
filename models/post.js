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
      len: [1]
    }
  });

  Post.associate = function(models) {
    
    Post.hasMany(models.Comment, {
      onDelete: "cascade"
    });
  };

  return Post;
};
