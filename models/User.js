const { Model, DataTypes } = require("sequelize");
const connection = require("./db");
const bcrypt = require("bcryptjs");
const BankAccount = require('./BankAccount')

class User extends Model {}

User.init(
  {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
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
      allowNull: false,
    },
    birthDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accountNumber: DataTypes.STRING,
    phone: DataTypes.STRING,
  },
  {
    sequelize: connection,
  }
);

User.hasMany(BankAccount, { foreignKey: 'userId', as: 'userAccounts' });

User.beforeCreate((user) => {
  user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
});

User.beforeUpdate((user, options) => {
  if (options.fields.includes("password")) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
  }
});

module.exports = User;
