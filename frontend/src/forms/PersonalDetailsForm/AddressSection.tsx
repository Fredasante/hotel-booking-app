import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { UserFormType } from "../../types/types";
import { countries } from "countries-list";

interface AddressProps {
  onSave: () => void;
}

const AddressSection = ({ onSave }: AddressProps) => {
  const {
    register,
    watch,
    trigger,
    formState: { errors },
  } = useFormContext<UserFormType>();
  const [isEditing, setIsEditing] = useState(false);

  const streetAddress = watch("address.street");

  const handleEditClick = () => setIsEditing(true);

  const handleSaveClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    const isValid = await trigger([
      "address.street",
      "address.country",
      "address.city",
      "address.postalCode",
    ]);

    if (isValid) {
      onSave();
      setIsEditing(false);
    }
  };

  const handleCancelClick = () => setIsEditing(false);

  const countryList = Object.entries(countries).map(([code, country]) => ({
    code,
    name: country.name,
  }));

  return (
    <div className="py-4 border-b border-gray-200">
      <div className="flex flex-wrap md:flex-nowrap justify-between gap-2 md:gap-5 lg:gap-10">
        <span className="w-32 md:w-40">Address</span>

        {isEditing ? (
          <div className="w-full space-y-4">
            <div className="flex flex-col w-full">
              <label className="font-semibold text-sm" htmlFor="country">
                Country/Region
              </label>
              <select
                {...register("address.country", {
                  required: "Country is required",
                })}
                className="text-input"
              >
                <option value="">Select the country/region you live in</option>
                {countryList.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
              {errors.address?.country && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.address.country.message}
                </span>
              )}
            </div>

            <div className="flex flex-col w-full">
              <label className="font-semibold text-sm" htmlFor="street">
                Address
              </label>
              <input
                {...register("address.street", {
                  required: "Street address is required",
                })}
                className="text-input"
                placeholder="Your street name and house/apartment number"
              />
              {errors.address?.street && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.address.street.message}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <div className="flex flex-col">
                <label className="font-semibold text-sm" htmlFor="city">
                  Town/City
                </label>
                <input
                  {...register("address.city", {
                    required: "City is required",
                  })}
                  className="text-input"
                />
                {errors.address?.city && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.address.city.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <label className="font-semibold text-sm" htmlFor="postalCode">
                  Zip code
                </label>
                <input
                  {...register("address.postalCode", {
                    required: "Postal code is required",
                  })}
                  className="text-input"
                />
                {errors.address?.postalCode && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.address.postalCode.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={handleCancelClick}
                className="text-blue-700 text-sm font-semibold p-2 rounded hover:bg-blue-50 transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
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
            <button type="button" className="text-blue-700 font-semibold">
              Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressSection;
