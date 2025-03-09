const express = require("express");
const {
    addIncome,
    getAllIncome,
    deleteIncome,
    downloadIncomeExcel
} = require("../controllers/incomeController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();



/**
 * @swagger
 * tags:
 *   name: Income
 *   description: API for managing income records
 */

/**
 * @swagger
 * /api/income/addIncome:
 *   post:
 *     summary: Add a new income record
 *     tags: [Income]
 *     description: Add a new income entry for the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               source:
 *                 type: string
 *                 description: The source of the income
 *               amount:
 *                 type: number
 *                 description: The amount of income
 *               date:
 *                 type: string
 *                 format: date
 *                 description: The date of income
 *     responses:
 *       200:
 *         description: Income record added successfully
 *       400:
 *         description: Bad request (Missing fields)
 *       401:
 *         description: Not authorized (Invalid or missing token)
 *       500:
 *         description: Server error
 */
router.post("/addIncome", protect, addIncome);

/**
 * @swagger
 * /api/income/getIncome:
 *   get:
 *     summary: Get all income records
 *     tags: [Income]
 *     description: Retrieve all income records for the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of income records retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The unique ID of the income record
 *                   source:
 *                     type: string
 *                     description: The source of the income
 *                   amount:
 *                     type: number
 *                     description: The amount of income
 *                   date:
 *                     type: string
 *                     format: date
 *                     description: The date of income
 *       401:
 *         description: Not authorized (Invalid or missing token)
 *       500:
 *         description: Server error
 */
router.get("/getIncome", protect, getAllIncome);

/**
 * @swagger
 * /api/income/downloadExcelIncome:
 *   get:
 *     summary: Download income records as Excel
 *     tags: [Income]
 *     description: Download all income records in an Excel (.xlsx) format for the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Excel file generated successfully
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
router.get("/downloadExcelIncome", protect, downloadIncomeExcel);

/**
 * @swagger
 * /api/income/{id}:
 *   delete:
 *     summary: Delete an income record
 *     tags: [Income]
 *     description: Delete an income record by ID for the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the income record to delete
 *     responses:
 *       200:
 *         description: Income record deleted successfully
 *       401:
 *         description: Not authorized (Invalid or missing token)
 *       404:
 *         description: Income record not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", protect, deleteIncome);


module.exports = router;