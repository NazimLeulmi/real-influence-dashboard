const validation = {
  email: {
    required: { value: true, message: "The email is required" },
    minLength: {
      value: 6,
      message: "The minimum length is 6 characters",
    },
    maxLength: {
      value: 60,
      message: "The maximum length is 60 characters",
    },
    pattern: {
      value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      message: "The email is invalid",
    },
  },
  password: {
    required: { value: true, message: "The password is required" },
    minLength: {
      value: 8,
      message: "The minimume length is 8 characters",
    },
  },
  passwordc: {
    required: {
      value: true,
      message: "The password confirmation is required",
    },
  },
};

export default validation;
