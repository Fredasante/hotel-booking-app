export type User = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  displayName?: string;
};

export interface AddressType {
  street?: string;
  city?: string;
  postalCode?: string;
  country?: string;
}

export interface PassportDetailsType {
  firstName?: string;
  lastName?: string;
  number?: string;
  expiryDate?: Date;
  expirationMonth?: string;
  expirationDay?: string;
  expirationYear?: string;
  issuingCountry?: string;
  consent?: boolean;
}

export interface UserFormType {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  displayName?: string;
  profilePicture: string;
  phoneNumber?: string;
  dateOfBirth?: Date;
  nationality?: string;
  gender?: "Male" | "Female" | "Other" | "Prefer not to say";
  address?: AddressType;
  passportDetails?: PassportDetailsType;
}

export interface HotelType {
  _id: string;
  userId: string;
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
  imageUrls: string[];
  lastUpdated: Date;
}
