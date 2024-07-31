import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { HotelType } from "../types/types";

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

export const useGetHotels = () => {
  const getHotels = async (): Promise<HotelType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/hotel/my-hotels`, {
      credentials: "include",
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData || "Failed to get hotels");
    }
    return response.json();
  };

  const { data: hotels, isLoading } = useQuery("hotels", getHotels, {
    onError: () => {
      toast.error("Failed to get hotels");
    },
  });

  return { hotels, isLoading };
};
