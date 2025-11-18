const AllChoice = require("../models/all_choice"); // model ที่ import มา

async function seed() {
  await AllChoice.bulkCreate([
    {
      choice_type_id: "1",
      choice_name: "เคย",
    },
    {
      choice_type_id: "1",
      choice_name: "ไม่เคย",
    },
    {
      choice_type_id: "2",
      choice_name: "ไม่ใช่",
    },
    {
      choice_type_id: "2",
      choice_name: "ใช่",
    },
    {
      choice_type_id: "3",
      choice_name: "ตรวจ",
    },
    {
      choice_type_id: "3",
      choice_name: "ไม่ตรวจ",
    },
    {
      choice_type_id: "3",
      choice_name: "รอปรึกษา",
    },
    {
      choice_type_id: "4",
      choice_name: "ไม่ใช่",
    },
    {
      choice_type_id: "4",
      choice_name: "ใช่",
    },
    {
      choice_type_id: "5",
      choice_name: "ไม่ใช่",
    },
    {
      choice_type_id: "5",
      choice_name: "ใช่",
    },
    {
      choice_type_id: "6",
      choice_name: "สิ้นสุดการตั้งครรภ์",
    },
    {
      choice_type_id: "6",
      choice_name: "ตั้งครรภ์ต่อ",
    },
    {
      choice_type_id: "7",
      choice_name: "ฉีดวัคซีน",
    },
    {
      choice_type_id: "7",
      choice_name: "ไม่ฉีดวัคซีน",
    },
    {
      choice_type_id: "8",
      choice_name: "กระตุ้นครรภ์นี้",
    },
    {
      choice_type_id: "8",
      choice_name: "ไม่ได้ฉีดในครรภ์นี้",
    },
    {
      choice_type_id: "9",
      choice_name: "1",
    },
    {
      choice_type_id: "9",
      choice_name: "2",
    },
    {
      choice_type_id: "9",
      choice_name: "ส่งพบโภชนาการ",
    },
    {
      choice_type_id: "9",
      choice_name: "ส่งตรวจฟัน",
    },
    {
      choice_type_id: "9",
      choice_name: "ส่งพบนักจิตวิทยา",
    },
    {
      choice_type_id: "10",
      choice_name: "ปกติ",
    },
    {
      choice_type_id: "10",
      choice_name: "ไม่ปกติ",
    },
    {
      choice_type_id: "10",
      choice_name: "ตรวจภายใน",
    },
    {
      choice_type_id: "10",
      choice_name: "ANC Pap smear",
    },
    {
      choice_type_id: "11",
      choice_name: "ข้างซ้าย",
    },
    {
      choice_type_id: "11",
      choice_name: "ข้างขวา",
    },
    {
      choice_type_id: "11",
      choice_name: "เป็นทั้ง 2 ข้าง",
    },
    {
      choice_type_id: "12",
      choice_name: "Iodine",
    },
    {
      choice_type_id: "12",
      choice_name: "ธาตุเหล็ก",
    },
    {
      choice_type_id: "12",
      choice_name: "Folic",
    },
    {
      choice_type_id: "13",
      choice_name: "ครบ 6 ครั้ง",
    },
    {
      choice_type_id: "13",
      choice_name: "ไม่ครบ",
    },
    {
      choice_type_id: "14",
      choice_name: "น้อยกว่า 12 สัปดาห์",
    },
    {
      choice_type_id: "14",
      choice_name: "13 สับดาห์ ไปจนถึง 20 สัปดาห์",
    },
    {
      choice_type_id: "14",
      choice_name: "20 สับดาห์ ไปจนถึง 26 สัปดาห์",
    },
    {
      choice_type_id: "14",
      choice_name: "26 สับดาห์ ไปจนถึง 32 สัปดาห์",
    },
    {
      choice_type_id: "14",
      choice_name: "32 สับดาห์ ไปจนถึง 40 สัปดาห์",
    },
    {
      choice_type_id: "15",
      choice_name: "รับ Refer",
    },
    {
      choice_type_id: "15",
      choice_name: "ส่งต่อ Refer",
    },
    {
      choice_type_id: "16",
      choice_name: "ในจังหวัด",
    },
    {
      choice_type_id: "16",
      choice_name: "ต่างจังหวัด",
    },
    {
      choice_type_id: "17",
      choice_name: "Negative",
    },
    {
      choice_type_id: "17",
      choice_name: "Positive",
    },
    {
      choice_type_id: "18",
      choice_name: "Non-reactive",
    },
    {
      choice_type_id: "18",
      choice_name: "Reactive",
    },
    {
      choice_type_id: "19",
      choice_name: "Negative",
    },
    {
      choice_type_id: "19",
      choice_name: "Positive",
    },
    {
      choice_type_id: "20",
      choice_name: "A",
    },
    {
      choice_type_id: "20",
      choice_name: "B",
    },
    {
      choice_type_id: "20",
      choice_name: "AB",
    },
    {
      choice_type_id: "20",
      choice_name: "O",
    },
    {
      choice_type_id: "21",
      choice_name: "Positive",
    },
    {
      choice_type_id: "21",
      choice_name: "Negative",
    },
    {
      choice_type_id: "22",
      choice_name: "Negative",
    },
    {
      choice_type_id: "22",
      choice_name: "Positive",
    },
    {
      choice_type_id: "23",
      choice_name: "Influenza",
    },
    {
      choice_type_id: "23",
      choice_name: "ap",
    },
    {
      choice_type_id: "23",
      choice_name: "t-dap",
    },
  ]);

  console.log(
    "✅ AllChoiceType seeded with all_choice_type and AllChoice seeded with all_choice"
  );
}

seed(); // ไม่ต้องส่ง parameter
