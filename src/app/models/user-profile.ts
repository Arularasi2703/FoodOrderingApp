export class UserProfile {
  profileId!: number;
  userid: number | undefined;
  name!: string;
  email!: string;
  mobileNumber!: string;
  address!: string;
  pincode!: number;
  ProfilePicture!: File; // Change the property type to File
}
