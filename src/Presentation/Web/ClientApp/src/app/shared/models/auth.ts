export interface ResetPasswordToken {
  UserId: string;
  Token: string;
  NewPassword: string;
  ConfirmPassword: string;
}

export interface ForgotPassword {
  email: string;
}
