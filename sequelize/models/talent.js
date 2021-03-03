'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Talent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line
    static associate(models) {
      // define association here
    }
  }
  Talent.init(
    {
      firebaseId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firstName: DataTypes.STRING,
      middleName: DataTypes.STRING,
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profilePic: DataTypes.STRING,
      profession: DataTypes.STRING,
      street: DataTypes.STRING,
      streetNo: DataTypes.STRING,
      city: DataTypes.STRING,
      postalCode: DataTypes.STRING,
      isoCode: DataTypes.STRING,
      description: DataTypes.TEXT,
      experiences: DataTypes.ARRAY(DataTypes.JSONB),
      qualifications: DataTypes.ARRAY(DataTypes.JSONB),
      approbations: DataTypes.ARRAY(DataTypes.JSONB),
      documents: DataTypes.ARRAY(DataTypes.JSONB),
      languages: DataTypes.ARRAY(DataTypes.JSONB),
      otherSkills: DataTypes.ARRAY(DataTypes.JSONB),
    },
    {
      sequelize,
      modelName: 'Talent',
    },
  );
  return Talent;
};
