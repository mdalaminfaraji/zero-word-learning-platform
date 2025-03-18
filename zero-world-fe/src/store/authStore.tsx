/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import axios from "axios";
import { toast } from "react-hot-toast";
import { setCookie, deleteCookie } from "cookies-next";

// Cookie options for consistent configuration
const COOKIE_OPTIONS = {
  // 7 days in seconds
  maxAge: 7 * 24 * 60 * 60,
  // Allow JavaScript access since we're using client-side auth
  httpOnly: false,
  // Restrict cookie to same domain
  sameSite: "lax" as const,
  // Set path to root for all cookies
  path: "/",
};

interface AuthState {
  user: any;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (identifier: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
}

// Helper function to set auth cookies with consistent options
const setAuthCookies = (jwt: string, user: any) => {
  try {
    // Set expiration to 7 days from now
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    // Set each cookie individually with proper options
    setCookie("token", jwt, {
      ...COOKIE_OPTIONS,
      expires,
    });

    setCookie("user", JSON.stringify(user), {
      ...COOKIE_OPTIONS,
      expires,
    });

    setCookie("role", user.role?.type || "authenticated", {
      ...COOKIE_OPTIONS,
      expires,
    });

    // Verify cookies were set
    console.log("Cookies set successfully:", {
      token: jwt,
      role: user.role?.type || "authenticated"
    });

  } catch (error) {
    console.error("Error setting cookies:", error);
  }
};

// Helper function to clear auth cookies
const clearAuthCookies = () => {
  const options = {
    path: "/",
    sameSite: "lax" as const,
  };

  deleteCookie("token", options);
  deleteCookie("user", options);
  deleteCookie("role", options);
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  isAdmin: false,

  login: async (identifier: string, password: string) => {
    set({ loading: true, error: null });
    try {
      // First, authenticate the user
      const authResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/local`,
        {
          identifier,
          password,
        }
      );

      const { jwt } = authResponse.data;

      // Then fetch the user details with role information
      const userResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/me?populate=role`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      const userWithRole = userResponse.data;
      const isAdmin = userWithRole.role?.type === "admin";

      // Set cookies with expiration and security options
      setAuthCookies(jwt, userWithRole);

      set({
        user: userWithRole,
        token: jwt,
        isAuthenticated: true,
        isAdmin,
        loading: false,
      });

      toast.success("Login successful!");

      // Add a small delay before redirect to ensure cookies are set
      setTimeout(() => {
        window.location.href = isAdmin ? "/dashboard" : "/";
      }, 100);

    } catch (error: any) {
      console.error("Login error:", error);
      set({
        error: error.response?.data?.error?.message || "Login failed",
        loading: false,
      });
      toast.error(error.response?.data?.error?.message || "Login failed");
    }
  },

  register: async (username: string, email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      // Register the user
      const registerResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/local/register`,
        {
          username,
          email,
          password,
        }
      );

      const { jwt } = registerResponse.data;

      // Fetch complete user details with role
      const userResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/me?populate=role`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      const userWithRole = userResponse.data;
      const isAdmin = userWithRole.role?.type === "admin";

      // Set cookies with expiration and security options
      setAuthCookies(jwt, userWithRole);

      set({
        user: userWithRole,
        token: jwt,
        isAuthenticated: true,
        isAdmin,
        loading: false,
      });

      toast.success("Registration successful!");

      // Add a small delay before redirect to ensure cookies are set
      setTimeout(() => {
        window.location.href = isAdmin ? "/dashboard" : "/";
      }, 100);

    } catch (error: any) {
      console.error("Registration error:", error);
      set({
        error: error.response?.data?.error?.message || "Registration failed",
        loading: false,
      });
      toast.error(
        error.response?.data?.error?.message || "Registration failed"
      );
    }
  },

  logout: () => {
    // Clear all auth cookies
    clearAuthCookies();

    set({
      user: null,
      token: null,
      isAuthenticated: false,
      isAdmin: false,
    });

    // Redirect to login page after logout
    window.location.href = "/login";

    toast.success("Logged out successfully!");
  },
}));
