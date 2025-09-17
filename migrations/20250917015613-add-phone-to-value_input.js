'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("blood_test_interpretation", {
      id: { primaryKey: true, allowNull: false, autoIncrement: true, type: Sequelize.INTEGER.UNSIGNED, },
      value_1_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: true, references: { model: "all_choice", key: "id" }, onUpdate: "CASCADE", onDelete: "CASCADE", name: "fk_value_1_id" },
      value_2_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: true, references: { model: "all_choice", key: "id" }, onUpdate: "CASCADE", onDelete: "CASCADE", name: "fk_value_2_id" },
      value_3_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: true, references: { model: "all_choice", key: "id" }, onUpdate: "CASCADE", onDelete: "CASCADE", name: "fk_value_3_id" },
      value_4_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: true, references: { model: "all_choice", key: "id" }, onUpdate: "CASCADE", onDelete: "CASCADE", name: "fk_value_4_id" },
      value_5_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: true, references: { model: "all_choice", key: "id" }, onUpdate: "CASCADE", onDelete: "CASCADE", name: "fk_value_5_id" },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
    await queryInterface.createTable("cbe", {
      id: { primaryKey: true, allowNull: false, autoIncrement: true, type: Sequelize.INTEGER.UNSIGNED, },
      value_1_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: true, references: { model: "all_choice", key: "id" }, onUpdate: "CASCADE", onDelete: "CASCADE", name: "fk_value_1_id" },
      value_2_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: true, references: { model: "all_choice", key: "id" }, onUpdate: "CASCADE", onDelete: "CASCADE", name: "fk_value_2_id" },
      value_3_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: true, references: { model: "all_choice", key: "id" }, onUpdate: "CASCADE", onDelete: "CASCADE", name: "fk_value_3_id" },
      value_4_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: true, references: { model: "all_choice", key: "id" }, onUpdate: "CASCADE", onDelete: "CASCADE", name: "fk_value_4_id" },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
    await queryInterface.createTable("referral", {
      id: { primaryKey: true, allowNull: false, autoIncrement: true, type: Sequelize.INTEGER.UNSIGNED, },
      ref_in_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: true, references: { model: "all_choice", key: "id" }, onUpdate: "CASCADE", onDelete: "CASCADE", name: "fk_ref_in_id" },
      ref_out_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: true, references: { model: "all_choice", key: "id" }, onUpdate: "CASCADE", onDelete: "CASCADE", name: "fk_ref_out_id" },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
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
      ref_in_choice_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: true, references: { model: "all_choice", key: "id" }, onUpdate: "CASCADE", onDelete: "CASCADE", name: "fk_ref_in_choice_id" },
      ref_out_choice_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: true, references: { model: "all_choice", key: "id" }, onUpdate: "CASCADE", onDelete: "CASCADE", name: "fk_ref_out_choice_id" },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });
    await queryInterface.createTable("text_value_wife", {
      id: { type: Sequelize.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true, allowNull: false },
      da_text: { type: Sequelize.STRING, allowNull: true, },
      hr_text: { type: Sequelize.STRING, allowNull: true, },
      gct_1: { type: Sequelize.STRING, allowNull: false, },
      gct_2: { type: Sequelize.STRING, allowNull: false, },
      hbsag: { type: Sequelize.STRING, allowNull: false, },
      vdrl_1: { type: Sequelize.STRING, allowNull: false, },
      anti_hiv: { type: Sequelize.STRING, allowNull: false, },
      bl_gr: { type: Sequelize.STRING, allowNull: false, },
      rh: { type: Sequelize.STRING, allowNull: false, },
      hct: { type: Sequelize.STRING, allowNull: false, },
      of: { type: Sequelize.STRING, allowNull: false, },
      dcip: { type: Sequelize.STRING, allowNull: false, },
      mcv: { type: Sequelize.STRING, allowNull: false, },
      mch: { type: Sequelize.STRING, allowNull: false, },
      hb_typing: { type: Sequelize.STRING, allowNull: false, },
      pcr_text: { type: Sequelize.STRING, allowNull: true, },
      cordo_text: { type: Sequelize.STRING, allowNull: true, },
      cordo_other_text: { type: Sequelize.STRING, allowNull: true, },
      td_num: { type: Sequelize.INTEGER, allowNull: true, },
      td_last_date: { type: Sequelize.DATE, allowNull: true, },
      dp_round_1: { type: Sequelize.DATE, allowNull: true, },
      dp_round_2: { type: Sequelize.DATE, allowNull: true, },
      dp_round_3: { type: Sequelize.DATE, allowNull: true, },
      iip_date: { type: Sequelize.DATE, allowNull: true, },
      lab_2: { type: Sequelize.STRING, allowNull: false, },
      hct: { type: Sequelize.STRING, allowNull: false, },
      vdrl_2: { type: Sequelize.STRING, allowNull: false, },
      h: { type: Sequelize.STRING, allowNull: false, },
      bti_date: { type: Sequelize.TEXT, allowNull: false, },
      cbe_result: { type: Sequelize.STRING, allowNull: true, },
      hos_name: { type: Sequelize.STRING, allowNull: true, },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });
    await queryInterface.createTable("text_value_husband", {
      id: { type: Sequelize.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true, allowNull: false },
      husband_name: { type: Sequelize.STRING, allowNull: false },
      husband_age: { type: Sequelize.INTEGER, allowNull: false },
      husband_id_card: { type: Sequelize.STRING(13), allowNull: false },
      husband_hn: { type: Sequelize.INTEGER, allowNull: false },
      husband_tel: { type: Sequelize.STRING(10), allowNull: false },
      husband_job: { type: Sequelize.STRING, allowNull: false },
      hbsag_husband: { type: Sequelize.STRING, allowNull: false },
      vdrl_husband: { type: Sequelize.STRING, allowNull: false },
      anti_hiv_husband: { type: Sequelize.STRING, allowNull: false },
      bl_gr_husband: { type: Sequelize.STRING, allowNull: false },
      rh_husband: { type: Sequelize.STRING, allowNull: false },
      hct_husband: { type: Sequelize.STRING, allowNull: false },
      of_husband: { type: Sequelize.STRING, allowNull: false },
      dcip_husband: { type: Sequelize.STRING, allowNull: false },
      mcv_husband: { type: Sequelize.STRING, allowNull: false },
      mch_husband: { type: Sequelize.STRING, allowNull: false },
      hb_typing_husband: { type: Sequelize.STRING, allowNull: false },
      pcr_hus_husband: { type: Sequelize.STRING, allowNull: false },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });
    await queryInterface.createTable("anc", {
      anc_no: { type: Sequelize.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true, allowNull: false },
      hn: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false },
      patvisit_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false },
      patreg_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false },
      para: { type: Sequelize.STRING, allowNull: false },
      g: { type: Sequelize.STRING, allowNull: false },
      p: { type: Sequelize.STRING, allowNull: false },
      a: { type: Sequelize.STRING, allowNull: false },
      last: { type: Sequelize.STRING, allowNull: false },
      lmp: { type: Sequelize.DATE, allowNull: false },
      choice_value_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: "choice_value", key: "id" }, onUpdate: "CASCADE", onDelete: "CASCADE", name: "choice_value" },
      text_value_wife_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: "text_value_wife", key: "id" }, onUpdate: "CASCADE", onDelete: "CASCADE", name: "text_value_wife" },
      text_value_husband_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: "text_value_husband", key: "id" }, onUpdate: "CASCADE", onDelete: "CASCADE", name: "text_value_husband" },
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
