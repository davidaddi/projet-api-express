const { Model, DataTypes } = require("sequelize");
const connection = require("./db");
const bcrypt = require("bcryptjs");
const BankAccount = require('./BankAccount')

const generateRandomDigits = (length) => {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += Math.floor(Math.random() * 10);
  }
  return result;
};

class CreditCard extends Model {}

CreditCard.init(
  {
    cardNumber: {
      type: DataTypes.STRING(16),
      allowNull: false,
      unique: true,
      defaultValue: () => generateRandomDigits(16),
    },
    cvv: {
      type: DataTypes.STRING(3),
      allowNull: false,
      defaultValue: () => generateRandomDigits(3),
    },
    pin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bankAccountId: {
      type: DataTypes.INTEGER,
      unique: true,
    },
  },
  {
    sequelize: connection,
  }
);

CreditCard.belongsTo(BankAccount, {
  foreignKey: 'bankAccountId',
  onDelete: 'CASCADE', 
});

CreditCard.addHook("beforeCreate", (creditcard) => {
    creditcard.pin = bcrypt.hashSync(creditcard.pin, bcrypt.genSaltSync(10));
  });

CreditCard.addHook("beforeUpdate", (creditcard, options) => {
  if (options.fields.includes("pin")) {
      creditcard.pin = bcrypt.hashSync(creditcard.pin, bcrypt.genSaltSync(10));
  }
});
  

module.exports = CreditCard;
