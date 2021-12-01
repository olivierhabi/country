const EMAIL_REGEX_PATTERN = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

export const Validations = {
  searchInput: {
    required: { value: true, message: "Enter search input" },
    minLength: {
      value: 1,
      message: "You must emter atleast one character",
    },
  },
  password: {
    required: { value: true, message: "Enter a password" },
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters long",
    },
  },
  passwordLogin: {
    required: { value: true, message: "Enter a password" },
    minLength: {
      value: 1,
      message: "Password must be not be empty",
    },
  },
  emailAddress: {
    required: { value: true, message: "Enter email address" },
    pattern: {
      value: EMAIL_REGEX_PATTERN,
      message: "Must be an email",
    },
  },
};
