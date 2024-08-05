import { useState } from "react";
import { UserFormType } from "../../types/types";
import { useFormContext } from "react-hook-form";

interface PhoneSectionProps {
  onSave: () => void;
}

const PhoneSection = ({ onSave }: PhoneSectionProps) => {
  const {
    register,
    watch,
    trigger,
    formState: { errors },
  } = useFormContext<UserFormType>();
  const [isEditing, setIsEditing] = useState(false);

  const phoneNumber = watch("phoneNumber");

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    const isValid = await trigger("phoneNumber");

    if (isValid) {
      onSave();
      setIsEditing(false);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  return (
    <div className="py-4 flex flex-wrap md:flex-nowrap gap-2 md:gap-7 lg:gap-10 border-b border-gray-200">
      <span className="md:w-40 whitespace-nowrap">Phone Number</span>

      {isEditing ? (
        <div className="flex flex-col w-full space-y-2">
          <div className="flex flex-wrap md:flex-nowrap justify-between">
            <div className="flex flex-col w-full md:w-1/2 mr-2 mb-3">
              <label className="font-semibold text-sm" htmlFor="email">
                Phone Number
              </label>
              <input
                {...register("phoneNumber", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^\d{10}$/,
                    message: "Invalid phone number",
                  },
                })}
                className="text-input text-black"
              />
              {errors.phoneNumber && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.phoneNumber.message}
                </span>
              )}
            </div>

            <div className="flex flex-row justify-between md:flex-col lg:gap-10 mt-3 space-x-2 ml-0 md:ml-5 lg:ml-20">
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
        </div>
      ) : (
        <div
          onClick={handleEditClick}
          className="flex flex-col w-full space-y-1 cursor-pointer"
        >
          <div className="flex items-start">
            <span className="flex-grow text-gray-600">
              {phoneNumber ? phoneNumber : "Add your phone number"}
            </span>
            <button
              type="button"
              className="text-blue-700 font-semibold md:ml-4"
            >
              Edit
            </button>
          </div>
          <p className="text-gray-500 text-sm mt-5 max-w-md">
            Properties or attractions you book will use this number to contact
            you.
          </p>
        </div>
      )}
    </div>
  );
};

export default PhoneSection;
