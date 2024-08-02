import { useState } from "react";

const NameSection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState("Koo");
  const [lastName, setLastName] = useState("Yaw");
  const [tempFirstName, setTempFirstName] = useState(firstName);
  const [tempLastName, setTempLastName] = useState(lastName);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setFirstName(tempFirstName);
    setLastName(tempLastName);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setTempFirstName(firstName);
    setTempLastName(lastName);
    setIsEditing(false);
  };

  return (
    <div className="py-4 flex justify-between gap-2 md:gap-5 lg:gap-10 border-t border-b border-gray-200">
      <span className="w-32 md:w-40">Name:</span>

      {isEditing ? (
        <div className="space-y-2 w-full">
          <div className="flex flex-wrap md:flex-nowrap justify-between">
            <div className="flex flex-col w-full md:w-1/2 mr-2 mb-3">
              <label className="font-semibold text-sm" htmlFor="firstName">
                First name(s)
              </label>
              <input
                id="firstName"
                type="text"
                value={tempFirstName}
                onChange={(e) => setTempFirstName(e.target.value)}
                className="text-input text-black"
              />
            </div>
            <div className="flex flex-col w-full md:w-1/2">
              <label className="font-semibold text-sm" htmlFor="lastName">
                Last name(s)
              </label>
              <input
                id="lastName"
                type="text"
                value={tempLastName}
                onChange={(e) => setTempLastName(e.target.value)}
                className="text-input"
              />
            </div>
            <div className="flex flex-row justify-between md:flex-col md:gap-4 lg:gap-10 mt-3 space-x-2 ml-0 md:ml-5 lg:ml-20">
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
          className="flex space-x-2 w-full cursor-pointer"
          onClick={handleEditClick}
        >
          <span className="flex-grow text-gray-600">
            {firstName} {lastName}
          </span>
          <button className="text-blue-700 font-semibold">Edit</button>
        </div>
      )}
    </div>
  );
};

export default NameSection;
