import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const HotelDetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div className="font-[sans-serif]">
      <div className="mx-4 mb-4 my-10">
        <div className="max-w-4xl mx-auto bg-white shadow-[0_2px_13px_-6px_rgba(0,0,0,0.4)] sm:p-8 p-4 rounded-md">
          <h4 className="sm:text-3xl text-2xl text-center font-bold mb-7">
            Create Hotel
          </h4>

          <div className="mb-5">
            <label className="text-gray-800 text-sm mb-2 block">Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              className="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all"
              placeholder="Enter name"
            />
            {errors.name && (
              <span className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="grid md:grid-cols-2 md:gap-8 gap-4">
            <div>
              <label className="text-gray-800 text-sm mb-2 block">City</label>
              <input
                {...register("city", { required: "City is required" })}
                className="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all"
                placeholder="Enter name of city"
              />
              {errors.city && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.city.message}
                </span>
              )}
            </div>

            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                Country
              </label>
              <input
                {...register("country", { required: "Country is required" })}
                className="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all"
                placeholder="Enter name of country"
              />
              {errors.country && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.country.message}
                </span>
              )}
            </div>
          </div>

          <div className="mt-5">
            <label className="text-gray-800 text-sm mb-2 block">
              Description
            </label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              placeholder="Enter Description"
              rows={6}
              className="w-full rounded-md px-4 bg-gray-100 text-gray-800 text-sm pt-3 outline-blue-500 focus:bg-transparent"
            ></textarea>
            {errors.description && (
              <span className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </span>
            )}
          </div>

          <div className="grid md:grid-cols-2 md:gap-8 gap-4 mt-3">
            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                Price Per Night
              </label>
              <input
                {...register("pricePerNight", {
                  required: "Price per night is required",
                })}
                type="number"
                min={1}
                className="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all"
                placeholder="Enter price per night"
              />
              {errors.pricePerNight && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.pricePerNight.message}
                </span>
              )}
            </div>

            <div className="relative block w-full text-gray-700">
              <label className="text-gray-800 text-sm mb-2 block">
                Star Rating
              </label>
              <select
                {...register("starRating", {
                  required: "Star rating is required",
                })}
                className="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all"
              >
                <option value="" disabled selected>
                  Select star rating
                </option>
                {[1, 2, 3, 4, 5].map((rating) => (
                  <option key={rating} value={rating}>
                    {rating}
                  </option>
                ))}
              </select>
              {errors.starRating && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.starRating.message}
                </span>
              )}
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="py-3 px-6 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetailsSection;
