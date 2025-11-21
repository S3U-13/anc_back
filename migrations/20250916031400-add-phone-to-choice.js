"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("all_choice_type", {
      id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      choice_type_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      flag_status: {
        allowNull: true,
        type: Sequelize.STRING(1),
        defaultValue: "a",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable("all_choice", {
      choice_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      choice_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      flag_status: {
        allowNull: true,
        type: Sequelize.STRING(1),
        defaultValue: "a",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("all_choice_type");
    await queryInterface.dropTable("all_choice");
  },
};
