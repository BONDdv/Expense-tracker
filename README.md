# Financial Tracker API

## 📌 Overview
Financial Tracker API เป็น RESTful API สำหรับจัดการรายรับและรายจ่ายของผู้ใช้ รองรับการเพิ่ม, ลบ, ดูข้อมูลสรุป และดาวน์โหลดไฟล์ Excel ได้  

## 🚀 Features
- ✅ **Authentication** - รองรับ JWT Authentication  
- ✅ **Expense Management** - เพิ่ม, ลบ, ดูรายการรายจ่าย  
- ✅ **Summary Report** - ดูสรุปการเงินแบบรวม  
- ✅ **Excel Export** - ดาวน์โหลดข้อมูลเป็น `.xlsx`  
- ✅ **Filtering & Search** - ค้นหาและกรองข้อมูลตามวันที่  

---

## 🛠️ Installation & Setup
### 1️⃣ Clone Repository  
```bash
# git clone https://github.com/your-repo/financial-tracker-api.git
# cd financial-tracker-api

### 2️⃣ Install Dependencies
```bash
npm install


### 3️⃣ Create .env file
สร้างไฟล์ .env และกำหนดค่าต่างๆ เช่น
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

### 4️⃣ Run Server
```bash
npm start

หรือใช้ nodemon
```bash
npm run dev


🔗 API Endpoints
🔑 Authentication
Method	Endpoint	Description	Auth
POST	/api/auth/register	สมัครสมาชิก	❌
POST	/api/auth/login	เข้าสู่ระบบ	❌
💰 Expense Management
Method	Endpoint	Description	Auth
POST	/api/expense/addExpense	เพิ่มรายจ่าย	✅
GET	/api/expense/getAllExpense	ดูรายการรายจ่าย	✅
DELETE	/api/expense/:id	ลบรายการรายจ่าย	✅
GET	/api/expense/downloadExpenseExcel	ดาวน์โหลดไฟล์ Excel	✅
📊 Summary Report
Method	Endpoint	Description	Auth
GET	/api/summary/getSummary?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD	ดูสรุปการเงิน	✅
GET	/api/summary/search?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD&type=income/expense	ค้นหารายการ	✅
GET	/api/summary/downloadSummaryExcel?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD	ดาวน์โหลดไฟล์ Excel	✅
🔐 Authentication
API ใช้ JWT Token สำหรับการยืนยันตัวตน

ต้องแนบ Authorization: Bearer <token> ในทุก request ที่ต้องการ auth
Token จะถูกสร้างหลังจาก Login และหมดอายุเมื่อครบกำหนด
🛠️ Tech Stack
Backend: Node.js, Express.js
Database: MongoDB, Mongoose
Authentication: JWT
Excel Export: ExcelJS
