import { useMutation } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export const useCreateHotel = () => {
  const createHotelUser = async (hotelFormData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/api/hotel/create`, {
      credentials: "include",
      method: "POST",
      body: hotelFormData,
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData || "Failed to create hotel");
    }
    return response.json();
  };

  const { mutateAsync: createHotel, isLoading } = useMutation(createHotelUser, {
    onSuccess: () => {
      toast.success("Hotel created successfully");
    },
    onError: () => {
      toast.error("Failed to create hotel");
    },
  });

  return { createHotel, isLoading };
};
