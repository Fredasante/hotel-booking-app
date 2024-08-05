import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { UserFormType } from "../../types/types";
import { months } from "../../config/user-options-config";

interface DateOfBirthSectionProps {
  onSave: () => void;
}

const DateOfBirthSection = ({ onSave }: DateOfBirthSectionProps) => {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<UserFormType>();
  const [isEditing, setIsEditing] = useState(false);
  const [tempDate, setTempDate] = useState<{
    month?: number;
    day?: number;
    year?: number;
  }>({});
  const [localErrors, setLocalErrors] = useState<{
    month?: string;
    day?: string;
    year?: string;
  }>({});

  const dateOfBirth = watch("dateOfBirth");

  useEffect(() => {
    if (errors.dateOfBirth) {
      setIsEditing(true);
    }
  }, [errors.dateOfBirth]);

  const formattedDateOfBirth = dateOfBirth
    ? new Date(dateOfBirth).toLocaleDateString()
    : "";

  const handleEditClick = () => {
    setIsEditing(true);
    if (dateOfBirth) {
      const date = new Date(dateOfBirth);
      setTempDate({
        month: date.getMonth(),
        day: date.getDate(),
        year: date.getFullYear(),
      });
    } else {
      setTempDate({});
    }
  };

  const validate = () => {
    const newErrors: { month?: string; day?: string; year?: string } = {};
    if (tempDate.month === undefined) newErrors.month = "Month is required";
    if (tempDate.day === undefined) newErrors.day = "Day is required";
    if (tempDate.year === undefined) newErrors.year = "Year is required";
    else if (tempDate.year.toString().length !== 4)
      newErrors.year = "Year must be 4 digits";
    else if (tempDate.year < 1900 || tempDate.year > new Date().getFullYear())
      newErrors.year = "Invalid year";

    if (
      tempDate.month !== undefined &&
      tempDate.day !== undefined &&
      tempDate.year !== undefined
    ) {
      const date = new Date(tempDate.year, tempDate.month, tempDate.day);
      if (date.getMonth() !== tempDate.month)
        newErrors.day = "Invalid day for this month";
    }

    setLocalErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (validate()) {
      setValue(
        "dateOfBirth",
        new Date(tempDate.year!, tempDate.month!, tempDate.day!)
      );
      onSave();
      setIsEditing(false);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setTempDate({});
    setLocalErrors({});
  };

  const handleChange = (type: "month" | "day" | "year", value: string) => {
    if (value === "") {
      setTempDate((prev) => ({ ...prev, [type]: undefined }));
    } else {
      setTempDate((prev) => ({
        ...prev,
        [type]: type === "month" ? parseInt(value) : parseInt(value),
      }));
    }
    setLocalErrors((prev) => ({ ...prev, [type]: undefined }));
  };

  return (
    <div className="py-4 flex flex-wrap md:flex-nowrap gap-2 md:gap-7 lg:gap-10 border-b border-gray-200">
      <span className="w-32 md:w-40 whitespace-nowrap">Date of Birth</span>

      {isEditing || errors.dateOfBirth ? (
        <div className="flex flex-col w-full space-y-2">
          <div className="flex flex-wrap md:flex-nowrap justify-between">
            <div className="flex flex-col w-full mr-2 mb-3">
              <label className="font-semibold text-sm" htmlFor="dateOfBirth">
                Date of Birth
              </label>
              <div className="flex flex-col lg:flex-row gap-2">
                <div className="flex flex-col lg:w-2/3 ">
                  <select
                    className={`text-input w-full ${
                      localErrors.month ? "border-red-500" : ""
                    }`}
                    value={tempDate.month !== undefined ? tempDate.month : ""}
                    onChange={(e) => handleChange("month", e.target.value)}
                  >
                    <option value="">MM</option>
                    {months.map((month, index) => (
                      <option key={month} value={index}>
                        {month}
                      </option>
                    ))}
                  </select>
                  {localErrors.month && (
                    <span className="text-red-500 text-sm">
                      {localErrors.month}
                    </span>
                  )}
                </div>
                <div className="flex flex-col lg:w-1/3">
                  <input
                    className={`text-input placeholder:text-black  ${
                      localErrors.day ? "border-red-500" : ""
                    }`}
                    placeholder="DD"
                    value={tempDate.day !== undefined ? tempDate.day : ""}
                    onChange={(e) => handleChange("day", e.target.value)}
                  />
                  {localErrors.day && (
                    <span className="text-red-500 text-sm">
                      {localErrors.day}
                    </span>
                  )}
                </div>
                <div className="flex flex-col lg:w-1/3">
                  <input
                    className={`text-input placeholder:text-black  ${
                      localErrors.year ? "border-red-500" : ""
                    }`}
                    placeholder="YYYY"
                    value={tempDate.year !== undefined ? tempDate.year : ""}
                    onChange={(e) => handleChange("year", e.target.value)}
                  />
                  {localErrors.year && (
                    <span className="text-red-500 text-sm">
                      {localErrors.year}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-row justify-between md:flex-col lg:gap-10 mt-3 space-x-2 ml-0 md:ml-5 lg:ml-20">
              <button
                onClick={handleCancelClick}
                type="button"
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
              {formattedDateOfBirth
                ? formattedDateOfBirth
                : "Add your date of birth"}
            </span>
            <button type="button" className="text-blue-700 font-semibold ml-4">
              Edit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateOfBirthSection;
