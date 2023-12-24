const { Model, DataTypes } = require("sequelize");
const connection = require("./db");
const BankAccount = require('./BankAccount')

class Transaction extends Model {}

Transaction.init(
  {
    senderAccountNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      onUpdate: 'CASCADE',  
      onDelete: 'CASCADE',
    },
    receivertAccountNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: connection,
  }
);

Transaction.belongsTo(BankAccount, {
  foreignKey: 'bankAccountId',
  onDelete: 'CASCADE', 
});

module.exports = Transaction;
