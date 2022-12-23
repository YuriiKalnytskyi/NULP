const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          email: 'admin',
          firstName: 'admin',
          lastName: 'admin',
        },
      ]
    );
  },

  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
