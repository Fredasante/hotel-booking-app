import { FormProvider, useForm } from "react-hook-form";
import { UserFormType } from "../../types/types";
import NameSection from "./NameSection";
import DisplayNameSection from "./DisplayNameSection";
import { useGetUserDetails } from "../../api/UserSettingsApi";
import { useEffect } from "react";
import EmailAddressSection from "./EmailAddressSection";
import PhoneSection from "./PhoneSection";

const PersonalDetailsForm = () => {
  const { userDetails } = useGetUserDetails();

  const formMethods = useForm<UserFormType>({
    defaultValues: {
      firstName: userDetails?.firstName || "",
      lastName: userDetails?.lastName || "",
      displayName: userDetails?.displayName || "",
      email: userDetails?.email || "",
      phoneNumber: userDetails?.phoneNumber || "",
    },
  });

  useEffect(() => {
    if (userDetails) {
      formMethods.reset({
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        displayName: userDetails.displayName,
        email: userDetails.email,
        phoneNumber: userDetails.phoneNumber,
      });
    }
  }, [userDetails, formMethods]);

  return (
    <FormProvider {...formMethods}>
      <form>
        <h2 className="text-3xl font-bold mb-3">Personal details</h2>
        <p className="text-gray-700 mb-3">
          Update your info and find out how it's used.
        </p>
        <NameSection />
        <DisplayNameSection />
        <EmailAddressSection />
        <PhoneSection />
      </form>
    </FormProvider>
  );
};

export default PersonalDetailsForm;
