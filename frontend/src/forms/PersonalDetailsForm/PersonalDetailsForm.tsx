import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { UserFormType } from "../../types/types";
import NameSection from "./NameSection";
import DisplayNameSection from "./DisplayNameSection";
import {
  useGetUserDetails,
  useUpdateUserDetails,
} from "../../api/UserSettingsApi";
import { useEffect } from "react";
import EmailAddressSection from "./EmailAddressSection";
import PhoneSection from "./PhoneSection";
import DateOfBirthSection from "./DateOfBirthSection";
import NationalitySection from "./NationalitySection";
import GenderSection from "./GenderSection";
import AddressSection from "./AddressSection";
import PassportSection from "./PassportSection";
import { useDispatch } from "react-redux";
import { updateUserSuccess } from "../../redux/user/userSlice";

const PersonalDetailsForm = () => {
  const { userDetails } = useGetUserDetails();
  const { updateUserDetails } = useUpdateUserDetails();
  const formMethods = useForm<UserFormType>();
  const { reset, handleSubmit } = formMethods;
  const dispatch = useDispatch();

  useEffect(() => {
    if (userDetails) {
      reset(userDetails);
    }
  }, [userDetails, reset]);

  const onSave: SubmitHandler<UserFormType> = async (formData) => {
    try {
      await updateUserDetails(formData);
      dispatch(updateUserSuccess(formData));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider {...formMethods}>
      <form>
        <h2 className="text-3xl font-bold mb-3">Personal details</h2>
        <p className="text-gray-700 mb-3">
          Update your info and find out how it's used.
        </p>
        <NameSection onSave={handleSubmit(onSave)} />
        <DisplayNameSection onSave={handleSubmit(onSave)} />
        <EmailAddressSection onSave={handleSubmit(onSave)} />
        <PhoneSection onSave={handleSubmit(onSave)} />
        <DateOfBirthSection onSave={handleSubmit(onSave)} />
        <NationalitySection onSave={handleSubmit(onSave)} />
        <GenderSection onSave={handleSubmit(onSave)} />
        <AddressSection onSave={handleSubmit(onSave)} />
        <PassportSection onSave={handleSubmit(onSave)} />
      </form>
    </FormProvider>
  );
};

export default PersonalDetailsForm;
