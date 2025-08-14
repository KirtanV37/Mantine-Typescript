# 🧠 JWT Flow Overview: Authentication vs Authorization

## 🔐 Authentication

Authentication is the process of verifying a user’s identity.

**Flow:**

1. User submits login form with email and password.
2. Credentials are sent to the backend via a `POST /login` API request.
3. If credentials are correct, the backend (e.g., `json-server-auth`) responds with a JWT token (proof of verification).
4. The frontend:
   - Stores the token in `localStorage` (persists across reloads).
   - Passes the token into the `login()` function (from `AuthContext`).
   - Inside `login()`, the token is saved and `setToken()` is called.
   - A `useEffect()` runs when the token changes:
     - Decodes the token using `jwt-decode`.
     - Extracts user info (id, email, role).
     - Stores the decoded user in context via `setUser()`.
5. The user is now considered **authenticated**.

---

## 🛂 Authorization

Authorization determines what the authenticated user is allowed to do.

**Flow:**

1. The token (from `localStorage`) is automatically attached to every Axios request using an interceptor:
   ```js
   config.headers.Authorization = `Bearer ${token}`;
   ```
2. The backend uses this token to:
   - Verify the request is from a valid user.
   - Allow or deny access to protected routes.
3. On the frontend, user roles (from the decoded token) can be used to:
   - Conditionally render UI.
   - Redirect users to "Unauthorized" pages.
   - Protect certain routes (e.g., only admin can access `/admin/dashboard`).

---

## 📝 Summary Flow

```
User logs in ➝ Backend gives token ➝ Store token ➝ Decode token ➝ Save user ➝
Axios sends token ➝ Backend authorizes ➝ App shows/hides content based on role
```
