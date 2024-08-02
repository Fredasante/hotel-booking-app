import { useState } from "react";
import { UserFormType } from "../../types/types";
import { useFormContext } from "react-hook-form";

const EmailAddressSection = () => {
  const { register, watch } = useFormContext<UserFormType>();
  const [isEditing, setIsEditing] = useState(false);

  const email = watch("email");

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
      <span className="md:w-40 whitespace-nowrap">Email Address</span>

      {isEditing ? (
        <div className="flex flex-col w-full space-y-2">
          <div className="flex flex-wrap md:flex-nowrap justify-between">
            <div className="flex flex-col w-full md:w-1/2 mr-2 mb-3">
              <label className="font-semibold text-sm" htmlFor="email">
                Email Address
              </label>
              <input {...register("email")} className="text-input text-black" />
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
            <span className="flex-grow text-gray-700">{email}</span>
            <button className="text-blue-700 font-semibold md:ml-4">
              Edit
            </button>
          </div>
          <p className="text-gray-600 text-sm max-w-md pt-1">
            This is the email address you use to sign in. It's also where we
            send your booking confirmations.
          </p>
        </div>
      )}
    </div>
  );
};

export default EmailAddressSection;
