import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { UserFormType } from "../types/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export const useGetUserDetails = () => {
  const getUserDetails = async () => {
    const response = await fetch(`${API_BASE_URL}/api/user/profile`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to get user details");
    }
    return response.json();
  };

  const {
    data: userDetails,
    isLoading,
    error,
  } = useQuery("userDetails", getUserDetails);

  return { userDetails, isLoading, error };
};

export const useUpdateUserSettings = () => {
  const update = async (formData: UserFormType) => {
    const response = await fetch(`${API_BASE_URL}/api/user/profile`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update user settings");
    }
    return response.json();
  };

  const { mutateAsync: updateUserSettings, isLoading } = useMutation(update, {
    onSuccess: () => {
      toast.success("Settings updated!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update user settings");
    },
  });

  return { updateUserSettings, isLoading };
};
