Secret Santa App

📌 Project Overview

The Secret Santa App automates the assignment of Secret Santa pairings among employees. Employees are assigned a random colleague (following specific rules) to whom they will anonymously give a gift.

✨ Features

Upload CSV files containing employee data.

Prevents employees from being assigned to themselves.

Avoids repeating last year’s Secret Santa assignments.

Generates and downloads the Secret Santa assignments as a CSV file.

Built with React.js for the frontend and Node.js (Express.js) for the backend.

🚀 Tech Stack

Frontend:

React.js

Axios

HTML/CSS

Backend:

Node.js (Express.js)

Multer (for file uploads)

csv-parser & json2csv (for handling CSV files)

fs (for file operations)

📂 Project Structure

Secret-Santa-App/
│── backend/
│   ├── routes/
│   │   ├── uploadRoutes.js
│   ├── services/
│   │   ├── AssignmentService.js
│   ├── utils/
│   │   ├── CSVService.js
│   ├── server.js
│── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── SecretSanta.js
│   │   ├── App.js
│   ├── public/
│── uploads/ (temporary file storage)
│── output/ (generated Secret Santa CSVs)
│── README.md
│── package.json (frontend & backend)

⚙️ Installation & Setup

1️⃣ Clone the Repository

git clone https://github.com/Technical96/secert-santa.git
cd Secret-Santa-App

2️⃣ Install Backend Dependencies

cd backend
npm install

3️⃣ Install Frontend Dependencies

cd ../frontend
npm install

▶️ Running the Application

Start Backend

cd backend
npm start

Server runs at http://localhost:5000

Start Frontend

cd frontend
npm start

Frontend runs at http://localhost:3000

📂 CSV Input Format

Upload a CSV file with the following format:

Employee_Name,Employee_EmailID
John Doe,john.doe@example.com
Jane Smith,jane.smith@example.com

📂 Previous Assignments CSV (Optional)

Employee_Name,Employee_EmailID,Secret_Child_Name,Secret_Child_EmailID
John Doe,john.doe@example.com,Jane Smith,jane.smith@example.com

📤 API Endpoints

Upload CSV Files

POST /upload

Request:

employeeFile (CSV file)

previousAssignmentsFile (Optional CSV file)

Response:

{
  "message": "CSV file generated successfully",
  "filePath": "output/secret_santa_results.csv",
  "assignedPairs": [
    {
      "Employee_Name": "John Doe",
      "Employee_EmailID": "john.doe@example.com",
      "Secret_Child_Name": "Jane Smith",
      "Secret_Child_EmailID": "jane.smith@example.com"
    }
  ]
}

🛠 Error Handling

Invalid CSV format: Returns 400 Bad Request.

File not found: Returns 404 Not Found.

Server errors: Returns 500 Internal Server Error.


