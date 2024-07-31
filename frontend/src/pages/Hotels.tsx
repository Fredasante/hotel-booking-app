import { useGetHotels } from "../api/HotelApi";
import { Button } from "../components/ui/button";
import { FaStar } from "react-icons/fa";

const Hotels = () => {
  const { hotels } = useGetHotels();

  console.log(hotels);

  return (
    <>
      {hotels?.map((hotel) => (
        <div
          key={hotel._id}
          className="bg-white flex flex-col md:flex-row items-center shadow-md w-full max-w-4xl rounded-lg overflow-hidden mx-auto my-5 md:my-10"
        >
          <div className="md:max-w-[360px] h-full p-5">
            <img
              src={hotel.imageUrls[0]}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          <div className="p-6">
            <h3 className="text-xl text-blue-800 font-semibold">
              {hotel.name}
            </h3>

            <div className="flex mt-2">
              <div className="flex items-center">
                <FaStar className="text-yellow-500" />
                <p className="text-sm text-gray-500 ml-1">{hotel.starRating}</p>
              </div>
              <p className="text-sm text-gray-500 ml-4">{hotel.type}</p>
            </div>

            {/* <div>
              {hotel.facilities.map((facility) => (
                <span
                  key={facility}
                  className="inline-block bg-blue-800 text-white px-3 py-1 text-sm font-semibold mr-2 mt-3"
                >
                  {facility}
                </span>
              ))}
            </div> */}

            <p className="mt-3 text-sm text-gray-500 leading-relaxed line-clamp-2">
              {hotel.description}
            </p>

            <div className="flex flex-wrap items-center cursor-pointer border border-gray-300 rounded-lg w-full px-2 py-2 mt-6">
              <div className="flex-1">
                <p className="text-xs text-slate-700 mt-0.5">
                  {hotel.city}, {hotel.country}
                </p>
                <p className=" text-gray-800 text-sm font-semibold">
                  Price per night: GH₵ {hotel.pricePerNight.toLocaleString()}
                </p>
              </div>
              <Button className="bg-blue-800">Edit Details</Button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Hotels;
