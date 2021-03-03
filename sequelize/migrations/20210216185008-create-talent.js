'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('Talents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      firebaseId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
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
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  // eslint-disable-next-line
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('Talents');
  },
};
