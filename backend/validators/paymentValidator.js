function validatePayment(mode) {
  const allowed = [
    "UPI",
    "Credit Card",
    "Debit Card",
    "Cash",
    "Net Banking",
  ];

  if (!allowed.includes(mode)) {
    return {
      status: "INVALID",
      error: "Invalid payment mode",
    };
  }

  return {
    status: "VALID",
    error: "",
  };
}

module.exports = validatePayment;