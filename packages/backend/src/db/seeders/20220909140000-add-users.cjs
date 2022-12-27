const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          email: 'admin.nulp.@lpnu.ua',
          firstName: 'admin',
          lastName: 'admin',
          password: bcrypt.hashSync('admin', 10),
          accessToken: '',
          role: 'ADMIN',
        },
      ]
    );
  },

  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
