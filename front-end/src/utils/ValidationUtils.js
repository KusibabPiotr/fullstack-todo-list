export const validateField = (fieldName, value) => {
  switch (fieldName) {
    case "title":
      if (!value) {
        return "Title is required";
      }
      return "";
    case "content":
      if (!value) {
        return "Content is required";
      }
      return "";
    case "reportTo":
      if (!value) {
        return "Report to is required";
      }
      return "";
    case "uplineEmail":
      if (!value) {
        return "Email is required";
      } else if (!isValidEmail(value)) {
        return "Invalid email address";
      }
      return "";
    case "uplineMobile":
      if (!value) {
        return "Mobile number is required";
      } else if (!isValidPhoneNumber(value)) {
        return "Invalid mobile number";
      }
      return "";
    default:
      return "";
  }
};

export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhoneNumber = (phoneNumber) => {
  const phoneNumberRegex = /^\d{9}$/;
  return phoneNumberRegex.test(phoneNumber);
};
