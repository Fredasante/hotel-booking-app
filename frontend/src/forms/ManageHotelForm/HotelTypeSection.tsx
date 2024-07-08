import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";
import { hotelTypes } from "../../config/hotel-options-config";

const HotelTypeSection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  const typeWatch = watch("type");

  return (
    <div className="my-6 ">
      <h3 className="sm:text-xl text-lg font-bold mb-3">Type</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1">
        {hotelTypes.map((type) => (
          <div key={type} className="flex items-center text-slate-700 text-sm">
            <input
              {...register("type", { required: "Type is required" })}
              type="radio"
              value={type}
              className="mr-2"
            />
            <label
              className={typeWatch === type ? "text-blue-600 font-bold" : ""}
              htmlFor={type}
            >
              {type}
            </label>
          </div>
        ))}
      </div>
      {errors.type && (
        <span className="text-red-500 text-sm mt-1">{errors.type.message}</span>
      )}
    </div>
  );
};

export default HotelTypeSection;
