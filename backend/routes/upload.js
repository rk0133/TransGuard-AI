const express = require("express");
const multer = require("multer");
const fs = require("fs");
const Papa = require("papaparse");
const { createObjectCsvWriter } = require("csv-writer");
const splitCSV = require("../utils/csvSplitter");

const validatePhone = require("../validators/phoneValidator");
const validateDate = require("../validators/dateValidator");
const validatePayment = require("../validators/paymentValidator");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    // Read uploaded CSV
    const csvText = fs.readFileSync(req.file.path, "utf8");

    // Parse CSV
    const parsed = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
    });

    // Validate every row
    const validatedData = parsed.data.map((row) => {
      const country = row.country || row.Country || "";
      const phone = row.phone_number || row.phone || "";
      const signupDate = row.signup_date || row.date || "";
      const paymentMode = row.payment_mode || row.payment || "";

      const errors = [];

      // Required fields
      if (!row.order_id) errors.push("Order ID is missing");
      if (!row.product_id) errors.push("Product ID is missing");
      if (!country) errors.push("Country is missing");
      if (!phone) errors.push("Phone number is missing");
      if (!paymentMode) errors.push("Payment mode is missing");
      if (!signupDate) errors.push("Signup date is missing");

      // Phone validation
      const phoneResult = validatePhone(phone, country);
      if (phoneResult.error) {
        errors.push(phoneResult.error);
      }

      // Date validation
      const dateResult = validateDate(signupDate);
      if (dateResult.error) {
        errors.push(dateResult.error);
      }

      // Payment validation
      const paymentResult = validatePayment(paymentMode);
      if (paymentResult.error) {
        errors.push(paymentResult.error);
      }

      return {
        ...row,
        status: errors.length === 0 ? "VALID" : "INVALID",
        errors: errors.join(" | "),
      };
    });

    // Count valid/invalid rows
    const validCount = validatedData.filter(
      (row) => row.status === "VALID"
    ).length;

    const invalidCount = validatedData.length - validCount;

    // Create output folder if needed
    if (!fs.existsSync("output")) {
      fs.mkdirSync("output");
    }

    // Save validated CSV
    const csvWriter = createObjectCsvWriter({
      path: "output/validated_output.csv",
      header: Object.keys(validatedData[0]).map((key) => ({
        id: key,
        title: key,
      })),
    });

    await csvWriter.writeRecords(validatedData);
    // Split large CSV into chunks (1000 rows per file)
const chunkFiles = splitCSV(validatedData, 1000);

    // Delete temporary uploaded file
    fs.unlinkSync(req.file.path);

    // Send response
    res.json({
  success: true,
  message: "Validation completed successfully!",
  totalRows: validatedData.length,
  validRows: validCount,
  invalidRows: invalidCount,

  // Show first 20 rows in UI
  preview: validatedData.slice(0, 20),

  // Download full validated CSV
 downloadUrl: "https://transguard-ai-backend.onrender.com/output/validated_output.csv",

  // Download chunk files
  chunks: chunkFiles,
});
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

module.exports = router;