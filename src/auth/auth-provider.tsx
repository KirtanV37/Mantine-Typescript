import { createContext, type ReactNode, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { LOCAL_STORAGE_KEY } from "../utils/constants";
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from "../utils/helper";

interface User {
  id: number;
  email: string;
  role: "admin" | "user";
}
interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuth: boolean;
  isAdmin: boolean;
  login: (token: string) => void;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | unknown>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(() =>
    getLocalStorage(LOCAL_STORAGE_KEY)
  ); // Lazy initialization of token

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode<User>(token);
        setUser(decoded);
      } catch (error) {
        console.error("Invalid");
        console.log("error", error);
        logout();
      }
    }
  }, [token]);

  const login = (newToken: string) => {
    setLocalStorage(LOCAL_STORAGE_KEY, newToken);
    setToken(newToken);
  };

  const logout = () => {
    removeLocalStorage(LOCAL_STORAGE_KEY);
    setToken(null);
    setUser(null);
  };

  const isAuth = !!user;
  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, isAdmin, isAuth }}
    >
      {children}{" "}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

/**
 * based on the provided code snippet, the AuthProvider component is designed to manage authentication state in a React application. It uses localStorage to persist the authentication token and decodes it to extract user information. The component provides methods for logging in and logging out, as well as flags to check if a user is authenticated or if they have admin privileges.
 */

/**
| Step                     | Responsibility               | Description                                 |
| ------------------------ | ---------------------------- | ------------------------------------------- |
| 1. Submit Login Form     | Frontend                     | User enters credentials                     |
| 2. Validate              | Backend (`json-server-auth`) | If valid, returns JWT token                 |
| 3. Store Token           | Frontend                     | Save to localStorage                        |
| 4. Decode Token          | Frontend (`jwt-decode`)      | Extract user info (id, email, role)         |
| 5. Set Global Auth State | `AuthContext`                | Makes user info available everywhere        |
| 6. Send Auth Header      | Axios Interceptor            | Adds `Authorization: Bearer <token>`        |
| 7. Control Routes        | Frontend                     | Block/allow access using role + login state |

 */

/**
 * 🧠 JWT Flow Overview: Authentication vs Authorization
🔐 Authentication
Authentication is the process of verifying a user’s identity.

User submits login form with email and password.

The credentials are sent to the backend via a POST /login API request.

If the credentials are correct, the backend (in this case json-server-auth) responds with a JWT token — this is proof that the user is verified.

The frontend then:

Stores the token in localStorage so it persists across page reloads

Passes the token into the login() function (from AuthContext)

Inside login(), the token is saved, and setToken() is called

A useEffect() runs when the token changes, and:

Decodes the token using jwt-decode

Extracts user info like id, email, and role

Stores the decoded user in context via setUser()

At this point, the user is considered authenticated.


🛂 Authorization
Authorization is the process of determining what the authenticated user is allowed to do.

The token (stored in localStorage) is automatically attached to every Axios request using an Axios interceptor:


config.headers.Authorization = `Bearer ${token}`;
The backend uses this token to:

Verify the request is from a valid user

Allow or deny access to protected routes

On the frontend, user roles (like admin or user) from the decoded token can be used to:

Conditionally render UI

Redirect users to "Unauthorized" pages

Protect certain routes (e.g. only admin can access /admin/dashboard)

*/

/*
User logs in ➝ Backend gives token ➝ Store token ➝ Decode token ➝ Save user ➝
Axios sends token ➝ Backend authorizes ➝ App shows/hides content based on role
 */
