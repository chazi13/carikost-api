'use strict';
module.exports = (sequelize, DataTypes) => {
  const dorm = sequelize.define('dorm', {
    name: DataTypes.STRING,
    type: DataTypes.ENUM('Campur', 'Putra', 'Putri'),
    rooms_avaibel: DataTypes.INTEGER,
    address: DataTypes.STRING,
    full_address: DataTypes.STRING,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    price: DataTypes.INTEGER,
    width: DataTypes.DECIMAL(1,1),
    lenght: DataTypes.DECIMAL(1,1),
    features: DataTypes.STRING,
    city: DataTypes.STRING,
    desc: DataTypes.STRING,
    images: DataTypes.STRING,
    owner: DataTypes.INTEGER
  }, {});
  dorm.associate = function(models) {
    // associations can be defined here
  };
  return dorm;
};