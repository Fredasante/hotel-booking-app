import { useState } from "react";
import { UserFormType } from "../../types/types";
import { useFormContext } from "react-hook-form";

interface EmailProps {
  onSave: () => void;
}

const EmailAddressSection = ({ onSave }: EmailProps) => {
  const {
    register,
    watch,
    trigger,
    formState: { errors },
  } = useFormContext<UserFormType>();
  const [isEditing, setIsEditing] = useState(false);

  const email = watch("email");

  const handleEditClick = () => setIsEditing(true);

  const handleSaveClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    const isValid = await trigger("email");

    if (isValid) {
      onSave();
      setIsEditing(false);
    }
  };

  const handleCancelClick = () => setIsEditing(false);

  return (
    <div className="py-4 flex flex-wrap md:flex-nowrap gap-2 md:gap-7 lg:gap-10 border-b border-gray-200">
      <span className="md:w-40 whitespace-nowrap">Email Address</span>

      {isEditing ? (
        <div className="flex flex-col w-full">
          <div className="flex flex-wrap md:flex-nowrap justify-between">
            <div className="flex flex-col w-full mr-2 mb-3">
              <label className="font-semibold text-sm" htmlFor="email">
                Email Address
              </label>
              <input
                {...register("email", {
                  required: "Email address is required",
                })}
                className="text-input text-black"
              />
              {errors.email && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </span>
              )}
              <span className="mt-3 text-sm text-gray-600">
                We&apos;ll send a verification link to your new email address –
                check your inbox.
              </span>
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
            <span className="flex-grow text-gray-700">{email}</span>
            <button
              type="button"
              className="text-blue-700 font-semibold md:ml-4"
            >
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
