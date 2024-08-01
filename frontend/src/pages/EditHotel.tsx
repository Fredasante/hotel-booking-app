import { useParams } from "react-router-dom";
import { useGetHotelbyId, useUpdateHotel } from "../api/HotelApi";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";

const EditHotel = () => {
  const { hotelId } = useParams<{ hotelId: string }>();
  const { hotel } = useGetHotelbyId(hotelId || "");

  const { updateHotel, isLoading: isEditLoading } = useUpdateHotel();

  const handleSave = async (hotelFormData: FormData) => {
    try {
      await updateHotel(hotelFormData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <ManageHotelForm
        title="Edit Hotel"
        hotel={hotel}
        onSave={handleSave}
        isEditLoading={isEditLoading}
      />
    </div>
  );
};

export default EditHotel;
