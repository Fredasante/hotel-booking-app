import { FormProvider, useForm } from "react-hook-form";
import { UserFormType } from "../../types/types";
import NameSection from "./NameSection";
import DisplayNameSection from "./DisplayNameSection";

const PersonalDetailsForm = () => {
  const formMethods = useForm<UserFormType>();

  return (
    <FormProvider {...formMethods}>
      <h2 className="text-3xl font-bold mb-3">Personal details</h2>
      <p className="text-gray-700 mb-3">
        Update your info and find out how it's used.
      </p>
      <NameSection />
      <DisplayNameSection />
    </FormProvider>
  );
};

export default PersonalDetailsForm;
