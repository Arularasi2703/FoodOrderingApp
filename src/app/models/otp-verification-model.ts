export class OtpVerificationModel {
  emailaddress: string;
  otp: string;

  constructor(email: string, otp: string) {
    this.emailaddress = email;
    this.otp = otp;
  }
}