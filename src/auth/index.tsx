// getAuth -> accpets a urlRedirection is exist or not and return use authenticated or not, role of user and url that needed to redirection.

import { AUTH_ROUTES, PLAIN_ROUTES, PRIVATE_ROUTES } from "../routing/routes";
import {
  LOCAL_STORAGE_KEY,
  CACHED_URL_LOCAL_STORAGE_KEY,
  ROLES,
} from "../utils/constants";

import {
  setLocalStorage,
  getLocalStorage,
  isTokenActive,
  decodeToken,
} from "../utils/helper";

// extend jwt-decode to include role
declare module "jwt-decode" {
  export interface JwtPayload {
    role?: string;
  }
}

export const redirected = {
  [ROLES.ADMIN]: AUTH_ROUTES.DASHBOARD.url,
  [ROLES.USER]: PRIVATE_ROUTES.INDEX.url,
};

export interface GetAuthOptions {
  isCachedUrl?: boolean;
  [key: string]: any;
}

export interface GetAuthReturns {
  isAuthenticated: boolean;
  redirectedUrl: string;
  role: string;
}
export const getAuth = (options: GetAuthOptions): GetAuthReturns => {
  const { isCachedUrl } = options;

  const token = getLocalStorage(LOCAL_STORAGE_KEY); // token needed to track the status of authentication

  // first we see isCahedUrl is existing or not through local-stoarge, and what is stores in local-storage
  const cachedUrlKey = getLocalStorage(CACHED_URL_LOCAL_STORAGE_KEY);

  let redirectedUrl = PLAIN_ROUTES.LOGIN.url;

  let role = "";

  // User is authenticated or not
  const isAuthenticated = isTokenActive(token);

  // if authenticated then decode token and find its role, and based upon role redirection is appeared.
  if (isAuthenticated) {
    const decodedToken = decodeToken(token);
    role = decodedToken?.role || "";
    redirectedUrl = role
      ? cachedUrlKey || redirected[role]
      : PLAIN_ROUTES.LOGIN.url;
  }

  if (isCachedUrl && !isAuthenticated) {
    const { pathname, search } = window?.location || {};
    const cachedRedirectUrl = pathname + search;
    setLocalStorage(CACHED_URL_LOCAL_STORAGE_KEY, cachedRedirectUrl);
  }

  return { isAuthenticated, redirectedUrl, role };
};

/**
 * If un-authenticated user is trying to access specific protected route, then after become authenticated it can goes to the route.
 * For that, we needed the url which user trying to access and information of user like it's role [for redirection] and its status.
 * if the url that user trying to access and user is not authenticated, that stores in local-storage for fast access.
 * by decoding token we get the role of the user, if role exist then redirects to it defined route or route that it tries to access and if there is no role then redirect to Login
 *
 */
