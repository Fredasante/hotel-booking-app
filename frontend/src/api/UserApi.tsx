import { useMutation } from "react-query";
import { RegisterFormData } from "../pages/Register";
import { toast } from "sonner";
import { LoginAccountData } from "../pages/Login";
import { useDispatch } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
  signOut,
} from "../redux/user/userSlice";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const useRegisterUser = () => {
  const register = async (formData: RegisterFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to register user");
    }
    return response.json();
  };

  const { mutateAsync: registerUser, isLoading } = useMutation(register, {
    onSuccess: () => {
      toast.success("Registration Success!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to login");
    },
  });

  return { registerUser, isLoading };
};

export const useLoginUser = () => {
  const dispatch = useDispatch();

  const login = async (formData: LoginAccountData) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to login");
    }
    return response.json();
  };

  const { mutateAsync: loginUser, isLoading } = useMutation(login, {
    onMutate: () => {
      dispatch(signInStart());
    },
    onSuccess: (data) => {
      dispatch(signInSuccess(data));
    },
    onError: (error: Error) => {
      dispatch(signInFailure(error.message));
      toast.error(error.message || "Failed to login");
    },
  });

  return { loginUser, isLoading };
};

export const useGoogleLogin = () => {
  const dispatch = useDispatch();

  const login = async (data: any) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/google`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to login");
    }
    return response.json();
  };

  const { mutateAsync: googleLogin, isLoading } = useMutation(login, {
    onMutate: () => {
      dispatch(signInStart());
    },
    onSuccess: (data) => {
      dispatch(signInSuccess(data));
    },
    onError: (error: Error) => {
      dispatch(signInFailure(error.message));
      toast.error(error.message || "Failed to login");
    },
  });

  return { googleLogin, isLoading };
};

export const useLogOutUser = () => {
  const dispatch = useDispatch();

  const logout = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
      method: "POST",
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to logout");
    }
    return response.json();
  };

  const { mutateAsync: logoutUser } = useMutation(logout, {
    onSuccess: () => {
      dispatch(signOut());
    },
  });

  return { logoutUser };
};
