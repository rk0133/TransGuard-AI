const fs = require("fs");
const path = require("path");
const Papa = require("papaparse");

function splitCSV(rows, chunkSize = 1000) {
  const outputDir = path.join(__dirname, "../output/chunks");

  // Create folder if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Delete old chunk files
  fs.readdirSync(outputDir).forEach((file) => {
    fs.unlinkSync(path.join(outputDir, file));
  });

  const files = [];

  for (let i = 0; i < rows.length; i += chunkSize) {
    const chunk = rows.slice(i, i + chunkSize);

    const csv = Papa.unparse(chunk);

    const fileName = `chunk_${Math.floor(i / chunkSize) + 1}.csv`;
    const filePath = path.join(outputDir, fileName);

    fs.writeFileSync(filePath, csv);

    files.push({
      name: fileName,
     url: `https://transguard-ai-backend.onrender.com/output/chunks/${fileName}`,
    });
  }

  return files;
}

module.exports = splitCSV;