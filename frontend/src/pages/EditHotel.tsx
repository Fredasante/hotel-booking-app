import { useParams } from "react-router-dom";
import { useGetHotelbyId } from "../api/HotelApi";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";

const EditHotel = () => {
  const { hotelId } = useParams<{ hotelId: string }>();
  const { hotel, isLoading: isEditLoading } = useGetHotelbyId(hotelId || "");

  return (
    <div>
      <ManageHotelForm hotel={hotel} isEditLoading={isEditLoading} />
    </div>
  );
};

export default EditHotel;
