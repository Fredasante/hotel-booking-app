const PersonalDetails = () => {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-4">Personal details</h2>
      <p className="text-gray-700">
        Update your info and find out how it's used.
      </p>
      <div className="mt-4">
        <div className="flex justify-between border-b py-2">
          <span>Name</span>
          <span>Koo Yaw</span>
          <button className="text-blue-500">Edit</button>
        </div>
        <div className="flex justify-between border-b py-2">
          <span>Display name</span>
          <span>Choose a display name</span>
          <button className="text-blue-500">Edit</button>
        </div>
        <div className="flex justify-between border-b py-2">
          <span>Email address</span>
          <span>
            kooyaw55@gmail.com <span className="text-green-500">Verified</span>
          </span>
          <button className="text-blue-500">Edit</button>
        </div>
        <div className="flex justify-between border-b py-2">
          <span>Phone number</span>
          <span>Add your phone number</span>
          <button className="text-blue-500">Edit</button>
        </div>
        <div className="flex justify-between border-b py-2">
          <span>Date of birth</span>
          <span>04/23/1991</span>
          <button className="text-blue-500">Edit</button>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
