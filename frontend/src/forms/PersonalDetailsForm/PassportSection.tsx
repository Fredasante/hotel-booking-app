import { useFormContext } from "react-hook-form";
import { UserFormType } from "../../types/types";
import { useState, useEffect } from "react";
import { countries } from "countries-list";
import { days, months, years } from "../../config/user-options-config";

const PassportSection = ({ onSave }: { onSave: () => void }) => {
  const {
    register,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext<UserFormType>();
  const [isEditing, setIsEditing] = useState(false);

  const passportNumber = watch("passportDetails.number");
  const expiryDate = watch("passportDetails.expiryDate");
  const consent = watch("passportDetails.consent");

  useEffect(() => {
    if (expiryDate) {
      const date = new Date(expiryDate);
      setValue(
        "passportDetails.expirationMonth",
        (date.getMonth() + 1).toString()
      );
      setValue("passportDetails.expirationDay", date.getDate().toString());
      setValue("passportDetails.expirationYear", date.getFullYear().toString());
    }
  }, [expiryDate, setValue]);

  const countryList = Object.entries(countries).map(([code, country]) => ({
    code,
    name: country.name,
  }));

  const handleEditClick = () => setIsEditing(true);

  const handleSaveClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    const expirationMonth = watch("passportDetails.expirationMonth");
    const expirationDay = watch("passportDetails.expirationDay");
    const expirationYear = watch("passportDetails.expirationYear");

    const isValid = await trigger([
      "passportDetails.firstName",
      "passportDetails.lastName",
      "passportDetails.issuingCountry",
      "passportDetails.number",
      "passportDetails.expirationMonth",
      "passportDetails.expirationDay",
      "passportDetails.expirationYear",
      "passportDetails.consent",
    ]);

    if (isValid) {
      const expiryDate = `${expirationYear}-${String(expirationMonth).padStart(
        2,
        "0"
      )}-${String(expirationDay).padStart(2, "0")}`;
      setValue("passportDetails.expiryDate", new Date(expiryDate));
      setValue("passportDetails.consent", consent);

      onSave();
      setIsEditing(false);
    }
  };

  const handleCancelClick = () => setIsEditing(false);

  return (
    <div className="py-4 border-b border-gray-200">
      <div className="flex flex-wrap md:flex-nowrap justify-between gap-2 md:gap-5 lg:gap-10">
        <span className="w-32 md:w-40">Passport Details</span>

        {isEditing ? (
          <div className="w-full">
            <div className="grid gap-2 md:gap-4">
              <div className="flex flex-col">
                <label className="font-semibold text-sm" htmlFor="firstName">
                  First name(s)
                </label>
                <input
                  {...register("passportDetails.firstName", {
                    required: "First name is required",
                  })}
                  className="text-input"
                />
                {errors.passportDetails?.firstName && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.passportDetails.firstName.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <label className="font-semibold text-sm" htmlFor="lastName">
                  Last name(s)
                </label>
                <input
                  {...register("passportDetails.lastName", {
                    required: "Last name is required",
                  })}
                  className="text-input"
                />
                {errors.passportDetails?.lastName && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.passportDetails.lastName.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <label className="font-semibold text-sm" htmlFor="country">
                  Issuing country
                </label>
                <select
                  {...register("passportDetails.issuingCountry", {
                    required: "Issuing country is required",
                  })}
                  className="text-input"
                >
                  <option value="">Select issuing country</option>
                  {countryList.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.name}
                    </option>
                  ))}
                </select>
                {errors.passportDetails?.issuingCountry && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.passportDetails.issuingCountry.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <label
                  className="font-semibold text-sm"
                  htmlFor="passportNumber"
                >
                  Passport number
                </label>
                <input
                  {...register("passportDetails.number", {
                    required: "Passport number is required",
                  })}
                  className="text-input"
                  placeholder="Enter document number"
                />
                {errors.passportDetails?.number && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.passportDetails.number.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col col-span-2">
                <label
                  className="text-sm font-semibold"
                  htmlFor="expirationDate"
                >
                  Expiration date
                </label>
                <div className="flex flex-col md:flex-row gap-2">
                  <div className="w-full md:w-2/3">
                    <select
                      {...register("passportDetails.expirationMonth", {
                        required: "Required",
                      })}
                      className="text-input"
                    >
                      <option value="">MM</option>
                      {months.map((month, index) => (
                        <option key={index} value={index + 1}>
                          {month}
                        </option>
                      ))}
                    </select>
                    {errors.passportDetails?.expirationMonth && (
                      <span className="text-red-500 text-sm mt-1">
                        {errors.passportDetails.expirationMonth.message}
                      </span>
                    )}
                  </div>

                  <div className="w-full md:w-1/3">
                    <select
                      {...register("passportDetails.expirationDay", {
                        required: "Required",
                      })}
                      className="text-input"
                    >
                      <option value="">DD</option>
                      {days.map((day) => (
                        <option key={day} value={day}>
                          {day}
                        </option>
                      ))}
                    </select>
                    {errors.passportDetails?.expirationDay && (
                      <span className="text-red-500 text-sm mt-1">
                        {errors.passportDetails.expirationDay.message}
                      </span>
                    )}
                  </div>

                  <div className="w-full md:w-1/3">
                    <select
                      {...register("passportDetails.expirationYear", {
                        required: "Required",
                      })}
                      className="text-input "
                    >
                      <option value="">YYYY</option>
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                    {errors.passportDetails?.expirationYear && (
                      <span className="text-red-500 text-sm mt-1 block">
                        {errors.passportDetails.expirationYear.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col col-span-2">
                <label className="text-sm">
                  <input
                    type="checkbox"
                    {...register("passportDetails.consent", {
                      required: "Consent is required",
                    })}
                    defaultChecked={consent}
                    className="mr-2"
                  />
                  I consent to Bookings.com storing my passport information in
                  accordance with the{" "}
                  <span className="text-blue-700">privacy statement.</span>
                </label>
                {errors.passportDetails?.consent && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.passportDetails.consent.message}
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
              {passportNumber ? passportNumber : "Not specified"}
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

export default PassportSection;
