import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { UserFormType } from "../../types/types";
import { countries } from "countries-list";

const AddressSection = () => {
  const { register, watch } = useFormContext<UserFormType>();
  const [isEditing, setIsEditing] = useState(false);

  const streetAddress = watch("address.street");

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const countryList = Object.entries(countries).map(([code, country]) => ({
    code,
    name: country.name,
  }));

  return (
    <div className="py-4 border-t border-b border-gray-200">
      <div className="flex justify-between gap-2 md:gap-5 lg:gap-10">
        <span className="w-32 md:w-40">Address</span>

        {isEditing ? (
          <div className="w-full space-y-4">
            <div className="flex flex-col w-full">
              <label className="font-semibold text-sm" htmlFor="country">
                Country/Region
              </label>
              <select {...register("address.country")} className="text-input">
                <option value="">Select the country/region you live in</option>
                {countryList.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col w-full">
              <label className="font-semibold text-sm" htmlFor="street">
                Address
              </label>
              <input
                {...register("address.street")}
                className="text-input"
                placeholder="Your street name and house/apartment number"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <div className="flex flex-col">
                <label className="font-semibold text-sm" htmlFor="city">
                  Town/City
                </label>
                <input {...register("address.city")} className="text-input" />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold text-sm" htmlFor="postalCode">
                  Zip code
                </label>
                <input
                  {...register("address.postalCode")}
                  className="text-input"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={handleCancelClick}
                className="text-blue-700 text-sm font-semibold p-2 rounded hover:bg-blue-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveClick}
                className="bg-blue-600 text-white px-3 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <div
            className="flex space-x-2 w-full cursor-pointer"
            onClick={handleEditClick}
          >
            <span className="flex-grow text-gray-700">
              {streetAddress ? streetAddress : "Add your address"}
            </span>
            <button className="text-blue-700 font-semibold">Edit</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressSection;
