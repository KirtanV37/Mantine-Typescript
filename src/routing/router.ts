import { createBrowserRouter, redirect } from "react-router-dom";
import { getAuth } from "../auth";

// Routes
import { PLAIN_ROUTES, AUTH_ROUTES, PRIVATE_ROUTES } from "./routes";

// Layout
import PlainLayout from "../layouts/plain-layout";
import PrivateLayout from "../layouts/private-layout";
import AuthLayout from "../layouts/auth-layout";

// Component
import Dashboard from "../pages/auth/Dashboard";
import Tasks from "../pages/auth/Tasks";
import Login from "../pages/login";
import Register from "../pages/register";
import ForgotPassword from "../pages/forgot-password";
import UserDashboard from "../pages/user-dashboard";
import UserTask from "../pages/user-task";
import PageNotFound from "../components/PageNotFound";
import WelcomeUser from "../pages/user-welcome";

const authLayoutLoader = () => {
  const { isAuthenticated, redirectedUrl, role } = getAuth({});

  if (!isAuthenticated || role !== "admin") {
    return redirect(redirectedUrl);
  }
  return null;
};

const privateLayoutLoader = () => {
  const { isAuthenticated, redirectedUrl, role } = getAuth({});
  // Only allow authenticated users (any role)
  if (!isAuthenticated || role !== "user") {
    return redirect(redirectedUrl); // redirect to login
  }
  return null; // allow access
};

export const router = createBrowserRouter([
  {
    ...PLAIN_ROUTES.layout,
    Component: PlainLayout,
    children: [
      { ...PLAIN_ROUTES.INDEX, Component: WelcomeUser },
      { ...PLAIN_ROUTES.LOGIN, Component: Login },
      { ...PLAIN_ROUTES.REGISTER, Component: Register },
      { ...PLAIN_ROUTES.FORGOT_PASSWORD, Component: ForgotPassword },
    ],
  },
  {
    ...AUTH_ROUTES.layout,
    Component: AuthLayout,
    loader: authLayoutLoader,
    children: [
      { ...AUTH_ROUTES.INDEX, Component: WelcomeUser },
      { ...AUTH_ROUTES.DASHBOARD, Component: Tasks },
      { ...AUTH_ROUTES.TASKS, Component: Dashboard },
    ],
  },
  {
    ...PRIVATE_ROUTES.layout,
    Component: PrivateLayout,
    loader: privateLayoutLoader,
    children: [
      { ...PRIVATE_ROUTES.INDEX, Component: WelcomeUser },
      { ...PRIVATE_ROUTES.USER_DASHBOARD, Component: UserDashboard },
      { ...PRIVATE_ROUTES.USER_TASK, Component: UserTask },
    ],
  },
  { path: "*", Component: PageNotFound },
]);

/**
 
✅ Final Note on loader with Authentication in React Router:-

1.Purpose of loader

->The loader function in React Router is used to pre-fetch data or perform logic before the route's component renders.
->You can also use it to protect routes by checking authentication and redirecting if necessary.

2.Typical Authentication Flow in a loader

->Get the token from localStorage (or cookie/session).
->Decode and validate the token (e.g. using jwt-decode).
->If the token is invalid or expired, redirect to login.
->If valid, return data (or just allow access by returning null).

3.Return Values

->If you want to allow access: return null or some pre-fetched data.

->If you want to redirect: use return redirect("/some-path").

4.Token Validation

->Validation includes:

 i.Checking if token exists.

 ii.Decoding it to check role/expiry.

 iii.Redirecting based on role or validity.

 */
