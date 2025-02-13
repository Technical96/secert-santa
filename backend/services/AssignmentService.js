const { parseCSV, writeCSV } = require('../utils/CSVService');
const fs = require('fs');

class AssignmentService {
  static assignSecretSanta(employees, previousAssignments) {
    let shuffled = [...employees];
    let attempts = 0;
    let maxAttempts = 100;

    while (attempts < maxAttempts) {
      shuffled.sort(() => Math.random() - 0.5);
      let valid = true;

      for (let i = 0; i < employees.length; i++) {
        if (
          employees[i].Employee_EmailID === shuffled[i].Employee_EmailID ||
          (previousAssignments[employees[i].Employee_EmailID] &&
            previousAssignments[employees[i].Employee_EmailID] === shuffled[i].Employee_EmailID)
        ) {
          valid = false;
          break;
        }
      }
      if (valid) break;
      attempts++;
    }

    if (attempts === maxAttempts) {
      throw new Error('Failed to generate a valid Secret Santa assignment');
    }

    return employees.map((employee, index) => ({
      Employee_Name: employee.Employee_Name,
      Employee_EmailID: employee.Employee_EmailID,
      Secret_Child_Name: shuffled[index].Employee_Name,
      Secret_Child_EmailID: shuffled[index].Employee_EmailID,
    }));
  }

  static async processFiles(files) {
    const employeeResults = await parseCSV(files.employeeFile[0].path);
    const previousAssignments = files.previousAssignmentsFile
      ? await parseCSV(files.previousAssignmentsFile[0].path, true)
      : {};
    
    fs.unlinkSync(files.employeeFile[0].path);
    if (files.previousAssignmentsFile) fs.unlinkSync(files.previousAssignmentsFile[0].path);
    
    const assignedPairs = this.assignSecretSanta(employeeResults, previousAssignments);
    const outputPath = 'output/secret_santa_results.csv';
    writeCSV(outputPath, assignedPairs);
    
    return { message: 'CSV file generated successfully', filePath: outputPath, assignedPairs };
  }
}

module.exports = AssignmentService;