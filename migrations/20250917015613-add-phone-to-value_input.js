"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("blood_test_interpretation", {
      id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      bti_value_1_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      bti_value_2_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      bti_value_3_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      bti_value_4_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      bti_value_5_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });

    await queryInterface.createTable("cbe", {
      id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      cbe_value_1_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      cbe_value_2_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      cbe_value_3_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      cbe_value_4_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });

    await queryInterface.createTable("ref_in_choice", {
      id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      receive_in_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      ref_in_detail: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      hos_in_id: { allowNull: true, type: Sequelize.INTEGER },
      receive_in_detail: { allowNull: true, type: Sequelize.STRING },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });

    await queryInterface.createTable("ref_out_choice", {
      id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      receive_out_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      ref_out_detail: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      hos_out_id: { allowNull: true, type: Sequelize.INTEGER },
      receive_out_detail: { allowNull: true, type: Sequelize.STRING },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });

    await queryInterface.createTable("referral", {
      id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      ref_value_1_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      ref_value_2_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });

    await queryInterface.createTable("wife_choice_value", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      ma_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      hr_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      am_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      pcr_wife_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      cordo_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      abortion_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      vaccine: { type: Sequelize.INTEGER, allowNull: true },
      tdap_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      iip_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      bti_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      cbe_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      birads_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      per_os_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      referral_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      ref_in_choice_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      ref_out_choice_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });

    await queryInterface.createTable("lab_wife_result", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      gct_1_wife: { allowNull: true, type: Sequelize.STRING(30) },
      gct_2_wife: { allowNull: true, type: Sequelize.STRING(30) },
      ogtt_1_wife: { allowNull: true, type: Sequelize.STRING(30) },
      ogtt_2_wife: { allowNull: true, type: Sequelize.STRING(30) },
      hbsag_wife: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      vdrl_wife: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      ppr_wife: {
        allowNull: true,
        type: Sequelize.STRING(40),
      },
      tpha_wife: {
        allowNull: true,
        type: Sequelize.STRING(40),
      },
      anti_hiv_wife: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      bl_gr_wife: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      rh_wife: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      hct_wife: { allowNull: true, type: Sequelize.STRING(30) },
      of_wife: { allowNull: true, type: Sequelize.INTEGER },
      dcip_wife: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      mcv_wife: { allowNull: true, type: Sequelize.STRING(30) },
      mch_wife: { allowNull: true, type: Sequelize.STRING(30) },
      hb_typing_wife: { allowNull: true, type: Sequelize.STRING(100) },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });

    await queryInterface.createTable("lab_husband_result", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      hbsag_husband: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      vdrl_husband: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      ppr_husband: {
        allowNull: true,
        type: Sequelize.STRING(40),
      },
      tpha_husband: {
        allowNull: true,
        type: Sequelize.STRING(40),
      },
      anti_hiv_husband: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      bl_gr_husband: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      rh_husband: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      hct_husband: { allowNull: true, type: Sequelize.STRING(30) },
      of_husband: { allowNull: true, type: Sequelize.INTEGER },
      dcip_husband: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      mcv_husband: { allowNull: true, type: Sequelize.STRING(30) },
      mch_husband: { allowNull: true, type: Sequelize.STRING(30) },
      hb_typing_husband: { allowNull: true, type: Sequelize.STRING(100) },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });

    await queryInterface.createTable("wife_text_value", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      prep_weight: { type: Sequelize.DECIMAL(5, 2), allowNull: true },
      bmi: { type: Sequelize.DECIMAL(5, 2), allowNull: true },
      para: { type: Sequelize.STRING(20), allowNull: false },
      p: { type: Sequelize.STRING(20), allowNull: false },
      a: { type: Sequelize.STRING(20), allowNull: false },
      last: { type: Sequelize.STRING(30), allowNull: false },
      lmp: { type: Sequelize.DATE, allowNull: true },
      edc: { type: Sequelize.DATE, allowNull: true },
      ga: { type: Sequelize.STRING, allowNull: true },
      ma_detail: { type: Sequelize.STRING, allowNull: true },
      hr_detail: { type: Sequelize.STRING, allowNull: true },
      lab_wife_result_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      pcr_wife_text: { type: Sequelize.STRING, allowNull: true },
      cordo_text: { type: Sequelize.STRING, allowNull: true },
      cordo_other_text: { type: Sequelize.STRING, allowNull: true },
      // เพิ่มใหม่
      am_detail_1: { type: Sequelize.STRING, allowNull: true },
      am_detail_2: { type: Sequelize.STRING, allowNull: true },
      am_detail_3: { type: Sequelize.STRING, allowNull: true },
      //
      td_num: { type: Sequelize.STRING, allowNull: true },
      td_last_date: { type: Sequelize.DATE, allowNull: true },
      // เพิ่มใหม่
      vaccine_detail_1: { type: Sequelize.STRING(150), allowNull: true },
      vaccine_detail_2: { type: Sequelize.STRING(150), allowNull: true },
      vaccine_detail_3: { type: Sequelize.STRING(150), allowNull: true },
      vaccine_date_1: { type: Sequelize.DATE, allowNull: true },
      vaccine_date_2: { type: Sequelize.DATE, allowNull: true },
      vaccine_date_3: { type: Sequelize.DATE, allowNull: true },
      //
      tdap_round_1: { type: Sequelize.DATE, allowNull: true },
      tdap_round_2: { type: Sequelize.DATE, allowNull: true },
      tdap_round_3: { type: Sequelize.DATE, allowNull: true },
      iip_date: { type: Sequelize.DATE, allowNull: true },
      lab_2: { type: Sequelize.DATE, allowNull: true },
      hct: { type: Sequelize.STRING, allowNull: true },
      vdrl_2: { type: Sequelize.STRING, allowNull: true },
      hiv: { type: Sequelize.INTEGER, allowNull: true },
      bti_1_date: { type: Sequelize.DATE, allowNull: true },
      bti_2_date: { type: Sequelize.DATE, allowNull: true },
      birads_detail_1: { type: Sequelize.STRING(150), allowNull: true },
      birads_detail_2: { type: Sequelize.STRING(150), allowNull: true },
      birads_detail_3: { type: Sequelize.STRING(150), allowNull: true },
      cbe_result: { type: Sequelize.STRING, allowNull: true },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });

    await queryInterface.createTable("husband_value", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      lab_husband_result_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      pcr_hus_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      pcr_hus_text: { type: Sequelize.STRING, allowNull: true },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });

    await queryInterface.createTable("anc", {
      anc_no: {
        type: Sequelize.INTEGER, // เลขบวก
        primaryKey: true, // เป็น primary key
        allowNull: false, // ต้องมีค่า
        autoIncrement: true,
      },
      hn_wife: { type: Sequelize.INTEGER, allowNull: false },
      wife_address: { type: Sequelize.STRING, allowNull: true },
      wife_tel: { type: Sequelize.STRING(10), allowNull: true },
      hn_husband: { type: Sequelize.INTEGER, allowNull: true },
      husband_name: { type: Sequelize.STRING(100), allowNull: true },
      husband_age: { type: Sequelize.STRING(5), allowNull: true },
      husband_citizencardno: { type: Sequelize.STRING(13), allowNull: true },
      husband_race: { type: Sequelize.STRING(100), allowNull: true },
      husband_tel: { type: Sequelize.STRING(10), allowNull: true },
      flag_status: {
        allowNull: true,
        type: Sequelize.STRING(1),
        defaultValue: "a",
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

    await queryInterface.createTable("anc_service", {
      id: {
        autoIncrement: true,
        allowNull: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      anc_no: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      patvisit_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      patreg_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      pat_vitalsign_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      wife_choice_value_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      wife_text_value_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      husband_value_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      round: {
        allowNull: true,
        type: Sequelize.STRING(10),
      },
      gravida: {
        allowNull: true,
        type: Sequelize.STRING(10),
      },
      flag_status: {
        allowNull: true,
        type: Sequelize.STRING(1),
        defaultValue: "a",
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
    await queryInterface.dropTable("blood_test_interpretation");
    await queryInterface.dropTable("cbe");
    await queryInterface.dropTable("ref_in_choice");
    await queryInterface.dropTable("ref_out_choice");
    await queryInterface.dropTable("referral");
    await queryInterface.dropTable("wife_choice_value");
    await queryInterface.dropTable("lab_wife_result");
    await queryInterface.dropTable("lab_husband_result");
    await queryInterface.dropTable("wife_text_value");
    await queryInterface.dropTable("husband_value");
    await queryInterface.dropTable("anc");
    await queryInterface.dropTable("anc_service");
  },
};
