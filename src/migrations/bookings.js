'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      room_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      total_person: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      booking_time: {
        allowNull: false,
        type: Sequelize.DATE
      },
      noted: {
        allowNull: true,
        type: Sequelize.STRING
      },
      check_in_time: {
        allowNull: true,
        type: Sequelize.DATE
      },
      check_out_time: {
        allowNull: true,
        type: Sequelize.DATE
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('bookings')
  }
}
