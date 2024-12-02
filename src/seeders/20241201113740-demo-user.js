'use strict';

const { Router } = require("express");


module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'admin1@example.com',
        password:'123',
        firstName: 'Trong',
        lastName: 'Hieu',
        address:'VietNam',
        gender:1,
        typeRole:'ROLE',
        keyRole:'A1',
        
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
