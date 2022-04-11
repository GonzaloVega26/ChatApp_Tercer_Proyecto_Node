"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.User.belongsToMany(models.User, {
        as: "idUser1",
        foreignKey: "idUser1",
        through: "Conversation",
      });
      models.User.belongsToMany(models.User, {
        as: "idUser2",
        foreignKey: "idUser2",
        through: "Conversation",
      });
      models.User.hasMany(models.Message, { foreignKey: "senderId" });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      birthday: DataTypes.DATE,

      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mail: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: {
            args: true,
            msg: "Enter a valid Email",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [4, 16],
            msg: "Enter a password between 4 and 16 characters",
          },
        },
      },
      urlPicture: {
        type: DataTypes.STRING(10000) ,
        defaultValue:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpbPpWCdbVZP5eHwbuND4LmHOUqQBjKAiT9Q&usqp=CAU'
        
      },
    },
    {
      sequelize,
      modelName: "User",
      timestamps: false,
    }
  );
  return User;
};
