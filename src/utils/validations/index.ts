import * as yup from "yup";
import { VALIDATION_MESSAGE as message } from "../constants";
import { regex } from "./regex";
import { ROLES } from "../constants";
const { hasDigit, hasLowercaseLetter, hasSpecialChar, hasUppercaseLetter } =
  regex;

const {
  passwordDigit,
  passwordLength,
  passwordLower,
  passwordSpecial,
  passwordUpper,
  required,
  roleRequired,
  invalid,
  passwordMatch,
} = message;

// Register Schema
export const registerSchema = yup.object({
  name: yup.string().required(required("name")),
  email: yup
    .string()
    .trim()
    .email(invalid("email"))
    .required(required("email")),
  password: yup
    .string()
    .trim()
    .required(required("password"))
    .min(6, passwordLength)
    .matches(hasLowercaseLetter, passwordLower)
    .matches(hasUppercaseLetter, passwordUpper)
    .matches(hasDigit, passwordDigit)
    .matches(hasSpecialChar, passwordSpecial),
  role: yup
    .string()
    .oneOf(Object.values(ROLES), roleRequired)
    .required(required("role")),
});

// Login Schema
export const loginSchema = yup.object({
  email: yup.string().trim().min(1, required("email")).email(invalid("email")),
  password: yup.string().trim().min(1, required("password")),
});

// Forgot Password Schema
export const forgotPasswordSchema = yup.object({
  email: yup.string().trim().min(1, required("email")).email(invalid("email")),
  newPassword: yup
    .string()
    .min(6, passwordLength)
    .matches(hasUppercaseLetter, passwordUpper)
    .matches(hasSpecialChar, passwordSpecial)
    .required(required("new password")),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], passwordMatch)
    .required("Confirm your password"),
});

// Task Creation Schema
const today = new Date();
today.setHours(0, 0, 0, 0);

export const taskSchema = yup.object({
  title: yup.string().min(1, required("title")),
  description: yup.string().min(1, required("description")),
  status: yup.string().min(1, required("status")),
  dueDate: yup
    .string()
    .required("Due date is required")
    .test("min", "Due date cannot be in the past", function (value) {
      if (!value) return false;
      const selected = new Date(value);
      selected.setHours(0, 0, 0, 0);
      return selected >= today;
    }),
});
