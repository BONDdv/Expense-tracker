const express = require("express");
const { getSummary, downloadSummaryExcel,search } = require("../controllers/summaryController");
const {protect} = require("../middleware/authMiddleware");

const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Summary
 *   description: API for retrieving financial summary
 */

/**
 * @swagger
 * /api/summary/getSummary:
 *   get:
 *     summary: Get financial summary
 *     tags: [Summary]
 *     description: |
 *       Retrieve the total income, total expenses, and balance for the authenticated user.  
 *       สามารถกรองข้อมูลตามช่วงวันที่ โดยใช้รูปแบบ `YYYY-MM-DD` (ปี-เดือน-วัน)
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         example: "2024-01-01"
 *         description: กรองข้อมูลตั้งแต่วันที่นี้ (รูปแบบ `YYYY-MM-DD`, ตัวเลือก)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         example: "2024-12-31"
 *         description: กรองข้อมูลถึงวันที่นี้ (รูปแบบ `YYYY-MM-DD`, ตัวเลือก)
 *     responses:
 *       200:
 *         description: Summary data retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               totalIncome: 50000
 *               totalExpense: 20000
 *               balance: 30000
 *               startDate: "2024-01-01"
 *               endDate: "2024-12-31"
 *       401:
 *         description: Not authorized (Invalid or missing token)
 *       500:
 *         description: Server error
 */
router.get("/getSummary", protect, getSummary);

/**
 * @swagger
 * /api/summary/search:
 *   get:
 *     summary: Search income and expense records
 *     tags: [Summary]
 *     description: |
 *       ค้นหารายรับและรายจ่ายของผู้ใช้ สามารถกรองข้อมูลตามวันที่ และเลือกเฉพาะรายรับ (`income`) หรือรายจ่าย (`expense`) ได้  
 *       **รูปแบบวันที่:** `YYYY-MM-DD`
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         example: "2024-05-01"
 *         description: เริ่มค้นหาตั้งแต่วันที่นี้ (ตัวเลือก)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         example: "2024-05-31"
 *         description: ค้นหาจนถึงวันที่นี้ (ตัวเลือก)
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [income, expense]
 *         example: "income"
 *         description: |
 *           ระบุประเภทข้อมูลที่ต้องการค้นหา:
 *           - `"income"` สำหรับรายรับ
 *           - `"expense"` สำหรับรายจ่าย
 *           - ไม่ใส่ค่า จะค้นหาทั้งหมด
 *     responses:
 *       200:
 *         description: ค้นหาสำเร็จ
 *         content:
 *           application/json:
 *             example:
 *               incomeRecords:
 *                 - _id: "65f1b6d4a1e88f001c6b3e3a"
 *                   source: "Salary"
 *                   amount: 50000
 *                   date: "2024-05-15"
 *               expenseRecords:
 *                 - _id: "65f1b6e2b3d44a002c7b3f1b"
 *                   source: "Rent"
 *                   amount: 15000
 *                   date: "2024-05-20"
 *       400:
 *         description: Invalid type parameter
 *       401:
 *         description: Not authorized (Invalid or missing token)
 *       500:
 *         description: Server error
 */
router.get("/search", protect, search);

/**
 * @swagger
 * /api/summary/downloadSummaryExcel:
 *   get:
 *     summary: Download financial summary as Excel
 *     tags: [Summary]
 *     description: |
 *       ดาวน์โหลดสรุปการเงินเป็นไฟล์ Excel (`.xlsx`)  
 *       **รูปแบบวันที่:** `YYYY-MM-DD`
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         example: "2024-06-01"
 *         description: กรองข้อมูลตั้งแต่วันที่นี้ (ตัวเลือก)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         example: "2024-06-30"
 *         description: กรองข้อมูลถึงวันที่นี้ (ตัวเลือก)
 *     responses:
 *       200:
 *         description: ไฟล์ Excel ถูกสร้างสำเร็จ
 *         content:
 *           application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:
 *             schema:
 *               type: string
 *               format: binary
 *       401:
 *         description: Not authorized (Invalid or missing token)
 *       500:
 *         description: Server error
 */
router.get("/downloadSummaryExcel", protect, downloadSummaryExcel);


module.exports = router;