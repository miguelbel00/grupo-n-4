'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('roles', [{
      name: 'admin',
      description: 'unaDescripcion',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'user',
      description: 'unaDescripcion',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ], {});

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('roles', null, {});
  }
};
