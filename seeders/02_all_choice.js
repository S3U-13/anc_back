const AllChoice = require("../models/all_choice"); // model ที่ import มา

async function seed() {
  await AllChoice.bulkCreate([
    {
      choice_type_id: "1",
      choice_name: "เคย",
      flag_status: "a",
    },
    {
      choice_type_id: "1",
      choice_name: "ไม่เคย",
      flag_status: "a",
    },
    {
      choice_type_id: "2",
      choice_name: "ไม่ใช่",
      flag_status: "a",
    },
    {
      choice_type_id: "2",
      choice_name: "ใช่",
      flag_status: "a",
    },
    {
      choice_type_id: "3",
      choice_name: "ตรวจ",
      flag_status: "a",
    },
    {
      choice_type_id: "3",
      choice_name: "ไม่ตรวจ",
      flag_status: "a",
    },
    {
      choice_type_id: "3",
      choice_name: "รอปรึกษา",
      flag_status: "a",
    },
    {
      choice_type_id: "4",
      choice_name: "ไม่ใช่",
      flag_status: "a",
    },
    {
      choice_type_id: "4",
      choice_name: "ใช่",
      flag_status: "a",
    },
    {
      choice_type_id: "5",
      choice_name: "ไม่ใช่",
      flag_status: "a",
    },
    {
      choice_type_id: "5",
      choice_name: "ใช่",
      flag_status: "a",
    },
    {
      choice_type_id: "6",
      choice_name: "สิ้นสุดการตั้งครรภ์",
      flag_status: "a",
    },
    {
      choice_type_id: "6",
      choice_name: "ตั้งครรภ์ต่อ",
      flag_status: "a",
    },
    {
      choice_type_id: "7",
      choice_name: "ฉีดวัคซีน",
      flag_status: "a",
    },
    {
      choice_type_id: "7",
      choice_name: "ไม่ฉีดวัคซีน",
      flag_status: "a",
    },
    {
      choice_type_id: "8",
      choice_name: "กระตุ้นครรภ์นี้",
      flag_status: "a",
    },
    {
      choice_type_id: "8",
      choice_name: "ไม่ได้ฉีดในครรภ์นี้",
      flag_status: "a",
    },
    {
      choice_type_id: "9",
      choice_name: "1",
      flag_status: "a",
    },
    {
      choice_type_id: "9",
      choice_name: "2",
      flag_status: "a",
    },
    {
      choice_type_id: "9",
      choice_name: "ส่งพบโภชนาการ",
      flag_status: "a",
    },
    {
      choice_type_id: "9",
      choice_name: "ส่งตรวจฟัน",
      flag_status: "a",
    },
    {
      choice_type_id: "9",
      choice_name: "ส่งพบนักจิตวิทยา",
      flag_status: "a",
    },
    {
      choice_type_id: "10",
      choice_name: "ปกติ",
      flag_status: "a",
    },
    {
      choice_type_id: "10",
      choice_name: "ไม่ปกติ",
      flag_status: "a",
    },
    {
      choice_type_id: "10",
      choice_name: "ตรวจภายใน",
      flag_status: "c",
    },
    {
      choice_type_id: "10",
      choice_name: "ANC Pap smear",
      flag_status: "a",
    },
    {
      choice_type_id: "11",
      choice_name: "ข้างซ้าย",
      flag_status: "a",
    },
    {
      choice_type_id: "11",
      choice_name: "ข้างขวา",
      flag_status: "a",
    },
    {
      choice_type_id: "11",
      choice_name: "เป็นทั้ง 2 ข้าง",
      flag_status: "a",
    },
    {
      choice_type_id: "12",
      choice_name: "Iodine",
      flag_status: "a",
    },
    {
      choice_type_id: "12",
      choice_name: "ธาตุเหล็ก",
      flag_status: "a",
    },
    {
      choice_type_id: "12",
      choice_name: "Folic",
      flag_status: "a",
    },
    {
      choice_type_id: "13",
      choice_name: "ครบ 6 ครั้ง",
      flag_status: "a",
    },
    {
      choice_type_id: "13",
      choice_name: "ไม่ครบ",
      flag_status: "a",
    },
    {
      choice_type_id: "14",
      choice_name: "น้อยกว่า 12 สัปดาห์",
      flag_status: "a",
    },
    {
      choice_type_id: "14",
      choice_name: "13 สับดาห์ ไปจนถึง 20 สัปดาห์",
      flag_status: "a",
    },
    {
      choice_type_id: "14",
      choice_name: "20 สับดาห์ ไปจนถึง 26 สัปดาห์",
      flag_status: "a",
    },
    {
      choice_type_id: "14",
      choice_name: "26 สับดาห์ ไปจนถึง 32 สัปดาห์",
      flag_status: "a",
    },
    {
      choice_type_id: "14",
      choice_name: "32 สับดาห์ ไปจนถึง 40 สัปดาห์",
      flag_status: "a",
    },
    {
      choice_type_id: "15",
      choice_name: "รับ Refer",
      flag_status: "a",
    },
    {
      choice_type_id: "15",
      choice_name: "ส่งต่อ Refer",
      flag_status: "a",
    },
    {
      choice_type_id: "16",
      choice_name: "ในจังหวัด",
      flag_status: "a",
    },
    {
      choice_type_id: "16",
      choice_name: "ต่างจังหวัด",
      flag_status: "a",
    },
    {
      choice_type_id: "17",
      choice_name: "Negative",
      flag_status: "a",
    },
    {
      choice_type_id: "17",
      choice_name: "Positive",
      flag_status: "a",
    },
    {
      choice_type_id: "18",
      choice_name: "Non-reactive",
      flag_status: "a",
    },
    {
      choice_type_id: "18",
      choice_name: "Reactive",
      flag_status: "a",
    },
    {
      choice_type_id: "19",
      choice_name: "Negative",
      flag_status: "a",
    },
    {
      choice_type_id: "19",
      choice_name: "Positive",
      flag_status: "a",
    },
    {
      choice_type_id: "20",
      choice_name: "A",
      flag_status: "a",
    },
    {
      choice_type_id: "20",
      choice_name: "B",
      flag_status: "a",
    },
    {
      choice_type_id: "20",
      choice_name: "AB",
      flag_status: "a",
    },
    {
      choice_type_id: "20",
      choice_name: "O",
      flag_status: "a",
    },
    {
      choice_type_id: "21",
      choice_name: "Positive",
      flag_status: "a",
    },
    {
      choice_type_id: "21",
      choice_name: "Negative",
      flag_status: "a",
    },
    {
      choice_type_id: "22",
      choice_name: "Negative",
      flag_status: "a",
    },
    {
      choice_type_id: "22",
      choice_name: "Positive",
      flag_status: "a",
    },
    {
      choice_type_id: "23",
      choice_name: "Influenza",
      flag_status: "a",
    },
    {
      choice_type_id: "23",
      choice_name: "ap",
      flag_status: "a",
    },
    {
      choice_type_id: "23",
      choice_name: "t-dap",
      flag_status: "a",
    },
    {
      choice_type_id: "24",
      choice_name: "LMP",
      flag_status: "a",
    },
    {
      choice_type_id: "24",
      choice_name: "U/S",
      flag_status: "a",
    },
    {
      choice_type_id: "12",
      choice_name: "Amoxicillin",
      flag_status: "a",
    },
    {
      choice_type_id: "12",
      choice_name: "Utrogestan",
      flag_status: "a",
    },
    {
      choice_type_id: "25",
      choice_name: "จำได้",
      flag_status: "a",
    },
    {
      choice_type_id: "25",
      choice_name: "จำไม่ได้",
      flag_status: "a",
    },
    {
      choice_type_id: "15",
      choice_name: "อื่นๆ",
      flag_status: "a",
    },
  ]);

  console.log(
    "✅ AllChoiceType seeded with all_choice_type and AllChoice seeded with all_choice"
  );
}

seed(); // ไม่ต้องส่ง parameter
