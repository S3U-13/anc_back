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
        references: { model: "all_choice", key: "id" },
        name: "fk_bti_value_1_id",
      },
      bti_value_2_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "all_choice", key: "id" },
        name: "fk_bti_value_2_id",
      },
      bti_value_3_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "all_choice", key: "id" },
        name: "fk_bti_value_3_id",
      },
      bti_value_4_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "all_choice", key: "id" },
        name: "fk_bti_value_4_id",
      },
      bti_value_5_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "all_choice", key: "id" },
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
        type: Sequelize.INTEGER,
      },
      cbe_value_1_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "all_choice", key: "id" },
        name: "fk_cbe_value_1_id",
      },
      cbe_value_2_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "all_choice", key: "id" },
        name: "fk_cbe_value_2_id",
      },
      cbe_value_3_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "all_choice", key: "id" },
        name: "fk_cbe_value_3_id",
      },
      cbe_value_4_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "all_choice", key: "id" },
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
        type: Sequelize.INTEGER,
      },
      receive_in_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: "all_choice",
          key: "id",
        },
        name: "fk_receive_in_id",
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
        references: {
          model: "all_choice",
          key: "id",
        },
        name: "fk_receive_out_id",
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
        references: { model: "all_choice", key: "id" },
        name: "fk_ref_in_id",
      },
      ref_value_2_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "all_choice", key: "id" },
        name: "fk_ref_out_id",
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
        allowNull: false,
        references: { model: "all_choice", key: "id" },
        name: "fk_ma_id",
      },
      hr_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "all_choice", key: "id" },
        name: "fk_hr_id",
      },
      am_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "all_choice", key: "id" },
        name: "fk_am_id",
      },
      pcr_wife_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "all_choice", key: "id" },
        name: "fk_pcr_wife_id",
      },
      cordo_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "all_choice", key: "id" },
        name: "fk_cordo_id",
      },
      abortion_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "all_choice", key: "id" },
        name: "fk_abortion_id",
      },
      tdap_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "all_choice", key: "id" },
        name: "fk_tdap_id",
      },
      iip_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "all_choice", key: "id" },
        name: "fk_iip_id",
      },
      bti_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "blood_test_interpretation", key: "id" },
        name: "fk_bti_id",
      },
      cbe_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "cbe", key: "id" },
        name: "fk_cbe_id",
      },
      birads_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "all_choice", key: "id" },
        name: "fk_birads_id",
      },
      per_os_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "all_choice", key: "id" },
        name: "fk_per_os_id",
      },
      referral_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "referral", key: "id" },
        name: "fk_referral_id",
      },
      ref_in_choice_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "ref_in_choice", key: "id" },
        name: "fk_ref_in_choice_id",
      },
      ref_out_choice_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "ref_out_choice", key: "id" },
        name: "fk_ref_out_choice_id",
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
        references: {
          model: "all_choice",
          key: "id",
          name: "fk_hbsag_wife",
        },
      },
      vdrl_wife: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: "all_choice",
          key: "id",
          name: "fk_vdrl_wife",
        },
      },
      anti_hiv_wife: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: "all_choice",
          key: "id",
          name: "fk_anti_hiv_wife",
        },
      },
      bl_gr_wife: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: "all_choice",
          key: "id",
          name: "fk_bl_gr_wife",
        },
      },
      rh_wife: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: "all_choice",
          key: "id",
          name: "fk_rh_wife",
        },
      },
      hct_wife: { allowNull: true, type: Sequelize.STRING(30) },
      of_wife: { allowNull: true, type: Sequelize.STRING(30) },
      dcip_wife: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: "all_choice",
          key: "id",
          name: "fk_dcip_wife",
        },
      },
      mcv_wife: { allowNull: true, type: Sequelize.STRING(30) },
      mch_wife: { allowNull: true, type: Sequelize.STRING(30) },
      hb_typing_wife: { allowNull: true, type: Sequelize.STRING(30) },
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
        references: {
          model: "all_choice",
          key: "id",
          name: "fk_hbsag_husband",
        },
      },
      vdrl_husband: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: "all_choice",
          key: "id",
          name: "fK_vdrl_husband",
        },
      },
      anti_hiv_husband: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: "all_choice",
          key: "id",
          name: "fk_anti_hiv_husband",
        },
      },
      bl_gr_husband: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: "all_choice",
          key: "id",
          name: "fk_bl_gr_husband",
        },
      },
      rh_husband: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: "all_choice",
          key: "id",
          name: "fk_rh_husband",
        },
      },
      hct_husband: { allowNull: true, type: Sequelize.STRING(30) },
      of_husband: { allowNull: true, type: Sequelize.STRING(30) },
      dcip_husband: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: "all_choice",
          key: "id",
          name: "fk_dcip_husband",
        },
      },
      mcv_husband: { allowNull: true, type: Sequelize.STRING(30) },
      mch_husband: { allowNull: true, type: Sequelize.STRING(30) },
      hb_typing_husband: { allowNull: true, type: Sequelize.STRING(30) },
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
      para: { type: Sequelize.STRING(20), allowNull: false },
      p: { type: Sequelize.STRING(20), allowNull: false },
      a: { type: Sequelize.STRING(20), allowNull: false },
      last: { type: Sequelize.STRING(30), allowNull: false },
      lmp: { type: Sequelize.DATE, allowNull: false },
      edc: { type: Sequelize.DATE, allowNull: false },
      ga: { type: Sequelize.STRING, allowNull: false },
      ma_detail: { type: Sequelize.STRING, allowNull: true },
      hr_detail: { type: Sequelize.STRING, allowNull: true },
      lab_wife_result_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "lab_wife_result", key: "id" },
        name: "fk_lab_wife_result",
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
      lab_2: { type: Sequelize.DATE, allowNull: false },
      hct: { type: Sequelize.STRING, allowNull: false },
      vdrl_2: { type: Sequelize.STRING, allowNull: false },
      h: { type: Sequelize.STRING, allowNull: false },
      bti_1_date: { type: Sequelize.DATE, allowNull: true },
      bti_2_date: { type: Sequelize.DATE, allowNull: true },
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
        references: { model: "lab_husband_result", key: "id" },
        name: "fk_lab_husband_result",
      },
      pcr_hus_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "all_choice", key: "id" },
        name: "fk_pcr_hus_id",
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
      hn_husband: { type: Sequelize.INTEGER, allowNull: true },
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
        references: { model: "anc", key: "anc_no" },
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
        type: Sequelize.INTEGER,
        references: { model: "wife_choice_value", key: "id" },
      },
      wife_text_value_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "wife_text_value", key: "id" },
      },
      husband_value_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "husband_value", key: "id" },
      },
      round: {
        allowNull: true,
        type: Sequelize.STRING(10),
      },
      gravida: {
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
