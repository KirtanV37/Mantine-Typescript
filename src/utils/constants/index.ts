import { capitalize } from "../helper";

export const ROLES = {
  ADMIN: "admin",
  USER: "user",
};

export const APP_TITLE = "Taskboard";

export const VALIDATION_MESSAGE = {
  required: (text: string) => `${capitalize(text)} is required`,
  invalid: (text: string) => `${capitalize(text)} invalid`,
  passwordLength: "Password should be at least 6 characters.",
  passwordLower: "Must contain at least one lowercase letter",
  passwordUpper: "Must contain at least one uppercase letter",
  passwordDigit: "Must contain at least one number",
  passwordSpecial: "Must contain at least one special character",
  roleRequired: "Please select a role",
  passwordMatch: "Passwords must match",
};

export const taskSelection = [
  {
    label: "Pending",
    value: "pending",
  },
];

export const AUTH_MESSAGES = {
  successful: (text: string) => `${capitalize(text)} creates successfully!`,
  notFound: (text: string) => `${capitalize(text)} not found`,
  failure: "Failed to create user",
  login: "Login successful.",
  invalidLogin: "Invalid credentials.",
  resetPassword: "Your password has been reset successfully.",
  failurePassword: "Failed to reset password",
  logout: "You have been logged out.",
};

export const LOCAL_STORAGE_KEY = "root";
export const CACHED_URL_LOCAL_STORAGE_KEY = "cached-redirect-url";

export const ANCHOR_ITEMS = [
  { label: "Login", id: 1 },
  { label: "Register", id: 2 },
  { label: "Forgot Password", id: 3 },
];
