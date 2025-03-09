const express = require("express");
const {
    addExpense,
    getAllExpense,
    deleteExpense,
    downloadExpenseExcel
} = require("../controllers/expenseController")
const {protect} = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Expense
 *   description: API for managing expense records
 */

/**
 * @swagger
 * /api/expense/addExpense:
 *   post:
 *     summary: Add a new expense record
 *     tags: [Expense]
 *     description: Add a new expense entry for the authenticated user.
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
 *                 description: The source or reason for the expense
 *               amount:
 *                 type: number
 *                 description: The amount of the expense
 *               date:
 *                 type: string
 *                 format: date
 *                 description: The date of the expense
 *     responses:
 *       200:
 *         description: Expense record added successfully
 *       400:
 *         description: Bad request (Missing fields)
 *       401:
 *         description: Not authorized (Invalid or missing token)
 *       500:
 *         description: Server error
 */
router.post("/addExpense", protect, addExpense);

/**
 * @swagger
 * /api/expense/getAllExpense:
 *   get:
 *     summary: Get all expense records
 *     tags: [Expense]
 *     description: Retrieve all expense records for the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of expense records retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The unique ID of the expense record
 *                   source:
 *                     type: string
 *                     description: The source of the expense
 *                   amount:
 *                     type: number
 *                     description: The amount of the expense
 *                   date:
 *                     type: string
 *                     format: date
 *                     description: The date of the expense
 *       401:
 *         description: Not authorized (Invalid or missing token)
 *       500:
 *         description: Server error
 */
router.get("/getAllExpense", protect, getAllExpense);

/**
 * @swagger
 * /api/expense/downloadExpenseExcel:
 *   get:
 *     summary: Download expense records as Excel
 *     tags: [Expense]
 *     description: Download all expense records in an Excel (.xlsx) format for the authenticated user.
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
router.get("/downloadExpenseExcel", protect, downloadExpenseExcel);

/**
 * @swagger
 * /api/expense/{id}:
 *   delete:
 *     summary: Delete an expense record
 *     tags: [Expense]
 *     description: Delete an expense record by ID for the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the expense record to delete
 *     responses:
 *       200:
 *         description: Expense record deleted successfully
 *       401:
 *         description: Not authorized (Invalid or missing token)
 *       404:
 *         description: Expense record not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", protect, deleteExpense);


module.exports = router;