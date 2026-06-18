function validateRequiredFields(row) {
  const required = [
    "order_id",
    "customer_id",
    "full_name",
    "country",
    "phone_number",
  ];

  for (const field of required) {
    if (!row[field] || String(row[field]).trim() === "") {
      return {
        valid: false,
        reason: `${field} is missing`,
      };
    }
  }

  return {
    valid: true,
    reason: "Valid",
  };
}

module.exports = validateRequiredFields;