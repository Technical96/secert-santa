const csv = require('csv-parser');
const fs = require('fs');
const { Parser } = require('json2csv');

async function parseCSV(filePath, isPrevious = false) {
  return new Promise((resolve, reject) => {
    const results = isPrevious ? {} : [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        if (isPrevious) {
          results[data.Employee_EmailID] = data.Secret_Child_EmailID;
        } else {
          results.push(data);
        }
      })
      .on('end', () => resolve(results))
      .on('error', (err) => reject(err));
  });
}

function writeCSV(filePath, data) {
    const fields = ['Employee_Name', 'Employee_EmailID', 'Secret_Child_Name', 'Secret_Child_EmailID'];
    const parser = new Parser({ fields });
    const csvOutput = parser.parse(data);
  
    // Ensure the 'output' directory exists
    const dir = filePath.substring(0, filePath.lastIndexOf('/'));
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true }); // Create directory if missing
    }
  
    fs.writeFileSync(filePath, csvOutput);
  }

module.exports = { parseCSV, writeCSV };