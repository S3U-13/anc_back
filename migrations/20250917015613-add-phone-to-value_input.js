"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("blood_test_interpretation", {
      id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      bti_value_1_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
        references: { model: "all_choice", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        name: "fk_bti_value_1_id",
      },
      bti_value_2_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
        references: { model: "all_choice", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        name: "fk_bti_value_2_id",
      },
      bti_value_3_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
        references: { model: "all_choice", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        name: "fk_bti_value_3_id",
      },
      bti_value_4_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
        references: { model: "all_choice", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        name: "fk_bti_value_4_id",
      },
      bti_value_5_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
        references: { model: "all_choice", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        name: "fk_bti_value_5_id",
      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });

    await queryInterface.createTable("cbe", {
      id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      cbe_value_1_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
        references: { model: "all_choice", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        name: "fk_cbe_value_1_id",
      },
      cbe_value_2_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
        references: { model: "all_choice", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        name: "fk_cbe_value_2_id",
      },
      cbe_value_3_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
        references: { model: "all_choice", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        name: "fk_cbe_value_3_id",
      },
      cbe_value_4_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
        references: { model: "all_choice", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        name: "fk_cbe_value_4_id",
      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });

    await queryInterface.createTable("ref_in_choice", {
      id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      receive_in_id: {
        allowNull: true,
        type: Sequelize.INTEGER.UNSIGNED,
        references: {
          model: "all_choice",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        name: "fk_receive_in_id",
      },
      hos_id: { allowNull: true, type: Sequelize.INTEGER },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });

    await queryInterface.createTable("ref_out_choice", {
      id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      receive_out_id: {
        allowNull: true,
        type: Sequelize.INTEGER.UNSIGNED,
        references: {
          model: "all_choice",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        name: "fk_receive_out_id",
      },
      hos_id: { allowNull: true, type: Sequelize.INTEGER },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });

    await queryInterface.createTable("referral", {
      id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      ref_in_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
        references: { model: "all_choice", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        name: "fk_ref_in_id",
      },
      ref_out_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
        references: { model: "all_choice", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        name: "fk_ref_out_id",
      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });

    await queryInterface.createTable("wife_choice_value", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      ma_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: "all_choice", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        name: "fk_ma_id",
      },
      hr_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: "all_choice", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        name: "fk_hr_id",
      },
      am_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: "all_choice", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        name: "fk_am_id",
      },
      pcr_wife_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: "all_choice", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        name: "fk_pcr_wife_id",
      },
      cordo_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: "all_choice", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        name: "fk_cordo_id",
      },
      abortion_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: "all_choice", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        name: "fk_abortion_id",
      },
      tdap_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: "all_choice", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        name: "fk_tdap_id",
      },
      iip_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: "all_choice", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        name: "fk_iip_id",
      },
      bti_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: "blood_test_interpretation", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        name: "fk_bti_id",
      },
      cbe_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: "cbe", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        name: "fk_cbe_id",
      },
      birads_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: "all_choice", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        name: "fk_birads_id",
      },
      per_os_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: "all_choice", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        name: "fk_per_os_id",
      },
      anc_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: "all_choice", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        name: "fk_anc_id",
      },
      usg_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: "all_choice", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        name: "fk_usg_id",
      },
      referral_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: "referral", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        name: "fk_referral_id",
      },
      ref_in_choice_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
        references: { model: "ref_in_choice", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        name: "fk_ref_in_choice_id",
      },
      ref_out_choice_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
        references: { model: "ref_out_choice", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        name: "fk_ref_out_choice_id",
      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });

    await queryInterface.createTable("wife_text_value", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      para: { type: Sequelize.STRING, allowNull: false },
      g: { type: Sequelize.STRING, allowNull: false },
      p: { type: Sequelize.STRING, allowNull: false },
      a: { type: Sequelize.STRING, allowNull: false },
      last: { type: Sequelize.STRING, allowNull: false },
      lmp: { type: Sequelize.DATE, allowNull: false },
      edc: { type: Sequelize.DATE, allowNull: false },
      ga: { type: Sequelize.STRING, allowNull: false },
      ma_detail: { type: Sequelize.STRING, allowNull: true },
      hr_detail: { type: Sequelize.STRING, allowNull: true },
      lab_wife_result_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      pcr_wife_text: { type: Sequelize.STRING, allowNull: true },
      cordo_text: { type: Sequelize.STRING, allowNull: true },
      cordo_other_text: { type: Sequelize.STRING, allowNull: true },
      td_num: { type: Sequelize.INTEGER, allowNull: true },
      td_last_date: { type: Sequelize.DATE, allowNull: true },
      tdap_round_1: { type: Sequelize.DATE, allowNull: true },
      tdap_round_2: { type: Sequelize.DATE, allowNull: true },
      tdap_round_3: { type: Sequelize.DATE, allowNull: true },
      iip_date: { type: Sequelize.DATE, allowNull: true },
      lab_2: { type: Sequelize.STRING, allowNull: false },
      hct: { type: Sequelize.STRING, allowNull: false },
      vdrl_2: { type: Sequelize.STRING, allowNull: false },
      h: { type: Sequelize.STRING, allowNull: false },
      bti_date: { type: Sequelize.TEXT, allowNull: false },
      cbe_result: { type: Sequelize.STRING, allowNull: true },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });

    await queryInterface.createTable("husband_value", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      lab_husband_result_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      pcr_hus_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: "all_choice", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        name: "fk_pcr_hus_id",
      },
      pcr_hus_text: { type: Sequelize.STRING, allowNull: false },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });

    await queryInterface.createTable("anc", {
      anc_no: {
        type: Sequelize.INTEGER.UNSIGNED, // เลขบวก
        primaryKey: true, // เป็น primary key
        allowNull: false, // ต้องมีค่า
        autoIncrement: true,
      },
      hn_wife: { type: Sequelize.INTEGER, allowNull: false },
      hn_husband: { type: Sequelize.INTEGER, allowNull: false },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });

    await queryInterface.createTable("anc_service", {
      id: {
        autoIncrement: true,
        allowNull: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      anc_no: {
        allowNull: false,
        type: Sequelize.INTEGER.UNSIGNED,
        references: { model: "anc", key: "anc_no" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        name: "fk_anc",
      },
      patvisit_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      patreg_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      wife_choice_value_id: {
        allowNull: false,
        type: Sequelize.INTEGER.UNSIGNED,
        references: { model: "wife_choice_value", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      wife_text_value_id: {
        allowNull: false,
        type: Sequelize.INTEGER.UNSIGNED,
        references: { model: "wife_text_value", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      husband_value_id: {
        allowNull: false,
        type: Sequelize.INTEGER.UNSIGNED,
        references: { model: "husband_value", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      round: {
        allowNull: true,
        type: Sequelize.STRING(10),
      },
      create_by_user_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      edit_by_user_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("choice_value");
    await queryInterface.dropTable("blood_test_interpretation");
    await queryInterface.dropTable("cbe");
    await queryInterface.dropTable("referral");
    await queryInterface.dropTable("text_value_wife");
    await queryInterface.dropTable("text_value_husband");
    await queryInterface.dropTable("anc");
  },
};
