import { useMutation } from "react-query";
import { RegisterFormData } from "../pages/Register";
import { toast } from "sonner";
import { LoginAccountData } from "../pages/Login";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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

  const { mutateAsync: registerUser, error, isSuccess } = useMutation(register);

  if (isSuccess) {
    toast.success("User registered successfully");
  }

  if (error) {
    toast.error(error.toString());
  }

  return { registerUser };
};

export const useLoginUser = () => {
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
    onSuccess: () => {
      toast.success("User logged in successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to login");
    },
  });

  return { loginUser, isLoading };
};
