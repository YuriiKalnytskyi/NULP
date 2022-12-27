module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('ForgotPasswords', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      code: Sequelize.STRING,
      user_id: Sequelize.INTEGER,

    }),
  down: (queryInterface) => queryInterface.dropTable('ForgotPasswords'),
};
