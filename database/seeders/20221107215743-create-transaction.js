'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('transactions', [{
      description: "investing",
      amount: 300,
      userId: 2,
      categoryId: 1,
      date:  new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      description: "paying",
      amount: 350,
      userId: 2,
      categoryId: 2,
      date:  new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      description: "Electrical Expenses",
      amount: 500,
      userId: 4,
      categoryId: 2,
      date:  new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      description: "borrowing",
      amount: 300,
      userId: 4,
      categoryId: 1,
      date:  new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      description: "digitals services",
      amount: 300,
      userId: 1,
      categoryId: 2,
      date:  new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      description: "paying employees their salary",
      amount: 300,
      userId: 1,
      categoryId: 2,
      date:  new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ], {});

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('transactions', null, {});
  }
};
