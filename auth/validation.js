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
  username: {
    required: { value: true, message: "The username is required" },
    minLength: {
      value: 3,
      message: "The minimum length is 3 characters",
    },
    maxLength: {
      value: 20,
      message: "The maximum length is 20 characters",
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
