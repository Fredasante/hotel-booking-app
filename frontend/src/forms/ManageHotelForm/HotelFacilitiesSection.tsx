import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";
import { hotelFacilities } from "../../config/hotel-options-config";

const HotelFacilitiesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div className="my-6">
      <h3 className="sm:text-xl text-lg font-bold mb-3">Facilities</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1">
        {hotelFacilities.map((facility) => (
          <div
            key={facility}
            className="flex items-center text-slate-700 text-sm"
          >
            <input
              {...register("facilities", {
                validate: (facilities) => {
                  if (facilities && facilities.length > 0) {
                    return true;
                  } else {
                    return "Facilities are required";
                  }
                },
              })}
              type="checkbox"
              value={facility}
              className="mr-2"
            />
            <label htmlFor={facility}>{facility}</label>
          </div>
        ))}
      </div>
      {errors.facilities && (
        <span className="text-red-500 text-sm mt-1">
          {errors.facilities.message}
        </span>
      )}
    </div>
  );
};

export default HotelFacilitiesSection;
