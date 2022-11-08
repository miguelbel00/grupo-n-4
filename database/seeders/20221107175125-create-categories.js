'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('categories', [{
      name: 'Incomes',
      description: 'unaDescripcion',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Outcomes',
      description: 'unaDescripcion',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ], {});

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('categories', null, {});
  }
};
