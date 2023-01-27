module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('News', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      title: Sequelize.STRING,
      description: Sequelize.JSONB
    }),
  down: (queryInterface) => queryInterface.dropTable('News'),
};
