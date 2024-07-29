import { useNavigate } from "react-router-dom";
import { useCreateHotel } from "../api/HotelApi";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";

const CreateHotel = () => {
  const { createHotel, isLoading: isCreateLoading } = useCreateHotel();
  const navigate = useNavigate();

  const handleSave = async (hotelFormData: FormData) => {
    try {
      await createHotel(hotelFormData);
      navigate("/hotels");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-5">
      <ManageHotelForm onSave={handleSave} isCreateLoading={isCreateLoading} />
    </div>
  );
};

export default CreateHotel;
