module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Teachings', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      title: Sequelize.STRING,
      lesson: Sequelize.STRING,
      description: Sequelize.JSONB,
    }),
  down: (queryInterface) => queryInterface.dropTable('Teachings'),
};
