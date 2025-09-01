# Expense Tracker API

## 📌 Overview
Expense Tracker API เป็น RESTful API สำหรับจัดการรายรับและรายจ่ายของผู้ใช้ รองรับการเพิ่ม, ลบ, ดูข้อมูลสรุป และดาวน์โหลดไฟล์ Excel ได้ โดยผู้ใช้ต้อง register/login ก่อนถึงจะใช้งานได้

## 🚀 Features
- ✅ **Authentication** - รองรับ JWT Authentication Login/register 
- ✅ **Expense Management** - เพิ่ม, ลบ, ดูรายการรายจ่าย  
- ✅ **Income Management** - เพิ่ม, ลบ, ดูรายการรายรับ  
- ✅ **Summary Report** - ดูสรุปการเงินแบบรวม  
- ✅ **Excel Export** - ดาวน์โหลดข้อมูลเป็น `.xlsx`  
- ✅ **Filtering & Search** - ค้นหาและกรองข้อมูลตามวันที่และค้นหาตามประเภทของ income หรือ expense ได้  

---

## 🛠️ Installation & Setup
### 1️⃣ Clone Repository  
```bash
git clone https://github.com/BONDdv/Expense-tracker
cd backend
```
### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Create .env file
สร้างไฟล์ .env และกำหนดค่าต่างๆ เช่น
```bash
PORT=8001 //หรือตามกำหนด
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```
### 4️⃣ Run Server
```bash
npm start
```
หรือใช้ nodemon
```bash
npm run dev
```

---

### 🔗 API Endpoints
## 🔑 Authentication
Method | Endpoint | Description | Auth
----- | ----- | ----- | ----- |
POST | /api/auth/register | สมัครสมาชิก | ✅️
POST | /api/auth/login | เข้าสู่ระบบ | ✅️
GET | /api/auth/getUser | ดูรายละเอียดบัญชีผู้ใช้ | ✅️

## 💸 Expense Management
Method| Endpoint | Description | Auth
----- | ----- | ----- | ----- |
POST | /api/expense/addExpense | เพิ่มรายจ่าย | ✅
GET| /api/expense/getAllExpense | ดูรายการรายจ่าย | ✅
DELETE | /api/expense/:id | ลบรายการรายจ่าย | ✅
GET | /api/expense/downloadExpenseExcel | ดาวน์โหลดไฟล์ Excel | ✅

## 💰 Income Management
Method| Endpoint | Description | Auth
----- | ----- | ----- | ----- |
POST | /api/income/addIncome | เพิ่มรายรับ | ✅
GET| /api/income/getAllIncome | ดูรายการรายรับ | ✅
DELETE | /api/income/:id | ลบรายการรายรับ | ✅
GET | /api/income/downloadIncomeExcel | ดาวน์โหลดไฟล์ Excel | ✅

## 📊 Summary Report
Method | Endpoint | Description | Auth
----- | ----- | ----- | ----- |
GET | /api/summary/getSummary?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD | ดูสรุปการเงิน | ✅
GET | /api/summary/search?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD&type=income/expense | ค้นหารายการ | ✅
GET | /api/summary/downloadSummaryExcel?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD | ดาวน์โหลดไฟล์ Excel | ✅

---

### 🔐 Authentication
## API ใช้ JWT Token สำหรับการยืนยันตัวตน

* ต้องแนบ Authorization: Bearer <token> ในทุก request ที่ต้องการ auth
* Token จะถูกสร้างหลังจาก Login และหมดอายุเมื่อครบกำหนด ในโค้ดกำหนดไว้ 1 hr.

---
### 🧪 Swagger API Documentation

API นี้รองรับการทดสอบผ่าน Swagger UI ที่จะช่วยให้คุณสามารถเรียกใช้งานและทดสอบ endpoints ต่าง ๆ ได้โดยตรงจากเบราว์เซอร์

วิธีการเข้าถึง Swagger UI:

เมื่อคุณรันเซิร์ฟเวอร์แล้ว (ใช้คำสั่ง npm start หรือ npm run dev), ไปที่ URL ต่อไปนี้ในเบราว์เซอร์ของคุณ:

```bash
http://localhost:`${PORT}`/api-docs // PORT จะเป็นไปตามที่ตั้งค่าใน .env
```
คุณจะเห็น Swagger UI ที่ให้คุณสามารถทดสอบ API endpoints ได้โดยตรง


---

### 🛠️ Tech Stack
* Backend: Node.js, Express.js
* Database: MongoDB, Mongoose
* Authentication: JWT
* API Documentation : swagger
* Excel Export: exceljs