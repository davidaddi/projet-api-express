const { Model, DataTypes } = require("sequelize");
const connection = require("./db");
const User = require('./User')

const generateRandomDigits = (length) => {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += Math.floor(Math.random() * 10);
  }
  return result;
};

class BankAccount extends Model {}

BankAccount.init(
  {
    accountNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      defaultValue: () => generateRandomDigits(9)
    },
    balance: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onUpdate: 'CASCADE', 
      onDelete: 'CASCADE',
      references: {
        model: 'Users', 
        key: 'id' 
      }, 
    },
  },
  {
    sequelize: connection,
  }
);

BankAccount.associate = function(models) {
  BankAccount.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE', 
  });
};

module.exports = BankAccount;
