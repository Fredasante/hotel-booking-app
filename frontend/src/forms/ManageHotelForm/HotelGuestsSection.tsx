import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const HotelGuestsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div className="shadow-md">
      <h3 className="sm:text-xl text-lg font-bold">Guests</h3>
      <div className="grid md:grid-cols-2 md:gap-8 gap-4 p-5">
        <div>
          <label className="text-gray-800 text-sm mb-2 block">Adults</label>
          <input
            {...register("adultCount", { required: "Adult count is required" })}
            type="number"
            className="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all"
            placeholder="Enter number of adults"
            min={1}
          />
          {errors.adultCount && (
            <span className="text-red-500 text-sm mt-1">
              {errors.adultCount.message}
            </span>
          )}
        </div>

        <div>
          <label className="text-gray-800 text-sm mb-2 block">Children</label>
          <input
            {...register("childCount", {
              required: "Child count is required",
            })}
            type="number"
            className="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all"
            placeholder="Enter number of children"
            min={0}
          />
          {errors.childCount && (
            <span className="text-red-500 text-sm mt-1">
              {errors.childCount.message}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default HotelGuestsSection;
