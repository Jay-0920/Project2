module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("Post", {
    // author: {
    //   type: DataTypes.STRING,
    //   defaultValue: "anonymous",
    //   validation: {
    //     len: [50]
    //   }
    // },
    title: {
      type: DataTypes.STRING,
      //allowNull: false,
      validation: {
        len: [100]
      }
    },
    body: {
      type: DataTypes.TEXT,
      //allowNull: false,
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
    // validity: {
    //   type: DataTypes.INTEGER,
    //   default: 0,
    //   validation: {
    //     isInt: true
    //   }
    // }
  });

  Post.associate = function(models) {
    Post.hasMany(models.Comment, {
      onDelete: "cascade"
    });
    Post.belongsTo(models.User, {
      foreignKey: "author"
    });
  };

  return Post;
};
