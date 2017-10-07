module.exports = function(sequelize, DataTypes) {
  // Model of a celebrity
  var Celeberity = sequelize.define("Celeberity", {
	  name: DataTypes.STRING//,
	  // complete: DataTypes.BOOLEAN
	});
	return Celeberity;
};