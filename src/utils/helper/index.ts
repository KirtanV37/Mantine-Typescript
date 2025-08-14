import type { AnyObjectSchema, ValidationError } from "yup";
import { jwtDecode } from "jwt-decode";

export interface LogError {
  (error: unknown): void;
}

export const logError: LogError = (error) => {
  console.error("Error:", error);
};

// Yup-Resolver
export type Resolver<T> = (values: T) => Promise<{
  values: Partial<T>;
  errors: Record<keyof T | string, string>;
}>;

export function yupSyncResolver<T>(schema: AnyObjectSchema) {
  return (values: T) => {
    try {
      schema.validateSync(values, { abortEarly: false, stripUnknown: true });
      return {};
    } catch (err) {
      const validationError = err as ValidationError;
      return validationError.inner.reduce(
        (acc: Record<string, string>, curr) => {
          if (curr.path && !acc[curr.path]) {
            acc[curr.path] = curr.message;
          }
          return acc;
        },
        {}
      );
    }
  };
}

// Capitalize
export const capitalize = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

// API-handling
export const apiAsyncHandler = async (
  handleTry: () => Promise<unknown>,
  handleCatch?: (error: unknown) => unknown,
  handleFinally?: () => void
) => {
  try {
    const response = await handleTry();
    return response;
  } catch (error) {
    logError(error);
    if (handleCatch && typeof handleCatch === "function") {
      return handleCatch(error);
    }
    return null;
  } finally {
    if (handleFinally && typeof handleFinally === "function") {
      handleFinally();
    }
  }
};

// Error Handling
export const errorHandler = (
  handleTry: () => unknown,
  handleCatch?: (error: unknown) => unknown,
  handleFinally?: () => void
) => {
  try {
    const response = handleTry();
    return response;
  } catch (error) {
    logError(error);
    if (handleCatch && typeof handleCatch === "function") {
      return handleCatch(error);
    }
    return null;
  } finally {
    if (handleFinally && typeof handleFinally === "function") {
      handleFinally();
    }
  }
};

// Get token from Localstoarge
export const getLocalStorage = (key: string) => {
  const token = localStorage.getItem(key);
  return token ? JSON.parse(token) : null;
};

// Set token to Localstorage
export const setLocalStorage = (key: string, value: unknown) => {
  return localStorage.setItem(key, JSON.stringify(value));
};

// Remove token from Localstorage
export const removeLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

// Deocde Token
export const decodeToken = (token: string | null = null) => {
  if (!token) {
    return null;
  }
  const decoded = jwtDecode(token);
  return decoded;
};

// Status of token
export const isTokenActive = (token: string | null = null): boolean => {
  if (!token) {
    return false;
  }
  try {
    const decoded = jwtDecode(token);
    return Boolean(decoded?.exp && decoded.exp > Date.now() / 1000);
  } catch {
    return false;
  }
};
