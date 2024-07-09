import { FormProvider, useForm } from "react-hook-form";
import HotelDetailsSection from "./HotelDetailsSection";
import HotelTypeSection from "./HotelTypeSection";
import HotelFacilitiesSection from "./HotelFacilitiesSection";
import HotelGuestsSection from "./HotelGuestsSection";
import HotelImagesSection from "./HotelImagesSection";

export interface HotelFormData {
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
}

const ManageHotelForm = () => {
  const formMethods = useForm<HotelFormData>();
  const { handleSubmit } = formMethods;

  const onSubmit = handleSubmit((formData: HotelFormData) => {
    console.log(formData);
  });

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={onSubmit} className="mx-4 mb-4 my-10">
        <div className="max-w-4xl mx-auto bg-white shadow-[0_2px_13px_-6px_rgba(0,0,0,0.4)] sm:p-8 p-4 rounded-md">
          <HotelDetailsSection />
          <HotelTypeSection />
          <HotelFacilitiesSection />
          <HotelGuestsSection />
          <HotelImagesSection />
          <div className="mt-5 md:mt-10 max-w-md mx-auto">
            <button
              type="submit"
              className="mt-8 flex items-center justify-center text-sm w-full rounded-md px-6 py-3 tracking-wide text-white bg-[#ECB21C]"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
