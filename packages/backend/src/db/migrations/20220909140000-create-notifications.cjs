module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Notifications', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      description: Sequelize.TEXT
    }),
  down: (queryInterface) => queryInterface.dropTable('ForgotPasswords'),
};
