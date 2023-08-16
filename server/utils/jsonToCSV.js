const { randomUUID } = require("crypto");
const fs = require("fs");
const path = require("path");

function jsonToCSV(data) {
    const keys = Object.keys(data[0]);
    const csvArray = [];
  
    const csvHeader = Object.keys(data[0]).join(',') + '\n';
    const csvRows = data.map(item => Object.values(item).join(','));
    const csvContent = csvHeader + csvRows.join('\n');

    const directory = `./server/uploads`;
    const filePath = (path.join(directory, `${randomUUID()}.csv`));

    fs.writeFile(filePath, csvContent, 'utf8', err => {
      if (err) {
        console.error('Error writing to file:', err);
      } else {
        console.log('CSV file written successfully');
      }
    });
    
    return filePath;
}

module.exports = { jsonToCSV }