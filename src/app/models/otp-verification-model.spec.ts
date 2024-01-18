import { OtpVerificationModel } from './otp-verification-model';

describe('OtpVerificationModel', () => {
  it('should create an instance', () => {
    const otpVerificationModel = new OtpVerificationModel('test@example.com', '123456'); // Provide required arguments
    expect(otpVerificationModel).toBeTruthy();
  });
});
