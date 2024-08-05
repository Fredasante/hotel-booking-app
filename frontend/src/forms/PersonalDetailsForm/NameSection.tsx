import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { UserFormType } from "../../types/types";

interface NameSectionProps {
  onSave: () => void;
}

const NameSection = ({ onSave }: NameSectionProps) => {
  const {
    register,
    watch,
    formState: { errors },
    trigger,
  } = useFormContext<UserFormType>();
  const [isEditing, setIsEditing] = useState(false);
  const firstName = watch("firstName");
  const lastName = watch("lastName");

  const handleEditClick = () => setIsEditing(true);

  const handleCancelClick = () => setIsEditing(false);

  const handleSaveClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const isValid = await trigger(["firstName", "lastName"]);
    if (isValid) {
      onSave();
      setIsEditing(false);
    }
  };

  return (
    <div className="py-4 flex flex-wrap md:flex-nowrap justify-between gap-2 md:gap-5 lg:gap-10 border-t border-b border-gray-200">
      <span className="w-32 md:w-40">Name</span>

      {isEditing ? (
        <div className="space-y-2 w-full">
          <div className="flex flex-wrap md:flex-nowrap gap-2 justify-between">
            <div className="flex flex-col w-full md:w-1/2 mb-3">
              <label className="font-semibold text-sm" htmlFor="firstName">
                First name(s)
              </label>
              <input
                {...register("firstName", {
                  required: "First name is required",
                })}
                className="text-input text-black"
              />
              {errors.firstName && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.firstName.message}
                </span>
              )}
            </div>
            <div className="flex flex-col w-full md:w-1/2">
              <label className="font-semibold text-sm" htmlFor="lastName">
                Last name(s)
              </label>
              <input
                type="text"
                {...register("lastName", { required: "Last name is required" })}
                className="text-input"
              />
              {errors.lastName && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.lastName.message}
                </span>
              )}
            </div>
            <div className="flex flex-row justify-between md:flex-col md:gap-4 lg:gap-10 mt-3 space-x-2 ml-0 md:ml-5 lg:ml-20">
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
          className="flex space-x-2 w-full cursor-pointer"
          onClick={handleEditClick}
        >
          <span className="flex-grow text-gray-700">
            {firstName} {lastName}
          </span>
          <button type="button" className="text-blue-700 font-semibold">
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default NameSection;
