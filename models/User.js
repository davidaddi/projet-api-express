const { Model, DataTypes } = require("sequelize");
const connection = require("./db");
const bcrypt = require("bcryptjs");

class User extends Model {}

User.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 32],
        is: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/,
      },
    },
    role: {
      type: DataTypes.ENUM,
      values: ["admin", "user"],
      defaultValue: "user",
    },
    lastname: DataTypes.STRING,
    firstname: DataTypes.STRING,
    dob: DataTypes.DATE,
  },
  {
    sequelize: connection,
  }
);

User.addHook("beforeCreate", (user) => {
  user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
});
User.addHook("beforeUpdate", (user, options) => {
  if (options.fields.includes("password")) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
  }
});

module.exports = User;
