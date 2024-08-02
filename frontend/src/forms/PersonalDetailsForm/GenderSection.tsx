// components/GenderSection.tsx
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { UserFormType } from "../../types/types";

const GenderOptions = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" },
  { value: "Prefer not to say", label: "Prefer not to say" },
];

const GenderSection = () => {
  const { register, watch } = useFormContext<UserFormType>();
  const [isEditing, setIsEditing] = useState(false);

  const gender = watch("gender");

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
    <div className="py-4 flex gap-2 md:gap-7 lg:gap-10 border-b border-gray-200">
      <span className="w-32 md:w-40 whitespace-nowrap">Gender</span>

      {isEditing ? (
        <div className="flex flex-col w-full space-y-2">
          <div className="flex flex-wrap md:flex-nowrap justify-between">
            <div className="flex flex-col w-full md:w-1/2 mr-2 mb-3">
              <label className="font-semibold text-sm" htmlFor="gender">
                Gender
              </label>
              <select {...register("gender")} className="text-input text-black">
                <option value="">Select gender</option>
                {GenderOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-row justify-between md:flex-col lg:gap-10 mt-3 space-x-2 ml-0 md:ml-5 lg:ml-20">
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
        </div>
      ) : (
        <div
          onClick={handleEditClick}
          className="flex flex-col w-full space-y-1 cursor-pointer"
        >
          <div className="flex items-start">
            <span className="flex-grow text-gray-600">
              {gender || "Select your gender"}
            </span>
            <button className="text-blue-700 font-semibold ml-4">Edit</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenderSection;
