import axios from "axios";
const APIURL = "/api/api/accounts/";

// For registration
interface RegisterData {
  email: string;
  username: string;
  password: string;
  confirm_password: string;
}

export const registerUser = async ({
  email,
  username,
  password,
  confirm_password,
}: RegisterData) => {
  try {
    const response = await axios.post(`${APIURL}register/`, {
      email,
      username,
      password,
      confirm_password,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // 👇 check for both "error" and "message" keys
      const backendMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Registration Failed";

      throw new Error(backendMessage);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

interface ConfirmData {
  token: string;
}

export const confirmEmail = async function ({ token }: ConfirmData) {
  try {
    const response = await axios.get(`${APIURL}confirm_email/${token}`);
    return response.data; // this will contain { message: "..."}
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // 👇 check for both "error" and "message" keys
      const backendMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Email Verification Failed";

      throw new Error(backendMessage);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

interface resendConfirmData {
  email: string;
}

export const resendconfirmEmail = async function ({
  email,
}: resendConfirmData) {
  try {
    const response = await axios.post(`${APIURL}resend_confirm_email`, {
      email,
    });
    return response.data; // this will contain { message: "..."}
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // 👇 check for both "error" and "message" keys
      const backendMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Resend Email  Failed";

      throw new Error(backendMessage);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const resetpasswordEmail = async function ({
  email,
}: resendConfirmData) {
  try {
    const response = await axios.post(`${APIURL}reset_password`, { email });
    return response.data; // this will contain { message: "..."}
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // 👇 check for both "error" and "message" keys
      const backendMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Resend Password Reset Email  Failed";

      throw new Error(backendMessage);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

interface ResetPassword {
  token: string;
  new_password: string;
  confirm_new_password: string;
}

export const resetPassword = async function ({
  token,
  new_password,
  confirm_new_password,
}: ResetPassword) {
  try {
    const response = await axios.post(`${APIURL}set_password/${token}`, {
      token,
      new_password,
      confirm_new_password,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // 👇 check for both "error" and "message" keys
      const backendMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "ResetPASSWORD FAILED";

      throw new Error(backendMessage);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

// For login
interface LoginData {
  email: string;
  password: string;
}

export const loginUser = async ({ email, password }: LoginData) => {
  try {
    const response = await axios.post(
      `${APIURL}jwt/token/`,
      {
        email,
        password,
      },
      { withCredentials: true }
    );
    // Save access token
    localStorage.setItem("access_token", response.data.access);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // 👇 check for both "error" and "message" keys
      const backendMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "ResetPASSWORD FAILED";

      throw new Error(backendMessage);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const logout = async (token: string) => {
  try {
    const response = await axios.post(
      `${APIURL}logout/`,
      {}, // empty body
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // 👇 check for both "error" and "message" keys
      const backendMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "ResetPASSWORD FAILED";

      throw new Error(backendMessage);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};




export const googleLogin = async (token: string) => {
  try {
    const res = await axios.post(
      `${APIURL}google_login`,
      { token },
      { withCredentials: true }
    );

    localStorage.setItem("access_token", res.data.tokens.access);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // 👇 check for both "error" and "message" keys
      const backendMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Login With Google FAILED";

      throw new Error(backendMessage);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};


// === Verify if Access Token is valid ===
export const verifyToken = async (token: string) => {
  try {
    const response = await axios.post(
      `${APIURL}jwt/token/verify`,
      { token },
      { withCredentials: true }
    );
    return response.data; // token is valid
  } catch (error) {
    throw new Error("Token is invalid or expired");
  }
};

// === Refresh Access Token using Cookie ===
export const refreshToken = async () => {
  try {
    const response = await axios.post(
      `${APIURL}jwt/token/refresh`,
      {},
      { withCredentials: true } // sends cookie automatically
    );
    return response.data.access; // return new token
  } catch (error) {
    throw new Error("Token refresh failed");
  }
};
