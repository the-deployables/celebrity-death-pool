// Celebrity Model will go below, currently copy pasted code to review.
module.exports = function(sequelize, DataTypes) {
    var Celebrity = sequelize.define("Celebrity", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      causeofdeath: {
        type: DataTypes.STRING,
        defaultValue: "poisoning",
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      deathdate: {
        type: DataTypes.DATEONLY
      }
    });
    return Celebrity;
  };  