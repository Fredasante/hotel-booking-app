import { useGetHotels } from "../api/HotelApi";
import Spinner from "../components/Spinner";
import { Button } from "../components/ui/button";
import { BiTerminal } from "react-icons/bi";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaStar, FaRegCalendarAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const MyHotels = () => {
  const { hotels, isLoading } = useGetHotels();
  const { selectedCurrency, exchangeRates } = useSelector(
    (state: RootState) => state.currency
  );
  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center mx-auto">
        <Spinner />
      </div>
    );
  }

  if (!hotels || hotels.length === 0) {
    return (
      <div className="min-h-[75vh] flex flex-col justify-center items-center">
        <p className="text-slate-700 font-semibold text-2xl">
          No hotels found!
        </p>
        <Alert className="flex items-center justify-center flex-col gap-5 max-w-[450px] mt-5 bg-gray-50">
          <div className="flex items-center justify-center">
            <BiTerminal className="h-4 w-4 " />
            <AlertTitle className="ml-2">Heads up!</AlertTitle>
          </div>

          <AlertDescription className="text-center">
            You currently have no hotels listed. To manage your hotels, please
            add new ones to get started.
          </AlertDescription>
          <Link to="/create-hotel">
            <Button className="bg-yellow-600 text-white">Add New Hotel</Button>
          </Link>
        </Alert>
      </div>
    );
  }

  const convertPrice = (price: number) => {
    if (exchangeRates && selectedCurrency !== "USD") {
      const rate = exchangeRates[selectedCurrency];
      const convertedPrice = price * rate;
      return convertedPrice.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }
    return price.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <>
      <Link className="flex justify-end max-w-5xl mt-6 px-5" to="/create-hotel">
        <Button className="bg-yellow-600 text-white">Add New Hotel</Button>
      </Link>
      {hotels.map((hotel) => (
        <div
          key={hotel._id}
          className="bg-white flex flex-col md:flex-row items-center shadow-md w-full max-w-4xl rounded-lg overflow-hidden mx-auto mt-6 mb-8"
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
              <div className="text-sm text-gray-500 ml-4 flex items-center">
                <FaRegCalendarAlt className="text-slate-500 mr-1" />{" "}
                {hotel.type}
              </div>
            </div>

            <p className="mt-3 text-sm text-gray-500 leading-relaxed line-clamp-2">
              {hotel.description}
            </p>

            <div className="flex flex-wrap items-center cursor-pointer border border-gray-300 rounded-lg w-full px-2 py-2 mt-6">
              <div className="flex-1">
                <div className="text-xs text-slate-700 flex items-center mb-1">
                  <FaMapMarkerAlt className="inline-block text-teal-600 mr-1" />{" "}
                  {hotel.city}, {hotel.country}
                </div>
                <div className=" text-gray-800 text-sm font-semibold flex items-center">
                  {selectedCurrency} {convertPrice(hotel.pricePerNight)} per
                  night
                </div>
              </div>
              <Link to={`/edit-hotel/${hotel._id}`}>
                <Button className="bg-blue-800">Edit Details</Button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default MyHotels;
