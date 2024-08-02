import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { UserFormType } from "../../types/types";
import { countries } from "countries-list";
import { days, months, years } from "../../config/user-options-config";

const PassportSection = () => {
  const { register, watch } = useFormContext<UserFormType>();
  const [isEditing, setIsEditing] = useState(false);
  const passportNumber = watch("passportDetails.number");

  const countryList = Object.entries(countries).map(([code, country]) => ({
    code,
    name: country.name,
  }));

  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleSaveClick = () => {
    setIsEditing(false);
  };
  const handleCancelClick = () => {
    setIsEditing(false);
  };

  return (
    <div className="py-4 border-t border-b border-gray-200">
      <div className="flex justify-between gap-2 md:gap-5 lg:gap-10">
        <span className="w-32 md:w-40">Passport Details</span>

        {isEditing ? (
          <div className="w-full space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="font-semibold text-sm" htmlFor="firstName">
                  First name(s)
                </label>
                <input
                  {...register("firstName")}
                  className="text-input"
                  placeholder="Enter the name exactly as it's written on the passport"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold text-sm" htmlFor="lastName">
                  Last name(s)
                </label>
                <input
                  {...register("lastName")}
                  className="text-input"
                  placeholder="Enter the name exactly as it's written on the passport"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold text-sm" htmlFor="country">
                  Issuing country
                </label>
                <select {...register("nationality")} className="text-input">
                  <option value="">Select issuing country</option>
                  {countryList.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <label
                  className="font-semibold text-sm"
                  htmlFor="passportNumber"
                >
                  Passport number
                </label>
                <input
                  {...register("passportDetails.number")}
                  className="text-input"
                  placeholder="Enter document number"
                />
              </div>
              <div className="flex flex-col col-span-2">
                <label className="text-sm" htmlFor="expirationDate">
                  Expiration date
                </label>
                <div className="flex space-x-2">
                  <select
                    {...register("passportDetails.expirationMonth")}
                    className="text-input w-1/3"
                  >
                    <option value="">MM</option>
                    {months.map((month, index) => (
                      <option key={index} value={index + 1}>
                        {month}
                      </option>
                    ))}
                  </select>
                  <select
                    {...register("passportDetails.expirationDay")}
                    className="text-input w-1/3"
                  >
                    <option value="">DD</option>
                    {days.map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                  <select
                    {...register("passportDetails.expirationYear")}
                    className="text-input w-1/3"
                  >
                    <option value="">YYYY</option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex flex-col col-span-2">
                <label className="text-sm">
                  <input
                    type="checkbox"
                    {...register("passportDetails.consent")}
                    className="mr-2"
                  />
                  I consent to storing my passport information in accordance
                  with the privacy statement.
                </label>
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
              {passportNumber ? passportNumber : "Not specified"}
            </span>
            <button className="text-blue-700 font-semibold">Edit</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PassportSection;
