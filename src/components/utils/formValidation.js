const EMAIL_REGEX_PATTERN = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

export const Validations = {
  searchInput: {
    required: { value: true, message: "Enter search input" },
    minLength: {
      value: 1,
      message: "You must emter atleast one character",
    },
  },
  country: {
    required: { value: true, message: "Select your country" },
    minLength: {
      value: 3,
      message: "You must emter atleast 3 character to choose your country",
    },
  },
  password: {
    required: { value: true, message: "Enter a password" },
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters long",
    },
  },
  firstName: {
    required: { value: true, message: "Enter a First Name" },
    minLength: {
      value: 3,
      message: "First Name must be at least 3 characters long",
    },
  },
  birthdate: {
    required: { value: true, message: "Select your date of birth" },
    minLength: {
      value: 3,
      message: "Date of birth must be at least 3 characters long",
    },
  },
  lastName: {
    required: { value: true, message: "Enter a Last Name" },
    minLength: {
      value: 3,
      message: "Last Name must be at least 3 characters long",
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
