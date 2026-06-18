function validatePhone(phone, country) {
  phone = String(phone || "").trim();

  if (country === "India") {
    if (/^\d{10}$/.test(phone)) {
      return { status: "VALID", error: "" };
    }
    return {
      status: "INVALID",
      error: "India phone number must have exactly 10 digits",
    };
  }

  if (country === "Singapore") {
    if (/^\d{8}$/.test(phone)) {
      return { status: "VALID", error: "" };
    }
    return {
      status: "INVALID",
      error: "Singapore phone number must have exactly 8 digits",
    };
  }

  return {
    status: "INVALID",
    error: "Unsupported country",
  };
}

module.exports = validatePhone;