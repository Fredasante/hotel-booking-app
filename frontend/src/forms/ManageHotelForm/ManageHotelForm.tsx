import { FormProvider, useForm } from "react-hook-form";
import HotelDetailsSection from "./HotelDetailsSection";
import HotelTypeSection from "./HotelTypeSection";
import HotelFacilitiesSection from "./HotelFacilitiesSection";
import HotelGuestsSection from "./HotelGuestsSection";
import HotelImagesSection from "./HotelImagesSection";
import { HotelType } from "../../types/types";
import { useEffect } from "react";

type Props = {
  onSave: (hotelFormData: FormData) => void;
  isCreateLoading?: boolean;
  isEditLoading?: boolean;
  hotel?: HotelType;
  title: string;
};

export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number;
  starRating: number;
  imageFiles: FileList;
  imageUrls: string[];
};

const ManageHotelForm = ({
  onSave,
  isCreateLoading,
  isEditLoading,
  hotel,
  title,
}: Props) => {
  const formMethods = useForm<HotelFormData>();
  const { handleSubmit, reset } = formMethods;

  useEffect(() => {
    if (hotel) {
      reset(hotel);
    }
  }, [hotel, reset]);

  const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
    const formData = new FormData();

    if (hotel) {
      formData.append("hotelId", hotel._id);
    }

    formData.append("name", formDataJson.name);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append("description", formDataJson.description);
    formData.append("type", formDataJson.type);
    formData.append("adultCount", formDataJson.adultCount.toString());
    formData.append("childCount", formDataJson.childCount.toString());
    formData.append("pricePerNight", formDataJson.pricePerNight.toString());
    formData.append("starRating", formDataJson.starRating.toString());

    formDataJson.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });

    if (formDataJson.imageUrls) {
      formDataJson.imageUrls.forEach((imageUrl, index) => {
        formData.append(`imageUrls[${index}]`, imageUrl);
      });
    }

    Array.from(formDataJson.imageFiles).forEach((imageFile) => {
      formData.append("imageFiles", imageFile);
    });

    onSave(formData);
  });

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={onSubmit} className="mx-4 mb-4 my-10">
        <div className="max-w-4xl mx-auto bg-white shadow-[0_2px_13px_-6px_rgba(0,0,0,0.4)] sm:p-8 p-4 rounded-md">
          <h2 className="sm:text-3xl text-2xl text-center font-bold mb-7">
            {title}
          </h2>
          <HotelDetailsSection />
          <HotelTypeSection />
          <HotelFacilitiesSection />
          <HotelGuestsSection />
          <HotelImagesSection />
          <div className="mt-5 md:mt-10 max-w-md mx-auto">
            <button
              disabled={isCreateLoading || isEditLoading}
              type="submit"
              className="mt-8 flex items-center justify-center text-sm w-full rounded-md px-6 py-3 tracking-wide text-white bg-[#ECB21C] disabled:bg-yellow-300"
            >
              {isCreateLoading || isEditLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
