import { useFormContext } from "react-hook-form";
import { IoCloseOutline, IoCloudUploadOutline } from "react-icons/io5";
import { HotelFormData } from "./ManageHotelForm";

const HotelImagesSection = () => {
  const {
    register,
    watch,
    formState: { errors },
    setValue,
  } = useFormContext<HotelFormData>();

  const imageFiles = watch("imageFiles") || [];

  const existingImageUrls = watch("imageUrls");

  const handleDeleteImage = (index: number) => {
    const newImageUrls = existingImageUrls.filter(
      (_, imageUrlIndex) => imageUrlIndex !== index
    );
    setValue("imageUrls", newImageUrls);
  };

  return (
    <div className="my-6 pt-2">
      <h5 className="sm:text-xl text-lg font-bold">Images</h5>
      <span className="text-xs text-gray-600">
        Maximum of 6 images allowed.
      </span>

      {existingImageUrls && (
        <div className="flex flex-wrap mt-4">
          {existingImageUrls.map((imageUrl, index) => (
            <div
              key={index}
              className="relative w-24 h-24 rounded-md overflow-hidden mr-2 mb-2"
            >
              <img
                src={imageUrl}
                alt="hotel"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => handleDeleteImage(index)}
                type="button"
                className="absolute top-0 right-0 bg-white text-gray-500 p-1 rounded-full"
              >
                <IoCloseOutline size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      <label
        htmlFor="uploadFile"
        className="bg-white text-gray-500 font-semibold text-base rounded max-w-md h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto mt-4"
      >
        <IoCloudUploadOutline size={42} />
        Upload files
        <input
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalLength =
                imageFiles.length + (existingImageUrls?.length || 0);
              if (totalLength === 0) {
                return "At least one image is required";
              }
              if (totalLength > 6) {
                return "Maximum of 6 images allowed";
              }
              return true;
            },
          })}
          multiple
          accept="image/*"
          type="file"
          id="uploadFile"
          className="hidden"
        />
        <p className="text-xs font-medium text-gray-400 mt-2">
          PNG, JPG SVG, WEBP, and GIF are Allowed.
        </p>
      </label>
      <div className="max-w-md mx-auto text-center mt-2">
        {imageFiles.length > 0 && (
          <span className="text-sm font-medium text-gray-600">
            {imageFiles.length} image{imageFiles.length > 1 ? "s" : ""} selected
          </span>
        )}
      </div>
      <div className="max-w-md mx-auto text-center">
        {errors.imageFiles && (
          <span className="text-red-500 text-sm mt-1">
            {errors.imageFiles.message}
          </span>
        )}
      </div>
    </div>
  );
};

export default HotelImagesSection;
