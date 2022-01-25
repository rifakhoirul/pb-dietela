'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Phonebooks', [
      {
      name: 'Andi',
      phone: '0895628135631',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Budi',
      phone: '0895628135632',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Caca',
      phone: '0895628135633',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Dodo',
      phone: '0895628135634',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Phonebooks', null, {});
  }
};
