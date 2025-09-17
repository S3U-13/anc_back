'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("blood_test_interpretation", {
      id: {primaryKey: true,allowNull: false,autoIncrement: true,type: Sequelize.INTEGER.UNSIGNED,},
      value_1_id: {type: Sequelize.INTEGER.UNSIGNED,allowNull: true, references: { model: "all_choice", key: "id" }, onUpdate: "CASCADE", onDelete: "CASCADE", name: "fk_value_1_id"},
      value_2_id: {type: Sequelize.INTEGER.UNSIGNED,allowNull: true, references: { model: "all_choice", key: "id" }, onUpdate: "CASCADE", onDelete: "CASCADE", name: "fk_value_2_id"},
      value_3_id: {type: Sequelize.INTEGER.UNSIGNED,allowNull: true, references: { model: "all_choice", key: "id" }, onUpdate: "CASCADE", onDelete: "CASCADE", name: "fk_value_3_id"},
      value_4_id: {type: Sequelize.INTEGER.UNSIGNED,allowNull: true, references: { model: "all_choice", key: "id" }, onUpdate: "CASCADE", onDelete: "CASCADE", name: "fk_value_4_id"},
      value_5_id: {type: Sequelize.INTEGER.UNSIGNED,allowNull: true, references: { model: "all_choice", key: "id" }, onUpdate: "CASCADE", onDelete: "CASCADE", name: "fk_value_5_id"},
      createdAt: {allowNull: false,type: Sequelize.DATE},
      updatedAt: {allowNull: false,type: Sequelize.DATE}
    });
    await queryInterface.createTable("cbe", {
      id: {primaryKey: true,allowNull: false,autoIncrement: true,type: Sequelize.INTEGER.UNSIGNED,},
      value_1_id: {type: Sequelize.INTEGER.UNSIGNED,allowNull: true, references: { model: "all_choice", key: "id" }, onUpdate: "CASCADE", onDelete: "CASCADE", name: "fk_value_1_id"},
      value_2_id: {type: Sequelize.INTEGER.UNSIGNED,allowNull: true, references: { model: "all_choice", key: "id" }, onUpdate: "CASCADE", onDelete: "CASCADE", name: "fk_value_2_id"},
      value_3_id: {type: Sequelize.INTEGER.UNSIGNED,allowNull: true, references: { model: "all_choice", key: "id" }, onUpdate: "CASCADE", onDelete: "CASCADE", name: "fk_value_3_id"},
      value_4_id: {type: Sequelize.INTEGER.UNSIGNED,allowNull: true, references: { model: "all_choice", key: "id" }, onUpdate: "CASCADE", onDelete: "CASCADE", name: "fk_value_4_id"},
      createdAt: {allowNull: false,type: Sequelize.DATE},
      updatedAt: {allowNull: false,type: Sequelize.DATE}
    });
    await queryInterface.createTable("referral", {
      id: {primaryKey: true,allowNull: false,autoIncrement: true,type: Sequelize.INTEGER.UNSIGNED,},
      ref_in_id: {type: Sequelize.INTEGER.UNSIGNED,allowNull: true, references: { model: "all_choice", key: "id" }, onUpdate: "CASCADE", onDelete: "CASCADE", name: "fk_ref_in_id"},
      ref_out_id: {type: Sequelize.INTEGER.UNSIGNED,allowNull: true, references: { model: "all_choice", key: "id" }, onUpdate: "CASCADE", onDelete: "CASCADE", name: "fk_ref_out_id"},
      createdAt: {allowNull: false,type: Sequelize.DATE},
      updatedAt: {allowNull: false,type: Sequelize.DATE}
    });
    await queryInterface.createTable("choice_value", {
      id: { type: Sequelize.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true, allowNull: false },
      ma_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: "all_choice", key: "id" }, onUpdate: "CASCADE", onDelete: "CASCADE", name: "fk_ma_id" },
      hr_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: "all_choice", key: "id" }, onUpdate: "CASCADE", onDelete: "CASCADE", name: "fk_hr_id" },
      am_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: "all_choice", key: "id" }, onUpdate: "CASCADE", onDelete: "CASCADE", name: "fk_am_id" },
      pcr_wife_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: "all_choice", key: "id" }, onUpdate: "CASCADE", onDelete: "CASCADE", name: "fk_pcr_wife_id" },
      cordo_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: "all_choice", key: "id" }, onUpdate: "CASCADE", onDelete: "CASCADE", name: "fk_cordo_id" },
      abortion_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: "all_choice", key: "id" }, onUpdate: "CASCADE", onDelete: "CASCADE", name: "fk_abortion_id" },
      tdap_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: "all_choice", key: "id" }, onUpdate: "CASCADE", onDelete: "CASCADE", name: "fk_tdap_id" },
      iip_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: "all_choice", key: "id" }, onUpdate: "CASCADE", onDelete: "CASCADE", name: "fk_iip_id" },
      bti_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: "blood_test_interpretation", key: "id" }, onUpdate: "CASCADE", onDelete: "CASCADE", name: "fk_bti_id" },
      cbe_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: "cbe", key: "id" }, onUpdate: "CASCADE", onDelete: "CASCADE", name: "fk_cbe_id" },
      birads_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: "all_choice", key: "id" }, onUpdate: "CASCADE", onDelete: "CASCADE", name: "fk_birads_id" },
      per_os_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: "all_choice", key: "id" }, onUpdate: "CASCADE", onDelete: "CASCADE", name: "fk_per_os_id" },
      pcr_hus_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: "all_choice", key: "id" }, onUpdate: "CASCADE", onDelete: "CASCADE", name: "fk_pcr_hus_id" },
      anc_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: "all_choice", key: "id" }, onUpdate: "CASCADE", onDelete: "CASCADE", name: "fk_anc_id" },
      usg_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: "all_choice", key: "id" }, onUpdate: "CASCADE", onDelete: "CASCADE", name: "fk_usg_id" },
      referral_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: "referral", key: "id" }, onUpdate: "CASCADE", onDelete: "CASCADE", name: "fk_referral_id" },
      ref_in_choice_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: true, references: { model: "all_choice", key: "id" }, onUpdate: "CASCADE", onDelete: "CASCADE", name: "fk_ref_in_choice_id"},
      ref_out_choice_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: true, references: { model: "all_choice", key: "id" }, onUpdate: "CASCADE", onDelete: "CASCADE", name: "fk_ref_out_choice_id"},
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * 
     */
    await queryInterface.dropTable('choice_value');
    await queryInterface.dropTable('blood_test_interpretation');
    await queryInterface.dropTable('cbe');
    await queryInterface.dropTable('referral');
  }
};
