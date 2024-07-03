import { Link } from "react-router-dom";
import backgroundImage from "../assets/background-image.jpg";

const Hero = () => {
  return (
    <div
      className="relative bg-cover bg-center lg:min-h-[40vh] max-w-screen-xl mx-auto px-5 md:px-10 lg:px-14"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-50"></div>
      <div className="relative h-full flex flex-col py-10 lg:py-16">
        <h1 className="text-2xl md:text-3xl lg:text-[42px] text-white font-bold">
          The perfect home base
          <span className="block lg:mt-4">for your special trip</span>
        </h1>
        <p className="text-white lg:text-2xl text-base mt-4 mb-7">
          Discover dreamy vacation homes all over the world
        </p>
        <Link
          to="/login"
          className="bg-[#006CE4] w-fit font-semibold text-white px-4 py-3 border-[#003B95] rounded-md transition duration-300 hover:bg-[#003B95]"
        >
          Find Yours
        </Link>
      </div>
    </div>
  );
};

export default Hero;
