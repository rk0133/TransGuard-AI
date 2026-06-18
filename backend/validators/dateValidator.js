function validateDate(date) {
  if (!date) {
    return {
      status: "INVALID",
      error: "Date is missing",
    };
  }

  // Expected format: DD-MM-YYYY
  const regex = /^(\d{2})-(\d{2})-(\d{4})$/;

  if (!regex.test(date)) {
    return {
      status: "INVALID",
      error: "Invalid date format (DD-MM-YYYY expected)",
    };
  }

  const [, dd, mm, yyyy] = date.match(regex);

  const d = parseInt(dd, 10);
  const m = parseInt(mm, 10);
  const y = parseInt(yyyy, 10);

  const obj = new Date(y, m - 1, d);

  const valid =
    obj.getFullYear() === y &&
    obj.getMonth() === m - 1 &&
    obj.getDate() === d;

  if (!valid) {
    return {
      status: "INVALID",
      error: "Invalid calendar date",
    };
  }

  return {
    status: "VALID",
    error: "",
  };
}

module.exports = validateDate;