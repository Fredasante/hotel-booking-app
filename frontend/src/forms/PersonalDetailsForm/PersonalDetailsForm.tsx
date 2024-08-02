import { FormProvider, useForm } from "react-hook-form";
import { UserFormType } from "../../types/types";
import NameSection from "./NameSection";
import DisplayNameSection from "./DisplayNameSection";
import { useGetUserDetails } from "../../api/UserSettingsApi";
import { useEffect } from "react";
import EmailAddressSection from "./EmailAddressSection";
import PhoneSection from "./PhoneSection";
import DateOfBirthSection from "./DateOfBirthSection";
import NationalitySection from "./NationalitySection";
import GenderSection from "./GenderSection";
import AddressSection from "./AddressSection";
import PassportSection from "./PassportSection";

const PersonalDetailsForm = () => {
  const { userDetails } = useGetUserDetails();

  const formMethods = useForm<UserFormType>({
    defaultValues: {
      firstName: userDetails?.firstName || "",
      lastName: userDetails?.lastName || "",
      displayName: userDetails?.displayName || "",
      email: userDetails?.email || "",
      phoneNumber: userDetails?.phoneNumber || "",
      dateOfBirth: userDetails?.dateOfBirth || undefined,
      nationality: userDetails?.nationality || "",
      gender: userDetails?.gender || "Prefer not to say",
      address: {
        street: userDetails?.address?.street || "",
        city: userDetails?.address?.city || "",
        postalCode: userDetails?.address?.postalCode || "",
        country: userDetails?.address?.country || "",
      },
      passportDetails: {
        firstName: userDetails?.passportDetails?.firstName || "",
        lastName: userDetails?.passportDetails?.lastName || "",
        number: userDetails?.passportDetails?.number || "",
        expirationMonth: userDetails?.passportDetails?.expirationMonth || "",
        expirationDay: userDetails?.passportDetails?.expirationDay || "",
        expirationYear: userDetails?.passportDetails?.expirationYear || "",
        issuingCountry: userDetails?.passportDetails?.issuingCountry || "",
        consent: userDetails?.passportDetails?.consent || false,
      },
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
        dateOfBirth: userDetails.dateOfBirth,
        nationality: userDetails.nationality,
        gender: userDetails.gender,
        address: {
          street: userDetails.address?.street || "",
          city: userDetails.address?.city || "",
          postalCode: userDetails.address?.postalCode || "",
          country: userDetails.address?.country || "",
        },
        passportDetails: {
          firstName: userDetails.passportDetails?.firstName || "",
          lastName: userDetails.passportDetails?.lastName || "",
          number: userDetails.passportDetails?.number || "",
          expirationMonth: userDetails.passportDetails?.expirationMonth || "",
          expirationDay: userDetails.passportDetails?.expirationDay || "",
          expirationYear: userDetails.passportDetails?.expirationYear || "",
          issuingCountry: userDetails.passportDetails?.issuingCountry || "",
          consent: userDetails.passportDetails?.consent || false,
        },
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
        <DateOfBirthSection />
        <NationalitySection />
        <GenderSection />
        <AddressSection />
        <PassportSection />
      </form>
    </FormProvider>
  );
};

export default PersonalDetailsForm;
